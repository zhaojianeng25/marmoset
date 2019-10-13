
module game.modules.commonUI{
	/** 神兽兑换 */
	export class ShopYaoHunYuMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.ShopYaoHunYuUI;
		/** 存放神兽列表数据的数组 */
		private shenShouLstDataArr = [];
		/** 存放购买神兽所需消耗的道具数量 */
		private costItemNumDic = new Laya.Dictionary();
		/** 存放购买神兽所对应的商品id */
		private shenshouShopIdDic = new Laya.Dictionary();
		/** 造型配置表 */
		private _modelConfig:Object;
		/** 被选中选项 */
		private selectedIndex:number = -1;		
		/** 被选中的底图 */
		private shenshouSelectedImg;

		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ShopYaoHunYuUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;			
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
			this._modelConfig = createrole.models.LoginModel.getInstance().cnpcShapeInfo;
		}
		public show() {
			super.show();
			this.registEvent();
			this.init();

		}
		/** 初始化 */
		private init():void{
			this._viewUI.shenShou_btn.selected = true;
			this._viewUI.spendMoney_img.skin = "common/icon/item/20073.png";
			this._viewUI.haveMoney_img.skin = "common/icon/item/20073.png";
			this.showHaveMoney();
			this._viewUI.haveYaoHunYu_lab.stroke = 0;
			//神兽数据初始化
			this.shenshouDataInit();
			//神兽列表初始化
			this.shenShouLstInit();
		}
		/** 显示身上所持有的妖魂玉道具数量 */
		private showHaveMoney():void{
			let _haveYaoHunYu = BagModel.getInstance().chargeItemNum(101422);//获取人物身上持有的妖魂玉的数量
			this._viewUI.haveYaoHunYu_lab.text = _haveYaoHunYu.toString();
		}
		/** 神兽数据初始化 */
		private shenshouDataInit():void{
			let _cShenShouShop = ShopModel.getInstance().cShenShouShop;//神兽商店表
			let _GoodsBinDic = ShopModel.getInstance().GoodsBinDic;//商品表
			let _goodsids:Array<any> = _cShenShouShop[1]["goodsids"];//现阶段只有一行数据，直接写死
			let _petAttrData = PetModel.getInstance().petCPetAttrData;//宠物数据表
			for(let i = 0; i < _goodsids.length; i ++){
				let _shenshouId = _GoodsBinDic[_goodsids[i]]["itemId"];
				this.shenShouLstDataArr.push(_petAttrData[_shenshouId]);
				this.costItemNumDic.set(_shenshouId, _GoodsBinDic[_goodsids[i]]["prices"][0]);
				this.shenshouShopIdDic.set(_shenshouId, _goodsids[i]);
			}
		}
		/** 神兽列表初始化  */
		private shenShouLstInit():void{
			this._viewUI.shenShou_lst.vScrollBarSkin = "";
			this._viewUI.shenShou_lst.scrollBar.elasticBackTime = 100;
			this._viewUI.shenShou_lst.scrollBar.elasticDistance = 100;
			this._viewUI.shenShou_lst.array = this.shenShouLstDataArr;
			this._viewUI.shenShou_lst.renderHandler = new Laya.Handler(this, this.shenShouLstRender);
			this._viewUI.shenShou_lst.selectHandler = new Laya.Handler(this, this.shenShouLstSelect);
		}
		/** 神兽列表被点击 */
		private shenShouLstSelect(index: number):void{
			let ditu_img:Laya.Image = this._viewUI.shenShou_lst.getCell(index).getChildByName("ditu_img") as Laya.Image;
			ditu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
			if(this.shenshouSelectedImg){
				this.shenshouSelectedImg.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			this.selectedIndex = index;
			this.shenshouSelectedImg = ditu_img;
			this.changeUI(index);
		}
		/** 改变界面UI */
		private changeUI(index:number):void{
			let _shenshouData = this.shenShouLstDataArr[index]; 
			this._viewUI.spendYaoHunYu_lab.text = this.costItemNumDic.get(_shenshouData.id).toString();
			let needMoney = Number(this._viewUI.spendYaoHunYu_lab.text);
			let haveMoney = Number(this._viewUI.haveYaoHunYu_lab.text);
			if(haveMoney < needMoney){
				this._viewUI.haveYaoHunYu_lab.strokeColor = "#ff0000";
				this._viewUI.haveYaoHunYu_lab.stroke = 3;
			}
		}
		/** 神兽列表的渲染 */
		private shenShouLstRender(cell: Box, index: number):void{
			let petName_lab: Laya.Label = cell.getChildByName("petName_lab") as Laya.Label;
			let cost_lab: Laya.Label = cell.getChildByName("cost_lab") as Laya.Label;
			let petIcon_img:Laya.Image = cell.getChildByName("petIcon_img") as Laya.Image;
			let petFrame_img:Laya.Image = cell.getChildByName("petFrame_img") as Laya.Image;			
			let ditu_img:Laya.Image = cell.getChildByName("ditu_img") as Laya.Image;
			ditu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
			if(this.selectedIndex == index){
				ditu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
			}
			let money_img:Laya.Image = cell.getChildByName("money_img") as Laya.Image;
			money_img.skin = "common/icon/item/20073.png";
			let _shenshouData = this.shenShouLstDataArr[index];
			petName_lab.text = _shenshouData.name;
			petName_lab.color = "#" +_shenshouData.colour;
			cost_lab.text = this.costItemNumDic.get(_shenshouData.id).toString();
			let _shapeId = this._modelConfig[_shenshouData.modelid]["littleheadID"];
			petIcon_img.skin = "common/icon/avatarpet/" + _shapeId + ".png";
			petFrame_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(_shenshouData.quality);
		}
		/** 注册事件 */
		private registEvent():void{
			this._viewUI.buy_btn.on(LEvent.CLICK, this, this.buyShenShou);
		}
		/** 购买选中的神兽 */
		private buyShenShou():void{
			if(-1 != this.selectedIndex){
				if(this._viewUI.haveYaoHunYu_lab.stroke != 0){//若身上妖魂玉数量不足
					let _msg:string = ChatModel.getInstance().chatMessageTips[140638]["msg"];
					let _itemName = BagModel.getInstance().itemAttrData[101422]["name"];
					_msg = _msg.replace("$parameter1$", _itemName);
					game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _msg);
					return;
				}
				// else{//若身上妖魂玉道具数量足够，弹出二次确认框

				// }
				let _cShenShouShop = ShopModel.getInstance().cShenShouShop;
				let _shopid = _cShenShouShop[1]["shopid"];
				let _shenshouData = this.shenShouLstDataArr[this.selectedIndex];
				let _goodId = this.shenshouShopIdDic.get(_shenshouData.id);
				bag.models.BagProxy.getInstance().once(bag.models.ITEMADD_OR_DEL, this, this.reChangeUI);
				RequesterProtocols._instance.c2s_buy_npcshop(_shopid, _goodId, 1, ShopBuyType.SHENSHOU_SHOP);
			}
		}
		/** 重新更改身上所持有的妖魂玉 */
		private reChangeUI():void{
			this.showHaveMoney();
			this.changeUI(this.selectedIndex);
		}
		/** 移除事件 */
		private removeEvent():void{
			this._viewUI.buy_btn.off(LEvent.CLICK, this, this.buyShenShou);
		}
		public hide(){
			super.hide();
			this.selectedIndex = -1;
			this.shenshouSelectedImg = undefined;
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}