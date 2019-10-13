
module game.modules.family {
    /** 帮派符文捐赠 */
    export class FamilyFuWenJZMediator extends game.modules.ModuleMediator {
        private _viewUI: ui.common.component.FuWenJuanZengUI;
        /** 存放能被捐赠的符文附魔卷轴所在背包中的key值 */
        public itemKeys: Array<number> = [];
        /** 哪个符文附魔卷轴要被捐赠的索引 */
        private itemKeysIndex: number = 0;
        public roleid: number;
        public itemid: number;
        private _tipsModule: game.modules.tips.tipsModule;
        /** 动画特效 */
        private ani: Laya.Animation;
        constructor(app: AppBase) {
            super();
            this.uiLayer = app.uiRoot.general;
            this._viewUI = new ui.common.component.FuWenJuanZengUI();
            this._clientWidth = app.clientWidth;
            this._clientHeight = app.clientHeight;
            this._app = app;
            this._viewUI.closeBtn_btn.on(LEvent.CLICK, this, this.hide);
            this._viewUI.huoLi_checkBox.on(LEvent.CLICK, this, this.checkSelect, [0]);
            this._viewUI.fuwen_checkBox.on(LEvent.CLICK, this, this.checkSelect, [1]);
            this._viewUI.fuwen_list.renderHandler = new Handler(this, this.fuwenSelect);
            this._viewUI.juanZeng_btn.on(LEvent.CLICK, this, this.juanZeng);
            this.ani = new Laya.Animation();
        }
        /** 初始化界面
         * @param  roleid    捐赠人角色id
         * @param  itemId    捐赠的物品id
         */
        public init(roleid: number, itemid: number) {
            if (this.ani) {
                this.ani.clear()
            }
            this.roleid = roleid;
            this.itemid = itemid;
            this.show();
            this._viewUI.huoLi_checkBox.visible = true;
            this._viewUI.huoLi_checkBox.selected = true;
            this._viewUI.fuwen_checkBox.visible = true;
            this._viewUI.fuwen_checkBox.selected = false;
            var itemArr = game.modules.bag.models.BagModel.getInstance().getBagGameItemData(BagTypes.BAG).items;
            var data: Array<any> = [];
            if (itemArr.length > 0) {
                var skinArr: Array<any> = ["common/ui/tongyong/baikuang.png", "common/ui/tongyong/lvkuang.png",
                    "common/ui/tongyong/lankuang.png", "common/ui/tongyong/zikuang.png",
                    "common/ui/tongyong/jinkuang.png"];
                var _itemAttrBinDic = BagModel.getInstance().itemAttrData;
                for (var i: number = 0; i < itemArr.length; i++) {
                    var id = itemArr[i].id;
                    if (itemArr[i].id == itemid && !game.modules.bag.models.BagModel.getInstance().itemIsBind(itemArr[i].flags)) {
                        this.itemKeys.push(itemArr[i].key);
                        data.push({
                            diban_img: { skin: skinArr[_itemAttrBinDic[itemid].nquality - 1] },
                            icon_img: { skin: game.modules.shop.models.ShopModel.getInstance().getSrc(_itemAttrBinDic[itemid].icon) },
                        });
                    }
                }
            }
            this._viewUI.fuwen_list.array = data;
        }
        public fuwenSelect(cell: Laya.Box, index: number) {
            var img = cell.getChildByName("icon_img") as Laya.Image;
            img.on(LEvent.MOUSE_DOWN, this, this.getTips, [index]);
        }
        /** 物品信息弹窗 */
        public getTips(index: number) {
            var parame: Dictionary = new Dictionary();
            parame.set("itemId", this.itemid);
            parame.set("packid", BagTypes.BAG);
            parame.set("key", this.itemKeys[index]);
            this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.BAG, parame, true);
            //添加选中的动画效果
            this.PlayEffect(this._viewUI.fuwen_list, index);
            this.itemKeysIndex = index;
        }

        /** 播放特效 */
        private PlayEffect(list: Laya.List, index: number): void {
            let cell = list.getCell(index);
            let diban_img: Laya.Image = cell.getChildByName("diban_img") as Laya.Image;
            this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
            diban_img.addChild(this.ani);
            this.ani.scaleX = 0.9;
            this.ani.scaleY = 0.9;
        }

        /** 创建动画 */
        public onCreateFrame() {
            let effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
            Laya.Animation.createFrames(effecthPath, "xuanzhong");
            this.ani.play(0, true, "xuanzhong");
            this.ani.interval = 112;
        }

        /** checkbox选中设置（只能二选一） */
        public checkSelect(index: number) {
            if (!this._viewUI.huoLi_checkBox.visible && index == 1) return;
            switch (index) {
                case 0:
                    if (this._viewUI.huoLi_checkBox.selected) {
                        this._viewUI.fuwen_checkBox.selected = false;
                    }
                    break;
                case 1:
                    if (this._viewUI.fuwen_checkBox.selected) {
                        this._viewUI.huoLi_checkBox.selected = false;
                    }
                    break;
            }
            if (this._viewUI.huoLi_checkBox.selected || this._viewUI.fuwen_checkBox.selected) {
                this._viewUI.juanZeng_btn.disabled = false;
            } else {
                this._viewUI.juanZeng_btn.disabled = true;
            }
        }
        /** 捐赠 */
        public juanZeng() {
            if (this._viewUI.huoLi_checkBox.selected) { //消耗活力捐赠
                // var energyNum = game.modules.createrole.models.LoginModel.getInstance().roleDetail.energy;
                var energyNum = game.modules.mainhud.models.HudModel._instance.energyNum;
                if (energyNum < 100) {
                    //活力不足时飘窗提示
                    let promot = HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_VITALITY);
                    game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
                } else {
                    RequesterProtocols._instance.c2s_CRuneGive(this.roleid, FuWenSeletType.HuoLi, this.itemid, 0, BagTypes.BAG);
                    this.hide();
                }
            } else if (this._viewUI.fuwen_checkBox.selected) {  //消耗符文捐赠 —— 只能选中一个进行赠送
                if (this.itemKeys.length <= 0) {
                    //道具不足时飘窗提示
                    var arr: Array<string> = [];
                    arr.push(BagModel.getInstance().itemAttrData[this.itemid].name);
                    let promot = HudModel.getInstance().promptAssembleBack(PromptExplain.LACK_OF_ITEM, arr);
                    game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, promot);
                } else {
                    RequesterProtocols._instance.c2s_CRuneGive(this.roleid, FuWenSeletType.FuWen, this.itemid, this.itemKeys[this.itemKeysIndex], BagTypes.BAG);
                    this.hide();
                }
            }
        }
        protected onShow(event: Object): void {
            this.show();
        }
        public hide(): void {
            super.hide();
            RequesterProtocols._instance.c2s_CRequestRuneInfo();
            if (this.ani) {
                this.ani.clear()
            }
        }
        public getView(): Sprite {
            return this._viewUI;
        }
    }
}