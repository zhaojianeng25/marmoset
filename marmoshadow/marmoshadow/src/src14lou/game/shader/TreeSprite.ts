module game.shader {
	import RenderContext = laya.renders.RenderContext;
	import RenderSprite = laya.renders.RenderSprite;
	// import WebGLContext2D = laya.webgl.canvas.WebGLContext2D;
	import Buffer = laya.webgl.utils.Buffer;
	import IndexBuffer2D = laya.webgl.utils.IndexBuffer2D;
	import VertexBuffer2D = laya.webgl.utils.VertexBuffer2D;
	import TreeShader = game.shader.TreeShader;
	import TreeShaderValue = game.shader.TreeShaderValue;

	/**
	 * 此类需继承自显示对象类。
	 * 在此类中使用了自定义的着色器程序。
	 * 注意：使用自定义着色器时，需要设置此显示对象类的渲染模式： this._renderType |= RenderSprite.CUSTOM;	并且需要重写此类的渲染处理函数。
	 *
	 */
	export class TreeSprite extends Laya.Sprite {
		/** 顶点缓冲区。		 */
		private vBuffer: VertexBuffer2D;
		/** 片元缓冲区。		 */
		private iBuffer: IndexBuffer2D;
		private vbData: Float32Array;
		private ibData: Uint16Array;
		private iNum: number = 0;
		/** 着色器变量。		 */
		private shaderValue: TreeShaderValue;

		//震幅，默认3，可选(0-10)
		public mapWater:MapWater;
		private _texture: Texture;
		private _waterSample:Texture;
		// 贴图加载器
		protected _assetsLoader:AssetsLoader;

		constructor(mapWater:MapWater, textureUrl: string, waterSampleUrl:string) {
			super();
			this.mapWater = mapWater;
			this.width = mapWater.width;
			this.height = mapWater.height;
			this._assetsLoader = new AssetsLoader();
			let assets = [textureUrl, waterSampleUrl]
			this._assetsLoader.load(assets, Handler.create(this, this.init, assets));
		}

		/**
		 * 初始化此类。
		 * @param	texture 纹理对象。
		 * @param	vb 顶点数组。
		 * @param	ib 顶点索引数组。
		 */
		private init(textureUrl: string, waterSampleUrl:string): void
		{
			this._texture = Laya.loader.getRes(textureUrl);
			this._waterSample = Laya.loader.getRes(waterSampleUrl);

			this.vBuffer = VertexBuffer2D.create();
			this.iBuffer = IndexBuffer2D.create();

			this.ibData = new Uint16Array(0);

			let texWidth: number = this._texture.width;
			let texHeight: number = this._texture.height;

			let vbArray: Array<any> = [];
			//在顶点数组中放入4个顶点
			//每个顶点的数据：(坐标X,坐标Y,		 u,v)				
			vbArray.push(0, 		0,		   0, 0);
			vbArray.push(texWidth, 	0, 		   1, 0);
			vbArray.push(texWidth, 	texHeight, 1, 1);
			vbArray.push(0, 		texHeight, 0, 1);

			let ibArray: Array<any> = [];
			//在顶点索引数组中放入组成三角形的顶点索引。
			//三角形的顶点索引对应顶点数组vbArray 里的点索引，索引从0开始。
			ibArray.push(0, 1, 3);//第一个三角形的顶点索引。
			ibArray.push(3, 1, 2);//第二个三角形的顶点索引。
			
			this.iNum = ibArray.length;

			this.vbData = new Float32Array(vbArray);
			this.ibData = new Uint16Array(ibArray);

			this.vBuffer.append(this.vbData);
			this.iBuffer.append(this.ibData);

			this.shaderValue = new game.shader.TreeShaderValue();
			this.shaderValue.textureHost = this._texture;
			//树根坐标
			this.shaderValue.tree_root = [500/texWidth, 500/texHeight];
			this.shaderValue.tree_movexy = [0,0];
										   
			//设置当前显示对象的渲染模式为自定义渲染模式。
			this._renderType |= RenderSprite.CUSTOM;
		}
		

		//重写渲染函数。
		public customRender(context: RenderContext, x: number, y: number): void {
			if(!this._texture) return;
			this.shaderValue.tree_movexy[0] = Math.cos(Laya.timer.currTimer/500) * 0.009;
			logd("customRender", this.shaderValue.tree_movexy[0]);
			
			// if(context.ctx instanceof WebGLContext2D){
			// 	context.ctx.setIBVB(x, y, 
			// 	this.iBuffer, this.vBuffer, this.iNum, null, TreeShader.shader, this.shaderValue, 0, 0);
			// }
		}

		public clear():void{
			//素材卸载
			this._assetsLoader.clear();
		}
	}
}