/**
* ui页面
*/
module game.gui.base {

	export class Page extends Container {
		// 视图
		protected _view: any;
		// 素材配置
		protected _asset: Array<string>;
		// 页面打开时执行函数
		private _onOpenFunc: Function;
		// 页面关闭时执行函数
		private _onCloseFunc: Function;
		// 贴图加载器
		protected _assetsLoader: AssetsLoader = new AssetsLoader();
		// 是否打开
		public isOpened: boolean = false;
		// 是否关闭中
		private _isCloseing: boolean = false;
		// 页面加载效果
		private _loadEffect: component.LoadEffect;
		//打开页面的index
		protected _key: number;
		//是否模态窗
		protected _isModal: boolean = false;
		/**上一个需要隐藏的面板*/
		protected _prev_View: any;
		/**是否启用缓动大开效果*/
		// protected _isTweenOpen: boolean = true;

		/**
		 * 是否需要阴影
		 */
		protected _isNeedBlack: boolean = false;

		get isModal(): boolean {
			return this._isModal;
		}
		protected _dataSource: any;
		/**数据*/
		get dataSource(): any {
			return this._dataSource;
		}
		/**数据*/
		set dataSource(v: any) {
			this._dataSource = v;
		}

		/**当前面板位置*/
		get viewPos(): [number, number] {
			return [this._view.x, this._view.y];
		}

		constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(app);
			this._onOpenFunc = onOpenFunc;
			this._onCloseFunc = onCloseFunc;
			this.mouseThrough = true;
		}

		private onLoaded(): void {
			if (!this.isOpened) return;
			this.init();
			this.layout();
			this.onOpen();
			if (this._view instanceof View) {
				this._view.mouseThrough = this._mouseThrough;
				this._view.cacheAs = "normal";
				this._view.centerX = 0.5;
				this._view.centerY = 0.5;
			}
			this.clearLoadEffect();
		}

		// 页面初始化函数
		protected init(): void {

		}

		// 页面打开函数
		open(key: number, prevView?: any): void {
			this._key = key;
			this._prev_View = prevView;
			this.clear();
			if (this._app.uiRoot && this.parent instanceof GeneralUI)
				this._app.uiRoot.addBgCount(key);
			this.isOpened = true;
			this.createdLoadEffect();
			this._assetsLoader.load(this._asset, Handler.create(this, this.onLoaded));
		}

		createdLoadEffect(): void {
			this._loadEffect = new component.LoadEffect(this);
			this._loadEffect.width = this._clientWidth;
			this._loadEffect.height = this._clientHeight;
		}

		clearLoadEffect(): void {
			if (this._loadEffect) {
				this._loadEffect.destroy();
				this._loadEffect = null;
			}
		}

		/**
		 * 添加事件侦听(子类重写方法添加各类监听)
		 * Page页面打开，关闭函数会处理监听的开启和关闭
		 */
		protected set addListener(isAdd: boolean) {

		}

		private _mouseThrough = true;
		setMouseThrough(v: boolean): void {
			this._mouseThrough = v;
			if (this._view instanceof View) {
				this._view.mouseThrough = this._mouseThrough;
			}
		}

		inFrontAll(): void {
			this.parent && this.parent.addChild(this);
		}

		// 页面打开时执行函数
		protected onOpen(): void {
			this._onOpenFunc && this._onOpenFunc(this);
			if (this._prev_View && this._prev_View.parent)
				this._prev_View.parent.visible = false;
			if (this._view && this._view.hasOwnProperty("btn_close"))
				this._view.btn_close.on(LEvent.CLICK, this, this.close);//更多
			//添加页面相关监听
			this.addListener = true;

			if (this._isNeedBlack)
				this.drawBlack();
			// if (this._isTweenOpen && this._view) {
			// 	Laya.Tween.from(this._view, { scaleX: 0.1, scaleY: 0.1 }, 300, Laya.Ease.cubicIn);
			// }
		}

		// 打开其他页面
		protected openOtherPage(key: number, container?: PageContainer, onOpenFunc?: Function, onCloseFunc?: Function): Page {
			if (!container) {
				container = this.parent as PageContainer;
			}
			if (!container) {
				return null;
			}
			return container.open(key, onOpenFunc, onCloseFunc);
		}

		// 清理下页面
		protected clear(): void {
			this.clearLoadEffect();
			if (this._view) {
				for (let key in this._view) {
					let node = this._view[key];
					if (node instanceof Sprite && !node.parent) {
						node.destroy(true);
					}
				}
				this._view.destroy(true);
				this._view = null;
			}
			this._assetsLoader.clear();
		}

		// 重新布局
		protected layout(): void {
			if (this._view) {
				let scaleX = this._clientWidth / this._view.width;
				let scaleY = this._clientHeight / this._view.height;
				let scale = Math.min(scaleX, scaleY);
				this._view.scale(scale, scale);
				this._view.x = (this._clientWidth - this._view.width * scale) / 2;
				this._view.y = (this._clientHeight - this._view.height * scale) / 2;
			}
		}

		private _blackSprite: Sprite;
		/**
		 * 绘制黑底
		 */
		private drawBlack(): void {
			// if (!this._isModal)
			// 	return;
			if (!this._blackSprite) {
				this._blackSprite = new Sprite();
				this._blackSprite.alpha = 0.7;
				this._blackSprite.mouseEnabled = true;
				this._blackSprite.on(LEvent.CLICK, this, this.onBlackSpriteClick);
				this.addChildAt(this._blackSprite, 0);
			}
			this._blackSprite.size(this._clientWidth, this._clientHeight);
			this._blackSprite.graphics.clear();
			this._blackSprite.graphics.drawRect(0, 0, this._clientWidth, this._clientHeight, "#000000");
		}

		/**
		 * 黑底点击事件
		 */
		private onBlackSpriteClick(): void {
			this.close();
		}
		/**
		 * 清理黑底
		 */
		private clearBlack(): void {
			if (!this._isModal)
				return;
			if (this._blackSprite) {
				// this._blackSprite.off(LEvent.CLICK, this, this.onBlackSpriteClick);
				this._blackSprite.graphics.clear();
				this._blackSprite.destroy();
				this._blackSprite = null;
			}
		}

		//是否已经释放UI计数
		private _isSubBgCount: boolean = false;
		// 页面关闭
		close(): void {
			if (this._isCloseing) {
				return;
			}
			// if (this._isTweenOpen && this._view) {
			// 	this._isCloseing = true;
			// 	Laya.Tween.to(this._view, { scaleX: .1, scaleY: 0.1 }, 300, Laya.Ease.cubicIn,
			// 		Handler.create(this, () => {
			// 			this._isCloseing = false;
			// 			this.close();
			// 		}));
			// 	this._isTweenOpen = false;
			// 	return;
			// }

			this.clearBlack();
			if (!this._isSubBgCount && this._app.uiRoot && this.parent instanceof GeneralUI) {
				this._app.uiRoot.subBgCount(this._key);
				this._isSubBgCount = true;
			}
			if (this._view && this._view.hasOwnProperty("btn_close"))
				this._view.btn_close.off(LEvent.CLICK, this, this.close);//更多
			if (this._prev_View && this._prev_View.parent)
				this._prev_View.parent.visible = true;
			//移除页面相关监听
			if (this._view) this.addListener = false;
			this._prev_View = null;
			this._isCloseing = false;
			this.isOpened = false;
			this.removeGuideEffect();
			this._onCloseFunc && this._onCloseFunc(this);
			this.dispose();
		}

		public resize(w: number, h: number, isLayout: boolean = true): void {
			super.resize(w, h);
			isLayout && this.layout();
		}

		// 释放函数
		dispose(): void {
			this.clear();
			super.dispose();
			this.removeSelf();
		}

		// 取消函数调用关闭函数
		cancel(): boolean {
			this.close();
			return true;
		}

		//新手引导特效相关
		private static _guideTextures: AssetsLoader;
		protected _guideEffect: AnimationFrame;
		private _guideArrow: LImage;
		/**显示新手引导表现
		 * @param type 类型
		 * @param step 步骤
		 */
		public showGuideEffect(type: number, step: number): void {
			//重载
		}

		/**
		 * 添加
		 * @param ex 位置x
		 * @param ey 位置y
		 * @param guideParent 父级
		 * @param direct 箭头朝向
		 */
		protected addGuideEffect(ex: number, ey: number, guideParent?: any, direct: number = 1, desc?: string, visibleFlag: boolean = false) {
			if (!this._view) return;
			this.onLoadGuideAssetOver(ex, ey, guideParent, direct, desc, visibleFlag);
		}

		private onLoadGuideAssetOver(ex: number, ey: number, guideParent?: any, direct: number = 0, desc?: string, visibleFlag: boolean = false): void {
			if (!this._view) return;
			// if (!this._guideEffect) {
			// 	this._guideEffect = new AnimationFrame(EffectMgr.EFFECT_GUIDE);
			// }
			if (this._guideEffect.parent && this._guideEffect.parent != guideParent) {
				this._guideEffect.removeSelf(false);
			}
			if (!this._guideEffect.parent) {
				if (guideParent)
					guideParent.addChild(this._guideEffect);
				else
					this._view.addChild(this._guideEffect);
			}
			this._guideEffect.pos(ex, ey - 68);
			// if(!this._guideEffect.isPlaying)
			if (!this._guideEffect.isPlaying)
				this._guideEffect.play(true);
			//换手了
			if (!this._guideArrow) {
				this._guideArrow = new LImage(Path.ui_tongyong + "shou.png");
				this._guideArrow.scale(0.8, 0.8);
				this._guideEffect.addChild(this._guideArrow);
			}
			if (!this._guideArrow || !this._guideArrow.parent) return;
			let diffx: number = -10;
			let diffy: number = -10;
			let ax: number = this._guideArrow.width;
			let ay: number = 68;
			this._guideArrow.pos(ax, ay);
			Laya.Tween.clearAll(this._guideArrow);
			this.playGuideArrow(ax, ay, diffx, diffy, 1);
			if (visibleFlag)
				this.setGuideEffectVisible(guideParent);
		}

		//重置引导特效位置
		protected resetGuideEffectPos(efx: number, efy: number): void {
			if (this._guideEffect && this._guideEffect.parent) {
				this._guideEffect.pos(efx, efy - 68);
			}
		}

		//播放新手引导箭头
		private playGuideArrow(ex: number, ey: number, diffx: number, diffy: number, status: number): void {
			if (!status || !this._guideArrow) return;
			if (status == 1) {
				Laya.Tween.to(this._guideArrow, { x: ex + diffx, y: ey + diffy }, 250, null, Handler.create(this, this.playGuideArrow, [ex, ey, diffx, diffy, 2]));
			}
			else if (status == 2) {
				Laya.Tween.to(this._guideArrow, { x: ex, y: ey }, 250, null, Handler.create(this, this.playGuideArrow, [ex, ey, diffx, diffy, 1]))
			}
		}

		//设置是否可见
		protected setGuideEffectVisible(btn: any): void {
			if (!btn || !this._guideEffect || this._guideEffect.parent != btn) return;
			if (this._guideEffect)
				this._guideEffect.visible = !btn.gray;
		}

		//移除
		protected removeGuideEffect(): void {
			if (this._guideEffect) {
				this._guideEffect.destroy();
				this._guideEffect = null;
			}
			if (this._guideArrow) {
				Laya.Tween.clearAll(this._guideArrow);
				this._guideArrow.destroy();
				this._guideArrow = null;
			}
			Page._guideTextures && Page._guideTextures.clear();

		}
	}
}