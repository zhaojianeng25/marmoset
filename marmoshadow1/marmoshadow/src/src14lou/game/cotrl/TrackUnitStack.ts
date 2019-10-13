/**
* 追踪unit
*/
module game.cotrl{
	export class TrackUnitStack extends GotoDstStack{
		private _trackUnit:Unit;
		private _checkTimer:number = 300;
		constructor(app: AppBase, dstX:number, dstY:number, distance:number, unit:Unit)
		{
			super(app, dstX, dstY, distance);
			this._trackUnit = unit;
			this._updateTimer = this._checkTimer;
		}

		private _updateTimer:number;
		update(diff:number):boolean{
			if(this._trackUnit){
				if(this._updateTimer < 0){
					this._updateTimer = this._checkTimer;
					let pos = this._trackUnit.pos; 
					if(this._dstX != pos.x || this._dstY != pos.y){
						//如果距离超过了0.5
						var distance:number = MathU.getDistance(pos.x, pos.y,this._dstX, this._dstY);
						if(distance > 0.3)	{
							// 更新目标点
							this._dstX = pos.x;
							this._dstY = pos.y;
							this._hasSend = true;
						}
					}
				}
				else{
					this._updateTimer -= diff;
				}
			}
			return super.update(diff);
		}
	}
}