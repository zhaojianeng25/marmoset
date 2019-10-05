module game.shader
{
	import WebGLContext = laya.webgl.WebGLContext;
	import Value2D = laya.webgl.shader.d2.value.Value2D;
	import CONST3D2D = laya.webgl.utils.CONST3D2D;
	
	/**
	 * 着色器的变量定义。
	 */
	export class TreeShaderValue extends Value2D
	{
		public uv:any;
		//树根坐标
		public tree_root:any = [0,0];
		public tree_movexy:any = [0,0];
		
		constructor()
		{
			super(0, 0);
			
			var _vlen:number = 4 * CONST3D2D.BYTES_PE;
			//定点数据格式描述：[属性长度, 属性类型,false, 属性起始位置索引 * CONST3D2D.BYTES_PE];
			this.position 	= [2, WebGLContext.FLOAT, false, _vlen, 0];
			this.uv 		= [2, WebGLContext.FLOAT, false, _vlen, 2 * CONST3D2D.BYTES_PE];
		}
	}
}