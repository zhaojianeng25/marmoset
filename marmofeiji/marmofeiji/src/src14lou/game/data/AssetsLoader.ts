/**
* 贴图素材
*/
module game.data{
	export class AssetsLoader{
		private _list:Array<RefAsset> = [];
		private _handler:Handler;
		constructor(){
			
		}

		// 设置素材
		load(assets:Array<string>, handler:Handler):void{
			this.clear();
			let parseComplete = true;
			if(assets){
				for(let url of assets){
					let refTexture = RefAsset.Get(url);
					refTexture.retain();
					this._list.push(refTexture);
					if(!refTexture.parseComplete){
						parseComplete = false;
						refTexture.once(LEvent.COMPLETE, this, this.onAssetParseComplete);
					}
				}
			}
			if(parseComplete){
				handler.run();
			}
			else{
				this._handler = handler;
			}
		}

		// 有贴图解析完成
		private onAssetParseComplete():void{ 
			if(!this._handler){
				return;
			}
			let parseComplete = true;
			for(let refTexture of this._list){
				if(!refTexture.parseComplete){
					parseComplete = false;
					break;
				}
			}
			if(parseComplete){
				this._handler.run();
				this._handler = null;
			}
		}

		// 释放素材
		release(url:string, checkNow:boolean = false):void{
			url = Laya.URL.formatURL(url);
			for(let i = 0; i < this._list.length; i ++){
				let refAsset = this._list[i];
				if(refAsset.url == url){
					refAsset.release(checkNow);
					refAsset.off(LEvent.COMPLETE, this, this.onAssetParseComplete);
					this._list.splice(i, 1);
					i --;
				}
			}
		}

		// 清理
		clear(checkNow:boolean = false):void{
			for(let refTexture of this._list){
				refTexture.release(checkNow);
				refTexture.off(LEvent.COMPLETE, this, this.onAssetParseComplete);
			}
			this._list.length = 0;
		}
	}
}