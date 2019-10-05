/**
* name 
*/
module pan {

	import Object3D = Pan3d.Object3D;
	import Camera3D = Pan3d.Camera3D;

	import Matrix3D = Pan3d.Matrix3D;
	import MathClass = Pan3d.MathClass;
	import Vector2D = Pan3d.Vector2D;
	import Vector3D = Pan3d.Vector3D;

	import TimeUtil = Pan3d.TimeUtil;
	import GroupDataManager = Pan3d.GroupDataManager;
	import ShadowManager = Pan3d.ShadowManager;

	import BaseRes = Pan3d.BaseRes;
	import GroupRes = Pan3d.GroupRes;
	import GroupItem = Pan3d.GroupItem;


	import Context3D = Pan3d.Context3D;
	import Scene_data = Pan3d.Scene_data;

	import SceneManager = Pan3d.SceneManager;

	import ParticleManager = Pan3d.ParticleManager;
	import CombineParticle = Pan3d.CombineParticle;

	import ProgrmaManager = Pan3d.ProgrmaManager;
	import LineDisplayShader = Pan3d.LineDisplayShader;
	import GridLineSprite = Pan3d.GridLineSprite;

	import UIManager = Pan3d.UIManager;
	import BloodManager = Pan3d.BloodManager;

	export class PanScene extends layapan.LayaOverride2dSceneManager {
		// 镜头模式
		static MODE_2D: number = 1;
		static MODE_3D: number = 2;

		// 2d场景的摄像机
		protected _camera2d: Camera;
		get camera2d(): Camera {
			return this._camera2d;
		}
		set camera2d(v: Camera) {
			this._camera2d = v;
		}

		// 摄像机距离
		protected _camDistance: number;
		get camDistance(): number {
			return this._camDistance;
		}
		set camDistance(v: number) {
			this._camDistance = v;
		}

		// 摄像机焦点
		protected _focus3D: Object3D;
		get focus3D(): Object3D {
			return this._focus3D;
		}

		private _showGrid: boolean = false;
		get showGrid(): boolean {
			return this._showGrid;
		}
		set showGrid(v: boolean) {
			this._showGrid = v;
			if (v) {
				ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
				!this._gridSprite && (this._gridSprite = new GridLineSprite())
				this.addDisplay(this._gridSprite);
			}
			else {
				this._gridSprite && this._gridSprite.removeStage();
			}
		}

		private _gridSprite: GridLineSprite;

		layaRenderIndex: number = -1;

		prependTranslation: number = 0;

		// 相机模式
		private _cameraMode: number = PanScene.MODE_3D;
		set cameraMode(v: number) {
			this._cameraMode = v;
			this.is2D && this.removeFocueEvent();
		}
		get cameraMode(): number {
			return this._cameraMode;
		}
		get is2D(): boolean {
			return this._cameraMode == PanScene.MODE_2D;
		}

        protected _buffManager: PanBuffManager
		constructor() {
			super();
			// 技能预加载
			this.skillManager.preLoadSkill(getSkillUrl('spell_0001'));

			this.changeBloodManager(new layapan.LayaBloodManager)
			this._focus3D = new Object3D;
			this._camDistance = 250;

            this._buffManager = new PanBuffManager(this);
		}

		loadSceneConfigCom(obj: any): void {
			obj.quadTreeData = null; // 不要quadTreeData管理场景物件
			super.loadSceneConfigCom(obj);
		}

		private _sceneCamScale: number = 1.76;

		update(): void {
			// 更新镜头矩阵
			this.resetViewMatrx3D();
			// 更新摄像机焦点
			this.updateFocus();

			
			Scene_data.context3D.clearTest();
			Scene_data.context3D.setDepthTest(true);
			this.updateMovieFrame();

			MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵

			if (this.prependTranslation) {
				Pan3d.Scene_data.vpMatrix.identity();
				Pan3d.Scene_data.vpMatrix.prepend(Pan3d.Scene_data.viewMatrx3D);
				Pan3d.Scene_data.vpMatrix.prepend(Pan3d.Scene_data.cam3D.cameraMatrix);
				Pan3d.Scene_data.vpMatrix.appendTranslation(0, 0, this.prependTranslation)
			}

			ParticleManager.getInstance().updateTime();
			SkillManager.getInstance().update();
			this.updateStaticDiplay();
			Scene_data.context3D.setWriteDepth(true);

			this.updateMovieDisplay();
			ShadowManager.getInstance().update();
			Scene_data.context3D.setWriteDepth(false);
			this.updateSpriteDisplay();
			ParticleManager.getInstance().update();
			Scene_data.context3D.setDepthTest(false);
			UIManager.getInstance().update();
		}

		// 更新镜头矩阵
		resetViewMatrx3D():void{
			if (this._cameraMode == PanScene.MODE_3D) {
				Scene_data.viewMatrx3D.identity()
				var fovw: number = Scene_data.stageWidth;
				var fovh: number = Scene_data.stageHeight;
				Scene_data.sceneViewHW = Scene_data.stageHeight;//Math.max(fovw, fovh)
				// Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this._sceneCamScale, 1, 50, Scene_data.camFar);
				Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(this._sceneCamScale, 1, 50, 3000);
				Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
			}
			else {
				Scene_data.viewMatrx3D.identity()
				var fovw: number = Scene_data.stageWidth
				var fovh: number = Scene_data.stageHeight
				Scene_data.sceneViewHW = Scene_data.stageHeight;//Math.max(fovw, fovh)
				Scene_data.viewMatrx3D.appendScale(1 / Scene_data.sceneViewHW * 2, 1 / Scene_data.sceneViewHW * 2, 1 / 1000);
				Scene_data.viewMatrx3D.appendScale(1 * (Scene_data.sceneViewHW / fovw * 2), fovw / fovh * (Scene_data.sceneViewHW / fovw * 2), 1);
				Scene_data.viewMatrx3D.appendScale(2 * PanEngine.htmlScale, 2 * PanEngine.htmlScale, 1);
			}
		}

		private updateFocus(): void {
			let x = this._focus3D.x;
			let z = this._focus3D.z;
			if (this._camera2d) {
				x = this._camera2d.x;
				if (this._camera2d.bufferLeft < 0) {
					x -= this._camera2d.bufferLeft;
				}

				z = this._camera2d.y;
				if (this._camera2d.bufferTop < 0) {
					z -= this._camera2d.bufferTop;
				}
				z -= this._camera2d.centerPointYOffset;
				z = - z;	// 2dY轴对应的3d坐标z轴正好相反

				x = x / 2;
				z = z / 2 / (Math.sin(45 * Math.PI / 180));
			}
			this._focus3D.x = x;
			this._focus3D.z = z;
			Scene_data.focus3D = this._focus3D;
			Scene_data.cam3D.distance = this._camDistance;
		}

		private addGridLineSprite(): GridLineSprite {
			return this._gridSprite;
		}

		//播放技能  $fileName技能文件名， $effectName特效名字
		playSkillByChar(char: SceneChar, fileName: string, effectName: string, completeFun?: Function, hitPosLis?: Array<Vector3D>): void {
            if (!char._scene.ready) {
                return;
            }
          
            var skill: layapan.OverrideSkill = this.skillManager.getSkill(getSkillUrl(fileName), effectName);
            if (!skill.keyAry) {
                return;
            }
            if (skill) {
                skill.reset();
                skill.isDeath = false;
            	skill.needSound = true;
            }
			skill.configFixEffect(char, () => {
				completeFun && completeFun.call(null);
			}, hitPosLis);
            this.skillManager.playSkill(skill)
		}

		//播放弹道技能  $fileName技能文件名， $effectName特效名字
		playTrajectoryByChar(char: SceneChar, target: SceneChar, fileName: string, effectName: string, completeFun?: Function): void {
            if (!char._scene.ready) {
                return;
            }
			var skill: layapan.OverrideSkill = this.skillManager.getSkill(getSkillUrl(fileName), effectName);
			if (!skill.keyAry) {
				return;
			}
			if (skill) {
				skill.reset();
				skill.isDeath = false;
            	skill.needSound = true;
			}
			skill.configTrajectory(char, target, () => {
				completeFun && completeFun.call(null);
			});
			this.skillManager.playSkill(skill);
		}

		// 添加特效
		addParticle(v: string, scale:number, callback: Function): void {
            this.groupDataManager.scene =this
            this.groupDataManager.getGroupData(Scene_data.fileRoot + v, (groupRes: GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: GroupItem = groupRes.dataAry[i];
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        var particle: CombineParticle = this.particleManager.getParticleByte(Scene_data.fileRoot + item.particleUrl);
						particle.scaleX = particle.scaleY = particle.scaleZ = scale;
                        this.particleManager.addParticle(particle);
						callback.call(null, particle);
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
		}

		// 移除特效
		removeParticle(v: CombineParticle): void {
			this.particleManager.removeParticle(v);
			v.destory();
		}

		// 飘字
		flyText(type: number, data: any, isbottom: boolean = false):void{
			if (type == battle.FlyTextType.NUM_TAB){
				// 数字 
		   		 var e: topfront.BaseFrontVo = this.layaForntPanel.drawLabel(1, { color: data.color, num: data.num }, false);
           		 e.x =data.x-e.width/2;
           		 e.y = data.y - 160;
            	 e.alpha = 1;

            	 e.timeLen = 1000 //1秒后会自己动清理  //默认为10秒会清理
           		 e.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
                 taget.y--
           	  }
			}else if(type == battle.FlyTextType.NUM_PIC)//数字+底图
			{
				var b: topfront.BaseFrontVo = this.layaForntPanel.drawLabel(2, "wenzibeijing", true);
           	 	b.x = data.x-b.width/2;
            	b.y = data.y - 160;
			
				var e: topfront.BaseFrontVo = this.layaForntPanel.drawLabel(1, data, false);
            	e.x = b.x + 30;
            	e.y = b.y;
            	e.alpha = 1;

            	e.timeLen = 2000 //1秒后会自己动清理  //默认为10秒会清理
            	e.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
                	taget.y--
                	taget.alpha =1-t;
            	}
				b.timeLen = 2000 //1秒后会自己动清理  //默认为10秒会清理
				b.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
             		taget.y--
                	taget.alpha =1-t;
            	}
			}else if(type == battle.FlyTextType.PIC){
				//文字
				var b: topfront.BaseFrontVo = this.layaForntPanel.drawLabel(2, data.name, true);
            	b.x = data.x-b.width/2;
           		b.y = data.y - 80;
				b.timeLen = 2000
				b.scale = 0.6
				b.fun = (taget: topfront.BaseFrontVo, t: number) => { //每个对象的帧回调， 有对象和T时间值
                taget.y--
                taget.alpha =1-t;
            	}
			}
		}

		/**显示buff*/
        public showBuff(types:number[], pos:Vector3D = null): BuffTitleMesh {
            let buff:BuffTitleMesh =  this._buffManager.getCharTitleMeshVo(types);
			if(pos) buff.pos = pos;
			return buff;
        }

		/**移除buff*/
		public removeBuff(buff:BuffTitleMesh):void{
			buff.clear = true;
			buff = null;
		}
	

		private _isStat:boolean;
		private _speedR:number = 0.1;		//旋转速度
		private _rangeX:number[] = [-45,-15];//x旋转范围
		private _speedD:number = 1.5;			//距离速度
		private _rangeD:number[] = [430,600];//距离范围
		addFocueEvent(v:boolean=false): void {
			if (this.is2D) {
				return;
			}
			this._isStat = v;
			Laya.stage.on(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.on(LEvent.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.on(LEvent.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.on(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
			if(this._isStat){
				Laya.stage.on(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
				Laya.stage.on(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
			}
		}

		removeFocueEvent(): void {
			Laya.stage.off(LEvent.MOUSE_DOWN, this, this.onMouseDown);
			Laya.stage.off(LEvent.MOUSE_UP, this, this.onMouseUp);
			Laya.stage.off(LEvent.RIGHT_MOUSE_DOWN, this, this.onRightMouseDown);
			Laya.stage.off(LEvent.RIGHT_MOUSE_UP, this, this.onRightMouseUp);
			Laya.stage.off(LEvent.MOUSE_MOVE, this, this.onMouseMove);
			Laya.stage.off(LEvent.MOUSE_WHEEL, this, this.onMouseWheel);
		}

		private onMouseWheel(e: LEvent): void {
			if (this.is2D) {
				return;
			}
			let dist:number = this._camDistance + e.delta*this._speedD;
			dist = Math.min(Math.max(dist,this._rangeD[0]),this._rangeD[1]);
			this._camDistance = dist;
		}

		private _lastX: number = 0;
		private _lastZ: number = 0;

		private _lastRotationX: number = 0;
		private _lastRotationY: number = 0;

		private _lastMousePos: Vector2D = new Vector2D();
		private _isMouseDown: boolean;

		private onMouseDown(e: LEvent): void {
			if (this.is2D) {
				return;
			}
			this._lastMousePos.x = e.stageX;
			this._lastMousePos.y = e.stageY;
			this._lastRotationY = this._focus3D.rotationY;
			this._lastRotationX = this._focus3D.rotationX;
			this._isMouseDown = true;
		}

		private onMouseUp(e: LEvent): void {
			this._isMouseDown = false;
		}



		private _isRightMouseDown: boolean;
		private onRightMouseDown(e: LEvent): void {
			if (this.is2D) {
				return;
			}
			this._lastMousePos.x = e.stageX;
			this._lastMousePos.y = e.stageY;
			this._lastX = this._focus3D.x;
			this._lastZ = this._focus3D.z;
			this._isRightMouseDown = true;
		}

		private onRightMouseUp(e: LEvent): void {
			this._isRightMouseDown = false;
		}

		private onMouseMove(e: LEvent): void {
			var addx: number = e.stageX - this._lastMousePos.x;
			var addy: number = e.stageY - this._lastMousePos.y;
			if (this._isMouseDown) {
				this._focus3D.rotationY = this._lastRotationY - addx*this._speedR;
				let rotationX:number = this._lastRotationX - addy*this._speedR;
				rotationX = Math.min(Math.max(rotationX,this._rangeX[0]),this._rangeX[1]);
				this._focus3D.rotationX = rotationX;
			}
			if (this._isRightMouseDown) {
				// todo可以的话跟鼠标对应
				this._focus3D.x = this._lastX - addx;
				this._focus3D.z = this._lastZ - addy;
			}
		}

		resize(): void {
			this.bloodManager.resize();
		}

		reset(): void {
			this['_currentUrl'] = null;
			Scene_data.fogColor = [0, 0, 0];
			Scene_data.gameAngle = 0;
			Scene_data.focus3D.rotationY = 0;
			Scene_data.fogData = [1000, 0.003];
			Scene_data.light = new Pan3d.LightVo();

			Scene_data.focus3D.x = 0;
			Scene_data.focus3D.y = 0;
			Scene_data.focus3D.z = 0;
			Scene_data.focus3D.rotationX = 0;
			Scene_data.focus3D.rotationY = 0;
			Scene_data.focus3D.rotationZ = 0;
			this.clearStaticScene();
			this.ready = true;
		}
	}
}