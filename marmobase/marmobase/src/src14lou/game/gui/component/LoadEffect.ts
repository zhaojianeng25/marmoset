/**
* 页面加载效果 
*/
module game.gui.component{
	export class LoadEffect{
		private static _list:Array<LoadEffect> = [];
		private static add(v:LoadEffect):void{
			for(let effect of this._list){
				effect.isTop = false;
			}
			v.isTop = true;
			this._list.push(v);
		}
		private static remove(v:LoadEffect):void{
			let idx = this._list.indexOf(v);
			if(idx != -1){
				this._list.splice(idx, 1);
			}
			let count = this._list.length;
			if(count > 0 && v.isTop){
				this._list[count - 1].isTop = true;
			}
		}
		private _parent:Sprite;
		private _createdTimer:number;
		private _view:any;
		private _clientWidth: number;
		private _clientHeight: number;

		// 是否在顶层 只显示顶层的加载效果
		private _isTop:boolean = false;
		set isTop(v:boolean){
			this._isTop = v;
			this._view && (this._view.visible = v);
		}

		constructor(parent:Sprite){
			this._parent = parent;
			this._createdTimer = Laya.timer.currTimer;
			Laya.timer.frameLoop(1, this, this.update);
			LoadEffect.add(this);
		}

		set width(v:number){
			this._clientWidth = v;
			Laya.timer.callLater(this, this.layout);
		}

		set height(v:number){
			this._clientHeight = v;
			Laya.timer.callLater(this, this.layout);
		}

		private layout(): void {
			if(this._view){
				this._view.width = this._clientWidth;
				this._view.height = this._clientHeight;
			}
		}

		private initView():void{

		}

		private update():void{
			// let timer:number = Laya.timer.currTimer - this._createdTimer;
			// if(timer > 1000){
			// 	if(!this._view){
			// 		this.initView();
			// 	}
			// 	if(timer > 6000){
			// 		this._view.tips.visible = true;
			// 		Laya.timer.clear(this, this.update);
			// 	}
			// }
		}

		destroy():void{
			LoadEffect.remove(this);
			this._parent = null;
			if(this._view){
				this._view.destroy();
				this._view = null;
			}
			Laya.timer.clearAll(this);
		}
	}
}