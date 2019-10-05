/**
* Avatar基类
*/
module game.scene {

	export class AvatarBase {

		// 未加载黑衣人贴图
		protected static _unloadTexture: Texture;
		// 头顶元素间隔
		protected static HEAD_NODE_INTERVAL = 10;
		//影子绘制相关
		protected static _shadowTexture: Texture;
		protected static _shadow_offsetX: number;
		protected static _shadow_offsetY: number;

		//血量绘制相关
		protected static _hpBGTexture: Texture;//血量背景
		protected static _hpFTexture: Texture;//血量前景
		protected static _hpZTexture: Texture;//血量前景
		protected static _hpTTexture: Texture;//血量黑线

		protected static _angerBGTexture: Texture;//怒气背景
		protected static _angerFTexture: Texture;//怒气前景
		protected static _angerZTexture: Texture;//怒气前景
		protected static _angerTTexture: Texture;//怒气黑线

		// 头顶标识
		protected static HEAD_MASK_BOSS: Texture;
		protected static HEAD_MASK_BOSS_WORLD: Texture;
		protected static HEAD_MASK_JINGYING: Texture;
		protected static HEAD_MASK_XIALV: Texture;
		protected static HEAD_MASK_XIADAO: Texture;
		protected static HEAD_MASK_LIANSHENG: Texture[] = [];
		protected static HEAD_MASK_FUSHEN: Texture;
		//仙果小标识
		protected static HEAD_MASK_XIANGUOS: Texture;
		//仙果大标识
		protected static HEAD_MASK_XIANGUOL: Texture;
		//红队
		protected static HEAD_MASK_REDTEAM: Texture;
		//蓝队
		protected static HEAD_MASK_BLUETEAM: Texture;

		//仙剑标志
		protected static _headMaskJian: Texture;
		//闲聊背景图
		protected static _gossTexture: Texture;

		//表情气泡
		protected static _biaoQingBubble: Texture;
		protected static _isLoadingFace: boolean = false;

		// 浮空评分 
		protected static _floatingScore: number = 1 << 21;
		// 正常评分 
		protected static _noneScore: number = 1 << 22;
		// 死亡评分 
		protected static _diedScore: number = 1 << 23;
		// 地表评分 
		protected static _landScore: number = 1 << 23;

		//创建一个颜色滤镜对象,红色
		static redFilter: ColorFilter;
		//创建一个颜色滤镜对象,绿色
		static greenFilter;
		//创建一个颜色滤镜对象,白色
		static whiteFilter;

		//影子素材
		static initRes(): void {
			this._unloadTexture = Laya.loader.getRes("scene/common/unload.png");
			this._shadowTexture = Laya.loader.getRes("scene/sole/shaodw.png");
			this._hpBGTexture = Laya.loader.getRes("scene/common/HP_B.png");
			this._hpFTexture = Laya.loader.getRes("scene/common/HP_F.png");
			this._hpZTexture = Laya.loader.getRes("scene/common/HP_Z.png");
			this._hpTTexture = Laya.loader.getRes("scene/common/HP_T.png");
			this._angerBGTexture = Laya.loader.getRes("scene/common/ANGER_B.png");
			this._angerFTexture = Laya.loader.getRes("scene/common/ANGER_F.png");
			this._angerZTexture = Laya.loader.getRes("scene/common/ANGER_Z.png");
			this._angerTTexture = Laya.loader.getRes("scene/common/ANGER_T.png");
			this._gossTexture = Laya.loader.getRes("scene/common/ppk.png");

			this.HEAD_MASK_BOSS = Laya.loader.getRes("scene/mask/Boss1.png");
			this.HEAD_MASK_BOSS_WORLD = Laya.loader.getRes("scene/mask/Boss.png");
			this._headMaskJian = Laya.loader.getRes("scene/mask/jian.png");
			this.HEAD_MASK_JINGYING = Laya.loader.getRes("scene/mask/jingying.png");
			this.HEAD_MASK_XIALV = Laya.loader.getRes("scene/mask/xialv.png");
			this.HEAD_MASK_XIADAO = Laya.loader.getRes("scene/mask/xiadao.png");
			this.HEAD_MASK_FUSHEN = Laya.loader.getRes("scene/mask/fuxing.png");
			for (let i = 0; i < 11; i++) {
				let num: string = "";
				if (i < 10) num = "0" + i;
				else num = i.toString();
				let str = StringU.substitute("scene/common/ls_{0}.png", num);
				let texture: Texture = Laya.loader.getRes(str);
				this.HEAD_MASK_LIANSHENG.push(texture);
			}
			this.HEAD_MASK_XIANGUOS = Laya.loader.getRes("scene/mask/xianguo0.png");
			this.HEAD_MASK_XIANGUOL = Laya.loader.getRes("scene/mask/xianguo1.png");
			this.HEAD_MASK_REDTEAM = Laya.loader.getRes("scene/mask/xg_1.png");
			this.HEAD_MASK_BLUETEAM = Laya.loader.getRes("scene/mask/xg_2.png");

			//影子素材偏移
			this._shadow_offsetX = this._shadowTexture.width / 2;
			this._shadow_offsetY = this._shadowTexture.height / 2;

			//创建一个颜色滤镜对象,红色
			AvatarBase.redFilter = new ColorFilter([
				//由 20 个项目（排列成 4 x 5 矩阵）组成的数组，红色
				1, 0, 0, 0, 0, //R
				0, 0, 0, 0, 0, //G
				0, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
			]);

			//创建一个颜色滤镜对象,绿色
			AvatarBase.greenFilter = new ColorFilter([
				0, 0, 0, 0, 0, //R
				1, 0, 0, 0, 0, //G
				0, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
			]);

			//创建一个颜色滤镜对象,白色
			AvatarBase.whiteFilter = new ColorFilter([
				2.5, 0, 0, 0, 0, //R
				2.5, 0, 0, 0, 0, //G
				2.5, 0, 0, 0, 0, //B
				0, 0, 0, 1, 0, //A
			]);
		}

		//加载表情资源
		static loadFaceRes(): void {
			if (this._isLoadingFace) return;
			let res = new AssetsLoader();
			res.load([Path.atlas_ui + "effect/biaoqing.atlas"], Handler.create(this, this.loadFaceComplete));
			this._isLoadingFace = true;
		}
		static loadFaceComplete(): void {
			//表情相关
			this._biaoQingBubble = Laya.loader.getRes("ui/effect/biaoqing/bubble.png");
			this._isLoadingFace = false;
		}

		protected _pos: Vector2 = new Vector2();
		get pos(): Vector2 {
			return this._pos;
		}
		// protected _x: number = 0;
		// get x():number{
		// 	return this._x;
		// }
		// protected _y: number = 0;
		// get y():number{
		// 	return this._y;
		// }
		/*处于水层*/
		protected _atWaterLayer: Boolean = false;
		//处于透明层
		protected _atTranLayer: Boolean = false;
		//绘制的透明度
		protected _drawAlpha: number = 1;
		protected _drawX: number = 0;
		protected _drawY: number = 0;
		protected _drawAHeight: number = 0;
		// 缩放
		protected _scale: number = 1;
		get scale(): number {
			return this._scale;
		}

		//是否可见
		private _visible: boolean = true;
		get visible():boolean{
			return this._visible;
		}
		setVisible(v:boolean):void{
			this._visible = v;
		}

		//是否需要绘制试图
		_isNeedDrawView: boolean = true;
		get isNeedDrawView():boolean{
			return this._isNeedDrawView;
		}
		set isNeedDrawView(v:boolean){
			this._isNeedDrawView = v;
			this.setVisible(v);
		}

		/**
		 * 评估分数 
		 * 规划		数字越大|  反向
		 *  预留  地表 死亡 正常 浮空 | y*10  x*10
		 *  5bit 1bit 1bit 1bit 1bit |14bit  7bit
		 */
		sortScore: number;
		/**
		 * 位于地表 
		 */
		protected _isLand: boolean = false;


		// 排序状态评分
		protected _sortStateScore: number = AvatarBase._noneScore;

		//滤镜
		drawFilters: Array<any>;

		//启用红色滤镜
		private _enableRedFilter: boolean = false;
		//启用绿色滤镜
		private _enableGreenFilter: boolean = false;
		//启用白色滤镜
		private _enablewhiteFilter: boolean = false;

		// 3d场景引用
		protected _scene3d:PanScene;

		// 是否支持鼠标拾取
		protected _hitTestEnabled = false;
		set hitTestEnabled(v:boolean){
			this._hitTestEnabled = v;
		}
		

		constructor(scene3d:PanScene) {
			this._scene3d = scene3d;
		}

		get isLand(): boolean {
			return this._isLand;
		}

		set isLand(v: boolean) {
			this._isLand = v;
		}

		get headHeight(): number {
			return this._drawAHeight * this._scale;
		}
		//更新深度排序分数
		protected updateSortScore() {
			/////////////////// 深度排序评分 /////////////////
			// 14位
			let y: number = Math.floor(this._pos.y * 10) & 0x3FFF;
			// 7位
			let x: number = Math.floor(this._pos.x * 10) & 0x03FF;
			// 得到分数
			this.sortScore = (y << 7) + x;
			this.sortScore = 0x1FFFFF - this.sortScore;
			// 加上状态评分
			this.sortScore += this._sortStateScore;
		}

		get enableRedFilter(): boolean {
			return this._enableRedFilter;
		}
		set enableRedFilter(v: boolean) {
			if (this._enableRedFilter == v) return;
			this._enableRedFilter = v;
			if (v) {
				this.drawFilters = [AvatarBase.redFilter];
			} else {
				this.drawFilters = null;
			}
		}

		public get enableGreendFilter(): boolean {
			return this._enableGreenFilter;
		}
		public set enableGreenFilter(v: boolean) {
			if (this._enableGreenFilter == v) return;
			this._enableGreenFilter = v;
			if (v) {
				this.drawFilters = [AvatarBase.greenFilter];
			} else {
				this.drawFilters = null;
			}
		}

		public get enableWhiteFilter(): boolean {
			return this._enablewhiteFilter;
		}
		public set enableWhiteFilter(v: boolean) {
			if (this._enablewhiteFilter == v) return;
			this._enablewhiteFilter = v;
			if (v) {
				this.drawFilters = [AvatarBase.whiteFilter];
			} else {
				this.drawFilters = null;
			}
		}

		onDrawBefore(diff: number, scene: SceneRoot): void {
		}
		// 绘制底下部分
		onDrawBottom(g: Graphics, scene: SceneRoot): void {

		}

		// 主绘制
		onDraw(diff: number, g: Graphics, scene: SceneRoot): void {

		}

		// 绘制怒气部分
		onDrawAnger(g: Graphics, scene: SceneRoot, offsetY: number): number {
			return 0;
		}

		// 绘制名字部分
		onDrawName(g: Graphics, scene: SceneRoot, offsetY: number): number {
			return 0;
		}

		// 绘制头顶标识部分
		onDrawMask(g: Graphics, scene: SceneRoot, offsetY: number): number {
			return 0;
		}

		// 绘制表情部分
		onDrawFace(g: Graphics, scene: SceneRoot, offsetY: number): number {
			return 0;
		}

		// 闲聊
		onDrawGossip(g: Graphics, scene: SceneRoot, offsetY: number): number {
			return 0;
		}


		/**
		 * 鼠标碰撞检测
		 */
		hitTest(xMouse: number, yMouse: number, scene: SceneRoot, hit3DPos:Pan3d.Vector3D): boolean {
			return false;
		}

		get name(): string {
			return "";
		}

		get guid(): string {
			return "";
		}

		public clear(checkNow: boolean): void {
			this.drawFilters = null;
		}
	}
}