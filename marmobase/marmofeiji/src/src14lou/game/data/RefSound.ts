/**
* 音效管理
只能管理20以内的音效，超过20秒会有问题。。。
由于音效播放完后无法正确回调播放完毕，所以统一播放一次，重置回收时间，暂时设置20秒
*/
module game.data{
	export class RefSound extends RefAsset{
		private static MAX_FREE_TIME1 = 20000;	// 素材超时释放时间
		// 获取动画模板素材
		static Get(key:string):RefSound{
			key = Laya.URL.formatURL(key);
			let asset:RefSound = RefAsset.Get(key, false) as RefSound;
			if(!asset){
				asset = new RefSound(key);
				//asset.addTimeOut = RefSound.MAX_FREE_TIME1;
				RefAsset.Set(key, asset);
				// logd('RefSound playSound  ' + key);
			}
			return  asset;
		}

		
		constructor(url:string){
			super(url);
		}

		protected init():void{
		}

		playSound(url: string, loops?: number, soundClass?: any, startTime?: number):void{
			Laya.SoundManager.playSound(url, loops, undefined, soundClass, startTime);
			// this.retain()
			this._timeOut = Laya.timer.currTimer + RefSound.MAX_FREE_TIME1;
			// logd('RefSound playSound  ' + this.url);
		}

		stopSound(): void{
        	Laya.SoundManager.stopSound(this.url);
			this.forceMoveRef();
    	}
		
		// 释放纹理
        protected destroy(): void{
			Laya.SoundManager.destroySound(this.url);
			// logd('RefSound destroy  ' + this.url);
		}
	}
}