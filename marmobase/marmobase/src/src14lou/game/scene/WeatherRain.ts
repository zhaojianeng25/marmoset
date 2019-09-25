/**
* name 
*/
module game.scene {
	export class WeatherRain extends WeatherBase {
		//下一帧打雷
		private _nextThunder: number;

		constructor(app: AppBase) {
			super(app);
			this._assetsLoader = new AssetsLoader();
			this._assetsLoader.load([Path.atlas_scene + "weather/rain.atlas"], Handler.create(this, this.onResComplete));
		}

		protected onResComplete(): void {
			//雪素材
			this.TEXTURES_SETTING = new Array<Texture>(4);
			this.TEXTURES_SETTING[0] = Laya.loader.getRes("scene/weather/rain/rain_far.png");	//远
			this.TEXTURES_SETTING[1] = Laya.loader.getRes("scene/weather/rain/rain_mid.png");	//中
			this.TEXTURES_SETTING[2] = Laya.loader.getRes("scene/weather/rain/rain_mid2.png");	//中2
			this.TEXTURES_SETTING[3] = Laya.loader.getRes("scene/weather/rain/rain_nearly.png"); //近

			//远景，中景，近景, 水滴数量定义
			this.LEN_SETTING = new Array<number>(this.TEXTURES_SETTING.length);
			this.LEN_SETTING[0] = 100;
			this.LEN_SETTING[1] = 30;
			this.LEN_SETTING[2] = 70;
			this.LEN_SETTING[3] = 10;

			//远景，中景，近景速度定义
			this.SPEED_SETTING = new Array<number>(this.TEXTURES_SETTING.length);
			this.SPEED_SETTING[0] = 0.5;
			this.SPEED_SETTING[1] = 0.7;
			this.SPEED_SETTING[2] = 0.9;
			this.SPEED_SETTING[3] = 0.32;

			//设置
			this._lens = this.LEN_SETTING.concat();

			this.enable();

			this.setNextThunderTime();
		}

		public enable():void{
			super.enable();
			//开始播放下雨
			this._app.playSound("sounds/s_rain.mp3",0);
		}
		
		public disable():void{
			super.disable();
			//开始播放下雨
			this._app.stopSound("sounds/s_rain.mp3");
		}

		private setNextThunderTime(): void {
			//10秒到40秒
			this._nextThunder = Laya.timer.currTimer + MathU.randomRange(10000, 40000);//(10000, 40000);
			// this._nextThunder = Laya.timer.currTimer + 5000;
		}

		protected onUpdate(scene:SceneRoot, g: Graphics): void {
			let camera = scene.camera;
			//得出持续时间
			var durationMS: number = Laya.timer.currTimer - this._startTime;
			var cam: Camera = camera;
			//位置起点
			var quadID: number = 0;
			//循环4层雨滴
			for (var imgId: number = 0; imgId < this.TEXTURES_SETTING.length; imgId++) {
				//选择贴图
				let texture: Texture = this.TEXTURES_SETTING[imgId];

				//移动量
				var moveY: number = this.SPEED_SETTING[imgId] * durationMS;

				//数量
				var count: number = this._lens[imgId];
				for (var i: number = 0; i < count; i++) {
					var newX: number = this.getQuadStartX(quadID) - cam.bufferLeft;
					var newY: number = this.getQuadStartY(quadID) - cam.bufferTop + moveY;

					//循环的作用
					newX %= cam.bufferWidth;
					newY %= cam.bufferHeight;
					if (newX < 0) newX = cam.bufferWidth + newX;

					//设置新位置
					g.drawTexture(texture, newX, newY);
					quadID++;
				}
			}
			
			// 地面的雨滴效果
			// this.createRainOfLand(scene, camera);

			if (Laya.timer.currTimer > this._nextThunder) {
				//随机打雷
				this.setNextThunderTime();
				scene.thunder();
			}
		}

		private createRainOfLand(scene:SceneRoot, camera:Camera):void{
			let effect = ObjectPools.malloc(EffectFrame, null, 8, 12) as EffectFrame;
			effect.setFrames("scene/weather/rain/rain_l{0}.png", 1);
			let x = camera.logicLeft + Math.random() * (camera.logicRight - camera.logicLeft);
			let y = camera.logicTop + Math.random() * (camera.logicBottom - camera.logicTop);
			effect.anchorPostion = new Vector2(x, y);
			effect.scale = Math.random() * .4 + .6;
			effect.atBottom = true;
			scene.addEffect(effect);

			// //特效测试
			// if(this.a < 200){
			// 	this.a ++;
			// 	let effect1 = ObjectPools.malloc(EffectSkeleton) as EffectSkeleton;
			// 	effect1.setLoop(true);
			// 	effect1.setData("scene/sk/shengji");
			// 	let x = camera.logicLeft + Math.random() * (camera.logicRight - camera.logicLeft);
			// 	let y = camera.logicTop + Math.random() * (camera.logicBottom - camera.logicTop);
			// 	effect1.anchorPostion = new Vector2(x, y);
			// 	// effect1.anchorObject = scene.app.sceneObjectMgr.mainUnit;
			// 	// effect1.atBottom = true;
			// 	scene.addEffect(effect1);
			// }
			
		}
		// a:number = 0;
	}
}