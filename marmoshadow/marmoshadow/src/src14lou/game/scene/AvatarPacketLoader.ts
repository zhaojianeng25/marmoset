/**
* name 
*/
module game.scene{
	export class AvatarPacketLoader{
		private static rootID_seed:number = 0;
		rootID:number = 0;
		texture:Texture;
		isSuccessful:boolean = false;
		index:number = 0;

		private _assetsLoader:AssetsLoader;
		
		constructor(pUrl:string){
			this._assetsLoader = new AssetsLoader();
			let assets = [pUrl];
			this._assetsLoader.load(assets, Handler.create(this, this.onComplete, assets));	
		}

		protected onComplete(url:string):void
		{
			this.texture = Laya.loader.getRes(url);
			this.isSuccessful = true;

			//自增
			AvatarPacketLoader.rootID_seed ++;
			this.rootID = AvatarPacketLoader.rootID_seed;
		}

		public close(checkNow:boolean):void{
			this._assetsLoader.clear(checkNow);
		}
	}
}