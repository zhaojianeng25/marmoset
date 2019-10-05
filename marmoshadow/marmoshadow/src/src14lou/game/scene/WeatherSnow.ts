/**
* name 
*/
module game.scene {
	export class WeatherSnow extends WeatherBase {

		constructor(app: AppBase) {
			super(app);
			this._assetsLoader = new AssetsLoader();
			this._assetsLoader.load([Path.atlas_scene + "weather/snow.atlas"], Handler.create(this, this.onResComplete));
		}

		protected onResComplete(): void {
			//贴图集
			//雪素材
			this.TEXTURES_SETTING = new Array<Texture>(4);
			this.TEXTURES_SETTING[0] = Laya.loader.getRes("scene/weather/snow/snow_far.png");	//远
			this.TEXTURES_SETTING[1] = Laya.loader.getRes("scene/weather/snow/snow_far2.png");	//远2
			this.TEXTURES_SETTING[2] = Laya.loader.getRes("scene/weather/snow/snow_mid.png");	//中
			this.TEXTURES_SETTING[3] = Laya.loader.getRes("scene/weather/snow/snow_nearly.png"); //近

			//远景，中景，近景数量定义
			this.LEN_SETTING = new Array<number>(this.TEXTURES_SETTING.length);
			this.LEN_SETTING[0] = 100;
			this.LEN_SETTING[1] = 100;
			this.LEN_SETTING[2] = 80;
			this.LEN_SETTING[3] = 10;

			//远景，中景，近景速度定义
			this.SPEED_SETTING = new Array<number>(this.TEXTURES_SETTING.length);
			this.SPEED_SETTING[0] = 0.08;
			this.SPEED_SETTING[1] = 0.16;
			this.SPEED_SETTING[2] = 0.24;
			this.SPEED_SETTING[3] = 0.32;

			//设置
			this._lens = this.LEN_SETTING.concat();

			this.enable();
		}

		public enable():void{
			super.enable();
			//开始播放下雨
			this._app.playMusic("sounds/s_snow.mp3", 0);
		}
		
		public disable():void{
			super.disable();
			//开始播放下雨
			this._app.stopMusic();
		}

		protected onUpdate(scene:SceneRoot, g: Graphics): void {
			let camera = scene.camera;
			//得出持续时间
			var durationMS: number = Laya.timer.currTimer - this._startTime;
			var breadthTime: number = durationMS / 1000;

			//位置起点
			var quadID: number = 0;
			//初始化
			for (var imgId: number = 0; imgId < this._lens.length; imgId++) {
				//选择贴图
				let texture: Texture = this.TEXTURES_SETTING[imgId];

				//移动量
				var moveY: number = this.SPEED_SETTING[imgId] * durationMS;
				var moveX: number = moveY * .4;

				//数量
				var count: number = this._lens[imgId];
				for (var i: number = 0; i < count; i++) {
					//速度
					var rnd: number = this.getQuadRnd(quadID);
					//震幅
					var breadth: number = Math.cos(breadthTime * rnd) * 80;
					var newX: number = this.getQuadStartX(quadID) - camera.bufferLeft + moveX + breadth;
					var newY: number = this.getQuadStartY(quadID) - camera.bufferTop + moveY;
					//循环的作用
					newX %= camera.bufferWidth;
					newY %= camera.bufferHeight;
					if (newX < 0) newX = camera.bufferWidth + newX;

					//设置新位置,绘制点
					g.drawTexture(texture, newX, newY);

					quadID++;
				}
			}
		}
	}
}