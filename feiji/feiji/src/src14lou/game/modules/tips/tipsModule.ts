/**
* tipsSystem
*/
module game.modules.tips {
    export class tipsModule extends game.modules.UiMediator {
        private _viewUI: ui.common.component.ItemTipsSystemUI;
        /**显示物品详情tips */
        private _ItemDetailsTipsMediator: game.modules.tips.ItemDetailsTipsMediator;
        /**活动界面tips */
        private _ActivityTipsMediator: game.modules.tips.ActivityTipsMediator;
        /**客户端说明类型提示信息 */
        private _ClientMessageMediator: game.modules.tips.ClientMessageMediator;
        /**伙伴技能显示 */
        private _SkillDescribeMediator: game.modules.tips.SkillDescribeMediator;
        /**弹出类型的tips */
        private _TipsMessageMediator: game.modules.tips.TipsMessageMediator;
        /**装备表 */
        equipEffectData = game.modules.strengThening.models.StrengTheningModel._instance.equipEffectData;
        /** 是否使用按钮 */
        private inshow = false;
        /** 1 存入 2取出 */
        private Access: number = 0;
        /** 
         * @describe tips界面调取
         * @param tipsType 类型 
         * @param parame 调用参数 
         * @param inshow 显示或者隐藏使用功能 true：隐藏 false：不隐藏
         * @param isAccess true 存入 false 取出 背包和仓库存储功能
         */
        constructor(uiLayer: Sprite, app: AppBase, tipsType: number, parame: Dictionary, inshow?: boolean, isAccess?: boolean) {
            super(uiLayer);
            this._viewUI = new ui.common.component.ItemTipsSystemUI();
            this.isCenter = false;
            this._app = app;
            this.show();
            if (inshow) this.inshow = true;
            if (typeof (isAccess) != "undefined" && isAccess) this.Access = 1;
            else if (typeof (isAccess) != "undefined" && !isAccess) this.Access = 2;
            this.tipsType(tipsType, parame);
            models.TipsProxy.getInstance().on(models.CLOSE_TIPS, this, this.hide);
            models.TipsProxy.getInstance().on(models.TIPS_ON_CANCEL, this, this.hide);
            models.TipsProxy.getInstance().on(models.TIPS_ON_OK, this, this.hide);
        }
        /**
         * 
         * @param tipsType 类型
         * @param parame 参数：title:tips标题  parame:参数   itemId: 物品id   key：装备在背包中的key
         */
        public tipsType(tipsType: number, parame: Dictionary) {
            if (tipsType == TIPS_TYPE.BAG) { //背包
                this.showBagTips(parame);
            } else if (tipsType == TIPS_TYPE.QIANGHUA) { //强化
                this.showItemTips(ITEM_TYPE.QIANGHUA_ITEM, parame);
            } else if (tipsType == TIPS_TYPE.SKILL) { //技能
                this.showItemTips(ITEM_TYPE.SKILL_ITEM, parame);
            } else if (tipsType == TIPS_TYPE.commonItem) {  //通用的物品tips
                this.showItemTips(ITEM_TYPE.REWARD_ITEM, parame)
            } else if (tipsType == TIPS_TYPE.ACTIVITY) { //活动
                this.showActivity(parame);
            } else if (tipsType == TIPS_TYPE.CLIENTMESSAGE) {
                this.showClientMessage(parame);
            } else if (tipsType == TIPS_TYPE.HUOBANSKILL) { //伙伴技能
                this.showHuobanSkill(parame);
            } else if (tipsType == TIPS_TYPE.CLIENT_TIPS_MESSAGE) { //提示
                this.showTipsMessage(parame);
            } else if (tipsType == TIPS_TYPE.PETEQUIP) { //宠物装备
                this.showpetequipstips(parame)
            } else if (tipsType == TIPS_TYPE.AUCTION) { //拍卖行tips
                this.showAuctionTips(parame);
            }

        }

        /**宠物装备 */
        public showpetequipstips(parame): void {
            var itemId = parame.get("itemId");
            var key = parame.get("key");
            var packid = parame.get("packid");
            var equipdType = parame.get("equiptype");
            let petbag: Laya.Dictionary = game.modules.bag.models.BagModel.getInstance().bagMap[9]
            let _EquipTipsMediator = new game.modules.tips.EquipTipsMediator(this._viewUI, this._app);
            _EquipTipsMediator.show();
            _EquipTipsMediator.showpetequip(itemId, key, packid, equipdType, parame);

        }

        /** 显示装备相关的tips */
        public showBagTips(parame) {
            var itemId = parame.get("itemId");
            var equipdType = parame.get("equiptype");
            var isWearEqu = parame.get("isWearEqu");
            if (120000 <= itemId && itemId <= 130099) { /** 物品为装备 */
                var WearId = this.isWearCurrentEqu(itemId);
                if (isWearEqu != undefined) {
                    if (isWearEqu == 1) {  // 显示身上装备的装备tips 1:人物
                        this.showEquipTips(parame, WearId);
                    }
                } else {
                    if (WearId > 0) {
                        let whichView = tips.models.TipsModel.getInstance().whichView;
                        let itemType = BagModel.getInstance().getItemTotalType(itemId);//道具的大类型
                        if ((whichView == ModuleNames.PET && itemType == ItemTotalType.PetEquipItem) || (whichView == ModuleNames.BAG && itemType == ItemTotalType.EquipItem)) {
                            this.showEquipCompareTips(WearId, parame);
                        } else this.showEquipTips(parame, -1);
                    } else {
                        this.showEquipTips(parame, -1);
                    }
                }
            } else { /** 普通物品 */
                this.showItemTips(ITEM_TYPE.BAG_ITEM, parame);
            }
        }

        /**拍卖行tips方法 */
        public showAuctionTips(parame): void {
            var itemId = parame.get("itemId");
            var equipdType = parame.get("equiptype");
            if (120000 <= itemId && itemId <= 130099) { /** 物品为装备 */
                let _EquipTipsMediator = new game.modules.tips.EquipTipsMediator(this._viewUI, this._app);
                if (this.inshow) _EquipTipsMediator.show(parame, this.inshow);
                _EquipTipsMediator.showAuctionItemTips(parame);
            } else {
                this.showItemTips(ITEM_TYPE.BAG_ITEM, parame);
            }
        }


        /**
         * 客户端提示信息
         * @param contentId 
         */
        public showClientMessage(parame: Dictionary) {
            this._ClientMessageMediator = new game.modules.tips.ClientMessageMediator(this._viewUI);
            this._ClientMessageMediator.showContent(parame);
        }

        /**
         * 是否装备了当前类型的装备(部件id)
         * @param itemId  当前点击的装备id
         */
        public isWearCurrentEqu(itemId: number) {
            var eequiptype = this.equipEffectData[itemId].eequiptype;   //选中装备的部件id
            let bagType;
            let _itemType = BagModel.getInstance().getItemTotalType(itemId);
            if (_itemType == ItemTotalType.PetEquipItem && tips.models.TipsModel.getInstance().whichView != ModuleNames.PET) {
                return -1;
            }
            if (_itemType == ItemTotalType.PetEquipItem) {//是宠物装备
                bagType = BagTypes.PETEQUIP;
            }
            else {//是人物角色身上的装备
                bagType = BagTypes.EQUIP;
            }
            var bag3 = bagModel.getInstance().bagMap[bagType];  //获取背包3
            var items;
            if (bagType == BagTypes.PETEQUIP) {                
                if(bag3.keys.length != 0){//若有宠物装备背包的数据
                    let petKey = PetModel.getInstance().petbasedata.key;
                    items = bag3.get(petKey).items;
                }
            }
            else {
                items = bag3.items;
            }
            for (var i = 0; i < items.length; i++) {
                var id = items[i].id;
                if (eequiptype == this.equipEffectData[id].eequiptype) {
                    return id;
                }
            }
            return -1;
        }

        /**
         * 显示物品详情tips界面
         * @param itemId 物品id
         */
        public showItemTips(itemType: number, parame: Dictionary) {
            var itemId = parame.get("itemId");
            /** 类型用途 */
            var purposetype = parame.get("purposetype");
            this._ItemDetailsTipsMediator = new game.modules.tips.ItemDetailsTipsMediator(this._viewUI, this._app);
            if (this.inshow && this.Access != 0) this._ItemDetailsTipsMediator.show(parame, this.inshow, this.Access);
            else if (this.inshow) this._ItemDetailsTipsMediator.show(parame, this.inshow);
            /** 临时背包转移 */
            else if (purposetype != null && purposetype == ItemPurpose.ITEM_TRANSFER) this._ItemDetailsTipsMediator.show(parame);
            else this._ItemDetailsTipsMediator.show();
            if (itemType == ITEM_TYPE.BAG_ITEM) {  //背包
                this._ItemDetailsTipsMediator.showItemTips(parame);
            } else if (itemType == ITEM_TYPE.QIANGHUA_ITEM) { //强化
                this._ItemDetailsTipsMediator.showQianghuaTips(itemId);
            } else if (itemType == ITEM_TYPE.SKILL_ITEM) {  //技能
                this._ItemDetailsTipsMediator.showSkillTips(itemId);
            } else if (itemType == ITEM_TYPE.REWARD_ITEM) {  //奖励
                this._ItemDetailsTipsMediator.showCommonItemTips(itemId, parame);
            }

        }
        /**
         * 显示装备比较界面
         * @param equipId 背包中装备id 
         * @param WearId  装备在身上的装备id
         */
        public showEquipCompareTips(WearId, parame) {
            /** 类型用途 */
            var purposetype = parame.get("purposetype");
            let _EquipCompareTipsMediator = new game.modules.tips.EquipCompareTipsMediator(this._viewUI, this._app);
            if (this.inshow && this.Access != 0) _EquipCompareTipsMediator.show(parame, this.inshow, this.Access);
            else if (this.inshow) _EquipCompareTipsMediator.show(parame, this.inshow);
            /** 临时背包转移 */
            else if (purposetype != null && purposetype == ItemPurpose.ITEM_TRANSFER) _EquipCompareTipsMediator.show(parame);
            else _EquipCompareTipsMediator.show();
            _EquipCompareTipsMediator.showBagEquipTips(WearId, this._app, parame);
        }

        /**活动 */
        public showActivity(param) {
            var activityId = param.get("itemId");
            this._ActivityTipsMediator = new game.modules.tips.ActivityTipsMediator(this._viewUI);
            this._ActivityTipsMediator.show();
            this._ActivityTipsMediator.showActivity(activityId);
        }

        public showEquipTips(parame, WearId) {
            /** 类型用途 */
            var purposetype = parame.get("purposetype");
            let _EquipTipsMediator = new game.modules.tips.EquipTipsMediator(this._viewUI, this._app);
            if (this.inshow && this.Access != 0) _EquipTipsMediator.show(parame, this.inshow, this.Access);
            else if (this.inshow) _EquipTipsMediator.show(parame, this.inshow);
            /** 临时背包转移 */
            else if (purposetype != null && purposetype == ItemPurpose.ITEM_TRANSFER) _EquipTipsMediator.show(parame);
            else _EquipTipsMediator.show();
            _EquipTipsMediator.showItemTips(parame, WearId);
        }

        /**
         * 伙伴技能
         * @param skillId 
         */
        public showHuobanSkill(param) {
            var skillId = param.get("itemId");
            this._SkillDescribeMediator = new game.modules.tips.SkillDescribeMediator(this._viewUI);
            this._SkillDescribeMediator.show();
            this._SkillDescribeMediator.showSkillDescribe(skillId);
        }

        /**
         * 弹出窗类型的tips
         * @param param 
         */
        public showTipsMessage(param) {
            this._TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
            this._TipsMessageMediator.show();
            this._TipsMessageMediator.showContent(param);
            /** 倒计时 */
            this._TipsMessageMediator.counTime(30);
        }

        public onThisView() {
            if (this._viewUI.visible) {
                this.hide();
            }
        }


        protected onShow(event: Object): void {
            this.show();
            this._app.uiRoot.closeLoadProgress();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}