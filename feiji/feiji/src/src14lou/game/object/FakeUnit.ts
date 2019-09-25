/**
* 假的Unit对象
*/
module game.object{
	export class FakeUnit extends Unit{
		//是否需要受击特效
		needBeatenEffect:boolean = false;
		isNeedDrawView:boolean = true;
		isBattleRole:boolean = false;
		isSelfRole:boolean = false;
		isDieSpecial:boolean = false;

		constructor(){
			super();
			this.needShowName = false;
		}

		// 去哪儿
		goto(x: number, y: number): boolean {
			this.SetTargetPosX(x);
			this.SetTargetPosY(y);
			if(this.onTargetPosChange)
				this.onTargetPosChange(this, x, y);
			return true;
		}

		// 武器
		SetShowWeapon(val:number):void{
			super.SetShowWeapon(val);
			if(this.onAvatarChange)
				this.onAvatarChange();
		}	

		// 衣服
		SetShowCoat(val:number):void{
			super.SetShowCoat(val);
			if(this.onAvatarChange)
				this.onAvatarChange();
		}	
		
		// Update(deltaTime: number) {
		// 	super.Update(deltaTime);
		// }

		private static _tempMask:UpdateMask;
		private static get tempMask():UpdateMask{
			if(!this._tempMask){
				this._tempMask = new UpdateMask();
			}
			return this._tempMask;
		}
		
		fristUpdate():void{
			this.onUpdate(core.obj.OBJ_OPT_NEW, FakeUnit.tempMask, FakeUnit.tempMask);
		}

		// 释放
		dispose(): void {
			super.dispose();
		}
	}
}