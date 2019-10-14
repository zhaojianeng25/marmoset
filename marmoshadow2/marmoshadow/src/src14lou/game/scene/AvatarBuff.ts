/**
* Avatar的Buff显示控制类 
*/
module game.scene {
	export class AvatarBuff {
		private _unit: Unit;
		private _avatarUnit: AvatarUnit;
		private _buff: Buff;
		private _effect: Effect;
		private _effect3D:string;
		private _waitAddToScene: boolean = false;
		constructor(avatarUnit: AvatarUnit, unit: Unit, buff: Buff) {
			this._avatarUnit = avatarUnit;
			this._unit = unit;
			this._buff = buff;
			this._buff.on(Buff.CHANGE_ID, this, this.onBuffChangeID);
			this.onBuffChangeID();
		}

		// buff发生变化
		private onBuffChangeID(): void {
			if (this._buff.id == 0) {
				this.clearEffect();
				this.clearBuffShow();
			}
			else {
				this.createEffect();
				this.doBuffShow();
			}
		}

		// 清理特效
		private clearEffect(): void {
			this._waitAddToScene = false;
			if(this._effect3D){
				this._avatarUnit.clearEffect(this._effect3D);
				this._effect3D = null;
			}
			if (!this._effect) {
				return;
			}
			this._effect.isPlayEnd = true;
			this._effect = null;
		}

		// 创建特效
		private createEffect(): void {
			let temp: any = Template.getBuffsTempById(this._buff.id);
			if (temp) {
				let skin: string = temp.skin;
				let skin_type:number = temp.skin_type;
				if (skin && skin.length) {
					switch (skin_type) {
						// 1-序列帧，2-龙骨，3-avatar，4-粒子特效
						case 1:
							this._effect = ObjectPools.malloc(EffectFrame) as EffectFrame;
							this._effect.setData(skin);
							break;
						case 2:
							this._effect = ObjectPools.malloc(EffectSkeleton) as EffectSkeleton;
							this._effect.setData(skin);
							break;
						case 3:
							this._effect = ObjectPools.malloc(EffectAvatar) as EffectAvatar;
							this._effect.setData("0000" + skin);
							(<EffectAvatar>this._effect).toward = Direct.BOTTOM;
							break;
						case 4:
							if(this._effect3D) this._avatarUnit.clearEffect(this._effect3D);
							this._effect3D = skin;
							this._avatarUnit.showEffect(this._effect3D);
							break;
					}
					if (this._effect) {
						this._effect.anchorObject = this._unit;
						this._effect.atBottom = (temp.skin_bottom == 1);
						this._effect.setLoop(temp.cycle != 1);//是否循环播放
						this._waitAddToScene = true;
					}
				}
			}
		}

		//处理buff表现
		private doBuffShow(): void {
			
		}
		//清理
		private clearBuffShow(): void {
			
		}

		onDraw(diff: number, scene: SceneRoot): void {
			if (this._waitAddToScene && this._effect) {
				this._waitAddToScene = false;
				scene.addEffect(this._effect);
			}
		}

		// 释放
		dispose(): void {
			if (this._effect) {
				this._effect.isPlayEnd = true;
				this._effect = null;
			}
			if(this._effect3D){
				this._avatarUnit.clearEffect(this._effect3D);
				this._effect3D = null;
			}
			this.clearBuffShow();
			this._buff.off(Buff.CHANGE_ID, this, this.onBuffChangeID);
			this._buff = null;
			this._unit = null;
			this._avatarUnit = null;
		}
	}
}