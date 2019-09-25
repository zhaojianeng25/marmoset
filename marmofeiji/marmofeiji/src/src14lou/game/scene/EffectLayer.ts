/**
* name 
*/
module game.scene {
	export class EffectLayer extends Laya.Sprite {
		protected _effects: Array<Effect> = new Array<Effect>();
		protected _dels: Array<Effect> = new Array<Effect>();

		// 最大数量
		private _maxCount:number = -1;
		set maxCount(v:number){
			this._maxCount = v;
		}
		get maxCount():number{
			return this._maxCount;
		}

		get isFull():boolean{
			return this._maxCount != -1 && this._maxCount <= this._effects.length;
		}

		constructor() {
			super();
		}

		addEffect(e: Effect): void {
			this._effects.push(e);
			
		}

		removeEffect(e: Effect): void {
			let idx: number = this._effects.indexOf(e);
			if (idx >= 0) {
				this._effects.splice(idx, 1);
			}
			let obj:any = e;
			if(obj["intoPool"] ){
				ObjectPools.free(obj);
			}	
		}

		protected clerDels():void{
			for (let i = 0; i < this._dels.length; i++) {
				this.removeEffect(this._dels[i]);
			}
			this._dels.length = 0;
		}

		onDraw(camera: game.scene.Camera): void {
			// 绘制每一个特效
			this._dels.length = 0;
			for (let i: number = 0; i < this._effects.length; i++) {
				var effect: Effect = this._effects[i];
				if (effect.isPlayEnd) {
					this._dels.push(effect);
					continue;
				}
				effect.updateTexture();
			}
			this.clerDels();
			//性能优化：减少批次渲染
			this._effects.sort(this.effectRootTextureID_Cmp);
			//清理绘制
			this.graphics.clear();
			//绘制每一个特效
			for (let i: number = 0; i < this._effects.length; i++) {
				var effect: Effect = this._effects[i];
				effect.onDraw(this.graphics, camera);
			}
		}

		/*深度比较排序*/
		protected effectRootTextureID_Cmp(a: EffectAvatar, b: EffectAvatar): number {
			return b.__ROOT_ID - a.__ROOT_ID;
		}
	}
}