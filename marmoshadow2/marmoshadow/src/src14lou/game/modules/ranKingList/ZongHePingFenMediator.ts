
module game.modules.ranKingList {
    /** 综合评分界面 */
    export class ZongHePingFenMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.ZongHePingFenUI;
        private _zonghe_pingfen_data: Laya.Dictionary = new Dictionary();
        private scoreArray: Array<number> = [];
        private scoreArray_1: Array<number> = [];
        private scoreArray_2: Array<number> = [];
        private scoreArray_3: Array<number> = [];
        public model: ModelsCreate;
        private scene2DPanel: TestRole2dPanel;
        /** 查看角色信息界面 */
        private _contactCharacterMediator: modules.friend.ContactCharacterMediator;
        /** 好友字典 */
        private _friendIdDIc: Laya.Dictionary;
        /** 装综合评分数据用 */
        private _zongHePingFenData: Array<any>;
        /** 当前可出战的宠物，而且评分排前四位的数量 */
        private _canUsePetsNum: Array<number>;
        /** 说明型提示信息tips界面 */
        private _tipsModule: tips.tipsModule;
        /** 人物模型 */
        public roleModel: ModelsCreate;
        /** 父节点UI */
        private fatherUI:any;

        constructor(app: AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.ZongHePingFenUI();
            // this._viewUI.mouseThrough = true;
            //this.isCenter = false;
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this.scene2DPanel = new TestRole2dPanel();
            this._viewUI.modelBg_img.addChild(this.scene2DPanel);
            this.scene2DPanel.ape.x = 0;
			this.scene2DPanel.ape.y = 0;
            this.model = new ModelsCreate();
            
            this.roleModel = new ModelsCreate();
        }
        /**
         * 在综合评分界面进行玩家信息查看
         * @param rank_num 排名
         * @param Vo 综合评分界面需要用到信息数据
         * @param school 职业
         * @param fatherUI 父节点UI
         */
        public info_see(rank_num: number, Vo: Dictionary, school:number, fatherUI): void {
            this.fatherUI = fatherUI;
            this._zongHePingFenData = [];
            this._zongHePingFenData = Vo.get(rank_num);
            this._viewUI.school_img.skin = RoleInfoModel.getInstance().setZhiyeImg(school);
            this._viewUI.name_lab.text = this._zongHePingFenData["rolename"];
            this._viewUI.levelNumber_lab.text = '等级' + this._zongHePingFenData["level"];
            var _roledata = LoginModel.getInstance().createRoleConfigBinDic;//角色创建配置表
            this.roleModelCreate(_roledata[this._zongHePingFenData["shape"]]["model"]);
            this.updateScoreUI(this._zongHePingFenData["rolescore"], 1);
            this.updateScoreUI(this._zongHePingFenData["manypetscore"], 2);
            this.updateScoreUI(this._zongHePingFenData["totalscore"], 3);
            //判断要显示的综合战力界面是否为玩家自己
            if (this._zongHePingFenData["roleid"] != createrole.models.LoginModel.getInstance().roleDetail.roleid) {
                this._viewUI.chaKanRenWu_btn.visible = true;
            }
            else {
                this._viewUI.chaKanRenWu_btn.visible = false;
            }
            this.show();
        }
        /**人物模型 */
        roleModelCreate(modelid: number): void {
            /** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
            modelid = parseInt((modelid+"").replace("2","1"));
            if (this.model.role3d) {
                this.scene2DPanel.removeSceneChar(this.model.role3d);
            }
            this.model.role3d = new YxChar3d();
            this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
            //this.model.role3d.set2dPos((this._viewUI.showModel_box.x + this._viewUI.roleModel_img.width / 3 + this._viewUI.roleModel_img.x) * this._viewUI.globalScaleX, (this._viewUI.showModel_box.y + this._viewUI.roleModel_img.height/2 + this._viewUI.roleModel_img.y / 2) * this._viewUI.globalScaleY);  //坐标
            this.model.role3d.set2dPos((this._viewUI.showModel_box.x + this._viewUI.roleModel_img.width* 26/51 + this._viewUI.roleModel_img.x) * this.fatherUI.globalScaleX, (this._viewUI.showModel_box.y+ this._viewUI.roleModel_img.height * 4 / 5 + this._viewUI.roleModel_img.y) * this.fatherUI.globalScaleY);  //坐标		
            this.model.role3d.scale = 1;
            this.model.role3d.rotationY = 180;
            this.scene2DPanel.addSceneChar(this.model.role3d);
            BagModel.chargeToWeapon(this.model.role3d);	
        }
        public show(): void {
            super.show();
            this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY
            this.getFriend();
            this.getPetInfo();
            this.registerEvent();
        }
        /**
         * 获取宠物信息
         */
        private getPetInfo(): void {
            var _values: Array<any> = pet.models.PetModel._instance.pets.values;
            //存放可出战的宠物
            var _beUsePets: Array<any> = [];
            for (let i = 0; i < _values.length; i++) {
                //人物等级大于该宠物的参战等级，即代表该宠物可出战
                if (this._zongHePingFenData["level"] > _values[i].useLevel) {
                    _beUsePets.push(_values[i]);
                }
            }
            // //比较可出战的宠物，按宠物评分的从高到低，从新排序
            // var tempNum:number = 0;
            // var i = _beUsePets.length;
            // while(i>0){
            //     for(let j= 0; j< i-1; j++){
            //         if( _beUsePets[j].petscore < _beUsePets[j+1].petscore ){
            //             tempNum = _beUsePets[j];
            //             _beUsePets[j] = _beUsePets[j+1];
            //             _beUsePets[j+1] = tempNum;
            //         }
            //     }
            //     i--;
            // }
            //进行判断可出战宠物的数量
            this._canUsePetsNum = [];
            if (_beUsePets.length > 5 || _beUsePets.length == 0) {
                this._canUsePetsNum.push(4);
            }
            else {
                this._canUsePetsNum.push(_beUsePets.length);
            }
        }
        /**
         * 获取好友
         */
        private getFriend(): void {
            var _friendIdArr = friend.models.FriendModel._instance.friendIdArr;
            this._friendIdDIc = new Laya.Dictionary();
            for (let i = _friendIdArr.length; i > 0; i--) {
                this._friendIdDIc.set(_friendIdArr[i], true);
            }
        }
        ///////////////
        ///事件
        ////////////////
        /**注册事件
         * @describe  UI的事件监听注册与消息监听注册
         */
        private registerEvent(): void {
            //UI事件            
            this._viewUI.close_btn.on(Laya.Event.CLICK, this, this.hide);
            this._viewUI.chaKanRenWu_btn.on(Laya.Event.CLICK, this, this.update_ChaKan_RenWu_Info);
            this._viewUI.tips_btn.on(LEvent.MOUSE_DOWN, this, this.showTips);
            this._viewUI.onHideBg_img.on(LEvent.CLICK, this, this.onHide);
        }
        /**
         * 关闭某些弹窗
         */
        private onHide(): void {
            //如果有，则关闭说明型提示弹窗
            if (this._tipsModule) {
                this._tipsModule.hide();
            }
        }
        /**
         * 显示tips说明型提示信息
         */
        private showTips(): void {
            var _parame = new Laya.Dictionary();
            _parame.set("title", 11396);
            _parame.set("contentId", 11395);
            _parame.set("parame", this._canUsePetsNum);
            this._tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENTMESSAGE, _parame, true);
        }
        /** 弹出查看人物信息的窗口 */
        private update_ChaKan_RenWu_Info(e: LEvent): void {
            //发请查看人物信息请求
            RequesterProtocols._instance.c2s_CRequestUpdateRoleInfo(this._zongHePingFenData["roleid"]);
            //发请组队请求
            RequesterProtocols._instance.c2s_CReqRoleTeamState(this._zongHePingFenData["roleid"]);
            var xPos = e.currentTarget.mouseX;
            var yPos = e.currentTarget.mouseY;
            var key: number = FriendEnum.STRANGE_KEY;
            this._contactCharacterMediator = new modules.friend.ContactCharacterMediator(this._viewUI, this._app);
            //判断当前查看的是不是自己好友
            if (this._friendIdDIc.get(this._zongHePingFenData["roleid"]) != undefined) {
                key = FriendEnum.FRIEND_KEY;
                this._contactCharacterMediator.onShow(xPos, yPos, key);
            }
            else {
                this._contactCharacterMediator.onShow(xPos, yPos, key);
            }
        }
        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /**
         * 更新评分UI
         * @param score  分数
         * @param list  list样式
         */
        private updateScoreUI(score: number, list: number): void {
            var temp: number = score;
            var i: number = 0;
            do {
                var num: number = Math.floor(temp % 10);
                temp = temp / 10;
                this.scoreArray[i] = num;
                i++;
            } while (temp >= 1)
            var numarray: Array<number> = [];
            for (let k = 0; k <= i - 1; k++) {
                numarray[k] = this.scoreArray[i - k - 1];
            }
            var curr_scoreUI_list: Laya.List;
            switch (list) {
                case 1:
                    curr_scoreUI_list = this._viewUI.renWuNumber_list;
                    this.scoreArray_1 = numarray;
                    break;
                case 2:
                    curr_scoreUI_list = this._viewUI.chongWuNumber_list;
                    this.scoreArray_2 = numarray;
                    break;
                case 3:
                    var i_3 = i;
                    curr_scoreUI_list = this._viewUI.zongHeNumber_list;
                    this.scoreArray_3 = numarray;
                    break;
                default:
                    break;
            }
            curr_scoreUI_list.repeatY = i;
            curr_scoreUI_list.repeatY = 1;
            curr_scoreUI_list.hScrollBarSkin = "";
            curr_scoreUI_list.array = this.scoreArray;
            switch (list) {
                case 1:
                    curr_scoreUI_list = this._viewUI.renWuNumber_list;
                    curr_scoreUI_list.renderHandler = new Laya.Handler(this, this.updateNum_1);
                    break;
                case 2:
                    curr_scoreUI_list = this._viewUI.chongWuNumber_list;
                    curr_scoreUI_list.renderHandler = new Laya.Handler(this, this.updateNum_2);
                    break;
                case 3:
                    curr_scoreUI_list = this._viewUI.zongHeNumber_list;
                    curr_scoreUI_list.renderHandler = new Laya.Handler(this, this.updateNum_3);
                    break;
                default:
                    break;
            }
        }
        private updateNum_1(cell: Box, _index: number): void {
            var clip: Laya.Clip = cell.getChildByName("clip") as Laya.Clip;
            clip.index = this.scoreArray_1[_index];
        }
        private updateNum_2(cell: Box, _index: number): void {
            var clip: Laya.Clip = cell.getChildByName("clip") as Laya.Clip;
            clip.index = this.scoreArray_2[_index];
        }
        private updateNum_3(cell: Box, _index: number): void {
            var clip: Laya.Clip = cell.getChildByName("clip") as Laya.Clip;
            clip.index = this.scoreArray_3[_index];
        }
    }
}