/**
* 选择目标栈 
*/
module game.cotrl{
	export class SelectTargetSack extends BaseStack{
		
		/*要选中的生物*/
		private _target:game.object.Unit;
		/*超时时间*/
		private _timeout:number = 0;
		
		constructor(app: AppBase, target:game.object.Unit)
		{
			super(app);
			this._target = target;
		}
		
		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			//选中对象
			if(!this._target ) {
				this._controller.select_target(0);
				return false;
			}
			
			this._timeout = 1000;
			
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出攻击栈
			if(!mUnit  || mUnit.isDied){
				return false;
			}
			
			//gameObj不用选中
			if(this._target.isGameObject)
				return false;
			
			this._controller.select_target(this._target.oid);
			return true;
		}
		
		public update(diff:number):boolean{
			this._timeout -= diff;
			if(!this._target) return true;
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出攻击栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			var bool:boolean = this._sceneObjectMgr.selectOid == this._target.oid;
			return bool || this._timeout <= 0;
		}
		
		public finalize():void{
			this._target = null;
			super.finalize();
		}
	}
}