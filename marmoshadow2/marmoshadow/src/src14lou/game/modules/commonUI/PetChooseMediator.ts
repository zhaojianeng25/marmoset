
module game.modules.commonUI {
	/** 选择宠物 */
	export class PetChooseMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetChooseUI;
		/**模型*/
		public pet1model: ModelsCreate;
		/**模型*/
		public pet2model: ModelsCreate;
		/**模型场景*/
		private scene2DPanel1: TestRole2dPanel
		/**模型场景*/
		private scene2DPanel2: TestRole2dPanel
		/**延迟时间*/
		public delaytime: number
		/** 神兽提升配置表 */
		private _shenshouIncConfig: Object;
		/**宠物基础数据配置表 */
		private _petAttrData: Object;
		/** 可重置而获得到的神兽id */
		private _shenShouIdArr:Array<number>;
		/** 要被兑换掉的神兽key */
		private _shenShouKey:number;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetChooseUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.pet1model = new ModelsCreate()
			this.pet2model = new ModelsCreate()
			this.scene2DPanel1 = new TestRole2dPanel()
			this.scene2DPanel2 = new TestRole2dPanel()
			this._viewUI.pet1_img.addChild(this.scene2DPanel1)
			this._viewUI.pet2_img.addChild(this.scene2DPanel2)
		}
		/**宠物1id 宠物2id*/
		public init(pet1id: number, pet2id: number) {
			super.show();
			this.show_and_hide_UI(false);
			this.delaytime = 0
			let petinfo1: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[pet1id]
			let petinfo2: PetCPetAttrBaseVo = game.modules.pet.models.PetModel.getInstance().petCPetAttrData[pet2id]
			let shape1: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[petinfo1.modelid]
			let shape2: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[petinfo2.modelid]
			this._viewUI.pet1name.text = petinfo1.name
			this._viewUI.pet2name.text = petinfo2.name
			this.scene2DPanel1.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel1.ape.y = this._viewUI.y * this._viewUI.globalScaleY
			this.scene2DPanel2.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel2.ape.y = this._viewUI.y * this._viewUI.globalScaleY
			this.modelcreate1(parseInt(shape1.shape))
			this.modelcreate2(parseInt(shape2.shape))
			this._viewUI.pet1_box.on(LEvent.MOUSE_DOWN, this, this.selectpet1, [pet1id])
			this._viewUI.pet2_box.on(LEvent.MOUSE_DOWN, this, this.selectpet2, [pet2id])
			if (AutoHangUpModels.getInstance().autotask == 1) {//自动选择宠物
				Laya.timer.loop(1000, this, this.delayselect)
			}
		}
		/**模型创建*/
		modelcreate1(modelid: number): void {
			if (this.pet1model.role3d) {
				this.scene2DPanel1.removeSceneChar(this.pet1model.role3d)
			}
			this.pet1model.role3d = new YxChar3d();
			this.pet1model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
			this.pet1model.role3d.set2dPos((this._viewUI.pet1_box.x + this._viewUI.pet1_img.width / 2) * this._viewUI.globalScaleX, (this._viewUI.pet1_box.y + this._viewUI.pet1_img.height / 3 * 2) * this._viewUI.globalScaleY);  //坐标
			this.pet1model.role3d.scale = 1;
			this.pet1model.role3d.rotationX = 0
			this.pet1model.role3d.rotationY = 135
			this.scene2DPanel1.addSceneChar(this.pet1model.role3d)
			this.pet1model.mouseEnabled = false
			this.pet1model.mouseThrough = true
		}
		/**模型创建*/
		modelcreate2(modelid: number): void {
			if (this.pet2model.role3d) {
				this.scene2DPanel2.removeSceneChar(this.pet2model.role3d)
			}
			this.pet2model.role3d = new YxChar3d();
			this.pet2model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
			this.pet2model.role3d.set2dPos((this._viewUI.pet2_box.x + this._viewUI.pet2_img.width / 2) * this._viewUI.globalScaleX, (this._viewUI.pet2_box.y + this._viewUI.pet2_img.height / 3 * 2) * this._viewUI.globalScaleY);  //坐标
			this.pet2model.role3d.scale = 1;
			this.pet2model.role3d.rotationX = 0
			this.pet2model.role3d.rotationY = 135
			this.scene2DPanel2.addSceneChar(this.pet2model.role3d)
			this.pet2model.mouseEnabled = false
			this.pet2model.mouseThrough = true
		}
		/**第一只宠物选择*/
		public selectpet1(petid: number): void {
			game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.SELECTPET, [petid]);
			this.pet1model.modeldelt()
		}
		/**第二只宠物选择*/
		public selectpet2(petid: number): void {
			game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.SELECTPET, [petid]);
			this.pet2model.modeldelt()
		}
		/**自动任务时默认选择第一只宠物*/
		public delayselect(): void {
			this.delaytime += 1
			if (this.delaytime >= 3) {
				this.selectpet1(43000)
				Laya.timer.clear(this, this.delayselect)
			}
		}
		public show() {
			super.show();
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}

		/** 神兽重置调用该方法 */
		public onShow(petId:number, shenShouKey: number):void{
			this._shenShouKey = shenShouKey;
			this.registEvent();
			this.shenShouDataInt(petId);
			this.show_and_hide_UI(true);
			this.UI_init();
			this.show();
		}
		/** 事件注册 */
		private registEvent():void{			
			this._viewUI.bg_img.on(LEvent.CLICK, this, this.onHide);

			pet.models.PetProxy.getInstance().on(pet.models.ADD_EVENT, this, this.onHide);
		}
		/** 关闭该界面的UI */
		private onHide():void{
			let _haveShenShouDic = pet.models.PetModel.getInstance().getShenshouDatas();
			if(_haveShenShouDic.keys.length == 1){
				this.hide();
			}
			else{
				let _petBattleChangeMediator = new PetBattleChangeMediator(this._app);
				_petBattleChangeMediator.onShow();
				this.hide();
			}
			this.removeEvent();
		}
		/** 移除事件 */
		private removeEvent():void{
			this._viewUI.bg_img.off(LEvent.CLICK, this, this.onHide);
			pet.models.PetProxy.getInstance().off(pet.models.ADD_EVENT, this, this.onHide);
		}
		/** 界面UI的初始化 */
		private UI_init():void{
			this._viewUI.choosePet_lst.vScrollBarSkin = "";
			this._viewUI.choosePet_lst.array = this._shenShouIdArr;
			this._viewUI.choosePet_lst.renderHandler = new Laya.Handler(this, this.choosePetLstRender);
			this._viewUI.choosePet_lst.selectHandler = new Laya.Handler(this, this.choosePetLstSelect);
		}
		/** 选择宠物列表点击 */
		private choosePetLstSelect(index: number):void{
			RequesterProtocols._instance.c2s_shen_shouchongzhi(this._shenShouKey, this._shenShouIdArr[index]);
		}
		/** 选择宠物列表渲染 */
		private choosePetLstRender(cell: Box, index: number):void{
			let shenShouName_lab: Laya.Label = cell.getChildByName("shenShouName_lab") as Laya.Label;
			let _shenShouId = this._shenShouIdArr[index];
			shenShouName_lab.text = this._petAttrData[_shenShouId]["name"];
		}
		/** 能兑换的神兽数据初始化
		 * @param petId 不需要兑换的神兽id
		 */
		private shenShouDataInt(petId:number):void{
			this._shenShouIdArr = [];
			this._shenshouIncConfig = PetModel.getInstance().petCPetShenShouIncdata;//神兽提升配置表
			this._petAttrData = PetModel.getInstance().petCPetAttrData;//宠物数据表
			let _incKeys = Object.keys(this._shenshouIncConfig);
			for(let i = 0; i < _incKeys.length; i ++){
				let _petid = this._shenshouIncConfig[_incKeys[i]]["petid"];
				if(_petid && this._shenShouIdArr.indexOf(_petid) == -1 && _petid != petId){
					this._shenShouIdArr.push(_petid);
				}
			}
		}
		/** 显示与隐藏部分UI
		 * @param isReset true:是神兽重置，false:不是神兽重置
		 */
		private show_and_hide_UI(isReset:boolean):void{
			if(isReset){
				this._viewUI.tips1_lab.visible = false;
				this._viewUI.pet1_box.visible = false;
				this._viewUI.pet2_box.visible = false;
				this._viewUI.tips2_lab.visible = true;
				this._viewUI.choosePet_lst.visible = true;
			}
			else{
				this._viewUI.tips1_lab.visible = true;
				this._viewUI.pet1_box.visible = true;
				this._viewUI.pet2_box.visible = true;
				this._viewUI.tips2_lab.visible = false;
				this._viewUI.choosePet_lst.visible = false;
			}
		}
	}
}