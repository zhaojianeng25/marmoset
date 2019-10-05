/**
* 骨骼动画特效（龙骨）  
*/
module game.scene{
	export class EffectSkeleton extends Effect implements IPoolsObject{
		// 方向对应的动作索引
		static ANI_NAMES:Array<string> = ["1","2","3","2","1","8","7","8"];
		poolName:string = "EffectSkeleton";
		private _refTemplet:RefTemplet;
		private _armature:Skeleton;
		private _parent:Sprite;
		constructor(){
			super();
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

		set parent(v:Sprite){
			this._parent = v;
			if(this._armature){
				this._parent ? this._parent.addChild(this._armature) : this._armature.removeSelf();
			}
		}

		// 尽量在设置动画数据时先设置
		setLoop(v:boolean){
			super.setLoop(v);
			if(this._armature){
				this._armature.play(0, this._loop);
			}
		}

		// 设置数据 fps动画播放速率1为标准速率
		setData(ani:string, fps:number = 1):void{
			super.setData(ani, fps);
		}

		build():void{
			if(this._refTemplet){
				return;
			}
			this._refTemplet = RefTemplet.Get(this._data);
			this._refTemplet.retain();
			if(this._refTemplet.parseComplete){
				Laya.timer.callLater(this, this.buildArmature);
			}
			else{
           		this._refTemplet.on(LEvent.COMPLETE, this, this.buildArmature);
			}
		}

		private buildArmature(): void {
			if(!this._refTemplet){
				return;
			}
			this._refTemplet.off(LEvent.COMPLETE, this, this.buildArmature);
            this._armature = this._refTemplet.buildArmature(0);
			this._armature.playbackRate(this._fps);
			this._armature.scale(this._drawHorizonal ?  this._scale * -1 : this._scale, this._scale);

			let nameOrIndex:any;
			if(this._armature.getAnimNum() > 1){
				nameOrIndex = EffectSkeleton.ANI_NAMES[this._drawDirect];
			}
			else{
				nameOrIndex = 0;
			}
			this._armature.play(nameOrIndex, this._loop, false, Laya.timer.currTimer - this._startTime);
			this.parent = this._parent;
        }

		// 绘制
		onDraw(g: Graphics, camera: Camera): void {
			if(this.isPlayEnd || !this._armature){
				return;
			}
			if(!this._loop && this._armature.player.state == 0){
				this.isPlayEnd = true;
				return;
			}
			this.updateTransform(camera);
			this._armature.x = this._drawX;
			this._armature.y = this._drawY;
		}

		reset():void{
			parent = null;
			if(this._refTemplet){
				this._refTemplet.off(LEvent.COMPLETE, this, this.buildArmature);
				this._refTemplet.release();
				this._refTemplet = null;	
			}
			if(this._armature){
				this._armature.destroy(true);
				this._armature = null;
			}
			Laya.timer.clear(this, this.buildArmature);
			super.reset();
		}
	}
}