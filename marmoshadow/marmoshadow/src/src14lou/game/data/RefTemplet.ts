/**
* 骨骼动画模板素材
*/
module game.data{
	export class RefTemplet extends RefAsset{
		// 获取动画模板素材
		static Get(key:string):RefTemplet{
			key = Laya.URL.formatURL('scene/sk/'+ key + ".sk");
			let asset:RefTemplet = RefAsset.Get(key, false) as RefTemplet;
			if(!asset){
				asset = new RefTemplet(key);
				RefAsset.Set(key, asset);
			}
			return  asset;
		}

		// 骨骼动画模板
		private _factory:Templet;
		
		constructor(url:string){
			super(url);
			
		}

		protected init():void{
			this._factory = new Templet();
			this._factory.once(LEvent.COMPLETE, this, ()=>{
				this._parseComplete = true;
				this.event(LEvent.COMPLETE);
			});
			this._factory.loadAni(this._url);
		}

		buildArmature(aniMode?: number){
			return this._factory.buildArmature(aniMode);
		}

		// 释放纹理
        protected destroy(): void{
			this._factory.destroy();
			this._factory = null;
			super.destroy();
		}
	}
}