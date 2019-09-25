/**
* name 
*/
module game.scene{
	export class MapPart{
		// 地图切片宽 	
		static mapPartWidth:number = 512;
		// 地图切片高 			
		static mapPartHeight:number = 512;

		// 贴图加载器
		private _assetsLoader:AssetsLoader;
		//地图标识key
		key:number;
		// 最后访问时间	
		lastVisiTime:number;
		//贴图数据
		texture:Texture;
		//缩略图
		thumTexture:Texture;

		constructor(thumSubTexture:Texture, url:string, pkey:number){
			this.thumTexture = thumSubTexture;
			this.key = pkey;
			this._assetsLoader = new AssetsLoader();
			let assets = [url]
			this._assetsLoader.load(assets, Handler.create(this, this.onTexutreComplete, assets));
		}

		//缩略图完成事件
		private onTexutreComplete(url:string):void{
			this.texture = Laya.loader.getRes(url);
		}

		public clear(checkNow:boolean):void{
			//贴图数据
			this.texture = null;
			//缩略图
			this.thumTexture = null;
			//素材卸载
			this._assetsLoader.clear(checkNow);
			this._assetsLoader = null;
		}
	}
}