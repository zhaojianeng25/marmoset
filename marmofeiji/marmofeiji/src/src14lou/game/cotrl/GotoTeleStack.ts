/**
* 走到传送点 传送栈 
*/
module game.cotrl{
	export class GotoTeleStack extends BaseStack{
		/*目的地地图id*/
		private _toMapid:number = 0;
		private _toX:number = 0;
		private _toY:number = 0;
		private _srcX:number = 0;
		private _srcY:number = 0;
		private _nextUpdateTime:number = 0;
		private _showTip:boolean = false;

		constructor(app: AppBase, srcX:number,srcY:number, toMapid:number, toX:number, toY:number,showTip:boolean)
		{
			super(app);
			this._srcX = srcX;
			this._srcY = srcY;
			this._toMapid = toMapid;
			this._toX = toX;
			this._toY = toY;
			this._showTip = showTip;
		}

		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			let mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			
			if(!mUnit || mUnit.isDied || this._controller.isTeleporting || this._toMapid <= 0){
				return false;
			}

			return true;
		}

		public update(diff:number):boolean{
			//释放了 退出栈
			if(super.update(diff)){
				return true;
			}
			let cur_time:number = Laya.timer.currTimer;
			if(this._nextUpdateTime > 0 && this._nextUpdateTime > cur_time) return false;
			this._nextUpdateTime = cur_time + 100;

			let mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}

			let mpMapid:number = mUnit.mapid;
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;

			//已经到这张图了
			if(mpMapid == this._toMapid) return true;
			//先走到传送点
			let dis:number = MathU.getDistance(mpx,mpy,this._srcX,this._srcY);
			if(dis > 2){
				this.stack(this._controller,new GotoDstStack(this._app,this._srcX,this._srcY,2));
				return false;
			}

			let gotoPar:string = "";
			//走到了 发起传送
			this._controller.sendTeleport(this._toMapid,this._toX,this._toY,this._showTip,true,false);
			
			return true;
		}
	}
}