module game.gui.component {
	/**
	 * debug管理器
	 * name 王谦
	 */
	export class DebugMgr extends laya.display.Sprite {
		private static PAGE_SIZE: number[] = [720, 1280];						//界面默认宽高
		private static DEBUGMGR_POS: number[] = [180, 1065];					//debug管理器位置
		private static SKIN_BACK: string = Path.ui + "tongyong/wbk_1.png";		//背景皮肤或null
		private static SIZEGRID_BACK: string = "12,12,12,12";					//背景皮肤九宫格
		private static SKIN_BTN: string = Path.ui + "tongyong/btn_BQ_1.png";	//按钮皮肤或null
		private static SIZEGRID_BTN: string = "";								//按钮皮肤九宫格

		private static _app: AppBase;				//应用程序引用
		private static _instance: DebugMgr;			//单例
		/**单例*/
		public static get instance(): DebugMgr {
			if (!this._instance) this._instance = new DebugMgr();
			return this._instance;
		}
		//发送debug
		public static onSendDebug(app: AppBase, text: string): void {
			this._app = app;
			text = StringU.trim(text);
			if (!text || !text.length) {
				// this._app.uiRoot.top.open(PageDef.TIPS, (page:game.gui.page.Tips) => {
				// 	page.setText("不能发送空消息");
				// });
				logd("不能发送空消息");
				return;
			}
			if (text.indexOf("@") != 0) return;
			let type: number = -1;
			let arr: string[] = text.split(' ');
			switch (arr[0]) {
				case '@窗口':
				case '@page':
					if (arr.length < 2) return;
					let data: any;
					if (arr.length > 2) data = parseInt(arr[2])
					this._app.uiRoot.general.open(parseInt(arr[1]), (page: Page) => { page.dataSource = data; });
					break;
				default:
					// this._app.network.call_gm_command(text);
			}
		}
		private static _caches:string[] = [];
		private static _select:number = -1;
		/**保存消息*/
		public static cacheMsg(input:TextInput):void{
			let msg:string = StringU.trim(input.text);
			if(!msg) return;
			for(var i:number = 0; i < this._caches.length; i++){
				if(this._caches[i] != msg) continue;//消息内容相同，先删除
				this._caches.splice(i, 1);
				break;
			}
			this._caches.push(msg);
			if(this._caches.length > 10) this._caches.shift();
			this._select = -1;
		}
		/**选择缓存消息*/
		public static selectCacheMsg(input:TextInput,isUp:boolean=true):void{
			if(!this._caches.length) return;
			let len:number = this._caches.length;
			if(this._select == -1) this._select = isUp ? len - 1 : 0;
			else this._select = isUp ? (this._select+len-1)%len : (this._select+1)%len;
			//还原文本
			input.text = this._caches[this._select];
			input.focus = true;
		}

		private _app: AppBase;//应用程序引用
		private _page: Page;
		private _init:boolean;
		private _container: laya.display.Sprite;
		private _imgBack: LImage;
		private _input: TextInput;
		private _btnEnter: Button;

		constructor() {
			super();
		}
		//添加事件侦听
		protected set addListener(isAdd: boolean) {
			DisplayU.setEventListener(this.stage, isAdd, LEvent.KEY_UP, this, this.onKeyUpHandler);
			DisplayU.setMouseListener(this._btnEnter, isAdd, this, this.onClickHandler);
		}
		//定时检测
		private updateTime(): void {
			if (this._page.isOpened) return;
			this.clear();
			DebugMgr._instance = null;
		}
		//位置检测
		private updatePos():void{
			if(!this._page.isOpened) return;
			let [x,y] = this._page.viewPos;
			this.pos(x,y);
		}
		//发送debug信息
		private onSendDebug(): void {
			DebugMgr.onSendDebug(this._app, this._input.text);
			DebugMgr.cacheMsg(this._input);	//保存发送信息
			this._input.text = "";
			this._input.focus = false;
		}
		//鼠标点击事件
		private onClickHandler(e: LEvent): void {
			TweenBtnEff.BtnTween(e.currentTarget);
			switch (e.currentTarget) {
				case this._btnEnter:
					this.onSendDebug();
					break;
			}
		}
		//键盘事件
		private onKeyUpHandler(e:LEvent): void {
			if(this.visible && !this._input.focus) return;
			switch(e.keyCode){
				case 13:
					if (this.visible) this.onSendDebug();
					this.visible = !this.visible;
					if(this.visible) this._input.focus = true;
					break;
				case 38: DebugMgr.selectCacheMsg(this._input,true); break;
				case 40: DebugMgr.selectCacheMsg(this._input,false); break;
			}
		}
		/**初始化*/
		public init(app: AppBase, page: Page): void {
			this._app = app;
			this._page = page;
			if(this._init){
				if(this.parent != this._page){
					this.updatePos();
					this._page.addChild(this);
				}
				return;
			}
			this.size(DebugMgr.PAGE_SIZE[0], DebugMgr.PAGE_SIZE[1]);
			this.mouseThrough = true;
			//容器
			this._container = new laya.display.Sprite();
			this._container.pos(DebugMgr.DEBUGMGR_POS[0], DebugMgr.DEBUGMGR_POS[1]);
			this.addChild(this._container);
			//背景
			this._imgBack = new LImage(DebugMgr.SKIN_BACK);
			this._imgBack.sizeGrid = DebugMgr.SIZEGRID_BACK;
			this._imgBack.size(200, 40);
			this.checkSkin(this._imgBack, "#666666");
			this._imgBack.pos(0, 0);
			this._container.addChild(this._imgBack);
			//输入框
			this._input = new TextInput();
			this._input.size(185, 30);
			this._input.pos(8, 5);
			this._input.color = "#ffffff";
			this._input.fontSize = 20;
			this._container.addChild(this._input);
			this._btnEnter = new Button(DebugMgr.SKIN_BTN);
			this._btnEnter.sizeGrid = DebugMgr.SIZEGRID_BTN;
			this._btnEnter.size(97, 40);
			this._btnEnter.pivot(this._btnEnter.width / 2, this._btnEnter.height / 2);
			this.checkSkin(this._btnEnter, "#ff6600");
			this._btnEnter.pos(203 + this._btnEnter.pivotX, 0 + this._btnEnter.pivotY);
			this._btnEnter.labelBold = true;
			this._btnEnter.labelSize = 20;
			this._btnEnter.labelColors = "#393939,#393939,#393939";
			this._btnEnter.label = "确 定";
			this._container.addChild(this._btnEnter);
			this.visible = false;
			this.updatePos();
			this._page.addChild(this);
			this.addListener = true;
			Laya.timer.loop(10000, this, this.updateTime);
			Laya.timer.loop(1000, this, this.updatePos);
			this._init = true;
		}
		//检测皮肤
		private checkSkin(target: laya.ui.Component, color: string): void {
			if (!target || !color) return;
			if (target == this._imgBack) {
				if (this._imgBack.skin && this._imgBack.skin.length) return;
			} else if (target == this._btnEnter) {
				if (this._btnEnter.skin && this._btnEnter.skin.length) return;
			}
			let g: Graphics = target.graphics;
			g.clear();
			g.drawRect(0, 0, target.width, target.height, color);
		}
		//清理
		private clear(): void {
			Laya.timer.clear(this, this.updateTime);
			Laya.timer.clear(this, this.updatePos);
			this.addListener = false;
			if (this._imgBack) {
				this._imgBack.removeSelf();
				this._imgBack = null;
			}
			if (this._input) {
				this._input.removeSelf();
				this._input = null;
			}
			if (this._btnEnter) {
				this._btnEnter.removeSelf();
				this._btnEnter = null;
			}
			if (this._container) {
				this._container.removeSelf();
				this._container = null;
			}
			this.removeSelf();
			this._init = false;
		}
	}
}