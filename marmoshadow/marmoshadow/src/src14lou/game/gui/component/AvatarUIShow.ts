/**
* ui形象展示 
*/
module game.gui.component {
	export class AvatarUIShow extends Laya.Sprite {
		//绘制的透明度
		public drawAlpha: number = 1;
		public drawX: number = 0;
		public drawY: number = 0;

		protected drawTexture: Texture;
		protected drawTextureRegX: number;
		protected drawTextureRegY: number;

		protected _singleItem: AvatarItem;			/*身体or衣服装备样式*/
		protected _singleItem_mix: Matrix;

		/**
		 * 是否循环播放 
		 */
		protected Loop: boolean = true;
		private _name: string;						/*名称*/
		protected _itemInvalided: boolean;			/*avatarItem失效标志*/
		protected isImageType: boolean = false;		//是否为单图片类型

		/////////////////// 基础动作信息开始 ///////////////////
		/*显示失效标志*/
		protected _drawInfoInvalided: boolean;
		/*最后一次绘制到现在的时间*/
		protected _runTime: number = 0;
		/*帧率*/
		protected _frameRate: number = 1;
		/*帧时间 帧/ms*/
		protected _frameTime: number = 0;
		/*帧数量*/
		protected _frameCount: number = 0;
		/*动画最后一帧索引*/
		protected _frameLastIdx: number = 0;
		/*动画总时间*/
		protected _totalTime: number = 0;
		/*速度*/
		protected _animationSpeed: number = 1.0;
		//资源连接对象
		protected _linkage: game.scene.AvatarLinkage = new game.scene.AvatarLinkage();
		/*身体名称*/
		private _bodyName: string;
		/*皮肤名称*/
		private _skinName: string;
		/*实际读取的方向，0-4之间，5-7为镜像，到最终绘图时采用水平翻转*/
		protected _direct: number;
		//水平翻转
		protected horizontalFlip: Boolean;
		/*avatar动作*/
		protected _action: number;

		/*当前角度*/
		private _currentAngle: number;
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
		public isRiding: Boolean = false;

		constructor() {
			super();
			this.mouseEnabled = false;
		}

		/**
		 * 加载 
		 * @param fullName 完整名称
		 */
		loadItem(fullName: string): void {
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
		 * 绘制信息计算 
		 * 
		 */
		protected drawInfoCalculate(): void {
			var pos: number;
			//有效
			this._drawInfoInvalided = false;
			//镜像表里检索
			this._singleItem && this._singleItem.itemName
			var params: Array<any> = game.scene.AvatarData.IMAGE_TABLE[this.faceto];
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
					this._frameRate = 5;
					//循环与否直接拿任意一个角色数据来用即可
					pos = AvatarData.GetFrameInfoPos(1, this._action);
					//是否循环播放
					this.Loop = (AvatarData.GetFrameInfo(pos + AvatarData.FRAMEINFO_LOOP) == 1);
					//一组动画移动像素
					// this._ani_move_Speed = 40;
				}
			}
			//最后一帧
			this._frameLastIdx = this._frameCount - 1;
			//默认速度为1
			this.animationSpeed = 1;
		}

		/*获得当前帧*/
		protected getCurrentIdx(): number {
			if (this.actionStatus == AvatarData.STATE_DIED)
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

		/*让显示失效*/
		public invaliDrawInfo(): void {
			this._drawInfoInvalided = true;
		}

		/**
		 * 追加动作状态 
		 * @param atnStus
		 */
		public attachActionStatus(atnStus: number): void {
			//如果想改为受击动作，但是当前还处于物理攻击或者魔法攻击(或割草动作)中动作的，忽略受击
			if (atnStus == AvatarData.STATE_BEATEN) {
				if (this.actionStatus == AvatarData.STATE_ATTACKGO || this.actionStatus == AvatarData.STATE_ATTACKGO2 ||
					this.actionStatus == AvatarData.STATE_ATTACKGO3 ||
					this.actionStatus == AvatarData.STATE_MACGO ||
					this.actionStatus == AvatarData.STATE_GECAO ||
					this.actionStatus == AvatarData.STATE_ATTCKREADY ||	//此动作已做为戳戳戳技能动作
					this.actionStatus == AvatarData.STATE_GECAO_2)
					return;
			}
			this.actionStatus = atnStus;
		}


		public onDraw(diff: number): void {
			//画布清空
			this.graphics.clear();
			//item为空，下载错误，下载完成，都可以视为变动结束
			if (this._itemInvalided && (!this._singleItem || this._singleItem.isError || this._singleItem.isLoaded)) {
				this._itemInvalided = false;
				this.invaliDrawInfo();
			}

			//运行时间累计
			this._runTime += diff;
			//绘制信息是否失效
			if (this._drawInfoInvalided) {
				this.drawInfoCalculate();
			}

			if (this._singleItem) {
				var idx: number = this.getCurrentIdx();
				if (idx >= 0 && idx < this._singleItem.getFrameLength(this._action, this._direct)) {
					//帧位置
					var fd_address: number = AvatarItem.getFrameDataAddress(this._action, this._direct, idx);
					let texture: Texture = this.drawTexture = this._singleItem.getBitmapData(fd_address);
					this.drawTextureRegX = this._singleItem.getFrameRegX(fd_address);
					this.drawTextureRegY = this._singleItem.getFrameRegY(fd_address);

					if (texture) {
						//舞台绘制
						if (this.horizontalFlip) {
							let mix: Matrix = this._singleItem_mix;
							if (!mix)
								this._singleItem_mix = mix = new Matrix();
							mix.a = -1;
							mix.tx = this.drawX * 2 - this.drawTextureRegX;
							mix.ty = this.drawTextureRegY;
							this.graphics.drawTexture(texture, this.drawX, this.drawY, texture.width, texture.height, mix, this.drawAlpha);
						} else {
							let dx: number = this.drawX + this.drawTextureRegX;
							let dy: number = this.drawY + this.drawTextureRegY;
							this.graphics.drawTexture(texture, dx, dy, texture.width, texture.height, null, this.drawAlpha);
						}
					}
				}
			}

		}

		public clear(): void {
			if (this._singleItem) {
				this._singleItem.release();
				this._singleItem = null;
			}
		}

		destroy(destroyChild?: boolean): void {
			this.clear();
			super.destroy(destroyChild);
		}
	}
}