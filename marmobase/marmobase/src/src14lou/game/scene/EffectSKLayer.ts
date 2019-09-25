/**
* 骨骼动画特效层
*/
module game.scene{
	export class EffectSKLayer extends EffectLayer{
		constructor(){
			super();
		}

		addEffect(e: Effect): void {
			super.addEffect(e);
			if(e instanceof EffectSkeleton){
				e.build();
				e.parent = this;
			}
		}

		removeEffect(e: Effect): void {
			if(e instanceof EffectSkeleton){
				e.parent = null;
			}
			super.removeEffect(e);
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
				effect.onDraw(this.graphics, camera);
			}
			this.clerDels();
		}
	}
}