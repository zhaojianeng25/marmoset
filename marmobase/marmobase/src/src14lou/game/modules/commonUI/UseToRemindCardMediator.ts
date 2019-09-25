/**
* 使用道具
*/
module game.modules.commonUI {
	export class UseToRemindCardMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.UseToRemindCardUI;
		public usetime: number;
		/** 物品Id */
		private itemid: number;
		/** 物品数量 */
		private itemNum: number = -1;
		/** 物品信息 */
		private iteminfo: ItemAttrBaseVo;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.UseToRemindCardUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.close_btn.on(LEvent.CLICK, this, this.close);
			this._viewUI.useitem_btn.on(LEvent.MOUSE_DOWN, this, this.useitem);
		}
		/** 单例对象 */
		public static _instance: UseToRemindCardMediator;
		public static getInstance(app: AppBase): UseToRemindCardMediator {
			if (!this._instance) {
				this._instance = new UseToRemindCardMediator(app);
			}
			return this._instance;
		}
		public init(itemid: number, name: string, num?: number): void {//接收道具ID
			this.show();
			this.usetime = 0;
			this.itemid = itemid;
			if (num) {/** 使用指引 */
				this.itemNum = num;
				this._viewUI.itemNum_lab.visible = true;
				this.updateNumLab(num);
			} else {
				this._viewUI.itemNum_lab.visible = false;
				if (game.modules.autohangup.models.AutoHangUpModel.getInstance().autotask == 1) {
					Laya.timer.loop(1000, this, this.delayuseitem)
				}
			}
			this.iteminfo = game.modules.bag.models.BagModel.getInstance().itemAttrData[itemid]
			this._viewUI.itemicon_img.skin = "common/icon/item/" + this.iteminfo.icon + ".png";
			this._viewUI.itemname_lab.text = this.iteminfo.name
			this._viewUI.useitem_btn.label = name

		}
		public useitem(): void {
			if (this.itemNum >= 1) {/** 当前数量大于1 */
				let outbattleuse = 0;
				let roleid = LoginModel.getInstance().roleDetail.roleid;
				let item = bagModel.getInstance().addItemUseGuide.get(this.itemid);
				let key = item.key;
				if(this._viewUI.useitem_btn.label == "使用")
				RequesterProtocols._instance.c2s_CAppend_Item(key, outbattleuse, roleid);
				else 
				{
					let equipType = StrengTheningModel.getInstance().equipEffectData[this.itemid].eequiptype;
					 /** 穿上装备请求 */
                	RequesterProtocols._instance.c2s_CPutOn_Equip(item.key,equipType);
				}
				this.updateNumLab(this.itemNum);
			} else if (this.itemNum == -1) {
				this.hide();
				game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.USEITEM);
			}

		}

		/** 刷新物品数量 */
		private updateNumLab(num: number): void {
			if (num == 0) {
				this.hide();
				return;
			}
			if (num == 1) this._viewUI.itemNum_lab.text = "";
			else this._viewUI.itemNum_lab.text = num.toString();

		}
		/**延迟使用道具*/
		public delayuseitem(): void {
			this.usetime += 1
			if (this.usetime >= 3) {
				Laya.timer.clear(this, this.delayuseitem)
				this.useitem()
			}
		}
		public show() {
			super.show();
		}
		public hide(): void {
			this.itemNum = -1;
			super.hide();


		}
		/** 关闭界面 */
		public close(): void {
			this.hide();
			/** 不使用只是关闭 移除key */
			let itemKey = bagModel.getInstance().addItemUseGuide.keys;
			/** 如果指引字典里还有值就响应下个界面 */
			if (itemKey.length != 0) {
				for (var index = 0; index < itemKey.length; index++) {/** 移除的时候移除目前的界面的id */
					if (itemKey[index] == this.itemid) {
						bagModel.getInstance().addItemUseGuide.remove(itemKey[index]);
					}
				}
				if (bagModel.getInstance().addItemUseGuide.keys.length != 0)
					bag.models.BagProxy.getInstance().event(bag.models.ADDITEM_USE_GUIDE);
			}

		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}