/**
* Avatar特效 
*/
module game.scene {
	export class EffectAvatar extends Effect implements IPoolsObject{
		poolName:string = "EffectAvatar";
		//avatarItem
		private _item: AvatarItem;
		//是否已初始化
		private _isInited: boolean;
		/**
		 * 动作编号
		 */
		private _action: number;
		/**
		 * 坐标偏移x 
		 */
		public offSet: Array<number>;

		constructor() {
			super();
		}

		protected drawCalculate(): void {
			super.drawCalculate();
			if(this._isInited){
				this._frameCount = this._item.getFrameLength(this._action, this._drawDirect);
				if(!this._frameCount && this._toward != Direct.BOTTOM){
					// 如果这个方向没有数据的话就取下方向的数据进行绘制
					let params: Array<any> = AvatarData.IMAGE_TABLE[Direct.BOTTOM];
					this._drawDirect = params[0];
					this._frameCount = this._item.getFrameLength(this._action, this._drawDirect);
				}
				this._duration = this._frameCount * this._frameTime;
			}
		}

		updateTexture(): void {
			//如果还没初始化，说明素材还未下载
			if (!this._isInited) {
				if(!this._item || this._item.isError || !this._item.isLoaded){
					return;
				}
				this._isInited = true;
				this.drawCalculate();
			}
			//hold素材，不要被释放
			let currTimer = Laya.timer.currTimer;
			if(this._startTime > currTimer){
				return;
			}
			super.updateTexture();
			if(this.isPlayEnd){
				return;
			}
			//帧位置
			let fd_address: number = AvatarItem.getFrameDataAddress(this._action, this._drawDirect, this._curFrameIndex);
			this._texture = this._item.getBitmapData(fd_address);
			if(this._texture){
				this._regX = this._item.getFrameRegX(fd_address);
				this._regY = this._item.getFrameRegY(fd_address);
			}
		}

		// 更新变换信息
		protected updateTransform(camera: Camera):void{
			super.updateTransform(camera);
			if (this.offSet && this.offSet.length >= 16) {
				let toward_idx:number = this._toward * 2;
				this._drawX += this.offSet[toward_idx];
				this._drawY += this.offSet[toward_idx + 1];
			}

			//舞台绘制
			if (this._drawHorizonal) {
				let mix: Matrix = this._tempMix;
				mix.identity();
				mix.a = -1;
				if(this._scale == 1){
					mix.tx = this._drawX * 2 - this._regX;
					mix.ty = this._regY;
				}
				else{
					this._drawW = this._drawW * this._scale;
					this._drawH = this._drawH * this._scale;
					mix.tx = this._drawX * 2 - this._regX * this._scale;
					mix.ty = this._regY * this._scale;
				}
				this._drawMix = mix;
			} else {
				if(this._scale == 1){
					this._drawX += this._regX;
					this._drawY += this._regY;
				}
				else{
					this._drawW = this._drawW * this._scale;
					this._drawH = this._drawH * this._scale;
					this._drawX = this._drawX + this._regX * this._scale;
					this._drawY = this._drawY + this._regY * this._scale;
				}
				this._drawMix = null;
			}
		}


		/**
		 * 进池 （相当于对象dispose函数）
		 */
		intoPool(...arg):void{
			this.reset();
		}
		/**
		 * 出池 （相当于对象初始化函数）
		 */		
		outPool(...arg):void{

		}

		setData(name: string, fps:number = 12):void{
			super.setData(name, fps);
			if(this._item){
				if(this._item.itemName == name){
					return;
				}
				this._item.release();
				this._item = null;
			}
			this._item = AvatarItem.Get(name);
			this._item && this._item.retain();
		}

		// 释放 
		reset(): void {
			this._isInited = false;
			if(this._item){
				this._item.release();
				this._item = null;
			}
			this.offSet = null;
			this._action = 0;
			super.reset();
		}
	}
}