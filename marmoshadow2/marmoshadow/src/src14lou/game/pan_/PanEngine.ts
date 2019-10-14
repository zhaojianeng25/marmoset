/**
* name 
*/
module pan{
	import Engine = Pan3d.Engine;
	import Object3D = Pan3d.Object3D;
	import Camera3D = Pan3d.Camera3D;
	import Matrix3D = Pan3d.Matrix3D;
	import TimeUtil = Pan3d.TimeUtil;

	import LightVo = Pan3d.LightVo;

	import Context3D = Pan3d.Context3D;

	import PathManager = Pan3d.PathManager;
	
	import UIManager = Pan3d.UIManager;
	import UIData = Pan3d.UIData;
	
	import TextJumpType = Pan3d.TextJumpType;
	import BloodUIShader = Pan3d.BloodUIShader;
	import TextJumpUiDrawAndRefreash = Pan3d.TextJumpUiDrawAndRefreash;
	import BloodUIRenderComponent = Pan3d.BloodUIRenderComponent;
	import BloodUICompenent = Pan3d.BloodUICompenent;
	import TextJumpUiVo = Pan3d.TextJumpUiVo;

	export class PanEngine{
		static htmlScale: number = 0.5;

		static update(): void {
			TimeUtil.update();
			// 各自去update
			// SceneManager.update();
		}
		static init(canvas: HTMLCanvasElement, callback: Function): void {
			// 重写方法
			this.overrideMethods();
			// 初始化计时器
			TimeUtil.init();
			// 动作表初始化
			CharAction.init();
			// 初始化场景数据
			this.initSceneData(canvas);
			// 影子初始化
			Engine.initShadow();
			Engine.initPbr();
			// 初始化ui配置
			this.initUIConf(callback);
			// 初始化技能path
			PathManager.init();
		}
		// 重写方法
		static overrideMethods(): void {
			let TextJumpUiDrawAndRefreash_makeData = TextJumpUiDrawAndRefreash.prototype.makeData;
			TextJumpUiDrawAndRefreash.prototype.makeData = function (): void {
				if (!this._data) return;
				var vo: TextJumpUiVo = this._data;
				this.dtime = vo.endtime;
				this.pos = vo.pos;
				var txtcolor:string;
				if(vo.type == TextJumpType.NORMALDAMAGE || vo.type == TextJumpType.TREATMENT) txtcolor = "NUM"+(50+vo.type);
				else if(vo.type == TextJumpType.MYNORMALDAMAGEUP || vo.type == TextJumpType.MYNORMALDAMAGE) txtcolor = Pan3d.ArtFont.num53;
				else if(vo.type == TextJumpType.NORMALDAMAGEUP) txtcolor = "NUM"+(40+vo.type);
				if(txtcolor){
					var rec = this.parent.uiAtlas.getRec(this.textureStr);
					var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
					var distion = Pan3d.ArtFont.getInstance().getAirFontWidth(ctx, String(this._data.str), txtcolor);
					var $width = 121;
					var $height = 33;
					Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE0", new Pan3d.Rectangle((rec.pixelWitdh - $width )/ 2, 0, $width, $height), Pan3d.UIData.publicUi);
					Pan3d.ArtFont.getInstance().writeFontToCtxLeft(ctx, String(this._data.str), txtcolor, (rec.pixelWitdh - distion )/ 2, 4);
					Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
				}else{
					var $width = 0;
					var $height = 0;
					switch(vo.type){
						case TextJumpType.DODGE:
						case TextJumpType.FREEZE:
						case TextJumpType.MISS:
							$width = 75;
							$height = 50;
							break;
						case TextJumpType.VERTIGO:
						case TextJumpType.RESISTANCE:
							$width = 82;
							$height = 46;
							break;
						case TextJumpType.ATTACKADD:
						case TextJumpType.ATTACKREDUCE:
							$width = 100;
							$height = 42;
							break;
						case TextJumpType.DEFENSEADD:
						case TextJumpType.DEFENSEREDUCE:
							$width = 100;
							$height = 42;
							break;
						case TextJumpType.IMMUNE:
							$width = 73;
							$height = 54;
							break;
					}
					if($width && $height){
						var rec = this.parent.uiAtlas.getRec(this.textureStr);
						var ctx = Pan3d.UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
						Pan3d.UiDraw.cxtDrawImg(ctx, "TYPE" + vo.type, new Pan3d.Rectangle((rec.pixelWitdh - $width)/2, 0, $width, $height), Pan3d.UIData.publicUi);
						Pan3d.TextureManager.getInstance().updateTexture(this.parent.uiAtlas.texture, rec.pixelX, rec.pixelY, ctx);
					}else{
						TextJumpUiDrawAndRefreash_makeData.apply(this, []);
					}
				}
			}

			let TextJumpUiDrawAndRefreash_update = TextJumpUiDrawAndRefreash.prototype.update;
			TextJumpUiDrawAndRefreash.prototype.update = function (): void {
				if(!this._data) return;
                this.time = Pan3d.TimeUtil.getTimer();
                if (this.time >= this.dtime) {
                    if (this.ui && this.ui.parent) {
                        this.ui.parent.removeChild(this.ui);
                    }
                    this._data = null;
                    return;
                }
				BloodMgrDef.changeRules(this, this._data, this.time);
			}

			let BloodUIShader_getVertexShaderString = BloodUIShader.prototype.getVertexShaderString;
			BloodUIShader.prototype.getVertexShaderString = function (): string {
				var $str: string =
					"attribute vec3 v3Pos;" +
					"attribute vec3 v2uv;" +
					"uniform vec4 ui[30];" +
					"uniform vec4 lifenum[30];" +
					"uniform float height[1];" +
					"varying vec2 v_texCoord;\n" +
					"varying vec4 v_lifenum;\n" +
					"varying float v_height;" +
					"void main(void)" +
					"{" +
					" v_lifenum = lifenum[int(v2uv.z)];" +
					" v_height = height[0];" +
					" v_texCoord = vec2(v2uv.x , v2uv.y );" +
					" vec4  data = ui[int(v2uv.z)];" +
					"   vec3 pos = vec3(0.0,0.0,0.0);" +
					"   pos.xy = v3Pos.xy *data.zw * 2.0;" +
					"   pos.x += data.x * 2.0 - 1.0;" +
					"   pos.y += -data.y * 2.0 + 1.0;" +
					"   vec4 vt0= vec4(pos, 1.0);" +
					"   gl_Position = vt0;" +
					"}"
				return $str
			}

			let BloodUIShader_getFragmentShaderString = BloodUIShader.prototype.getFragmentShaderString;
			BloodUIShader.prototype.getFragmentShaderString = function (): string {
				var $str: string =
					"precision mediump float;\n" +
					"uniform sampler2D s_texture;\n" +
					"varying vec2 v_texCoord;\n" +
					"varying vec4 v_lifenum;\n" +
					"varying float v_height;" +
					"void main(void)\n" +
					"{\n" +
					"vec2  v_uv = v_texCoord;" +
					"if(v_texCoord.x>=v_lifenum.x){;\n" +
					"v_uv.y = v_uv.y+v_lifenum.y;" +
					"}else{;\n" +
					"v_uv.y = v_uv.y+v_lifenum.y+v_height;"+
					"}"+
					"vec4 infoUv = texture2D(s_texture, v_uv.xy);\n" +
					"infoUv.xyz *= infoUv.w;\n" +
					"gl_FragColor = infoUv;\n" +
					"}"
				return $str
			}

			let BloodUIRenderComponent_update = BloodUIRenderComponent.prototype.update;
			BloodUIRenderComponent.prototype.update = function (): void {
				if (!this.visible || this._uiList.length == 0) return;
				Pan3d.Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
				Pan3d.Scene_data.context3D.setProgram(this.program);
				if (this.nextTime < Pan3d.TimeUtil.getTimer() || this.renderData2.length != this._uiList.length * 4) {
					if (this.renderData2.length != this._uiList.length * 4) {
						this.renderData2 = new Float32Array(this._uiList.length * 4);
					}
					for (var i: number = 0; i < this._uiList.length; i++) {
						var $bloodUICompenent: BloodUICompenent = <BloodUICompenent>this._uiList[i];
						var a: number = $bloodUICompenent.lifeNum / 100;
						var b: number = (2*$bloodUICompenent.colortype) * 8 / 32;
						this.renderData2[i * 4 + 0] = a;
						this.renderData2[i * 4 + 1] = b;
					}
					this.nextTime = Pan3d.TimeUtil.getTimer() + 300;
				}
				Pan3d.Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
				Pan3d.Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);
				Pan3d.Scene_data.context3D.setVcFloat(this.shader, "height", [8/32]);
				Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
				Pan3d.Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
				if (this.uiAtlas) {
					Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
				}
				Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
				if (this.modelRenderList) {
					for (var i: number = 0; i < this.modelRenderList.length; i++) {
						this.modelRenderList[i].update();
					}
				}
			}

			let BloodUIRenderComponent_creatBaseComponent = BloodUIRenderComponent.prototype.creatBaseComponent;
			BloodUIRenderComponent.prototype.creatBaseComponent = function ($skinName: string): BloodUICompenent {
				var ui: BloodUICompenent = BloodUIRenderComponent_creatBaseComponent.apply(this, [$skinName]);
				ui.width = 60;
				return ui;
			}
		}
		// 初始化SceneData
		static initSceneData(canvas: HTMLCanvasElement): void {
			mainpan3d.canvas = canvas;// 初始化3d引擎
			
			var isIpad = /ipad/i.test(navigator.userAgent);
			var isIphone = /iPhone/i.test(navigator.userAgent);
			var isAndroid = /android/i.test(navigator.userAgent);
			var isWindow = /iindow/i.test(navigator.userAgent);
			var sUserAgent = navigator.userAgent.toLowerCase();
			////console.log("--sUserAgent--",sUserAgent,isIpad,isIphone,isAndroid,isWindow);
			if (isIpad || isIphone || isAndroid) {
				Scene_data.isPc = false;
			} else {
				Scene_data.isPc = true;
			}

        	Scene_data.fileRoot = "common/res_3d/";

			Scene_data.viewMatrx3D = new Matrix3D;
			Scene_data.vpMatrix = new Matrix3D;
			Scene_data.canvas3D = canvas;
			Scene_data.context3D = new Context3D();
			Scene_data.context3D.init(canvas);

			Scene_data.cam3D = new Camera3D;
			Scene_data.focus3D = new Object3D;
			Scene_data.focus3D.x = 0;
			Scene_data.focus3D.y = 0;
			Scene_data.focus3D.z = 0;
			Scene_data.focus3D.rotationY = 0;
			Scene_data.focus3D.rotationX = -45
			Scene_data.cam3D.distance = 250;
		
			Scene_data.light = new LightVo();
			Scene_data.supportBlob = true;
		}
		// 初始化ui相关
		static initUIConf(callback: Function): void {
			// 初始化ui管理器
			UIManager.getInstance().init();
			
			let resList: Array<any> = new Array;
			resList.push({ xmlurl: "ui/arpgui/textlist.xml", picurl: "ui/arpgui/textlist.png", name: UIData.textlist });
			resList.push({ xmlurl: "ui/arpgui/textlist.xml", picurl: "ui/arpgui/textlist.png", name: UIData.publicUi });
			let resCount = resList.length;
			// let completeCount = 0;
			UIData.init(resList,
				() => {
					// 加载完成
					callback();
				},
				(num: number) => {
					// 加载计数
				}
			);
			// UIData.setDesignWH(720, 1280);
			UIData.setDesignWH(540, 960);
			this.resetSize(Scene_data.canvas3D.width, Scene_data.canvas3D.height);
		}

		static resetSize(width?: number, height?: number, scale: number = 1): void {
			if (isNaN(width)) {
				width = document.body.clientWidth;
			}
			if (isNaN(height)) {
				height = document.body.clientHeight;
			}

			this.htmlScale = scale * .5;

			Scene_data.stageWidth = width;
			Scene_data.stageHeight = height;

			Scene_data.context3D.resetSize(Scene_data.stageWidth, Scene_data.stageHeight);

			UIManager.getInstance().resize();
			// BloodManager.getInstance().resize();

			scene2d.Override2dEngine.htmlScale = this.htmlScale;
			Pan3d.UIData.Scale = this.htmlScale*3;
		
			scene2d.Override2dEngine.resetViewMatrx3D();
		}
	}
}