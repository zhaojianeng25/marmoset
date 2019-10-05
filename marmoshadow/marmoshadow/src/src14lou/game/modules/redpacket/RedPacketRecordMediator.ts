/**
 * 红包记录界面
 */
import RedPackRoleRecordVo = game.modules.redPacket.models.RedPackRoleRecordVo;
import RedPackRoleRecordViewVo = game.modules.redPacket.models.RedPackRoleRecordViewVo;
module game.modules.redPacket {
    export class RedPacketRecordMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.RedRecordUI;
        /** 当前红包历史记录中的状态 1：发出  0：收到 */
        private curr_redPackRecordState: number;
        /** 红包历史里列表数据 */
        private record_info_data: Array<any> = [];
        /** 红包历史界面信息数据 */
        private role_redPack_record_data: Array<RedPackRoleRecordViewVo> = [];
        /** 红包被领取的记录信息 */
        private redpack_getRecord_infoData: Array<RedPackRoleHisInfoVo> = [];
        /** 被领取红包的信息 */
        private redpack_his_infoData: Laya.Dictionary;
        /** 抢红包抢到最多金额的玩家ID */
        private moneyNum_getMax_roleId: number;
        /** 抢红包抢到最少金额的玩家ID */
        private moneyNum_getMin_roleId: number;
        private i: number = 0;
        /** 角色头像配置数据 */
        private roleIcon: Object = {};
        /** 登录Model,从它那拿当前游戏玩家的角色id */
        private _loginModel: LoginModel;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.RedRecordUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
        }
        public showUI(): void {
            this.show();
        }

        public show(): void {
            this._init_UI();
            this.registerEvent();
            super.show();
            this._viewUI.close_btn.on(LEvent.MOUSE_UP, this, this.hide);
            this._loginModel = game.modules.createrole.models.LoginModel.getInstance();

        }
        ////////////////
        ///事件
        ////////////////
        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            models.RedPacketProxy.getInstance().on(models.LOOK_RECORD_EVENT, this, this._refresh_getRecord_infoData);
            models.RedPacketProxy.getInstance().on(models.ROLE_REDPACK_RECORD_EVENT, this, this.refreshData);
            this._viewUI.hideBg_img.on(LEvent.CLICK, this, this.onHide);
        }
        /**
         * 关闭某些弹窗
         */
        private onHide(): void {
            //如果有，则关闭查看红包被领取记录的弹窗
            if (this._viewUI._redPackRecord_Box.visible) {
                this._viewUI._redPackRecord_Box.visible = false;
                this._viewUI.hideBg_img.mouseThrough = true;
            }
        }

        /**
         * @describe  刷新红包历史记录里的红包领取情况信息
         */
        private _refresh_getRecord_infoData(redpackid: string): void {
            console.log("------------------------------------红包历史界面查看红包领取记录---------------------------------------");
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
            this._show_getRecord_UI(redpackid);
        }
        /**
         * @describe 显示查看红包领取记录的UI
         */
        private _show_getRecord_UI(redpackid: string): void {
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
            this._init_redPackRecord_list();
            this._viewUI._redPackRecord_Box.visible = true;
            this._viewUI.hideBg_img.mouseThrough = false;
            this._viewUI._redPackRecord_Box.on(LEvent.CLICK, this, this.box_hide, [this._viewUI._redPackRecord_Box]);
        }
        private box_hide(box: Laya.Box): void {
            console.log("******************************红包历史界面查看红包领取记录界面关闭************************************");
            box.visible = false;
        }
        /**
         * @describe 对红包领取记录里的列表进行初始化
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
        private _init_UI(): void {
            this._init_btnUI();
        }
        private _init_btnUI(): void {
            this.curr_redPackRecordState = RedPackRecordState.RECEIVED_RED_PACK;
            this._btn_is_selected(this.curr_redPackRecordState);
            this._viewUI.receive_btn.on(LEvent.CLICK, this, this._btn_is_selected, [RedPackRecordState.RECEIVED_RED_PACK]);//为收到按钮添加事件监听  
            this._viewUI.send_btn.on(LEvent.CLICK, this, this._btn_is_selected, [RedPackRecordState.SEND_RED_PACK]);//为发送按钮添加事件监听  
        }
        private _btn_is_selected(btn: number): void {
            var redpackid: number = 0;
            this.record_info_data = [];
            switch (btn) {
                case RedPackRecordState.RECEIVED_RED_PACK:
                    this._viewUI.receive_btn.selected = true;
                    this._viewUI.send_btn.selected = false;
                    RequesterProtocols._instance.c2s_CSendRedPackRoleRecordView(btn, redpackid.toString());
                    this._init_record_UI(btn);
                    break;
                case RedPackRecordState.SEND_RED_PACK:
                    this._viewUI.receive_btn.selected = false;
                    this._viewUI.send_btn.selected = true;
                    RequesterProtocols._instance.c2s_CSendRedPackRoleRecordView(btn, redpackid.toString());
                    this._init_record_UI(btn);
                    break;
            }
        }

        public refreshData(modeltype: number, data: any): void {
            this.record_info_data = data;
            this.role_redPack_record_data = models.RedPacketModel._instance.redPack_roleRecordViewVo;
            console.log("--------------------------数据成功拿到！---------------------------");
            // var _rolename:string; 
            // var _roleNameIndexArray:Array<number> = [];//存放不是当前玩家名字在record_info_data红包历史列表数据中的索引，注意，不能用玩家id来遍历，其服务器下发的id是所抢红包的发送者id      
            // for(let index = 0; index < this.record_info_data.length; index ++){
            //     _rolename= this.record_info_data[index]["rolename"];
            //     if(_rolename != this._loginModel.roleDetail.rolename){
            //        _roleNameIndexArray.push(index);
            //     }
            // }
            // //对不是属于当前玩家的的数据进行移除
            // for(let i = 0; i< _roleNameIndexArray.length; i++){
            //     this.record_info_data.splice(_roleNameIndexArray[i]);
            // }
            this._init_record_UI(modeltype);
        }

        public hide(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
            // if(LoginModel.getInstance().CommonPage != ""){
            // 	ModuleManager.show(LoginModel.getInstance().CommonPage,this.app);
            // 	LoginModel.getInstance().CommonPage == "";
            // }            
            models.RedPacketProxy.getInstance().off(models.LOOK_RECORD_EVENT, this, this._refresh_getRecord_infoData);
            models.RedPacketProxy.getInstance().off(models.ROLE_REDPACK_RECORD_EVENT, this, this.refreshData);
            ModuleManager.show(ModuleNames.RED_PACKET, this._app);
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }


        private _init_record_UI(modeltype: number): void {
            console.log("--------------------------开始初始化红包历史记录界面---------------------------");
            this.curr_redPackRecordState = modeltype;
            switch (modeltype) {
                case RedPackRecordState.RECEIVED_RED_PACK:
                    this._viewUI.redPackType_label.text = "收到红包数：";
                    this._viewUI.redPackNum_text.text = '0';
                    this._viewUI.jinb_image.visible = true;
                    this._viewUI.yuanbao_image.visible = false;
                    this._viewUI.moneyType_text.text = "总金额：";
                    this._viewUI.zongMoneyNum_text.text = '0';
                    break;
                case RedPackRecordState.SEND_RED_PACK:
                    this._viewUI.redPackType_label.text = "发送红包数：";
                    this._viewUI.redPackNum_text.text = '0';
                    this._viewUI.jinb_image.visible = false;
                    this._viewUI.yuanbao_image.visible = true;
                    this._viewUI.moneyType_text.text = "总元宝：";
                    this._viewUI.zongMoneyNum_text.text = '0';
                    break;
            }
            if (!this.record_info_data || this.record_info_data.length == 0) {
                this._viewUI.record_box.visible = false;
                return;
            }
            var firstpageflag: number = this.role_redPack_record_data["firstpageflag"];
            var redpackallnum: number = this.role_redPack_record_data["redpackallnum"];
            var redpackallmoney: number = this.role_redPack_record_data["redpackallmoney"];
            var redpackallfushi: number = this.role_redPack_record_data["redpackallfushi"];
            this._viewUI.redPackNum_text.text = this.record_info_data.length.toString();
            switch (modeltype) {
                case RedPackRecordState.RECEIVED_RED_PACK:
                    this._viewUI.zongMoneyNum_text.text = redpackallmoney.toString();
                    break;
                case RedPackRecordState.SEND_RED_PACK:
                    this._viewUI.zongMoneyNum_text.text = redpackallfushi.toString();
                    break;
            }
            this._init_record_list();
        }
        /**
         * 初始化红包历史记录列表
         */
        private _init_record_list(): void {
            this._viewUI.record_box.visible = true;
            this.roleIcon = _LoginModel.getInstance().cnpcShapeInfo;
            var record_list: Laya.List = this._viewUI.record_box.getChildByName("record_list") as Laya.List;
            record_list.array = this.record_info_data;
            record_list.repeatX = 1;
            record_list.repeatY = this.record_info_data.length;
            record_list.vScrollBarSkin = '';
            record_list.scrollBar.elasticBackTime = 200;
            record_list.scrollBar.elasticDistance = 100;
            record_list.renderHandler = new Handler(this, this._show_record_list);
        }
        /** 
         * 显示红包历史列表内容
         */
        private _show_record_list(cell: Box, index: number): void {
            if (index < 0 || index > this.record_info_data.length) {
                return;
            }
            var moneyNum_text: Laya.Text = cell.getChildByName("moneyNum_image").getChildByName("moneyNum_text") as Laya.Text;
            var roleName_or_time_text: Laya.Text = cell.getChildByName("roleName_or_time_text") as Laya.Text;
            var fa_image: Laya.Image = cell.getChildByName("fa_image") as Laya.Image;
            var shou_image: Laya.Image = cell.getChildByName("shou_image") as Laya.Image;
            var role_image: Laya.Image = cell.getChildByName("role_image") as Laya.Image;
            var shape: number = this.record_info_data[index]["shape"];
            let littleShapeId = this.roleIcon[shape];
            role_image.skin = "common/icon/avatarrole/" + littleShapeId.littleheadID + ".png";
            var modeltype: number = this.record_info_data[index]["modeltype"];
            var redpackid: string = this.record_info_data[index]["redpackid"];
            var rolename: string = this.record_info_data[index]["rolename"];
            var redpackmoney: number = this.record_info_data[index]["redpackmoney"];
            var time: number = this.record_info_data[index]["time"];
            var date = new Date(time);
            var Y: string = '' + date.getFullYear() + '-';
            var M: string = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D: string = date.getDate() + '';
            switch (this.curr_redPackRecordState) {
                case RedPackRecordState.RECEIVED_RED_PACK:
                    shou_image.visible = true;
                    fa_image.visible = false;
                    roleName_or_time_text.text = rolename;
                    break;
                case RedPackRecordState.SEND_RED_PACK:
                    shou_image.visible = false;
                    fa_image.visible = true;
                    roleName_or_time_text.text = Y + M + D;
                    break;
            }
            moneyNum_text.text = redpackmoney.toString();
            cell.on(LEvent.CLICK, this, this.look_record, [modeltype, redpackid]);
        }
        private look_record(modeltype: number, redpackid: string): void {
            RequesterProtocols._instance.c2s_CSendRedPackHisView(modeltype, redpackid);
        }
    }
}