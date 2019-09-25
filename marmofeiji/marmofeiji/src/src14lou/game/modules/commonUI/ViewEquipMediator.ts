/**wanjiazhuangbei.ui */
// import ViewEquipUI = ui.common.component.wanjiazhuangbeiUI;


module game.modules.commonUI {
    interface ListItem {
        /**道具唯一ID */
        ID: number;
        /**造型ID */
        icon: number;
        /**道具数量 */
        number: number;
        /**位置 */
        position: number;
        /**颜色品质*/
        nquality: number;
        /**是否解锁 */
        isLock?: boolean;
        /** 服务器中的kry */
        key: number
        /** 装备类型表，不为装备为-1 */
        equipType: number;
    }
    export class ViewEquipMediator extends game.modules.UiMediator {
        private _tipsModule: game.modules.tips.tipsModule;
        /**队伍按钮Tips */
        private _viewUI: ui.common.component.wanjiazhuangbeiUI;
        private _PetXiangQingMediator: modules.pet.PetXiangQingMediator;
        /** 装备的数据 */
        private _equipGameItemListData: any;
        /**装备背包中道具个数 */
        private _equipGameItemListLength: number = 5;
        public key = false;
        public model: ModelsCreate;
        private scene2DPanel: TestRole2dPanel
        constructor(app:AppBase) {
            super(app.uiRoot.general);
            this._viewUI = new ui.common.component.wanjiazhuangbeiUI();
            this._PetXiangQingMediator = new modules.pet.PetXiangQingMediator(app);
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            this.model = new ModelsCreate()
			this.scene2DPanel = new TestRole2dPanel()
            this._viewUI.pos_box.addChild(this.scene2DPanel)
            this.eventListener();
        }
        /**注册事件监听 */
        public eventListener(): void {
            game.modules.sale.models.SaleProxy._instance.on(game.modules.sale.models.SMarketPetTips, this, this.showPetDetails);
        }
        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param null
         * 
         */
        public onShow(): void {
            mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
            super.show();
            this.registerEvent();
            this.controlEquipGameItemList();
            this.onLoadRoleInfo();
            this.key = true;
        }

        public hide(): void {
            super.hide();
            this.key = false;
        }

        public getView(): Sprite {
            return this._viewUI;
        }

        /**显示宠物详情 */
        public showPetDetails(e: any): void {
            var data: hanlder.S2C_market_pettips = modules.sale.models.SaleModel.getInstance().SMarketPetTipsData.get("data");
            if (data.tipstype == 5 && this.key == true)
                this._PetXiangQingMediator.init(data.PetInfoVo);
        }

        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            /** 发送信息 */
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.closeEvent);
            this._viewUI.viewPet_btn.on(LEvent.MOUSE_DOWN, this, this.showPet);

        }
        /**查看宠物 */
        public showPet(): void {
            let eQuipData = team.models.TeamModel.getInstance().roleEquipData;
            RequesterProtocols._instance.c2s_CGetRolePet_Info(eQuipData.roleid);
        }
        /** 玩家的门派等级其他信息 */
        private onLoadRoleInfo(): void {
            let eQuipData = team.models.TeamModel.getInstance().roleEquipData;
            if (typeof (eQuipData) == "undefined" || eQuipData == null) return;
            this._viewUI.roleName_txt.text = eQuipData.rolename;
            this._viewUI.score_lab.text = eQuipData.rolelevel.toString();
            this._viewUI.pinfen.text = eQuipData.totalscore.toString();
            let school = eQuipData.profession;
            let schoolImgUrl = game.modules.team.models.TeamModel.getInstance().getSchoolImgBack(school);
            this._viewUI.school_img.skin = schoolImgUrl;      
            let roles: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[eQuipData.shape]           
            this.modelcreate(parseInt(roles.shape))
        }
        //创建模型
		modelcreate(modelid: number): void {//模型创建 模型ID	
             /** 读的是创角配置表的模型 由于创角配置表被改过，原Id是将首个2换成1 比如2010101 原1010101 */
            modelid = parseInt((modelid.toString()).replace("2","1"));	
            this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY
            if (this.model.role3d) {//移除模型
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
            this.model.role3d = new YxChar3d();
            this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
            this.model.role3d.set2dPos((this._viewUI.pos_box.x+this._viewUI.pos_box.width/2+this._viewUI.bk_box.x)*this._viewUI.globalScaleX,(this._viewUI.pos_box.y+this._viewUI.pos_box.height/4*3.5+this._viewUI.bk_box.y)*this._viewUI.globalScaleY);  //坐标
            this.model.role3d.scale = 1;
            this.model.role3d.rotationY = 180	
            this.scene2DPanel.addSceneChar(this.model.role3d)  
            BagModel.chargeToWeapon(this.model.role3d);		      		
		}
        private controlEquipGameItemList(): void {
            this.getEquipData();
            this._viewUI.equip_list.spaceX = 237;
            this._viewUI.equip_list.spaceY = 26;
            this._viewUI.equip_list.selectEnable = true;
            this._viewUI.equip_list.renderHandler = new Handler(this, this.onRenderListItemOfEquipGameItem);
            this._viewUI.equip_list.selectHandler = new Handler(this, this.ListItemOfEquipGameItemSelect);
        }

        /** 获取装备的数据 */
        private getEquipData(): void {
            let eQuipData = team.models.TeamModel.getInstance().roleEquipData;
            if (typeof (eQuipData) == "undefined") return;
            let bag: game.modules.bag.models.BagVo = eQuipData.equipinfo;
            if (!bag) return;
            // 置空
            this._equipGameItemListData = [];
            let arr: Array<ListItem> = [];
            let posArray: Array<number> = [];
            let listItem: ListItem;
            //插入Item到arr数组
            for (let index = 0; index < bag.items.length; index++) {
                let id = bag.items[index].id;
                let obj = game.modules.bag.models.BagModel.getInstance().getItemAttrData(id);
                let equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                let icon = obj.icon;
                let nquality = obj.nquality;
                let number = bag.items[index].number;
                let pos = bag.items[index].position;
                let key = bag.items[index].key;
                listItem = {
                    ID: id,
                    icon: icon,
                    number: number,
                    position: pos,
                    nquality: nquality,
                    isLock: false,
                    key: key,
                    equipType: equipType,
                };
                arr.push(listItem);
                // 1，4，5，7，12
                // 0, 1, 2, 3, 4
                posArray.push(equipType);
            }

            // let listItem: ListItem;
            for (let index = 0; index <= this._equipGameItemListLength; index++) {

                let tempIndex = posArray.indexOf(index);
                // 找到
                if (tempIndex != -1) {
                    listItem = arr[tempIndex];
                } else {
                    listItem = {
                        ID: -1,
                        icon: -1,
                        number: -1,
                        position: -1,
                        nquality: -1,
                        isLock: false,
                        key: -1,
                        equipType: -1,
                    };
                }

                this._equipGameItemListData.push(listItem);
            }
            /** 重新进行排版,针对武器的位置 */
            let weapion = this._equipGameItemListData[0];//武器
            this._equipGameItemListData.splice(0, 1);
            this._equipGameItemListData.splice(2, 0, weapion);
            this._viewUI.equip_list.array = this._equipGameItemListData;
        }
        private onRenderListItemOfEquipGameItem(cell: Box, index: number): void {
            if (index > this._equipGameItemListLength) return;
            let itemData: ListItem = this._equipGameItemListData[index];
            let gameItemImg: Laya.Image = cell.getChildByName("ownGameItem_img") as Laya.Image;
            if (itemData.ID != -1) {
                let icon = itemData.icon;
                gameItemImg.skin = "common/icon/item/" + icon + ".png";
                // gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.opEquip,[OpEquip.TAKEOFF,itemData.key,itemData.position]);
            } else {
                gameItemImg.skin = "";
            }

        }

        public ListItemOfEquipGameItemSelect(index) {
            if (this._viewUI.equip_list.selectedIndex != -1) {
                var itemId = this._equipGameItemListData[index].ID;
                if (itemId != -1) {
                    var key = this._equipGameItemListData[index].key;
                    var equipType = this._equipGameItemListData[index].equipType;
                    var parame: Dictionary = new Dictionary();
                    parame.set("itemId", itemId);
                    parame.set("key", key);
                    parame.set("equiptype", equipType);
                    this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame);
                }
                this._viewUI.equip_list.selectedIndex = -1;
            }

        }



        private closeEvent(): void {
            this.hide();
            if (LoginModel.getInstance().CommonPage != "") {
                ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
                LoginModel.getInstance().CommonPage = "";
            }
            mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
        }













        ////////////////
        ///事件
        ////////////////

        /**
         * @describe  银币补助界面，点击使用金币代替按钮事件
         */
        private onClickUseGoldBtnEvent(): void {
            this.event(commonUI.USE_GOLD_EXCHANGE_EVENT);

        }

        /**
         * @describe  银币补足界面，点击使用符石兑换按钮事件
         */
        private onClickUseYuanBaoOfSilverBtnEvent(): void {
            this.event(commonUI.USE_SILVER_EXCHANGE_EVENT);
            this.hide();
        }

        /**
         * @describe  金币补助界面，点击使用符石兑换按钮事件
         */
        private onClickUseYuanBaoOfGoldBtnEvent(): void {
            this.event(commonUI.USE_YUANBAO_EXCHANGE_EVENT);
            this.hide();
        }
    }
}