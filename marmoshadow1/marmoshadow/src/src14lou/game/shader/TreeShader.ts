module game.shader
{
	import Shader = laya.webgl.shader.Shader;
	
	/**
	 * 自定义着色器
	 *
	 */
	export class TreeShader extends Shader
	{
		/**
		 * 当前着色器的一个实例对象。
		 */
		public static shader:TreeShader = new TreeShader();
		
		constructor()
		{
			var vs:string = 
"attribute vec2 position;" +
"attribute vec2 uv;" +

"uniform vec2 size;" +
"uniform mat4 mmat;" +
"varying vec2 v_uv;" +

"void main(){" +
"    vec4 pos =mmat*vec4(position.x,position.y,0,1);" +
"    gl_Position = vec4((pos.x/size.x-0.5)*2.0, (0.5-pos.y/size.y)*2.0, pos.z, 1.0);" +
"    v_uv = uv;" +
"}";
			var ps:string = 
"precision mediump float;"+
"varying vec2 v_uv;"+

"uniform sampler2D texture;"+
"uniform vec2 tree_root;"+
"uniform vec2 tree_movexy;"+

"void main(){"+
// "	if(v_uv.x > tree_root.x && v_uv.y > tree_root.y){"+
// "		t_color.rgba = vec4(0,0,0,1.0);"+
// "	}"+
"	vec2 dist = tree_root - v_uv;"+
"	dist = vec2((dist.x*dist.x + dist.y*dist.y) * tree_movexy.x, 0);"+
"   vec4 t_color = texture2D(texture, vec2(v_uv + dist.xy));"+
"	"+
"   gl_FragColor = t_color.rgba;"+
"}";
			super(vs, ps, "TreeShader");
		}
	}

	
}