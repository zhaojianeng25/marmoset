/**
* 物品格子对象
*/
module game.gui.component {
	/** 物品格子 */
	export class Grid extends Laya.Box {
		static isDebug = true;
		//背景框   层级：1
		protected _imgBg: LImage;
		//背景底图 层级：2
		protected _imgBgIcon: LImage;
		//物品视图 层级：3
		protected _imgIcon: LImage;
		//品质视图 层级：4
		protected _imgQuality: LImage;

		//品质
		protected _quality: number = -1;

		public get icon(): LImage {
			return this._imgIcon;
		}

		public get quality(): number {
			return this._quality;
		}

		// 应用程序引用
		protected _app: AppBase;
		constructor(app: AppBase) {
			super();
			this._app = app;
		}

		//初始化--
		public init(image: any): void {
			if (!image || !image.parent) return;
			image.visible = false;
			this.pos(image.x, image.y);
			image.parent.addChild(this);
			this.setBgSkin(image.skin);
		}

		/**
		 * 设置背景宽高
		 * @param width 宽度
		 * @param height 高度
		 */
		size(width: number, height: number): Sprite {
			let sprite = super.size(width, height);
			if (this._imgBg)
				this._imgBg.size(width, height);
			return sprite;
		}

		/**
		 * 通过skin路径设置背景
		 * @param skin 图片路径
		 */
		setBgSkin(skin: string): void;
		/**
		 * 通过图片设置背景
		 * @param skin 图片
		 */
		setBgSkin(skin: LImage): void;

		setBgSkin(skin: any): void {
			if (skin instanceof LImage) {
				this._imgBg = skin;
			}
			else if (typeof (skin) == "string") {
				if (!this._imgBg) {
					this._imgBg = new LImage();
				}
				this._imgBg.skin = skin;
			}
			this._imgBg.centerX = this._imgBg.centerY = 0;
			this.size(this._imgBg.width, this._imgBg.height);
			this.addChild(this._imgBg);
		}

		/**
		 * 底图花纹图案
		 */
		setBgIcon(skin: string): void {
			if (!this._imgBgIcon) {
				this._imgBgIcon = new LImage();
				this.addChild(this._imgBgIcon);
			}
			this._imgBgIcon.skin = skin;
			this._imgBgIcon.centerX = this._imgBgIcon.centerY = 0;
		}

		/**
		 * 设置图标
		 * @param skin 图标路径
		 */
		setIcon(skin: string): void {
			if (!this._imgIcon) {
				// 创建图标
				this._imgIcon = new LImage();
				this.addChild(this._imgIcon);
				this._imgIcon.centerX = this._imgIcon.centerY = 0;
			}
			this._imgIcon.skin = skin;
		}

		/**
		 * 设置品质
		 * @param quality 品质
		 */
		setQuality(quality: number) {
			if (!this._imgQuality) {
				this._imgQuality = new LImage();
				this.addChild(this._imgQuality);
				this._imgQuality.centerX = this._imgQuality.centerY = 0;
			}
			if (quality < 0 || quality > 5) {
				this._quality = -1;
				this._imgQuality.skin = null;
				return;
			}
			this._quality = quality;
		}


		//清除图标
		public clear(): void {
			if (this._imgIcon) {
				this._imgIcon.skin = "";
			}
			this.setQuality(-1);
		}

		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			if (this._imgBg) {
				this._imgBg.destroy();
				this._imgBg = null;
			}
			if (this._imgIcon) {
				this._imgIcon.destroy();
				this._imgIcon = null;
			}
			if (this._imgQuality) {
				this._imgQuality.destroy();
				this._imgQuality = null;
			}
			super.destroy(destroyChild);
		}
	}

	/** 冷却格子 */
	export class CoolGrid extends Grid {
		//CD类型
		static CD_CIRCLE: number = 1;
		static CD_RECT: number = 2;

		//CD类型
		private _cdType: number;
		private _cdSprite: Sprite;
		private _cdEndSprite: LImage;
		//CD倒计时文本
		private _labelCD: Label;
		private _cdRectMask: Sprite;
		private _totalTime: number = 0;
		private _startTime: number = 0;
		private _isRun: boolean = false;

		constructor(app: AppBase) {
			super(app);
		}

		//开始cd
		public startCD(value: number, cd_type: number): void {
			if (value <= 0 || (this._isRun && value != this._totalTime) || !this._imgIcon) return;
			//CD类型
			this._cdType = cd_type;
			if (!this._cdSprite) {
				this._cdSprite = new Sprite();
				this._cdSprite.alpha = 0.8;
			}
			if (!this._cdSprite.parent) {
				this._imgIcon.addChild(this._cdSprite);
			}

			this.addCdEndSprite();

			if (!this._labelCD) {
				this._labelCD = new Label();
				this._labelCD.font = "Helvetica";
				this._labelCD.fontSize = 26;
				this._labelCD.color = "#ffffff";
				this._labelCD.stroke = 2;
				this._labelCD.strokeColor = "#000000";
				this._labelCD.bold = true;
				this._labelCD.align = "center";
				this._labelCD.width = this.width;
				this._labelCD.mouseEnabled = false;
			}

			if (!this._labelCD.parent) {
				this.addChild(this._labelCD);
				this._labelCD.pos(0, this.height / 2 - 15);
			}

			this._labelCD.visible = true;
			this._labelCD.text = Math.ceil(value / 1000).toString();

			//如果是方形CD 则要创建遮罩
			if (cd_type == CoolGrid.CD_RECT && !this._cdRectMask) {
				this._cdRectMask = new Sprite();
				//默认设置
				let iw: number = this._imgIcon.width == 0 ? 56 : this._imgIcon.width;
				let ih: number = this._imgIcon.height == 0 ? 56 : this._imgIcon.height;
				this._cdRectMask.graphics.drawRect(0, 0, iw, ih, "#ffffff");
				this._imgIcon.mask = this._cdRectMask;
			}

			this._startTime = Laya.timer.currTimer;
			this._totalTime = value;
			if (!this._isRun) {
				this._isRun = true;
				Laya.timer.frameLoop(1, this, this.updateCD);
			}
		}
		//停止cd 
		public stopCD(): void {
			if (!this._isRun) return;
			this._isRun = false;
			this._totalTime = 0;
			this._startTime = 0;
			// this._labelCD.x = this.width / 2 - 8;
			Laya.timer.clear(this, this.updateCD);
			if (this._cdSprite) {
				this._cdSprite.destroy(true);
				this._cdSprite = null;
			}
			//CD结束小特效
			this.playCdEndSprite();
			this._labelCD.text = "";
			this._labelCD.visible = false;
		}

		//播放cd结束小特效
		public playCdEndSprite(): void {
			if (!this._imgIcon) return;
			this.addCdEndSprite();
			this._cdEndSprite.visible = true;
			this._cdEndSprite.alpha = 1;
			this._cdEndSprite.scale(1, 1);
			Laya.Tween.clearAll(this._cdEndSprite);
			Laya.Tween.to(this._cdEndSprite, { scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 400, null, Handler.create(this, () => {
				if (this._cdEndSprite) this._cdEndSprite.visible = false;
			}));
		}
		private addCdEndSprite(): void {
			if (!this._cdEndSprite) {
				this._cdEndSprite = new LImage(this._imgIcon.skin);
				this._cdEndSprite.visible = false;
				this._cdEndSprite.anchorX = this._cdEndSprite.anchorY = 0.5;
				this._cdEndSprite.zOrder = 99;
			}

			if (!this._cdEndSprite.parent) {
				this.addChild(this._cdEndSprite);
				this._cdEndSprite.pos(this.width / 2, this.height / 2);
			}

		}

		//cd心跳
		private updateCD(): void {
			if (!this._isRun) return;

			let remain_time: number = this._totalTime - (Laya.timer.currTimer - this._startTime);
			if (remain_time <= 0) {
				//时间到了
				this.stopCD();
			}
			else {
				this.drawCD(remain_time / this._totalTime * 360);
				if (remain_time <= 1000 && remain_time > 0) {
					this._labelCD.text = this.round(remain_time / 1000, 1).toString();
					// this._labelCD.x = this.width / 2 - 18;
				} else
					this._labelCD.text = Math.ceil(remain_time / 1000).toString();
			}
		}

		/**
		 * 保留小数
		 * v : 值
		 * e : 保留的位数
		 */
		private round(v, e) {
			let t = 1;
			for (; e > 0; t *= 10, e--);
			for (; e < 0; t /= 10, e++);
			return Math.round(v * t) / t;
		}

		//绘制cd
		private drawCD(angle: number): void {
			if (!this._cdSprite) return;
			angle = 360 - angle;
			this._cdSprite.graphics.clear();
			let cx: number = this._imgIcon.width / 2;
			let cy: number = this._imgIcon.height / 2;
			let rad: number = this._cdType == CoolGrid.CD_CIRCLE ? cx : 80;
			this._cdSprite.graphics.drawPie(cx, cy, rad, angle - 90, - 90, "#000000");
		}

		public clear(): void {
			this.stopCD();
			super.clear();
		}

		destroy(destroyChild?: boolean): void {
			this.clear();
			if (this._cdRectMask) {
				this._cdRectMask.destroy(true);
				this._cdRectMask = null;
			}
			if (this._cdEndSprite) {
				this._cdEndSprite.destroy(true);
				this._cdEndSprite = null;
			}
			if (this._labelCD) {
				this._labelCD.destroy(true);
				this._labelCD = null;
			}
			super.destroy(destroyChild);
		}
	}


	/** 有叠加数物品格子 */
	export class StackGrid extends CoolGrid {
		// 叠加数文本
		protected _labelCount: Label;
		// 数量
		protected _count: number;

		public get count(): number {
			return this._count;
		}

		constructor(app: AppBase) {
			super(app);
		}

		/**
		 * 设置叠加数量
		 * @param count 数量
		 * @param isNeedOne 当数量为1时，是否显示
		 */
		public setCount(count: number, isNeedOne: boolean = false): void {
			if (count == 0 || (count == 1 && !isNeedOne)) {
				this._count = 0;
				if (this._labelCount) this._labelCount.text = "";
				return;
			}
			this._count = count;
			this.createLabelCount();
			this._labelCount.text = EnumToString.sampleNum(count);
			//位置
			this._labelCount.right = 15;
			this._labelCount.bottom = 15;
		}

		//创建
		protected createLabelCount(): void {
			if (this._labelCount) return;
			//叠加数文本
			this._labelCount = new Label();
			this._labelCount.fontSize = 26;
			//白色
			this._labelCount.color = "#ffffff";
			this.addChild(this._labelCount);
			this._labelCount.align = "right";
			//描边
			this._labelCount.stroke = 2;
			this._labelCount.strokeColor = "#000000";
		}

		//清除图标
		public clear(): void {
			this.setCount(0);
			super.clear();
		}

		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			if (this._labelCount) {
				this._labelCount.destroy();
				this._labelCount = null;
			}
			super.destroy(destroyChild);
		}
	}


	/** 模板格子 */
	export class TemplateGrid extends StackGrid {
		// 物品模板id
		protected _tempData: any;
		//调试格子文本
		private _labelInfo: Label;

		constructor(app: AppBase) {
			super(app);
		}

		public get entryID(): number {
			if (this._tempData)
				return this._tempData.id;
			return 0;
		}

		public get tempData(): any {
			return this._tempData;
		}

		// 设置数据
		setData(value: any, count: number = 1): void {
			this.clear();
			if (!value) return;
			this._tempData = value;
			//判断是否要区分性别
			let iconStr = StringU.substitute("{0}{1}.png", this.getFolder(value.type), value.icon);
			if (!Laya.loader.getRes(iconStr)) {
				//默认图片
				this.setIcon(Path.ui + "icon/1/item_0.png");
			} else {
				this.setIcon(iconStr);
			}
			if (value.quality >= 0)
				this.setQuality(value.quality);

			this.setCount(count);

			//是否开启Debug模式
			if (Grid.isDebug) {
				if (!this._labelInfo) {
					this._labelInfo = new Label();
					this._labelInfo.color = '#ffffff';
					this._labelInfo.bgColor = '#000000';
					this._labelInfo.alpha = .8;
					this._labelInfo.font = 'SimHei';
					this._labelInfo.fontSize = 20;
					this.addChild(this._labelInfo);
					this._labelInfo.pos(0, 0);
				}
				let str = "";
				str += "ID = " + value.id + "\n";
				this._labelInfo.text = str;
			}
		}

		/**
		 * 根据类型获取图标前缀
		 * @param type 物品类型
		 */
		protected getFolder(type: number): string {
			return Path.ui + "icon/1/";
		}

		clear(): void {
			this._tempData = null;
			if (this._labelInfo) {
				this._labelInfo.text = "";
			}
			super.clear();
		}

		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			if (this._labelInfo) {
				this._labelInfo.destroy(true);
				this._labelInfo = null;
			}
			super.destroy(destroyChild);
		}
	}



	/** 可以查看详情的模板格子 */
	export class TemplateInfoGrid extends TemplateGrid {
		constructor(app: AppBase) {
			super(app);
			this.on(LEvent.CLICK, this, this.onGridClick);
		}

		// 设置数据
		setData(value: any, count: number = 1, arrow: number = 0, strongLv: number = 0): void {
			if (!value) return;
			super.setData(value, count);
			// this.setForgingLv(strongLv);
			// if (arrow > 0)
			// 	this.showArrow();
		}


		//点击事件
		protected onGridClick(): void {
			if (!this._tempData) return;
		}

		public clear(): void {
			super.clear();
		}

		// 释放时清理干净
		destroy(destroyChild?: boolean): void {
			this.clear();
			this.off(LEvent.CLICK, this, this.onGridClick);
			super.destroy(destroyChild);
		}
	}
}