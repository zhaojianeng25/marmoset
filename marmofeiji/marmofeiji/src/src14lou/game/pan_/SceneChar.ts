/**
* name
*/
module pan {
	export class SceneChar extends layapan.LayaSceneChar {
		constructor() {
			super();
		}
        get pScale(): number {
            return this._pScale;
        }
        set pScale(v: number) {
			//影响武器的大小 场景武器太大 调整为0.73 对特效位置产生影响 需要在/0.73
            this._pScale = 0.73*v;
            this._mountChar && (this._mountChar.scale = v);
            this._wingDisplay && (this._wingDisplay.scale = v);
            this.scale = v;
            if (this._skinMesh) {
                this.tittleHeight = (this._skinMesh.tittleHeight+0) * v;
            }
        }
        onMeshLoaded(): void {
            if (this._skinMesh) {
                this.tittleHeight = (this._skinMesh.tittleHeight+0) * this._pScale;
            }
        }
        set bloodEnable(v: boolean) {
			if(!this._scene) return;
            this._bloodEnable = v;
			if(this._bloodEnable){
				if (!this._charBloodVo) {
					this._charBloodVo = (<layapan.LayaOverride2dSceneManager>this._scene).bloodManager.getBloodLineMeshVo()
					this._charBloodVo.colortype = this._bloodColor;
				}
			}else{
				if(this._charBloodVo){
					this._charBloodVo.clear = true;
					this._charBloodVo = null;
				}
			}
        }
        set nameEnable(v: boolean) {
			this._nameEnable = v;
			if(this._nameEnable){
				if (!this._charNameVo) {
					this._charNameVo = (<layapan.LayaOverride2dSceneManager>this._scene).bloodManager.getCharNameMeshVo(this.charName)
				} else {
					this._charNameVo.name = this.charName;
					this._charNameVo.needDraw = true;
				}
			}else{
				if(this._charNameVo) this._charNameVo.needDraw = false;
			}
		}
		 set titleEnable(v: boolean) {
			this._titleEnable = v;
			if(this._titleEnable){
				if (!this._charTitleVo || this._charTitleVo.isrebulit == true) {
					this._charTitleVo = (<layapan.LayaOverride2dSceneManager>this._scene).bloodManager.getCharTitleMeshVo(this.charTitle)
				} else {
					this._charTitleVo.num = this.charTitle;
					this._charTitleVo.needDraw = true;
					this._charTitleVo.clear =  false;
                    this._charTitleVo.isrebulit = false;
                   
				}
			}else{
				if(this._charTitleVo)
				{
					this._charTitleVo.needDraw = false;
					 this._charTitleVo.clear =  true; 
					 this._charTitleVo.isrebulit = true;
				}
			}
		}
        public refreshPos(): void {
            let posY: number = this.py + this.tittleHeight;
            if (this.isMount) {
                posY += 20;
            }
            //处理怒气条位置
            if (this._charAngerVo) {
                this._charAngerVo.pos.x = this.px;
                this._charAngerVo.pos.y = posY;
                this._charAngerVo.pos.z = this.pz;
                this._charAngerVo.visible = this._resultVisible;
                posY += (this._isCamera2D ? 7 : 7);
            }
            //处理血条和名字位置 -FIXME--0
            if (this._charBloodVo) {
                this._charBloodVo.pos.x = this.px;
				//处理血条高度
                this._charBloodVo.pos.y = posY+132;
                this._charBloodVo.pos.z = this.pz;
                this._charBloodVo.visible = this._resultVisible;
                posY += (this._isCamera2D ? 15 : 15);
            }
            if (this._charNameVo) {
                this._charNameVo.pos.x = this.px;
                this._charNameVo.pos.y = posY
                this._charNameVo.pos.z = this.pz;
                this._charNameVo.visible = this._resultVisible;

                // posY += 6;
            }
			if (this._charTitleVo) {
                this._charTitleVo.pos.x = this.px;
                this._charTitleVo.pos.y = posY
                this._charTitleVo.pos.z = this.pz;
                this._charTitleVo.visible = this._resultVisible;

                // posY += 6;
            }
        }

		public moveTopos(v: Pan3d.Vector2D): void {
			this.moveToPosV2d = v;
			var $nmr: Pan3d.Vector2D = this.pixelPos.sub(this.moveToPosV2d);
			this.pRotationY  = 180-Math.atan2($nmr.x, $nmr.y) * 180 / Math.PI;
		}
		public set2dPos($x: number, $y: number): void {
			super.set2dPos($x, $y);
			this.pixelPos = new Pan3d.Vector2D($x, $y)
		}
		private pixelPos: Pan3d.Vector2D
		private moveToPosV2d: Pan3d.Vector2D;
		public updateFrame(t: number): void {
			if (this.moveToPosV2d) {
				var $dis: number = Pan3d.Vector2D.distance(this.pixelPos, this.moveToPosV2d)
				if ($dis > 10) {
					var $nmr: Pan3d.Vector2D = this.pixelPos.sub(this.moveToPosV2d);
					$nmr.normalize()
					$nmr.scaleBy(3)
					this.pixelPos.x += $nmr.x
					this.pixelPos.y += $nmr.y
					super.set2dPos(this.pixelPos.x, this.pixelPos.y);
					this.play(Pan3d.CharAction.WALK);
				} else {
					this.play(Pan3d.CharAction.STANAD);
				}
			}
			super.updateFrame(t);
		}

		mouseClik(lineA: Vector3D, lineB: Vector3D): boolean {

			var $pos: Vector3D = Scene_data.cam3D.cameraMatrix.transformVector(this.getCurrentPos())
			if ($pos.z < Scene_data.cam3D.distance / 3) { //在Z后面
				return null
			}

			var hitVec2: Vector2D = MathUtil.math3DWorldtoDisplay2DPos(lineB)
			// if (this._skinMesh) {
			// 	if (!this._hitBox2DItem) {
			// 		this._hitBox2DItem = new Array;
			// 	}
			// 	this._hitBox2DItem.length = 0
			// 	for (var j: number = 0; j < this._skinMesh.hitPosItem.length; j++) {
			// 		var temppp: Vector3D = this.posMatrix.transformVector(this._skinMesh.hitPosItem[j])
			// 		this._hitBox2DItem.push(MathUtil.math3DWorldtoDisplay2DPos(temppp))
			// 	}
			// 	for (var i: number = 0; i < this._triIndex.length / 3; i++) {

			// 		TestTriangle.baseTri.p1 = this._hitBox2DItem[this._triIndex[i * 3 + 0]];
			// 		TestTriangle.baseTri.p2 = this._hitBox2DItem[this._triIndex[i * 3 + 1]];
			// 		TestTriangle.baseTri.p3 = this._hitBox2DItem[this._triIndex[i * 3 + 2]];

			// 		if (TestTriangle.baseTri.checkPointIn(hitVec2)) {
			// 			return true
			// 		}
			// 	}

			// } else {

				if (Vector2D.distance(hitVec2, MathUtil.math3DWorldtoDisplay2DPos(this.posMatrix.position)) < 50) {
					return true
				}

			// }
			return false
		}
		/**销毁*/
		public destory(): void {
			this._scene.removeMovieDisplay(this);
       		super.destory();

		}
		public updateMatrix(): void {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
			this._rotationX = 35;
            this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
            this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
            this.posMatrix.appendTranslation(this._x, this._y, this._z);
        }
		// 是否播放中
		isPlaying():boolean{
			if(this._completeState != 1 || !this._curentFrame) return true;
			if(!this._animDic.hasOwnProperty(this.curentAction)) return false;
			return this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1);
        }
		showActionEnd($action:string):void{
            this.curentAction = $action;
            this._completeState = 1;
            var animData: Pan3d.AnimData = this._animDic[$action];
            this._actionTime = 2*Scene_data.frameTime*animData.matrixAry.length;
            this.updateFrame(0);
        }
	}
}