
    /** 出售比 */
    const SELLING_RATIO = 535/642;
    module game.modules.bag {
    interface ListItem  {
        /**道具唯一ID */
        ID: number;
        /**造型ID */
        icon: number;
        /**道具数量 */
        number: number;
        /**位置 */
        position: number;
          /**商品Id */
        shopId: number;
        /**价格 */
        price: number;
        /**颜色品质*/
        nquality: number;
         /** 服务器中的kry */
        key:  number;
        /** 装备类型表，不为装备为-1 */
        equipType: number;
        /** 战斗外使用对象 */
        outbattleuse: number;
    }
    
    export class BagSaleViewMediator extends game.modules.UiMediator {
        /**bag系统 出售界面UI */
        private _viewUI: ui.common.BagSaleUI;
        /**选中道具后，该道具的售价 */
        private _gameItemPrice: number;
        /** 选中道具后，该道具的ID */
        private _gameItemId:number;
        /** 选中道具后，该道具的商品ID */
        private _gameItemShopId:number;
        /**背包中道具位置*/
        private _bagGameItemListPos: Laya.Dictionary;
        /**选中道具后，该道具的数量，显示在道具右下角*/
        private _isCanSaleGameItemNumber: number;
        /**出售的道具数量 ,显示在saleGameItemNumber_lab*/
        private _saleGameItemNumber: number;
        /**通过出售道具可获得银币数量 */
        private _getSilverNumber: number;
        /**拥有的银币数量 */
        private _ownSliverNumber: number;
        /**是否选中需要出售的道具 */
        private _isSelectedGameItem: boolean = false;
        /**选中的道具的position属性 */
        private _selectedGameItemPosition: number;
        /**出售道具的List控件数据 */
        private _saleGameItemListData = [];
        /**出售道具的长度 */
        private _saleGameItemListLength: number;
        private GoodsData:Laya.Dictionary;
        /**小键盘map */
		private keyNumDic:Dictionary;
        /**小键盘界面 */
		private _XiaoJianPanMediator:tips.XiaoJianPanMediator;
         /**飘窗显示  */
        private disappearMessageTipsMediator:game.modules.commonUI.DisappearMessageTipsMediator;
        /** 动画特效 */
        private ani:Laya.Animation;
        constructor(uiLayer:Sprite,app:AppBase) 
        {
            super(uiLayer);
            this._viewUI = new ui.common.BagSaleUI;
            this._viewUI.mouseThrough = true; 
            this.isCenter = false;
            this.keyNumDic = new Dictionary();
            this.GoodsData = new Laya.Dictionary();
            this._app = app;
            for(let key in ShopModel.getInstance().GoodsBinDic)
            {
                this.GoodsData.set(key,ShopModel.getInstance().GoodsBinDic[key].limitSaleNum);
            }
            this._XiaoJianPanMediator = new tips.XiaoJianPanMediator(this._viewUI);
            this.ani = new Laya.Animation();
        }


        public show(): void {
            // 等待商城模块的完成
            // Protocols._instance.c2s_requst_shopprice()
            this.onLoad();
            super.show();
        }
        public getView(): Sprite {
            return this._viewUI;
        }

        //属性的设置和获取
        public getOwnSliverNumber(): number {
            return this._ownSliverNumber;
        }

        private onLoad(): void {
            this.zeroSaleNumberAndGetSilver();
            this.registerEvent();
            this.showMoney();
            //初始化小键盘map
			this.keyNumDic.set(1,"");
            //通过事件的形式，接受到价格的数据才调用该函数
            this.controlGameItemList();
            /** 播放选中特效 */
            if (this._saleGameItemListData.length != 0) {
                this._viewUI.gameItem_list.selectedIndex = 0;
                this.PlayEffect(this._viewUI.gameItem_list, 0);          //默认选中第一个物品
            }
        }
        /**
         * @describe  计算并显示获得的银币数量
         * @param num  出售数量
         */
        private calculateAndShowSilverNumber(num: number): void {
            let total = num * parseInt(this._gameItemPrice.toFixed(0));
            this.setSaleGameItemNumber(num);
            this.setSilverNumber(total);
        }
        // /**
        //  * @describe  出售后的该玩家拥有的银币数量
        //  */
        // private calculateAndShowOwnSilverNumber() {
        //     this._viewUI.gameItem_list.selectedIndex = -1;
        //     this._ownSliverNumber += this._getSilverNumber;
        //     this.setOwnSilverNumber(this._ownSliverNumber); 
        //     //置空
        // }
        /**
         * @describe  List控件的滚动回弹效果
         * @param list  list控件
         */
        private listScroll(list: Laya.List): void {
            list.vScrollBarSkin = "";
            list.scrollBar.elasticBackTime = 200;
            list.scrollBar.elasticDistance = 50;
            list.selectEnable = true;

            list.renderHandler = new Handler(this,this.onRenderListItem);            
            //list.selectHandler = new Handler(this,this.onSelectListItem);
            list.selectHandler = new Handler(this,this.onShowSelectEffect);
        }
        /** 播放选中特效 */
        private onShowSelectEffect(index:number):void{
            if(index != -1){
                this.PlayEffect(this._viewUI.gameItem_list, index);
            }
        }
        /**
         * @describe  获取出售的道具内容
         */
        private getSaleGameItemListData(): void {
            let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);            
            if(!bag) return;
            this._saleGameItemListData = [];
            this._saleGameItemListLength = bag.items.length;

            let listItem: ListItem;
            this._bagGameItemListPos =  new Laya.Dictionary();
            for (let index = 0; index < this._saleGameItemListLength; index++) {
                
                let id = bag.items[index].id;
                this._bagGameItemListPos.set(id, bag.items[index].key);
                let obj  = BagModel.getInstance().getItemAttrData(id);
                if (obj.bCanSaleToNpc != 0) {
                    let icon = obj.icon;
                    let shopId = obj.bCanSaleToNpc;
                    let nquality = obj.nquality;
                    let number = bag.items[index].number;
                    let key = bag.items[index].key;
                    let outbattleuse = obj.outbattleuse;
                    try {
                        var equipType = StrengTheningModel.getInstance().equipEffectData[id].eequiptype;
                    } catch (error) {
                        equipType = -1;
                    }
                    //匹配一下Id，读出对应的价格
                    let Goods:pet.models.GoodsVo = bagModel.getInstance().getGoods.get(shopId);
                    let price;
                    if(Goods == null )
                    {
                        let data: CGoodsBaseVo = ShopModel.getInstance().GoodsBinDic[shopId];
                        price = data.prices[0];
                    }else
                    price = Goods.price; 
                    if(typeof(price) != "undefined")
                    {
                        price = SELLING_RATIO * price;
                    }
                    let position = bag.items[index].position;
                    listItem = {
                        ID: id,
                        icon: icon,
                        number: number,
                        position: position,
                        shopId: shopId,
                        nquality: nquality,
                        price: price,
                        key:key,
                        outbattleuse:outbattleuse,
                        equipType:equipType,

                    }

                    this._saleGameItemListData.push(listItem);
                }
            }
            this._viewUI.gameItem_list.array = this._saleGameItemListData;
        }
        /**
         * @describe 渲染List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onRenderListItem(cell: Laya.Box,index: number): void {
            if (index > this._saleGameItemListLength) return;
            let itemData: ListItem = this._saleGameItemListData[index];
            let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
            let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
            if(itemData != null){
                let str: string = itemData.number > 1 ? itemData.number.toString(): "";
                gameItemNumberLabel.visible = true;
                gameItemBgImg.skin = BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                // gameItemImg.on(LEvent.MOUSE_DOWN,this,this.downSelect,[cell]);
                gameItemNumberLabel.changeText(str);
                gameItemImg.on(LEvent.CLICK,this,this.onSelectListItem,[index]);
            }else{
                  gameItemBgImg.skin = "";
                  gameItemImg.skin = "";
                  gameItemNumberLabel.visible = false;
            }
            
        }
        /** 选中物品 */
        private downSelect(cell:Box):void{
            this.listScroll(this._viewUI.gameItem_list);
            let flagImg : Laya.Image= cell.getChildByName("selectFlag_img") as Laya.Image;
                flagImg.visible = true;

        }



        /**
         * @describe  选择到List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onSelectListItem(index: number,e:LEvent): void {
            if (index == -1) return;
            this._isSelectedGameItem = true;
            // 点击道具，显示对应的价格
            let itemData: ListItem = this._saleGameItemListData[index];
            this._isCanSaleGameItemNumber = itemData.number;
            this._gameItemPrice = itemData.price;
            this._gameItemId   =  itemData.ID;
            this._gameItemShopId = itemData.shopId;
            this._selectedGameItemPosition = itemData.position;
            // 出售数量1
            this.calculateAndShowSilverNumber(1);
            let arr :Array<number> = [];
            arr.push(this._gameItemShopId); 
            let type = queryType.SHOP_SALE_TIMES;
            /** 请求商品限购数 */
            this._XiaoJianPanMediator.getgoodsLimit(type,arr);
           
             if(itemData.ID != -1){
                var parame:Dictionary = new Dictionary();
                parame.set("itemId",itemData.ID);
                parame.set("key",itemData.key);
                parame.set("packid",1);
                parame.set("outbattleuse",itemData.outbattleuse);//("packid",1)
                parame.set("shopid", itemData.shopId);
                parame.set("number", itemData.number);
                parame.set("equiptype", itemData.equipType);
                let ratiox = (index+1) % 5;
                ratiox = ratiox == 0 ? 5 : ratiox;
                let radioy = (index+1) / 5;
                if (index <= 4) {
                    radioy = 1;
                } else if (radioy == 0) {
                    radioy = ratiox;
                } else radioy += 1;
                parame.set("xpos",(e.currentTarget.mouseX + (ratiox * 30)));
                parame.set("ypos",(e.currentTarget.mouseY + ( radioy * 90) + 130));
                new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.BAG,parame,true);
            }
            this._viewUI.gameItem_list.selectedIndex = -1;
        }
         /** 播放特效 */
        private PlayEffect(list:Laya.List,index:number):void
        {
                let cell =  list.getCell(index);
                let selectItem :Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
                this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas",Laya.Handler.create(this,this.onCreateFrame));
                selectItem.addChild(this.ani);
                this.ani.scaleX = 0.9;
                this.ani.scaleY = 0.9;
        }
        /** 创建动画 */
        public onCreateFrame()
        {
            let effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong",9);
			Laya.Animation.createFrames(effecthPath,"xuanzhong");
			this.ani.play(0,true,"xuanzhong");
			this.ani.interval = 112;
		}
        /**
         * @describe  置空数量、获得的银币
         */
        private zeroSaleNumberAndGetSilver(): void {
            // this._isSelectedGameItem = false;
            this.setSaleGameItemNumber(0);
            this.setSilverNumber(0);

        }
        /**
         * @describe  拥有的银币初始值
         */
        private showMoney(): void {
            let money = models.BagModel.getInstance().sliverIcon;
            if (isNaN(money)) {
                money = 0;
            }
            this.setOwnSilverNumber(money);
        }

        /**
         * @describe  注册事件
         */
        private registerEvent(): void {
            this._viewUI.add_btn.on(LEvent.MOUSE_DOWN,this,this.clickAddBtnEvent);
            this._viewUI.less_btn.on(LEvent.MOUSE_DOWN,this,this.clickLessBtnEvent);
            this._viewUI.inputSaleNumber_btn.on(LEvent.MOUSE_DOWN,this,this.clickInputSaleNumberBtnEvent);
            this._viewUI.saleGameItem_btn.on(LEvent.MOUSE_DOWN,this,this.clickSaleGameItemBtnEvent);
            this._viewUI.inputSaleNumber_btn.on(LEvent.MOUSE_DOWN,this,this._opXiaoJianPan);
            models.BagProxy.getInstance().on(models.REFRESH_CURRENCY_EVENT,this,this.showMoney);
            models.BagProxy.getInstance().on(models.REFRESH_SALE_COUNT,this,this.controlGameItemList);
        }
        /** 打开小键盘事件 */
        private _opXiaoJianPan():void
        {
            if(!this._isSelectedGameItem) return;
            this._XiaoJianPanMediator.show();
            tips.models.TipsProxy.getInstance().on(tips.models.ON_KRYBOARD,this,this.onKeyInNum);
        }
        /** 
         * describe 接收小键盘输入
         * @param num  接收的小键盘值
         */
        private onKeyInNum(num:number):void
        {
            if(num !=-2){
				//点击清除按钮
				if(num == -1){
					var str = this.keyNumDic.get(1);
					if(str.length == 1){
						str = (num+2).toString();
						this.keyNumDic.set(1,"");
					}else if(str.length == 2){
						str = str.substring(0,str.length-1);
						this.keyNumDic.set(1,str);
					}else
						return;
					this._viewUI.saleGameItemNumber_lab.text = str;	
				}else{
					//输入两位数
					var str = this.keyNumDic.get(1);
                    let goodsSaleNum = ShopModel.getInstance().goodsSaleLimit.get(this._gameItemShopId);
                    /** 剩余出售数 */
                        goodsSaleNum = this.GoodsData.get(this._gameItemShopId) - goodsSaleNum;
                    // if(str.length<1)
                    // {/** 个位数 */
							if(num == 0 && str.length ==0)  return;
                             str += num.toString();   
                            if(parseInt(str) >= goodsSaleNum && goodsSaleNum <= this._isCanSaleGameItemNumber)
                            {/** 限售数最小 */
                                if(goodsSaleNum == 0) goodsSaleNum = 1;
                                this._saleGameItemNumber =  goodsSaleNum;
                                str = goodsSaleNum.toString();
                                /** 飘窗提醒 */
                                let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                this.disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                                this.disappearMessageTipsMediator.onShow(prompt);
                            }else if(parseInt(str) >= this._isCanSaleGameItemNumber)
                            {/** 物品数最小 */
                                this._saleGameItemNumber = this._isCanSaleGameItemNumber;
                                str = this._saleGameItemNumber.toString();
                                /** 飘窗提醒 */
                                let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.INPUT_MAX_LIMIT);
                                this.disappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
                                this.disappearMessageTipsMediator.onShow(prompt);
                                
                            }else
                            {/** 输入值最小 */
                               this._saleGameItemNumber =  parseInt(str);
                            }	
							this.keyNumDic.set(1,str);	
                    let unitPrice = this._gameItemPrice.toFixed(0);
                    this._viewUI.silverNumber_lab.text =  (parseInt(str) * parseInt(unitPrice)).toString();
					this._viewUI.saleGameItemNumber_lab.text = str;
				}
			}else{
				//关闭小键盘，清空记录
				this.keyNumDic.set(1,"");
			}
        }

        /**
         * @describe  增加1个出售道具的事件
         */
        private clickAddBtnEvent(): void 
        {
            if (this._isSelectedGameItem && (this._saleGameItemNumber < this._isCanSaleGameItemNumber)) {
                this._saleGameItemNumber = this._saleGameItemNumber + 1;
                this.setSaleGameItemNumber(this._saleGameItemNumber);
                this.calculateAndShowSilverNumber(this._saleGameItemNumber);
            }
        }
        /**
         * @describe  减少1ge出售道具的事件
         */
        private clickLessBtnEvent(): void {
            if (this._isSelectedGameItem && this._saleGameItemNumber > 1) 
            {
                this._saleGameItemNumber = this._saleGameItemNumber - 1;
                this.setSaleGameItemNumber(this._saleGameItemNumber);
                this.calculateAndShowSilverNumber(this._saleGameItemNumber);
            }
        }
        /**
         * @describe  点击出售数量按钮，数字键盘输入
         */
        private clickInputSaleNumberBtnEvent(): void {
        
        }
        /**
         * @describe  出售道具事件
         */
        private clickSaleGameItemBtnEvent(): void {
            let goodsSaleNum = ShopModel.getInstance().goodsSaleLimit.get(this._gameItemShopId);
                goodsSaleNum = this.GoodsData.get(this._gameItemShopId) - goodsSaleNum;
            if (this._isSelectedGameItem && this._saleGameItemNumber > 0  && goodsSaleNum > 0 ) 
            {
                let shopid = 5; 
                let itemkey =  this._bagGameItemListPos.get(this._gameItemId);   //背包中的位置
                //goodlist的数值要从商城模块读取
                /** 商品ID不是物品Id = = */
                let goodsid = this._gameItemShopId;
                let num = this._saleGameItemNumber;
                let buytype = 5;
                RequesterProtocols._instance.c2s_chamber_ofcommerceshop(shopid,itemkey,goodsid,num,buytype);
                // 置空
                this.zeroSaleNumberAndGetSilver();      
                // this._isSelectedGameItem = false;
                this._viewUI.gameItem_list.selectedIndex = -1;
                // this.calculateAndShowOwnSilverNumber();
            }else if(goodsSaleNum == 0 && this._isSelectedGameItem )
            {/** 商品出售达到上限 */
                this.disappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                let param = [];
                param.push(this.GoodsData.get(this._gameItemShopId));
                let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.SALE_FULL_TIMES,param);
                this.disappearMessageTipsMediator.onShow(prompt);
                console.log("商品出售达到上限...................................")
            }
        }

        
        ////////////////
        ///UI
        ////////////////
        
        /**
         * @describe  控制GameItem_list
         */
        private controlGameItemList(): void {
            let itemNumber: number = 1;
            this._viewUI.gameItem_list.spaceX = 5;
            this._viewUI.gameItem_list.spaceY = 5;
            this.getSaleGameItemListData();
            this.listScroll(this._viewUI.gameItem_list);
        }
        /**
         * @describe  设置出售道具的数量
         * @param saleNumber   数量
         */
        private setSaleGameItemNumber(saleNumber: number): void {
            this._saleGameItemNumber = saleNumber;
            this._viewUI.saleGameItemNumber_lab.text = saleNumber.toString();
        }
        /**
         * @describe  获得的银币
         * @param coinNumber  数量 
         */
        private setSilverNumber(coinNumber: number): void {
            this._getSilverNumber = coinNumber;
            this._viewUI.silverNumber_lab.text = game.utils.MoneyU.number2Thousands(coinNumber);
        }
        /**
         * @describe 
         * @param coinNumber   拥有的银币
         */
        private setOwnSilverNumber(coinNumber: number): void {
            this._ownSliverNumber = coinNumber;
            this._viewUI.ownSilverNumber_lab.text = game.utils.MoneyU.number2Thousands(coinNumber);
        }
         public hide(): void {
            /** 移除通讯事件 */
            super.hide();
            if(this.ani) this.ani.clear();
        }

    }
}