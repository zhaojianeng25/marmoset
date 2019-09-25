/**
* 直线行走行为栈 
*/
module game.cotrl{
	
	export class GotoDstStack extends BaseMoveStack{
		protected _hasSend:boolean = true;
		private _prevX:number = 0;
		private _prevY:number = 0;
		private _stopTimer:number = 0;

		constructor(app: AppBase, dstX:number, dstY:number, distance:number)
		{
			super(app, dstX, dstY, distance);
		}
		
		/**
		 * 执行并返回子类是否有继续执行的必要 
		 * 
		 */		
		 public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			
			this._hasSend = true;
			return true;
		}
		
		public update(diff:number):boolean{
			if(super.update(diff)){
				this._controller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
				// logd("退出栈GotoLineStack", this._distance);
				return true;
			}
			//中了技能buff不能动
			if(!this._controller.canMove)
				return true;
			if(this._controller.moveDelay > 0){
				// 移动延迟
				return true;
			}
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			if(!mUnit || mUnit.isDied){
				return true;
			}

			//非法数据
			if(this._dstX == 0 || this._dstY == 0){
				logd("GotoDstStack:非法数据 dstX=",this._dstX,",dstY=",this._dstY);
				return true;
			}

			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;

			if(this._hasSend){
				//已经在这边了就算了不走了 
				if(Math.floor(mpx) == Math.floor(this._dstX) && Math.floor(mpy) == Math.floor(this._dstY)){
					this._controller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
					return true;
				}
				//如果距离小于0.5 就不进行移动了--很重要，不能改为 == 0，否则会有放技能出现回拉的情况
				var distance:number = MathU.getDistance(mpx,mpy,this._dstX, this._dstY);
				if(distance <= 0.5)	{
					this._controller.pluginsMgr.lastOptTime = Laya.timer.currTimer;
					return true;	
				}
				//执行路径
				this._controller.sendMoveTo(this._dstX, this._dstY);
				this._hasSend = false;
			}
			else{
				if(this._prevX == mpx && this._prevY == mpy){
					this._stopTimer += diff;
					if(this._stopTimer > 2000){
						this._stopTimer = 0;
						//需要重新执行路径
						this._hasSend = true;
					}
				}
				else{
					this._prevX = mpx;
					this._prevY = mpy;
					this._stopTimer = 0;
				}
			}
			
			return false;
		}
	}
}