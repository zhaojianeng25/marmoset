module game.shader
{
	import Shader = laya.webgl.shader.Shader;
	
	/**
	 * 自定义着色器
	 *
	 */
	export class WaterShader extends Shader
	{
		/**
		 * 当前着色器的一个实例对象。
		 */
		public static shader:WaterShader = new WaterShader();
		
		constructor()
		{
			var vs:string = 
"attribute vec2 position;" +
"attribute vec2 uv;" +
"attribute vec2 water_uv;"+

"uniform vec2 size;" +
"uniform mat4 mmat;" +

"varying vec2 v_uv;" +
"varying vec2 v_water_uv;" +

"void main(){" +
"    vec4 pos =mmat*vec4(position.x,position.y,0,1);" +
"    gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);" +
"    v_uv = uv;" +
"	 v_water_uv = water_uv;"+
"}";
			var ps:string = 
"precision mediump float;"+
"varying vec2 v_uv;"+
"varying vec2 v_water_uv;" +

"uniform sampler2D texture;"+
"uniform sampler2D water_sample;"+
"uniform mat4 water_mat4;"+
"uniform vec2 water_movexy;"+

"void main(){"+
"	vec2 scroll_uv = v_water_uv - water_movexy;"+
"	scroll_uv.y = mod(scroll_uv.y,1.0);"+
"	vec4 map_color = texture2D(water_sample, scroll_uv);"+
// "	gl_FragColor = map_color.rgba;"+
"	map_color.xy = map_color.xy - vec2(0.5,0.5);"+
"	map_color.xy = map_color.xy * map_color.ww;"+
"	vec4 offset = map_color * water_mat4;"+
"   vec4 t_color = texture2D(texture, vec2(v_uv + offset.xy));"+
"   gl_FragColor = t_color.rgba;"+
"}";
			super(vs, ps, "WaterShader");
		}
	}

	
}