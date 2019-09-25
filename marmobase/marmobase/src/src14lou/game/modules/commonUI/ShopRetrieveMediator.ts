
module game.modules.commonUI {
	/** 珍品/珍宠找回 */
	export class ShopRetrieveMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.ShopRetrieveUI;
		/** 判断是否是珍品找回的操作 */
		private lastSelectIndex: number;
		/** 找回对象列表数据 */
		private datas:any = [];
		/** 找回对象的唯一id */
		private _uniqId:number;
		/** 记录的上一个点击选中的按钮 */
		private select_btn: Laya.Button;
		

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ShopRetrieveUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
		}
		/** 给其它地方调用
		 * @param flag 判断是否是珍品找回，不是珍品找回就是珍宠找回
		 */
		public onShow(flag: boolean): void {
			this._uniqId = -1;
			this.registerEvent();
			if (flag) {
				this._viewUI.select_tab.selectedIndex = 0;
			}
			else {
				this._viewUI.select_tab.selectedIndex = 1;
			}
		}
		/** 注册事件 */
		private registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.retrieve_btn.on(LEvent.MOUSE_DOWN, this, this.retrieve);
			this._viewUI.select_tab.selectHandler = new Handler(this, this.changeSelect);
			bag.models.BagProxy.getInstance().on(bag.models.GET_ITEMRECOVERDATA, this, this.init);
			bag.models.BagProxy.getInstance().on(bag.models.RECOVER_ITEM_SUCCESS, this, this.changeItemRecoverData);
			bag.models.BagProxy.getInstance().on(bag.models.GET_RECOVERITEM_INFODATA, this, this.showRecoverItemInfo);
			pet.models.PetProxy.getInstance().on(pet.models.GET_PETRECOVERDATA,this, this.init);
			pet.models.PetProxy.getInstance().on(pet.models.RECOVER_PET_SUCCESS,this, this.changePetRecoverData);
			pet.models.PetProxy.getInstance().on(pet.models.GET_PETRECOVER_INFODATA,this, this.showRecoverPetInfo);
		}
		/** 显示找回道具的信息 */
		private showRecoverItemInfo(uniqId:number, tips:any):void{
			let recoverItems = BagModel.getInstance().itemRecoverInfoData;
			let itemId:number = -1;
			for(let i = 0; i < recoverItems.length; i++){
				let _uniqId = recoverItems[i].uniqId;
				if(_uniqId == uniqId){
					itemId = recoverItems[i].itemId;
					break;
				}
			}			
			if(tips != null && itemId != -1){
				let packid = tips.packid;//背包id
				let key = tips.keyinpack;//在对应背包中的key
				let itemAttrData = BagModel.getInstance().itemAttrData;
				let outbattleuse = itemAttrData[itemId]["outbattleuse"];//战斗外使用对象
				let shopid = itemAttrData[itemId]["nshoptype"];//商店类型
				let number = 1;//装备道具数量写死为1，反正是不可叠加道具
				let equipeffect = StrengTheningModel.getInstance().equipEffectData;
				let eequiptype = equipeffect[itemId]["eequiptype"];//部件id
				let equip_parame:Dictionary = new Dictionary();
				equip_parame.set("itemId",itemId);
                equip_parame.set("key",key);
                equip_parame.set("packid",packid);
                equip_parame.set("outbattleuse",outbattleuse);
                equip_parame.set("shopid", shopid);
                equip_parame.set("number", number);
                equip_parame.set("equiptype", eequiptype);
				let _tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.BAG,equip_parame);
			}
			else if(itemId != -1){
				let other_parame:Dictionary = new Dictionary();
				other_parame.set("itemId",itemId);
				let _tipsModule = new game.modules.tips.tipsModule(this._viewUI,this._app,TIPS_TYPE.commonItem,other_parame);
			}
		}
		/** 更改道具找回的数据 */
		private changeItemRecoverData(itemId:number, uniqId:number):void{
			let _recoverItems = BagModel.getInstance().itemRecoverInfoData;
			let tempArr = [];
			for(let i = 0; i < _recoverItems.length; i++){
				let _recoverItem:bag.models.ItemRecoverInfoVo = _recoverItems[i];
				if(_recoverItem.itemId != itemId){
					tempArr.push(_recoverItem);//放入不是相同道具id的道具数据
				}
				else if(_recoverItem.uniqId != uniqId) {
					tempArr.push(_recoverItem);//放入相同道具id，但是确是不同道具的数据
				}
			}
			this.init(tempArr);
			BagModel.getInstance().itemRecoverInfoData = tempArr;
		}
		/** 显示找回宠物的信息 */
		private showRecoverPetInfo(petInfoData:pet.models.PetInfoVo):void{
			let _petXiangQingMediator = new modules.pet.PetXiangQingMediator(this._app);
            _petXiangQingMediator.init(petInfoData);
		}
		/** 更改宠物找回的数据 */
		private changePetRecoverData(petId:number,uniqId:number):void{
			let _recoverPets = PetModel.getInstance().recoverPets;
			let tempArr = [];
			for(let i = 0; i < _recoverPets.length; i++){
				let _recoverPet:pet.models.PetRecoverInfoBeanVo = _recoverPets[i];
				if(_recoverPet.petId != petId){
					tempArr.push(_recoverPet);//放入不是相同宠物id的道具数据
				}
				else if(_recoverPet.uniqId != uniqId){
					tempArr.push(_recoverPet);//放入相同宠物id，但是确是不同宠物的数据
				}
			}
			this.init(tempArr);
			PetModel.getInstance().recoverPets = tempArr;
		}
		/** 更改选项 */
		private changeSelect():void{
			if(this._viewUI.select_tab.selectedIndex == 0){
				RequesterProtocols._instance.c2s_CItemRecover_List();//珍品找回请求珍品列表
			}
			else{
				RequesterProtocols._instance.c2s_pet_recoverlist();//珍宠找回请求珍宠列表
			}
		}
		/** 进行找回操作 */
		private retrieve():void{
			//要先判断金币是否足够
			if(this._viewUI.spendGold_lab.strokeColor == "#ff0000"){
				//金币不够，进行补足
				let needMoney = Number(this._viewUI.spendGold_lab.text);//找回所需的金币
				let haveMoney = Number(this._viewUI.haveGold_lab.text);//玩家角色所持有的金币
				//还差多少钱
				let differMoney = needMoney - haveMoney;
				//需要多少元宝来补足
				let needYuanBao = Math.ceil(differMoney/100);//100为元宝兑换成金币的兑换率
				let jinBiBuZuView = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);				
				jinBiBuZuView.onShow(true, differMoney.toString(), needYuanBao.toString());
				jinBiBuZuView.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.goCharge, [needYuanBao]);
				return;
			}
			//当金币足够，就可发起请求
			if(this._uniqId != -1 && this._viewUI.select_tab.selectedIndex == 0){
				RequesterProtocols._instance.c2s_CItem_Recover(this._uniqId);//请求找回珍品
			}
			else if(this._uniqId != -1 && this._viewUI.select_tab.selectedIndex == 1){
				RequesterProtocols._instance.c2s_pet_recover(this._uniqId);//请求找回珍宠
			}
			else{//进行飘窗提示，请选择需要找回的对象

			}
		}
		/**仙晶兑换 */
		private goCharge(yuanbao) {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				let _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				_TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				_TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT,this,this.changeUI);
				RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, yuanbao);
			}
		}
		/** 更改界面UI */
		private changeUI():void{
			this._viewUI.haveGold_lab.text = BagModel.getInstance().globalIcon.toString();
			this._viewUI.spendGold_lab.strokeColor = "#50321a";
		}
		/**充值 */
		private goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		/** 初始化
		 * @param data 所得到找回对象列表数据，珍品/珍宠
		 */
		private init(data: Array<any>): void {
			this.lastSelectIndex = -1
			this.initUI(data);
			this.show();
		}
		/** 初始化UI */
		private initUI(data: any):void{
			this._viewUI.recover_lst.vScrollBarSkin = "";
			this._viewUI.spendGold_lab.text = 0 + "";
			this._viewUI.spendGold_lab.strokeColor = "#50321a";
			this._viewUI.haveGold_lab.text = BagModel.getInstance().globalIcon.toString();
			this.datas = data;
			this._viewUI.recover_lst.array = data;
			this._viewUI.recover_lst.renderHandler = new Laya.Handler(this, this.onRenderRecover);
		}
		/** 渲染找回列表 */
		private onRenderRecover(cell:Box,index:number):void{
			if(index < 0 || index > this.datas.length -1){
				return;
			}
			let select_btn:Laya.Button = cell.getChildByName("select_btn") as Laya.Button;
			if(this.lastSelectIndex != -1 && this.lastSelectIndex == index){
				select_btn.skin = "common/ui/tongyong/common_list_textbg2.png";
			}
			else if(this.lastSelectIndex == -1){
				select_btn.skin = "common/ui/tongyong/common_list_textbg.png";
			}
			select_btn.on(LEvent.CLICK, this, this.clickRecover,[index]);
			let frame_img:Laya.Image = select_btn.getChildByName("frame_img") as Laya.Image;
			let icon_img:Laya.Image = select_btn.getChildByName("icon_img") as Laya.Image;
			icon_img.on(LEvent.CLICK, this, this.clickShowInfo,[index]);
			let name_lab:Laya.Label = select_btn.getChildByName("name_lab") as Laya.Label;
			this.setImgAndLab(frame_img,icon_img,name_lab,index);
			let spendNeedGold_lab:Laya.Label = select_btn.getChildByName("spendNeedGold_lab") as Laya.Label;
			spendNeedGold_lab.text = this.datas[index]["cost"];
			let laveDay_lab:Laya.Label = select_btn.getChildByName("laveDay_lab") as Laya.Label;
			let _remainTime = this.datas[index]["remainTime"];
			laveDay_lab.text = this.getChangeTime(_remainTime);
		}
		/** 获取时间戳转换后的天数
		 * @param times 时间戳
		 * @descibe 不足一天的，转换成以时为单位计时
		 */
		private getChangeTime(times:number):string{
			let days = Math.ceil(times/(60 * 60 * 24));
			if(days <= 1){
				let hours = Math.ceil(times/(60 * 60));
				return hours + "时";
			}
			else{
				return days + "天";
			}
		}
		/** 点击请求显示所要找回对象的信息 */
		private clickShowInfo(index:number):void{
			let uniqId = this.datas[index]["uniqId"]
			if(this._viewUI.select_tab.selectedIndex == 0){
				RequesterProtocols._instance.c2s_CRecoverItem_Info(uniqId);//请求查看珍品信息
			}
			else{
				RequesterProtocols._instance.c2s_recover_petinfo(uniqId);//请求查看珍宠信息
			}
		}
		/** 点击了所要找回的对象 */
		private clickRecover(index: number): void {
			if (this.lastSelectIndex != -1) {
				// let Box: Laya.Box = this._viewUI.recover_lst.getCell(this.lastSelectIndex) as Laya.Box;
				// let last_select_btn: Laya.Button = Box.getChildByName("select_btn") as Laya.Button;
				// last_select_btn.skin = "common/ui/tongyong/common_list_textbg.png";
				this.select_btn.skin = "common/ui/tongyong/common_list_textbg.png";
			}
			let select_btn: Laya.Button = this._viewUI.recover_lst.getCell(index).getChildByName("select_btn") as Laya.Button;
			select_btn.skin = "common/ui/tongyong/common_list_textbg2.png";
			this.select_btn = select_btn;
			this.lastSelectIndex = index;
			this._uniqId = this.datas[index]["uniqId"];
			let _cost = this.datas[index]["cost"];
			let _have = BagModel.getInstance().globalIcon;
			if (_cost > _have) {
				this._viewUI.spendGold_lab.strokeColor = "#ff0000";
			}
			else {
				this._viewUI.spendGold_lab.strokeColor = "#50321a";
			}
			this._viewUI.spendGold_lab.text = _cost.toString();
		}
		/** 设置图片路径和文本内容 */
		private setImgAndLab(img1:Laya.Image,img2:Laya.Image,lab:Laya.Label,index:number):void{
			let str1:string,str2:string,str3:string;
			if(this._viewUI.select_tab.selectedIndex == 0){
				let _itemId = this.datas[index].itemId;
				let _itemquality = BagModel.getInstance().itemAttrData[_itemId]["nquality"];
				str1 = bag.BagSystemModule.getGameItemFrameColorResource(_itemquality);
				let _itemicon = BagModel.getInstance().itemAttrData[_itemId]["icon"];
				str2 = "common/icon/item/"+ _itemicon +".png";
				let _itemname = BagModel.getInstance().itemAttrData[_itemId]["name"];
				str3 = _itemname;
			}
			else{
				let _petid = this.datas[index].petId;
				let _petquality = PetModel.getInstance().petCPetAttrData[_petid]["quality"];
				str1 = bag.BagSystemModule.getGameItemFrameColorResource(_petquality);
				let _petmodelid = PetModel.getInstance().petCPetAttrData[_petid]["modelid"];
				let _peticon = LoginModel.getInstance().cnpcShapeInfo[_petmodelid]["littleheadID"];
				str2 = "common/icon/avatarpet/"+ _peticon +".png";
				let _petname = PetModel.getInstance().petCPetAttrData[_petid]["name"];
				str3 = _petname;
			}
			img1.skin = str1;
			img2.skin = str2;
			lab.text = str3;
		}

		public show() {
			super.show();
		}
		public hide() {
			super.hide();
			this.removeEvent();
		}
		/** 移除事件 */
		private removeEvent(): void {
			this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.retrieve_btn.off(LEvent.MOUSE_DOWN, this, this.retrieve);
			bag.models.BagProxy.getInstance().off(bag.models.GET_ITEMRECOVERDATA, this, this.init);
			bag.models.BagProxy.getInstance().off(bag.models.RECOVER_ITEM_SUCCESS, this, this.changeItemRecoverData);
			bag.models.BagProxy.getInstance().off(bag.models.GET_RECOVERITEM_INFODATA, this, this.showRecoverItemInfo);
			pet.models.PetProxy.getInstance().off(pet.models.GET_PETRECOVERDATA,this, this.init);
			pet.models.PetProxy.getInstance().off(pet.models.RECOVER_PET_SUCCESS,this, this.changePetRecoverData);
			pet.models.PetProxy.getInstance().off(pet.models.GET_PETRECOVER_INFODATA,this, this.showRecoverPetInfo);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}