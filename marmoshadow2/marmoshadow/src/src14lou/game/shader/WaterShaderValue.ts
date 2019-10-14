module game.shader
{
	import WebGLContext = laya.webgl.WebGLContext;
	import Value2D = laya.webgl.shader.d2.value.Value2D;
	import CONST3D2D = laya.webgl.utils.CONST3D2D;
	
	/**
	 * 着色器的变量定义。
	 */
	export class WaterShaderValue extends Value2D
	{
		public uv:any;
		public water_uv:any;
		public water_sample:WebGLTexture;
		public water_mat4:any;
		public water_movexy:any = [0,0];
		
		constructor()
		{
			super(0, 0);
			
			var _vlen:number = 6 * CONST3D2D.BYTES_PE;
			//定点数据格式描述：[属性长度, 属性类型,false, 属性起始位置索引 * CONST3D2D.BYTES_PE];
			this.position 	= [2, WebGLContext.FLOAT, false, _vlen, 0];
			this.uv 		= [2, WebGLContext.FLOAT, false, _vlen, 2 * CONST3D2D.BYTES_PE];
			this.water_uv 	= [2, WebGLContext.FLOAT, false, _vlen, 4 * CONST3D2D.BYTES_PE];
		}
	}
}