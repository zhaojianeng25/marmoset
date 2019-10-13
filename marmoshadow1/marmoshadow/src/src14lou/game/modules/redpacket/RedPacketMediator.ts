
import RedPackInfoVo = game.modules.redPacket.models.RedPackInfoVo;
import SRRedPackNumVo = game.modules.redPacket.models.SRRedPackNumVo;
import RedPackRoleTipVo = game.modules.redPacket.models.RedPackRoleTipVo;
import RedPackRoleHisInfoVo = game.modules.redPacket.models.RedPackRoleHisInfoVo;
import GetRedPackVo = game.modules.redPacket.models.GetRedPackVo;
module game.modules.redPacket {
    /** * 红包系统主界面 */
    export class RedPacketMediator extends game.modules.UiMediator {
        /** 红包界面UI */
        private _viewUI: ui.common.RedPacketUI;
        /** 红包历史 */
        private _redPacketRecordMediator: RedPacketRecordMediator;
        /** 红包发送 */
        private _redPacketSendMediator: RedPacketSendMediator;
        /** 飘窗 */
        private _disappearMessageTipsMediator: DisappearMessageTipsMediator;
        // /** 出现小红包图标 */
        // private _appearRedPackMediator : modules.commonUI.AppearRedPackMediator;
        /** 当前红包界面类型 */
        private cruee_redPack_type: number;
        /** 红包界面信息数据 */
        private redpack_infoData: Array<RedPackInfoVo> = [];
        /** 红包被领取的记录信息 */
        private redpack_getRecord_infoData: Array<RedPackRoleHisInfoVo> = [];
        /** 被领取红包的信息 */
        private redpack_his_infoData: Laya.Dictionary;
        /** 抢红包的信息 */
        private redpack_get_infoData: Array<GetRedPackVo> = [];
        /** 抢红包抢到最多金额的玩家ID */
        private moneyNum_getMax_roleId: number;
        /** 抢红包抢到最少金额的玩家ID */
        private moneyNum_getMin_roleId: number;
        /** 红包推送消息数据 */
        private redPack_tipData: Array<RedPackRoleTipVo> = [];
        /** 点击红包图标，抢红包事件 */
        public static QIANG_HONGBAO_EVENT: string = "qiangHongBaoEvent";
        // /** 临时放小红包图标所需角色名字 */
        // private _tempRoleName:string;
        // /** 临时放小红包图标所需红包id */
        // private _tempRedPackId:string;
        // /** 临时放小红包图标所需红包类型 */
        // private _tempRedPackType:number;
        // /** 红包主界面关闭，显示小红包图标事件 */
        // public static SHOW_XIAOREDPACK_EVENT :string = "showXiaoRedPack";
        // /** 判断是否玩家有发新的红包 */
        // private _isSendNewRedPack:boolean = false;
        /** tips界面 */
        private _tipsModule: tips.tipsModule;
        /**客户端信息提示表 */
        _chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.RedPacketUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;

        }

        public show(redpacktype?: number): void {
            if (redpacktype != undefined) {
                this._init_UI(redpacktype);
            } else {
                this._init_UI();
            }
            this.registerEvent();
            super.show();
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
        }

        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            //消息事件
            models.RedPacketProxy.getInstance().on(models.GET_REDPACK_SUCCESS, this, this.refreshData_3);
            models.RedPacketProxy.getInstance().on(models.NONE_REDPACK, this, this.showNone);
            models.RedPacketProxy.getInstance().on(models.SEE_RECORD_EVENT, this, this.refreshData_2);
            models.RedPacketProxy.getInstance().on(models.SEND_REDPACK_VIEW, this, this.refreshData_1);
            chat.models.ChatProxy.getInstance().on(chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
            models.RedPacketProxy.getInstance().on(models.SEND_REDPACK_SUCCESS, this, this.updateBoolean);
            // models.RedPacketProxy.getInstance().on(models.NOTICE_REPACK_EVENT,this,this.onShowImage);
            //给选择红包类型的按钮添加监听事件，并向服务器发起红包界面请求
            this._viewUI.world_redPacket_btn.on(LEvent.CLICK, this, this._redPacket_is_selected, [RedPackType.TYPE_WORLD]);
            this._viewUI.faction_redPacket_btn.on(LEvent.CLICK, this, this._redPacket_is_selected, [RedPackType.TYPE_CLAN]);
            this._viewUI.team_redPacket_btn.on(LEvent.CLICK, this, this._redPacket_is_selected, [RedPackType.TYPE_TEAM]);
            //历史记录按钮添加点击监听事件
            this._viewUI.redPacket_record_btn.on(LEvent.CLICK, this, this.show_redPacket_Record_UI);
            //发放红包按钮添加点击监听事件
            this._viewUI.send_redPacket_btn.on(LEvent.CLICK, this, this.show_send_redPacket_UI);
            //界面关闭按钮添加点击监听事件
            this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.clickCloseBtn);
            // //界面关闭，监听显示小红包图标消息
            // this._viewUI.close_btn.on(RedPacketMediator.SHOW_XIAOREDPACK_EVENT,this,this.onShowImage);
            //tips按钮被点
            this._viewUI.tips_btn.on(LEvent.MOUSE_DOWN, this, this.onSHowTipsUI);
            //背景图片添加监听事件
            this._viewUI.bg_img.on(LEvent.CLICK, this, this.onHide);
        }
        /**
         * 显示tipsUI
         */
        private onSHowTipsUI(): void {
            var param = new Laya.Dictionary();
            param.set("title", 11490);
            switch (this.cruee_redPack_type) {
                case RedPackType.TYPE_WORLD:
                    param.set("contentId", 11487);
                    break;
                case RedPackType.TYPE_CLAN:
                    param.set("contentId", 11488);
                    break;
                case RedPackType.TYPE_TEAM:
                    param.set("contentId", 11489);
                    break;
            }
            if (!this._tipsModule) {
                this._tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
            }
            else {
                this.onHide();
                this._tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, param, true);
            }
            this._viewUI.bg_img.mouseThrough = false;
        }
        /**
         * 关闭某些弹窗
         */
        private onHide(): void {
            //如果有，则关闭说明型提示弹窗
            if (this._tipsModule) {
                this._tipsModule.hide();
                this._viewUI.bg_img.mouseThrough = true;
            }

            //如果有，则关闭查看红包被领取记录的弹窗
            if (this._viewUI.redPackRecord_box.visible) {
                this._viewUI.redPackRecord_box.visible = false;
                this._viewUI.bg_img.mouseThrough = true;
            }
        }
        /**
         * 更新业务所需的判断值,并发出提示消息
         */
        private updateBoolean(): void {
            //this._isSendNewRedPack = true;
            var _msg = this._chatMessageTips["172004"].msg
            this.show_Msg(_msg);
        }

        // /**
        //  * 显示红包图标
        //  */
        // private onShowImage(roleName?:string,redpackid?:string,modeltype?:number):void{
        //     if(!roleName) return;
        //     this._appearRedPackMediator = new modules.commonUI.AppearRedPackMediator(this._app);
        //     if(roleName != null){
        //         this._appearRedPackMediator.onShow(roleName,redpackid,modeltype,this._viewUI.visible);
        //         this._tempRoleName = roleName;
        //         this._tempRedPackId = redpackid;
        //         this._tempRedPackType = modeltype;
        //     }
        //     else{
        //         //if(this._isFirstOpen) return;//如果该界面第一次打开，就返回
        //         if(this._isSendNewRedPack == false) return;//如果玩家没发新红包，就返回
        //         //只判断玩家当前最新发的红包状态
        //         if(this.redpack_infoData[0]["redpackstate"] == RedPackState.STATE_CANGET){                    
        //             this._appearRedPackMediator.onShow(this._tempRoleName,this._tempRedPackId,this._tempRedPackType,false);
        //         }
        //         else{
        //             this._appearRedPackMediator.onShow(this._tempRoleName,this._tempRedPackId,this._tempRedPackType,true);
        //         }
        //     }
        // }
        /**
         * @describe 显示没人发送红包界面
         */
        private showNone(): void {
            this._viewUI.none_redPack_msg.visible = true;
            this._viewUI.redPack_list.visible = false;
        }

        private _init_UI(redpacktype?: number): void {
            if (redpacktype != undefined) {
                this.cruee_redPack_type = redpacktype;
                this._redPacket_is_selected(redpacktype);
            } else {
                this.cruee_redPack_type = RedPackType.TYPE_WORLD;
                this._redPacket_is_selected(this.cruee_redPack_type);
            }
        }
        /**
         * 显示发红包界面
         */
        private show_send_redPacket_UI(): void {
            this._redPacketSendMediator = new RedPacketSendMediator(this._app);
            if (this.cruee_redPack_type == RedPackType.TYPE_TEAM) {
                var teamInfo = team.models.TeamModel.getInstance().screateTeam;
                let arr = Object.keys(teamInfo);
                if (arr.length == 0) {
                    var _chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    this.show_Msg(_chatMessageTips[140498].msg);
                    return;
                }
                this._redPacketSendMediator.showUI(RedPackType.TYPE_TEAM);
            } else if (this.cruee_redPack_type == RedPackType.TYPE_CLAN) {
                if (game.modules.mainhud.models.HudModel.getInstance().clankey == 0) {
                    var _chatMessageTips = game.modules.chat.models.ChatModel._instance.chatMessageTips;
                    this.show_Msg(_chatMessageTips[145077].msg);
                    return;
                }
                this._redPacketSendMediator.showUI(RedPackType.TYPE_CLAN);
            } else if (this.cruee_redPack_type == RedPackType.TYPE_WORLD) {
                this._redPacketSendMediator.showUI(RedPackType.TYPE_WORLD);
            }
            //LoginModel.getInstance().CommonPage = "redpacket";
            this.hide();
        }
        /**
         * 显示个人红包历史记录
         */
        private show_redPacket_Record_UI(): void {
            this._redPacketRecordMediator = new RedPacketRecordMediator(this._app);
            this._redPacketRecordMediator.showUI();
            //LoginModel.getInstance().CommonPage = "redpacket";
            this.hide();
        }

        private _redPacket_is_selected(btn: number): void {
            var redpack_id: string = '0';//测试，暂时先用第一页，即0
            var configure_Vo: RedPackConfigBaseVo = models.RedPacketModel.getInstance().redPackDic[btn];
            this._viewUI.hongBaoTitle_lab.text = configure_Vo.name;
            this._viewUI.hongBaoFenLei_lab.text = configure_Vo.name;
            this._viewUI.world_redPacket_btn.selected = false;
            this._viewUI.faction_redPacket_btn.selected = false;
            this._viewUI.team_redPacket_btn.selected = false;
            switch (btn) {
                case RedPackType.TYPE_WORLD:
                    RequesterProtocols._instance.c2s_CSendRedPackView(btn, redpack_id);
                    this._viewUI.world_redPacket_btn.selected = true;
                    this.cruee_redPack_type = RedPackType.TYPE_WORLD;
                    break;
                case RedPackType.TYPE_CLAN:
                    RequesterProtocols._instance.c2s_CSendRedPackView(btn, redpack_id);
                    this._viewUI.faction_redPacket_btn.selected = true;
                    this.cruee_redPack_type = RedPackType.TYPE_CLAN;
                    break;
                case RedPackType.TYPE_TEAM:
                    RequesterProtocols._instance.c2s_CSendRedPackView(btn, redpack_id);
                    this._viewUI.team_redPacket_btn.selected = true;
                    this.cruee_redPack_type = RedPackType.TYPE_TEAM;
                    break;
            }
        }
        /**
         * @describe 移除事件监听
         */
        private removeEvent(): void {
            models.RedPacketProxy.getInstance().off(models.GET_REDPACK_SUCCESS, this, this.refreshData_3);
            models.RedPacketProxy.getInstance().off(models.SEE_RECORD_EVENT, this, this.refreshData_2);
            models.RedPacketProxy.getInstance().off(models.SEND_REDPACK_VIEW, this, this.refreshData_1);
            chat.models.ChatProxy.getInstance().off(chat.models.SHOW_DISSAPEAR_MSG_TIPS, this, this.show_Msg);
            models.RedPacketProxy.getInstance().off(models.NONE_REDPACK, this, this.showNone);
            // models.RedPacketProxy.getInstance().off(models.NOTICE_REPACK_EVENT,this,this.onShowImage);
            this._viewUI.world_redPacket_btn.off(LEvent.CLICK, this, this._redPacket_is_selected);
            this._viewUI.faction_redPacket_btn.off(LEvent.CLICK, this, this._redPacket_is_selected);
            this._viewUI.team_redPacket_btn.off(LEvent.CLICK, this, this._redPacket_is_selected);
            this._viewUI.redPacket_record_btn.off(LEvent.CLICK, this, this.show_redPacket_Record_UI);
            this._viewUI.send_redPacket_btn.off(LEvent.CLICK, this, this.show_send_redPacket_UI);
            this._viewUI.close_btn.off(LEvent.MOUSE_UP, this, this.clickCloseBtn);
        }
        public clickCloseBtn(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            this.hide();
        }
        public hide(): void {
            this.onHide();
            this.removeEvent();
            super.hide();
            //this._viewUI.close_btn.event(RedPacketMediator.SHOW_XIAOREDPACK_EVENT);
            // if(LoginModel.getInstance().CommonPage != "")
            // {
            // 	ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
            // 	LoginModel.getInstance().CommonPage = "";
            // }
        }

        public getView(): Sprite {
            return this._viewUI;
        }

        /**
         * @describe 获取抢红包信息数据
         */
        /** 抢红包成功刷新数据 */
        public refreshData_3(successflag: number, redpackid: string, state: number): void {
            this.redpack_get_infoData = models.RedPacketModel._instance.redPack_get_info;
            //红包是否抢成功，失败则返回
            if (successflag == 0 && state == RedPackState.STATE_NONE) {//抢红包失败,红包已过期或者该红包已经退回给当前玩家
                let arr = [];
                for (let i = 0; i < this.redpack_infoData.length; i++) {
                    if (this.redpack_infoData[i]["redpackid"] != this.redpack_get_infoData["redpackid"]) {
                        arr.push(this.redpack_infoData[i]);
                    }
                    else {
                        redPacket.models.RedPacketModel.getInstance().expiredRedPackData.push(this.redpack_infoData[i]);
                    }
                }
                this.redpack_infoData = arr;
            }
            else if (successflag == 1) {
                for (let index = 0; index < this.redpack_infoData.length; index++) {
                    if (this.redpack_infoData[index]["redpackid"] == this.redpack_get_infoData["redpackid"]) {
                        this.redpack_infoData[index]["redpackstate"] = this.redpack_get_infoData["state"];
                        break;
                    }
                }
            }
            this.refresh_showRedPack_UI();
        }
        /**
         * 弹出消息气泡
         */
        private show_Msg(msg: any): void {
            this._disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
            this._disappearMessageTipsMediator.onShow(msg);
        }
        /**
         * @describe 获取红包被领取的记录信息数据以及被领取的红包信息数据
         * @param redpackid 
         */
        /** 刷新红包被领取的记录信息数据 */
        public refreshData_2(redpackid: string): void {
            this.redpack_getRecord_infoData = models.RedPacketModel._instance.redpack_roleHisInfoList;
            this.redpack_his_infoData = models.RedPacketModel._instance.redPack_HisView_info;
            var numSize = this.redpack_getRecord_infoData.length;
            if (numSize == 1) {
                this.moneyNum_getMax_roleId = this.redpack_getRecord_infoData[numSize - 1]["roleid"];
            }
            else {
                var maxNum: number = this.redpack_getRecord_infoData[0]["redpackmoney"]; var max_i: number = 0;
                var minNum: number = this.redpack_getRecord_infoData[0]["redpackmoney"]; var min_i: number = 0;
                for (let i: number = numSize - 1; i > -1; i--) {
                    var curr_num: number = this.redpack_getRecord_infoData[i]["redpackmoney"];
                    if (maxNum < curr_num) {
                        maxNum = curr_num;
                        max_i = i;
                    }
                    if (minNum > curr_num) {
                        minNum = curr_num;
                        min_i = i;
                    }
                }
                this.moneyNum_getMax_roleId = this.redpack_getRecord_infoData[max_i]["roleid"];
                this.moneyNum_getMin_roleId = this.redpack_getRecord_infoData[min_i]["roleid"];
            }
            this._init_redPackRecordUI(redpackid);
        }
        /**
         * @describe 查看红包领取的UI初始化
         * @param redpackid 
         */
        private _init_redPackRecordUI(redpackid: string): void {
            var redPack_time: number = 0;
            redPack_time = this.redpack_his_infoData.get(redpackid)["time"];//获取时间
            var redpackdes: string = this.redpack_his_infoData.get(redpackid)["redpackdes"];//获取寄语
            var redpackallnum: number = this.redpack_his_infoData.get(redpackid)["redpackallnum"];//获取红包总数量
            var redpackallmoney: number = this.redpack_his_infoData.get(redpackid)["redpackallmoney"];//获取红包总金额
            var date = new Date(redPack_time);
            var Y: string = '' + date.getFullYear() + '-';
            var M: string = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D: string = date.getDate() + '';
            this._viewUI.timr_label.text = Y + M + D;
            this._viewUI.JiYu_label.text = redpackdes;
            this._viewUI.redPackNum_label.text = this.redpack_getRecord_infoData.length.toString() + '/' + redpackallnum.toString();
            this._viewUI.moneyNum_label.text = redpackallmoney.toString();
            this._init_redPackRecord_list();//对红包领取记录里的列表进行初始化
            this._viewUI.redPackRecord_box.visible = true;
            this._viewUI.bg_img.mouseThrough = false;
            this._viewUI.redPackRecord_box.on(LEvent.CLICK, this, this.box_hide, [this._viewUI.redPackRecord_box]);
        }
        private box_hide(box: Laya.Box): void {
            box.visible = false;
        }
        /**
         * @describe 红包领取记录里列表初始化
         */
        private _init_redPackRecord_list(): void {
            var redPackRecord_list: Laya.List = this._viewUI.redPackRecord_list;
            redPackRecord_list.array = this.redpack_getRecord_infoData;
            redPackRecord_list.repeatX = 1;
            redPackRecord_list.repeatY = this.redpack_getRecord_infoData.length;
            redPackRecord_list.vScrollBarSkin = '';
            redPackRecord_list.scrollBar.elasticBackTime = 200;
            redPackRecord_list.scrollBar.elasticDistance = 100;
            redPackRecord_list.renderHandler = new Handler(this, this._show_get_record_list);
        }
        private _show_get_record_list(cell: Box, index: number): void {
            var moneyNum_label: Laya.Label = cell.getChildByName("moneyNum_label") as Laya.Label;
            var roleName_label: Laya.Label = cell.getChildByName("roleName_label") as Laya.Label;
            var zuijia_image: Laya.Image = cell.getChildByName("zuijia_image") as Laya.Image;
            var zuicha_image: Laya.Image = cell.getChildByName("zuicha_image") as Laya.Image;
            moneyNum_label.text = this.redpack_getRecord_infoData[index]["redpackmoney"].toString();
            roleName_label.text = this.redpack_getRecord_infoData[index]["rolename"];
            var roleid: number = this.redpack_getRecord_infoData[index]["roleid"];
            switch (roleid) {
                case this.moneyNum_getMax_roleId:
                    zuijia_image.visible = true;
                    break;
                case this.moneyNum_getMin_roleId:
                    zuicha_image.visible = true;
                    break;
            }
        }

        /**
         * @describe 获取红包界面的数据
         */
        /** 刷新获取红包界面信息数据 */
        public refreshData_1(): void {
            this.redpack_infoData = models.RedPacketModel._instance.redpack_infoList;
            let guoqiRedPackData = models.RedPacketModel.getInstance().expiredRedPackData;
            if (guoqiRedPackData.length != 0) {
                let arr = [];
                for (let i = 0; i < this.redpack_infoData.length; i++) {
                    for (let j = 0; j < guoqiRedPackData.length; j ++){
                        if (this.redpack_infoData[i]["redpackid"] != guoqiRedPackData[j]["redpackid"]) {
                            arr.push(this.redpack_infoData[i]);
                        }
                    }
                }
                this.redpack_infoData = arr;
            }
            this.refresh_showRedPack_UI();
        }
        /**
         * @describe 红包界面的UI初始化
         */
        private refresh_showRedPack_UI(): void {
            this._viewUI.none_redPack_msg.visible = false;
            this._viewUI.redPack_list.visible = true;
            var redPack_list: Laya.List = this._viewUI.redPack_list as Laya.List;
            redPack_list.vScrollBarSkin = "";
            redPack_list.array = this.redpack_infoData;
            redPack_list.repeatX = 2;
            redPack_list.repeatY = Math.ceil(this.redpack_infoData.length / 2);
            redPack_list.scrollBar.elasticBackTime = 200;
            redPack_list.scrollBar.elasticDistance = 100;
            redPack_list.renderHandler = new Handler(this, this._showRedPackListRender);
        }
        private _showRedPackListRender(cell: Box, index: number): void {
            if (index > this.redpack_infoData.length || index == this.redpack_infoData.length) {
                return;
            }
            var roleName_label: Laya.Label = cell.getChildByName("roleName_label") as Laya.Label;
            roleName_label.text = this.redpack_infoData[index]["rolename"];
            var JiYu_label: Laya.Label = cell.getChildByName("JiYu_label") as Laya.Label;
            JiYu_label.text = this.redpack_infoData[index]["redpackdes"];
            var redpackid: string = this.redpack_infoData[index]["redpackid"];
            cell.name = redpackid + "";
            var redState: number = this.redpack_infoData[index]["redpackstate"];
            var fushi: number = this.redpack_infoData[index]["fushi"];
            this.is_redPack_kai(redpackid, redState, cell, fushi);
            if (!cell.visible) {
                cell.visible = true;
            }
        }
        /**
         * @describe 根据当前红包状态来显示UI
         * @param redpackid 
         * @param state 
         * @param cell 
         * @param index 
         */
        private is_redPack_kai(redpackid: string, state: number, cell: Box, fushi: number): void {
            var hongbao_image: Laya.Image = cell.getChildByName("hongbao_image") as Laya.Image;
            var jinbi_image: Laya.Image = cell.getChildByName("jinbi_image") as Laya.Image;
            var qiang_redPack_btn: Laya.Button = cell.getChildByName("qiang_redPack_btn") as Laya.Button;
            var status_image: Laya.Image = cell.getChildByName("status_image") as Laya.Image;
            var look_record_label: Laya.Label = cell.getChildByName("look_record_label") as Laya.Label;
            var JiYu_label: Laya.Label = cell.getChildByName("JiYu_label") as Laya.Label;
            switch (state) {
                case RedPackState.STATE_CANGET:
                    if (fushi > 1000 || fushi == 1000) {
                        hongbao_image.skin = "common/ui/redpacket/fushibao.png";
                    } else if (fushi == 18 || fushi < 1000) {
                        hongbao_image.skin = "common/ui/redpacket/jinbibao.png";
                    }
                    jinbi_image.visible = true;
                    qiang_redPack_btn.visible = true;
                    qiang_redPack_btn.mouseEnabled = true;
                    qiang_redPack_btn.on(LEvent.CLICK, this, this.qiang_redPack, [redpackid]);
                    status_image.skin = "";
                    look_record_label.visible = false;
                    look_record_label.mouseEnabled = false;
                    JiYu_label.visible = false;
                    break;
                case RedPackState.STATE_HAVE:
                case RedPackState.STATE_NONE:
                    if (fushi > 1000 || fushi == 1000) {
                        hongbao_image.skin = "common/ui/redpacket/fushibaokai.png";
                    } else if (fushi == 18 || fushi < 1000) {
                        hongbao_image.skin = "common/ui/redpacket/jinbibaokai.png";
                    }
                    jinbi_image.visible = false;
                    qiang_redPack_btn.visible = false;
                    qiang_redPack_btn.mouseEnabled = false;
                    if (state == RedPackState.STATE_HAVE) {
                        status_image.skin = "common/ui/redpacket/qu.png";
                    }
                    else {
                        status_image.skin = "common/ui/redpacket/guang.png";
                    }

                    look_record_label.visible = true;
                    look_record_label.mouseEnabled = true;
                    look_record_label.on(LEvent.CLICK, this, this.look_get_record, [redpackid]);
                    JiYu_label.visible = true;
                    break;
            }
        }
        private look_get_record(redpackid: string): void {
            RequesterProtocols._instance.c2s_CSendRedPackHisView(this.cruee_redPack_type, redpackid);
        }
        /**
         * 抢红包
         * @param redpackid 红包id
         */
        /** 抢红包点击事件 */
        private qiang_redPack(redpackid: string): void {
            RequesterProtocols._instance.c2s_CGetRedPack(this.cruee_redPack_type, redpackid);
        }

    }
}