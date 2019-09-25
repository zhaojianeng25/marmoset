/**
* name 
*/
module game.scene {
	export class AvatarSprite extends AvatarBase {
		// 死亡延迟时间
		static DIE_DELATTIMER: number = 270;

		protected drawTextureRegX: number;
		protected drawTextureRegY: number;

		//Unit对象
		public unit: Unit;

		// 当前渲染转换矩阵
		protected _curRenderMatrix: Matrix;
		/*所有的装备，位置请参考AvatarData的枚举*/
		protected _multi_items: Array<AvatarItem>;
		protected _multi_items_mix: Array<Matrix> = new Array<Matrix>();

		protected _singleItem: AvatarItem;			/*身体or衣服装备样式*/
		protected _singleItem_mix: Matrix;
		/**
		 * 是否循环播放 
		 */
		protected Loop: boolean = true;
		private _name: string;						/*名称*/
		private _itemInvalided: boolean;				/*avatarItem失效标志*/
		protected isImageType: boolean = false;		//是否为单图片类型

		/////////////////// 基础动作信息开始 ///////////////////
		/*显示失效标志*/
		protected _drawInfoInvalided: boolean;
		/*最后一次绘制到现在的时间*/
		private _runTime: number = 0;
		/*帧率*/
		private _frameRate: number = 1;
		/*帧时间 帧/ms*/
		private _frameTime: number = 0;
		/*帧数量*/
		private _frameCount: number = 0;
		/*动画最后一帧索引*/
		private _frameLastIdx: number = 0;
		/*动画总时间*/
		private _totalTime: number = 0;
		/*速度*/
		private _animationSpeed: number = 1.0;
		//资源连接对象
		protected _linkage: AvatarLinkage = new AvatarLinkage();
		/*身体名称*/
		private _bodyName: string;
		/*皮肤名称*/
		protected _skinName: string;
		/*变身名称*/
		private _shapeShiftName: string;
		/*变身名称顺序列表，当变身名称超过一个的时候，才会使用该列表*/
		private _shapeShiftNames: Array<string>;
		/*实际读取的方向，0-4之间，5-7为镜像，到最终绘图时采用水平翻转*/
		protected _direct: number;
		//水平翻转
		protected horizontalFlip: Boolean;
		/*avatar动作*/
		protected _action: number;
		/*移动距离 单位/px*/
		protected _ani_move_Speed: number;
		/*启用休闲动作*/
		private _enableLeisureAction: Boolean = false;
		/*下一次休闲动作启动的时间*/
		private _nextLeisureStartTime: number;

		/*旋转速度*/
		private static ROTATION_SPEED: number = 1;
		//面部最终朝向
		private _targetFaceTo: number = -1;
		//面部当前朝向
		private _faceto: number = 0;
		/**
		 * 脸部朝向 8方向
		 */
		public get faceto(): number {
			return this._faceto;
		}
		/**
		 * @private
		 */
		public set faceto(value: number) {
			if (this._faceto == value) return;
			this._faceto = value;
			this.invaliDrawInfo();
		}

		/**
		 * 获取和设置速度，当前速度的倍速，数值越大，速度越快 
		 * @return 
		 * 
		 */
		public get animationSpeed(): number {
			return this._animationSpeed;
		}
		public set animationSpeed(value: number) {
			this._animationSpeed = value;
			//计算出每帧的消耗时间
			this._frameTime = this._singleItem && (this.actionStatus == AvatarData.STATE_RUNNING) ? 100 : 1000 / Math.round(this._frameRate * this._animationSpeed);
			//完整动画时长
			this._totalTime = this._frameTime * this._frameCount;
		}

		/*动作姿态*/
		private _actionStatus: number = 0;
		/**
		 * 动作 
		 * @return 
		 * 
		 */
		public get actionStatus(): number {
			return this._actionStatus;
		}
		public set actionStatus(value: number) {
			if (this._actionStatus == value) return;
			this._actionStatus = value;
			//绘制信息失效
			this.invaliDrawInfo();
		}

		/*坐骑状态*/
		protected _isRiding: boolean = false;
		protected get isRiding(): boolean {
			return this._isRiding;
		}

		// 坐骑的高度
		protected _rideHeight: number = 0;
		// 死亡时间
		private _dieTimer: number = 0;

		protected set isRiding(v: boolean) {
			this._isRiding = v;
			// this.unit.isRiding = v;
			this._rideHeight = v ? 80 : 0;
			this.updateSortScore();
		}

		//获取坐骑高度
		public get rideHeight(): number {
			return this._rideHeight;
		}

		//升空多高
		public flyToSky(value: number): void {
			this._rideHeight = value;
		}

		//开启绘制残影
		private _openDrawGhost: boolean = false;
		protected _ghost: Ghost;

		private _oid: number;
		get oid(): number {
			return this._oid;
		}
		constructor(scene3d:PanScene, pUnit: Unit) {
			super(scene3d);
			this.unit = pUnit;
			this._oid = pUnit.oid;
			this._pos.set(this.unit.pos);
			this._singleItem_mix = new Matrix();
			//生存状态发生改变
			this.unit.onLiveStatusChange = (liveStatus: number) => {
				this.updateLiveStatus(liveStatus);
			}
			this.updateLiveStatus();
		}

		//更新生成状态
		protected updateLiveStatus(liveStatus: number = null): void {
			if (this.unit.isDied) {
				if (liveStatus && !this.unit.isGameObject) {
					this._dieTimer = Laya.timer.currTimer + AvatarSprite.DIE_DELATTIMER;
				}
				else {
					this._dieTimer = 0;
					this.setVisible(false);
				}
			}
			else {
				this._dieTimer = 0;
				this.setVisible(true);
				this.stopImitateMove();
			}
			//深度排序
			this.updateSortScore();
		}

		set openDrawGhost(v: boolean) {
			this._openDrawGhost = v;
		}
		private _ghostPosX: number;
		private _ghostPosY: number;
		get ghostPosX(): number {
			return this._ghostPosX;
		}
		get ghostPosY(): number {
			return this._ghostPosY;
		}
		set ghostPosX(v: number) {
			this._pos.x = v;
			this._ghostPosX = v;
		}
		set ghostPosY(v: number) {
			this._pos.y = v;
			this._ghostPosY = v;
		}

		/**
		 * 加载 
		 * @param fullName 完整名称
		 * 
		 */
		protected loadItem(fullName: string): void {
			if (this._singleItem) {
				// 处理老的
				if (this._singleItem.itemName == fullName) {
					return;
				}
				this._singleItem.release();
				this._singleItem = null;
			}
			if (fullName && fullName.length > 0) {
				// 加载新的
				this._singleItem = AvatarItem.Get(fullName);
				this._singleItem.retain();
				this._itemInvalided = true;
			}
		}

		/*是否播放进行中*/
		protected isActionPlaying(): Boolean {
			return this._runTime < this._totalTime || this._drawInfoInvalided;
		}


		/**
		 * 获得血量百分比，如果-1，则不显示。0-1之间显示
		 */
		protected GetHealthViewPI(): number {
			let pi: number = -1;
			let unit = this.unit;
			if (!unit.isDied) {
				if (unit.isMonster || unit.isPet || unit instanceof FakeUnit) {
					pi = unit.hp / unit.maxHp;
					if((unit instanceof FakeUnit && unit.isBattleRole) || pi != 1) return pi;
				} else if (unit.isPlayer) {
					pi = unit.hp / unit.maxHp;
					pi = pi > 1 ? 1 : pi < 0 ? 0 : pi;
					return pi;
				}
			}
			return -1;
		}
		/**
		 * 获得怒气百分比，如果-1，则不显示。0-1之间显示
		 */
		protected GetAngerViewPI(): number {
			let pi: number = -1;
			let unit = this.unit;
			if (!unit.isDied) {
				if (unit.isMonster || unit.isPet || unit instanceof FakeUnit) {
					pi = unit.anger / unit.maxAnger;
					pi = pi > 1 ? 1 : pi < 0 ? 0 : pi;
					if((unit instanceof FakeUnit && unit.isBattleRole) || pi != 1) return pi;
				} else if (unit.isPlayer) {
					pi = unit.anger / unit.maxAnger;
					pi = pi > 1 ? 1 : pi < 0 ? 0 : pi;
					return pi;
				}
			}
			return -1;
		}

		/*让显示失效*/
		invaliDrawInfo(): void {
			this._drawInfoInvalided = true;
		}

		// 追加动作状态 
		attachActionStatus(atnStus: number): void {
			if (atnStus == AvatarData.STATE_BEATEN) {
				if (this.actionStatus == AvatarData.STATE_ATTACKGO || this.actionStatus == AvatarData.STATE_ATTACKGO2 ||
					this.actionStatus == AvatarData.STATE_ATTACKGO3 ||
					this.actionStatus == AvatarData.STATE_MACGO ||
					this.actionStatus == AvatarData.STATE_GECAO ||
					this.actionStatus == AvatarData.STATE_ATTCKREADY ||
					this.actionStatus == AvatarData.STATE_GECAO_2)
					return;
			}
			this.actionStatus = atnStus;
		}

		// 受击
		onBeaten(scene: SceneRoot, toward: number, type: number, data: any, isbottom: boolean = false): void {
			//if (hp <= 0) {
				//this._dieTimer = Laya.timer.currTimer + 850;
				// if (this.unit.isMonster) {
				// 	// 有几率击飞
				// 	Random.scand(values * this.unit.oid);
				// 	let randNun = Random.randFloat();
				// 	// randNun = 0
				// 	if (randNun < 0.4) {
						// 击飞了
						//this.beatBackFly(toward);
					//}
				//}
		//	}
			// Laya.timer.once(230, this, this.__onBeaten, [scene, toward, atk_type, values, hp]);
			this.__onBeaten(scene, toward, type, data, isbottom);
		}

		private __onBeaten(scene: SceneRoot,toward: number, type: number, data: any, isbottom: boolean = false): void {
			if (!this.unit) {
				return;
			}
			// 追加动作
			// this.attachActionStatus(AvatarData.STATE_BEATEN);
			if (this.unit instanceof FakeUnit && !this.unit.needBeatenEffect) return;//假的不需要受击特效
			let effect: Effect;
			if (!this.unit.isPlayer) {
				switch (type) {
					case UnitField.HIT_MISS:
						break;
					default:
						effect = ObjectPools.malloc(EffectFrame, null, 4, 12) as EffectFrame;
						effect.setData('beaten');
						// effect.anchorObject = this.unit;
						effect.anchorPostion = this.unit.pos;
						effect.scale = this._scale;
						effect.setOffset(0, -this.headHeight / 5 * 4);
						break;
				}
				if (effect) {
					scene.addEffect(effect);
				}
			}
		}

		//老坐标地址
		private _oldUnitPos: Vector2 = new Vector2(0, 0);
		protected _whiteTime = 0;
		// 绘制之前数据更新 
		onDrawBefore(diff: number, scene: SceneRoot): void {

			// 更新变换信息
			this.updateTransform(scene, diff);

			let x = this._pos.x;
			let y = this._pos.y;
			//绘制位置运算
			this._drawX = scene.camera.getScenePxByCellX(x);
			this._drawY = scene.camera.getScenePxByCellY(y);
			//深度排序
			if (x != this._oldUnitPos.x || y!= this._oldUnitPos.y) {
				//重置变量
				this._oldUnitPos.x = x;
				this._oldUnitPos.y = y;
				//是否处于透明层
				let mapData = scene.app.sceneObjectMgr.mapAssetInfo;
				let __x = MathU.parseInt(x);
				let __y = MathU.parseInt(y)
				// 是否在水上
				this._atWaterLayer = mapData.isWater(__x, __y);
				// 是否在透明点上
				this._atTranLayer = mapData.isTran(__x, __y);
				this.updateSortScore();
			}
			// 动作更新
			this.updateActionStatus();
			// 更新面部朝向
			this.updateFaceTo(diff);
		}

		// 更新变换信息
		private updateTransform(scene: SceneRoot, diff: number): void {
			// 模拟移动进行的百分比
			let imitateMoveRate = -1;
			if (this.imitateMoving) {
				// 模拟移动中
				let tempTime: number = Laya.timer.currTimer - this._imitateMoveDelayTime - this._imitateMoveStarTime;
				if (tempTime < 0) tempTime = 0;
				if (tempTime >= this._imitateMoveTotalTime) {
					if (this.isBeatFlying) {
						// 击飞还得等下死亡才能真正结束
						if (tempTime - this._imitateMoveTotalTime > 1500) {
							this.stopImitateMove();
						}
						else {
							imitateMoveRate = 0.99;
						}
					}
					else {
						this.stopImitateMove();
					}
				}
				else {
					imitateMoveRate = tempTime / this._imitateMoveTotalTime;
					switch (this.imitateMoveProgress) {
						case AvatarSprite.IMITATEMOVE_PROGRESS_0:
							if (imitateMoveRate > 13 / 21) {
								// 第一阶段完成
								this.imitateMoveProgress = AvatarSprite.IMITATEMOVE_PROGRESS_2;
							}
							break;
						case AvatarSprite.IMITATEMOVE_PROGRESS_2:
							// 触发坠落
							this.imitateMoveProgress = AvatarSprite.IMITATEMOVE_PROGRESS_3;
							this.dropGround(scene);
							break;
					}
				}
			}
			// 更新位置
			this.updatePostion(imitateMoveRate);
			// 更新缩放信息
			this.updateScale(scene, imitateMoveRate);
			// 更新透明度
			this.updateAlpha();
			// 更新发光特性
			this.enableWhiteFilter = this._whiteTime > 0;
			this.enableWhiteFilter && (this._whiteTime -= diff);
		}

		// 更新位置
		private updatePostion(imitateMoveRate: number): void {
			if (this._imitateMoveType == AvatarSprite.IMITATE_MOVE_TYPE_JUMP) return;

			if (imitateMoveRate != -1) {
				if (this._imitateMoveOffsetX && this._imitateMoveOffsetX.length) {
					let pos: number = Math.floor(imitateMoveRate * this._imitateMoveOffsetX.length);
					this._pos.x = this._imitateMoveStartX + this._imitateMoveOffsetX[pos] / 1.5;
				}
				else {
					this._pos.x = this._imitateMoveStartX + imitateMoveRate * this._imitateMoveGapX;
				}

				if (this._imitateMoveOffsetY && this._imitateMoveOffsetY.length) {
					let pos: number = Math.floor(imitateMoveRate * this._imitateMoveOffsetX.length);
					this._pos.y = this._imitateMoveStartY + this._imitateMoveOffsetY[pos] / 1.5;
				}
				else {
					this._pos.y = this._imitateMoveStartY + imitateMoveRate * this._imitateMoveGapY;
				}
			}
			else if (this._ghostPosX && this._ghostPosX > 0 && this._ghostPosY && this._ghostPosY > 0) {

			}
			else {
				this._pos.set(this.unit.pos);
			}
		}

		// 更新缩放
		protected updateScale(scene: SceneRoot, imitateMoveRate: number): void {
			this._scale = 1;
			if (imitateMoveRate != -1) {
				if (this._imitateMoveCorrectScale) {
					let len = this._imitateMoveCorrectScale.length;
					var pos: number = Math.floor(imitateMoveRate * len);
					this._scale *= this._imitateMoveCorrectScale[pos];
				}
			}
		}

		// 更新透明度
		protected updateAlpha(): boolean {
			let currTimer = Laya.timer.currTimer;
			let dispearIng: boolean = false;
			if (this._dieTimer > 0 && this._dieTimer < currTimer) {
				dispearIng = this._dieTimer + 800 < currTimer;
				if (dispearIng) {
					//消失
					this._drawAlpha -= 0.02;
					if (this._drawAlpha < 0) {
						this._drawAlpha = 0;
						this.setVisible(false);
					}
				}
			}
			if (!dispearIng) {
				this._drawAlpha = this._atTranLayer ? 0.3 : 1;
				
			}
			return dispearIng;
		}

		// 深度排序
		protected updateSortScore() {
			if (this._isLand) {
				this._sortStateScore = AvatarBase._landScore;
			}
			else if (this.unit.isDied) {
				this._sortStateScore = AvatarBase._diedScore;
			}
			else if (this._isRiding) {
				this._sortStateScore = AvatarBase._floatingScore;
			}
			else {
				this._sortStateScore = AvatarBase._noneScore;
			}
			super.updateSortScore();
		}

		// 更新动作状态
		protected updateActionStatus(): void {
			let status: number;
			if (this.isBeatFlying && this.imitateMoveProgress == AvatarSprite.IMITATEMOVE_PROGRESS_0) {
				// 击飞初始阶段 播放受击动作（没有受击动作）
				// status = AvatarData.STATE_BEATEN;
			}
			else if (this.unit.isDied) {
				//游戏对象 侠侣没有死亡动作
				if (!this.unit.isGameObject) {
					if (!this._dieTimer) {
						//死了
						status = AvatarData.STATE_DIED;
					}
					else if (this._dieTimer < Laya.timer.currTimer) {
						//正在死了
						status = AvatarData.STATE_DIING;
					}
				}
			}
			else {
				// 优先动作要播放完毕才能播放其他
				switch (this.actionStatus) {
					case AvatarData.STATE_DIING:		//死亡ing
					case AvatarData.STATE_ATTACKGO:		//攻击出击
					case AvatarData.STATE_ATTACKGO2:	//攻击出击
					case AvatarData.STATE_ATTACKGO3:	//攻击出击
						if (this.isActionPlaying())		//还在播放则不执行下面的语句
							return;
				}
				// 移动优先
				if (this.unit.isMoving || this._ghost) {
					status = AvatarData.STATE_RUNNING;
				}
				else {
					// 优先动作要播放完毕才能播放其他
					switch (this.actionStatus) {
						case AvatarData.STATE_BEATEN:		//受击
						case AvatarData.STATE_LEISURE:		//休闲
							if (this.isActionPlaying())		//还在播放则不执行下面的语句
								return;
					}
					// 如果不能执行休闲动作 那就是站立动作
					status = this.ranLeisureAction() ? AvatarData.STATE_LEISURE : AvatarData.STATE_STAND;
				}
			}
			this.actionStatus = status;
		}

		// 随机播放休闲动作
		protected ranLeisureAction(): boolean {
			//启用休闲动作，则随机时间+ 随机动作，随机方向
			if (Laya.timer.currTimer > this._nextLeisureStartTime) {
				//随机下一次启动的时间
				this._nextLeisureStartTime = MathU.randomRange(5000, 10000) + Laya.timer.currTimer;
				return true;
			}
			return false;
		}

		// 更新面部朝向
		protected updateFaceTo(diff: number): void {
			//脸部朝向
			if (this._targetFaceTo == -1) {
				this.faceto = this.unit.faceToward;
			}
			this.targetFaceTo = this.unit.faceToward;

			/*转身补间*/
			this.turnRoundTween(diff);
		}

		// 面部最终朝向
		private set targetFaceTo(v: number) {
			if (this._targetFaceTo == v) {
				return;
			}
			this._targetFaceTo = v;
		}

		// 面部朝向补间
		private turnRoundTween(diff: number): void {
			if (this._targetFaceTo == -1 || this._faceto == this._targetFaceTo) {
				return;
			}
			// 步长
			let step = diff * AvatarSprite.ROTATION_SPEED;
			// 增量
			let add = step;
			// 距离
			let distance = 0;
			if(this._targetFaceTo > this._faceto){
				distance = this._targetFaceTo - this._faceto;
			}
			else{
				distance = this._faceto - this._targetFaceTo;
				// 增量取反
				add = -add;
			}
			
			if(distance > 180){
				// 取短边
				distance = 360 - distance;
				// 增量取反
				add = -add;
			}
			
			if(distance < step){
				// 到了
				this._faceto = this._targetFaceTo;
			}
			else{
				this._faceto += add;
			}
		}

		// 绘制
		public onDraw(diff: number, g: Graphics, scene: SceneRoot): void {
			//运行时间累计
			this._runTime += diff;
			// this.onDrawBefore(diff, scene);
			//不显示
			if (!this.isNeedDrawView) return;

			let singleItem = this._singleItem;
			//item为空，下载错误，下载完成，都可以视为变动结束
			if (this._itemInvalided && (!singleItem || singleItem.isLoaded || singleItem.isError)) {
				this._itemInvalided = false;
				this.invaliDrawInfo();
			}

			//绘制信息是否失效
			if (this._drawInfoInvalided) {
				this.drawInfoCalculate();
			}

			if (singleItem) {
				let texture: Texture;
				var idx: number = this.getCurrentIdx();
				if (idx >= 0 && idx < singleItem.getFrameLength(this._action, this._direct)) {
					//帧位置
					var fd_address: number = AvatarItem.getFrameDataAddress(this._action, this._direct, idx);
					texture = singleItem.getBitmapData(fd_address);
					this.drawTextureRegX = singleItem.getFrameRegX(fd_address);
					this.drawTextureRegY = singleItem.getFrameRegY(fd_address) - this._rideHeight;
				}
				if (!texture) {
					texture = AvatarBase._unloadTexture;
					this.drawTextureRegX = -texture.sourceWidth / 2;
					this.drawTextureRegY = -(texture.height - 5);
				}
				this._curRenderMatrix = this._singleItem_mix;
				this.renderTexture(g, texture, true, scene);
			}
			// //绘制实时影子
			// drawRealShadow();			
			//处水层控制
			this.updateAtWater(scene);
		}

		protected renderTexture(g: Graphics, texture: Texture, isHit: boolean, scene: SceneRoot) {
			let avatarScale = this._scale;
			let dw = texture.width;
			let dh = texture.height;
			let dx = this._drawX;
			let dy = this._drawY;
			//舞台绘制
			let mix: Matrix;
			if (this.horizontalFlip) {
				mix = this._curRenderMatrix;
				mix.a = -1;
				if (avatarScale == 1) {
					mix.tx = this._drawX * 2 - this.drawTextureRegX;
					mix.ty = this.drawTextureRegY;
				}
				else {
					dw = dw * avatarScale;
					dh = dh * avatarScale;
					mix.tx = this._drawX * 2 - this.drawTextureRegX * avatarScale;
					mix.ty = this.drawTextureRegY * avatarScale;
				}
				g.drawTexture(texture, dx, dy, dw, dh, mix, this._drawAlpha);
			} else {
				if (avatarScale == 1) {
					dx += this.drawTextureRegX;
					dy += this.drawTextureRegY;
				}
				else {
					dw = dw * avatarScale;
					dh = dh * avatarScale;
					dx = this._drawX + this.drawTextureRegX * avatarScale;
					dy = this._drawY + this.drawTextureRegY * avatarScale;
				}
				g.drawTexture(texture, dx, dy, dw, dh, null, this._drawAlpha);
			}
			isHit && this.updateHitRect(texture);

			// this._openDrawGhost = (this.unit == scene.app.sceneObjectMgr.mainUnit);
			if (this._openDrawGhost) {
				let camera = scene.camera;
				if (!this._ghost) {
					this._ghost = new Ghost(camera);
					this._ghost.setting();
				}
				let ghostMatrix: Matrix;
				if (mix) {
					ghostMatrix = mix.clone();
					ghostMatrix.tx -= this._drawX * 2;
				}
				this._ghost.input(camera.getCellXByScene(dx), camera.getCellYByScene(dy), texture, ghostMatrix, this._drawAlpha);
				this._ghost.output(g);
			}
			else if (this._ghost) {
				this._ghost.free();
				this._ghost = null;
			}
		}

		// 碰撞信息
		private _hitRect: Rectangle = new Rectangle();

		private updateHitRect(texture: Texture): void {
			let rect = this._hitRect;
			rect.setTo(0, 0, 0, 0);
			if (!texture) {
				return;
			}
			rect.width = texture.width * this._scale;
			rect.height = texture.height * this._scale;
			rect.x = this._drawX + this.drawTextureRegX * this._scale;
			rect.y = this._drawY + this.drawTextureRegY * this._scale;
		}

		hitTest(xMouse: number, yMouse: number, scene: SceneRoot, hit3DPos:Pan3d.Vector3D): boolean {
			if(!this._hitRect.width || this._hitRect.height){
				this._hitRect.x = ((this._pos.x-scene.camera.logicLeft) * SceneRes.CELL_WIDTH - 40);
				this._hitRect.y = ((this._pos.y-scene.camera.logicTop) * SceneRes.CELL_HEIGHT - 160);
				this._hitRect.width = 80;
				this._hitRect.height = 160;
			}
			return this._hitRect.contains(xMouse, yMouse);
			/*
			////////////////// 像素级别碰撞 //////////////////
			let pxX:number = xMouse - left;
			//如果水平翻转
			if(this.horizontalFlip)
				pxX = rdWidth - pxX;
			
			let pxY:number = yMouse - top;
			let colors:Array<any> = this.drawTexture.getPixels(MathU.parseInt(pxX), MathU.parseInt(pxY), 1, 1);
			//取出透明值	
			//logd(colors);
			return colors[3] > 10;*/
			// return true;
		}

		// 绘制信息计算 
		protected drawInfoCalculate(): void {
			var pos: number;
			//有效
			this._drawInfoInvalided = false;
			//镜像表里检索
			var params: Array<any> = AvatarData.IMAGE_TABLE[this._faceto];
			if (!params)
				return;
			//设置方向
			this._direct = params[0];
			//设置是否镜像
			this.horizontalFlip = params[1];
			//通过动作状态获得动作枚举
			this._action = AvatarData.ConvertAction(this.actionStatus, this.isRiding);
			//重置绘制时间
			this._runTime = 0;
			///////////// 怪物类和变身换肤类 /////////////////
			if (this._singleItem) {
				//判断动作是否存在
				if (this._singleItem.isNonentityAction(this._action)) {
					//取不到攻击准备动作，则直接使用站立动作
					if (this.actionStatus == AvatarData.STATE_ATTCKREADY)
						this._action = AvatarData.ACTION_STAND;
				}
				/*获取当前动作*/
				var frameCount: number = this._singleItem.getFrameLength(this._action, this._direct);
				//				if(frameCount ==0)
				//					trace("AvatarSprite.drawInfoCalculate函数中，变量frameCount:"+_frameCount+"，名字"+(this as Object).unit.getName());
				if (frameCount != 0) {
					//设置帧长
					this._frameCount = frameCount;
					//设置帧速
					this._frameRate = 7;
					//循环与否直接拿任意一个角色数据来用即可
					pos = AvatarData.GetFrameInfoPos(1, this._action);
					//是否循环播放
					this.Loop = (AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_LOOP) == 1);
					//一组动画移动像素
					this._ani_move_Speed = 40;
				}
			}
			//////////////////////// 装备混合类 ///////////////////////////
			else {
				///////////////// 获取动作信息 ////////////////

				//帧起始位置
				let a_stuas: number = AvatarData.ConvertActionSort(this.actionStatus, this.isRiding);
				pos = AvatarData.GetFrameInfoPos(this.unit.sex, a_stuas);
				//帧是否存在
				if (AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_EXITS) == 0) return;
				//设置帧长
				this._frameCount = AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_COUNT);
				if (this._frameCount == 0)
					loge("_frameCount:" + this._frameCount);
				//设置帧速
				this._frameRate = AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_RATE);
				//最后帧索引
				this._frameLastIdx = this._frameCount - 1;
				//是否循环播放
				this.Loop = (AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_LOOP) == 1);
				//动画对应移动的基础速度
				this._ani_move_Speed = AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_MOVESPEED);
			}

			//最后一帧
			this._frameLastIdx = this._frameCount - 1;
			/*重置速度为未加速*/
			if (this.actionStatus == AvatarData.STATE_RUNNING) {
				// if(this._ani_move_Speed==0)
				// 	this._ani_move_Speed = 40;
				this.animationSpeed = this.unit.speed / this._ani_move_Speed;
			} else {
				//默认速度为1
				this.animationSpeed = 1;
			}
		}

		// 获得当前帧
		protected getCurrentIdx(): number {
			if (this.actionStatus == AvatarData.STATE_DIED || (this._ghost && this.actionStatus == AvatarData.STATE_RUNNING))
				return this._frameLastIdx;
			//如果不循环，并且时间超过了动画总长，则直接给出最后一张图x
			if (this.Loop || (this._runTime < this._totalTime)) {
				//获得无限完整动画循环之后剩余的时间
				var frameYu: number = this._runTime % this._totalTime;
				//定位到帧位置
				var idx: number = Math.floor(frameYu / this._frameTime);
				if (idx >= this._frameCount)
					return this._frameLastIdx;
				return idx;
			}
			else {
				return this._frameLastIdx;
			}
		}

		// 处水层控制
		protected updateAtWater(scene: SceneRoot): void { }

		public static IMITATE_MOVE_TYPE_NONE: number = 0;	//没有定义
		public static IMITATE_MOVE_TYPE_BEATBACK: number = 1;	//击退
		public static IMITATE_MOVE_TYPE_BEATFLY: number = 2;	//击飞
		public static IMITATE_MOVE_TYPE_ASSAULT: number = 3;	//冲锋
		public static IMITATE_MOVE_TYPE_ROTATE: number = 4;	//旋转（无相戒指）
		public static IMITATE_MOVE_TYPE_RUN: number = 5;	//跑动
		public static IMITATE_MOVE_TYPE_MOVE: number = 6;	//移动
		public static IMITATE_MOVE_TYPE_XUANYUN: number = 7;	//眩晕后退
		public static IMITATE_MOVE_TYPE_SUNYI: number = 8;	//瞬移
		public static IMITATE_MOVE_TYPE_JUMP: number = 9;	//跳

		/*暂时分4个阶段*/
		public static IMITATEMOVE_PROGRESS_0: number = 0;	//刚被击飞
		public static IMITATEMOVE_PROGRESS_1: number = 1;	//要死了
		public static IMITATEMOVE_PROGRESS_2: number = 2;	//落地
		public static IMITATEMOVE_PROGRESS_3: number = 3;	//		

		private _imitateMoveType: number = 0;

		private _imitateMoveStarTime: number;		/*模拟移动开始时间*/
		private _imitateMoveTotalTime: number;		/*模拟移动总时间*/
		private _imitateMoveDelayTime: number;		/*模拟移动延迟启动时间*/

		private _imitateMoveStartX: number;			/*模拟移动起始X*/
		private _imitateMoveStartY: number;			/*模拟移动起始Y*/
		private _imitateMoveEndX: number;			/*模拟移动终点X*/
		private _imitateMoveEndY: number;			/*模拟移动终点Y*/
		private _imitateMoveGapX: number;			/*模拟移动距离X*/
		private _imitateMoveGapY: number;			/*模拟移动距离Y*/

		/*模拟移动x 偏移*/
		protected _imitateMoveOffsetX: Array<number>;
		/*模拟移动y 偏移*/
		protected _imitateMoveOffsetY: Array<number>;
		/*模拟移动试图缩放特定配置数据*/
		protected _imitateMoveCorrectScale: Array<number>;
		/*模拟移动阶段进度*/
		public imitateMoveProgress: number = 0;

		/*真正的x位置*/
		private _realPosX: number = 0;
		/*真正的y位置*/
		private _realPosY: number = 0;

		// 是否模拟移动	
		get imitateMoving(): boolean {
			return this._imitateMoveType != AvatarSprite.IMITATE_MOVE_TYPE_NONE;
		}

		// 是否处于被击飞过程中
		get isBeatFlying(): boolean {
			return this._imitateMoveType == AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY;
		}

		// 坠地
		protected dropGround(scene: SceneRoot): void {
		}

		// 执行模拟移动
		doImitateMove(dstx: number, dsty: number, type: number, totalTime: number, delay: number = 0): boolean {
			this.endAll();

			this._imitateMoveType = type;
			// //调整朝向
			// switch(type){
			// 	case AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK:
			// 	case AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY:
			// 	case AvatarSprite.IMITATE_MOVE_TYPE_XUANYUN:

			// 		this.turnReversePoint(dstx, dsty);
			// 		break;
			// 	case AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT:
			// 		break;
			// 	default:
			// 		this.turnPoint(dstx, dsty);
			// 		break
			// }

			//时间
			this._imitateMoveStarTime = Laya.timer.currTimer;
			this._imitateMoveTotalTime = totalTime;
			this._imitateMoveDelayTime = delay;

			//位置
			this._imitateMoveStartX = this._pos.x;
			this._imitateMoveStartY = this._pos.y;
			this._imitateMoveEndX = dstx;
			this._imitateMoveEndY = dsty;
			this._imitateMoveGapX = this._imitateMoveEndX - this._imitateMoveStartX;
			this._imitateMoveGapY = this._imitateMoveEndY - this._imitateMoveStartY;
			this._realPosX = this._imitateMoveEndX;	//最后位置
			this._realPosY = this._imitateMoveEndY;	//最后位置

			switch (type) {
				case AvatarSprite.IMITATE_MOVE_TYPE_JUMP:
					//播放跳的声音
					//					currentDomain.soundMgr.play(Config.soundPath + "jump.mp3", postion);

					//					display.ghostCounter++;
					//					display.ghost.setting();
					break;
				case AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK:
					break;
				case AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY:
					break;
				case AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT:
					//					display.ghostCounter++;
					//					display.ghost.setting();
					break;
				case AvatarSprite.IMITATE_MOVE_TYPE_SUNYI:
					break;
			}

			return false;
		}



		/**
		 * 结束所有行为动作
		 */
		protected endAll(): void {
			// //移动停止
			// if(isMoving)
			// 	stopExec();
			//虚拟移动停止
			if (this.imitateMoving)
				this.stopImitateMove();
		}

		/*结束模拟移动*/
		protected stopImitateMove(): void {
			// 			switch(this._imitateMoveType){
			// //				case AvatarSprite.IMITATE_MOVE_TYPE_JUMP:		//跳
			// //					//维护残影计数
			// //					//					display.ghostCounter--;	
			// //					break;
			// 				case AvatarSprite.IMITATE_MOVE_TYPE_ASSAULT:		//冲锋
			// 					//维护残影计数
			// //					display.ghostCounter--;	
			// //					if(spellProxy) spellProxy.onStop();
			// 					break;
			// 				case AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY:		//击飞
			// 					//刷下生存状态
			// 					this.onDeathStateChange(getDeathState());
			// 					break;
			// 			}
			this._imitateMoveType = AvatarSprite.IMITATE_MOVE_TYPE_NONE;
			this._imitateMoveOffsetX = null;
			this._imitateMoveOffsetY = null;
			this._imitateMoveCorrectScale = null;
			// this._scale = 
			this.imitateMoveProgress = AvatarSprite.IMITATEMOVE_PROGRESS_0;
			// todo
			this._pos.x = this._realPosX;
			this._pos.y = this._realPosY;
			this._openDrawGhost = false;
			// logd("位移技能结束")
		}

		//  击飞
		public beatBackFly(index: number): void {
			//路径
			var flyPaths: Array<Array<number>> = SceneRes.BEAT_FLY_NORMAL;
			//var direct: number = toward == 35? 0 : 1;		//方向
			var offx: Array<number> = flyPaths[index - 1];	//偏移x[SceneRes.BEAT_FLY_NORMAL 1-28
			var offy: Array<number> = flyPaths[battle.BattleConst.MAX_ROLE + index - 1]; //偏移y[SceneRes.BEAT_FLY_NORMAL 29-56]
			var offscale: Array<number> = flyPaths[battle.BattleConst.MAX_ROLE * 2 + index - 1];//缩放[SceneRes.BEAT_FLY_NORMAL 57-84]
			//结束位置
			var dstX: number = this._pos.x + offx[offx.length - 1];
			var dstY: number = this._pos.y + offy[offy.length - 1];


			// var pt:Point = scene.mapData.getCanTransitPoint(postion.x, postion.y, dstX, dstY);
			// if(pt){
			// 	//更新位置和时间
			// 	var long:Number = postion.getDistance(dstX, dstY);
			// 	_imitateMovePerX = Math.abs((pt.x - postion.x) / (Math.cos(toward) * long));
			// 	_imitateMovePerY = Math.abs((pt.y - postion.y) / (Math.sin(toward) * long));
			// 	dstX = pt.x;
			// 	dstY = pt.y;
			// }

			var totalTime: number = 33 * offx.length;
			this.doImitateMove(dstX, dstY, AvatarSprite.IMITATE_MOVE_TYPE_BEATFLY, totalTime);

			this._imitateMoveOffsetX = offx;
			this._imitateMoveOffsetY = offy;
			this._imitateMoveCorrectScale = offscale;
		}

		/**
		 * 受击后退
		 * @param index 站位
		 */
		public beatBack(index: number): void {
			console.log("-------------受击移动", index);
			//路径
			var flyPaths: Array<Array<number>> = SceneRes.BEATEN_NORMAL;
			// 计算x路径
			index = index < battle.BattleConst.MAX_POS? 2 : 0
			var offx: Array<number> = flyPaths[index];	//偏移x
			var offy: Array<number> = flyPaths[index + 1]; //偏移y
			//结束位置
			var dstX: number = this._pos.x + offx[offx.length - 1];
			var dstY: number = this._pos.y + offy[offy.length - 1];

			var totalTime: number = 90 * offx.length;
			this.doImitateMove(dstX, dstY, AvatarSprite.IMITATE_MOVE_TYPE_BEATBACK, totalTime);

			this._imitateMoveOffsetX = offx;
			this._imitateMoveOffsetY = offy;
		}

		/**
		 * 瞬移
		 * @param posX 
		 * @param posY 
		 * @param time 指定时间 没有就自己算
		 */
		public shunYi(posX: number, posY: number, time: number = 0): number {
			//需要处理特效表现 绘制残影
			this.openDrawGhost = true;
			let speed = 30;
			let dst = MathU.getDistance(this._pos.x, this._pos.y, posX, posY);
			if (!time) time = dst / speed * 1000;
			// logd("瞬移时间",time)
			this.doImitateMove(posX, posY, AvatarSprite.IMITATE_MOVE_TYPE_SUNYI, time);
			return time;
		}

		public jump(posX: number, posY: number, time: number = 0): void {
			this.doImitateMove(posX, posY, AvatarSprite.IMITATE_MOVE_TYPE_JUMP, time);

		}

		public clear(checkNow: boolean): void {
			this.stopImitateMove();
			if (this._singleItem) {
				this._singleItem.release(checkNow);
				this._singleItem = null;
			}

			if (this._multi_items) {
				for (let item of this._multi_items) {
					item && item.release(checkNow);
				}
				this._multi_items.length = 0;
				this._multi_items = null;
			}

			this._dieTimer = 0;
			this.unit.onLiveStatusChange = null;
			this.unit = null;
			super.clear(checkNow);
		}
	}
}