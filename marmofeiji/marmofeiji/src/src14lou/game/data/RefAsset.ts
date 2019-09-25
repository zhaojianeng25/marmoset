/**
* 引用计数对象
*/
module game.data{
	export class RefAsset extends Laya.EventDispatcher{
		static GENRAL 		= 1;			// 一般素材（文本，， 贴图）
		static BUFFER		= 2;			// 二进制
		static TEMPLET 		= 3;			// 骨骼动画模板

		private static MAX_FREE_TIME = 5000;	// 素材超时释放时间
		private static _refMap:{ [key: string]: RefAsset } = {};		// 列表

		static Get(key:string, create:boolean = true, isEventProgress:boolean = false):RefAsset{
			if(!key || !key.length){
				return null;
			}
			key = Laya.URL.formatURL(key);
			let asset:RefAsset = this._refMap[key];
			if(create && !asset){
				asset = new RefAsset(key, isEventProgress);
				asset.addTimeOut = this.MAX_FREE_TIME;
				this.Set(key, asset);
			}
			return asset;
		}

		protected static Set(key:string, asset:RefAsset):void{
			this._refMap[key] = asset;
		}

		private static _nextTimer:number = 0;

		static update(diff):void{
			let currTimer = Laya.timer.currTimer;
			if(diff != -1 && currTimer < this._nextTimer){
				return;
			}
			this._nextTimer = currTimer + 1000; // 检查频率1秒
			let map = this._refMap;
			for(let key in map){
				let obj = map[key];
				// logd("RefAsset.update", "url", key, "refCount", obj._refCount, "timeOut", obj._timeOut);
				if(obj.update(currTimer)){
					delete map[key];
				}
			}
		}

		// 引用计数
		private _refCount:number = 0;
		// 超时时间
		protected _timeOut:number = 0;
		// 延长的超时时间
		private _addTimeOut:number = 0;
		set addTimeOut(v:number){
			this._addTimeOut = v;
		}
		// 是否准备好
		protected _parseComplete:boolean = false;
		get parseComplete():boolean{
			return this._parseComplete;
		}

		private _isEventProgress:boolean = false;

		protected _url:string;
		get url():string{
			return this._url;
		}
		
		constructor(url:string, isEventProgress:boolean = false){
			super();
			this._url = url;
			this._isEventProgress = isEventProgress;
			this.init();
		}

		private _onProgressHandler:Handler;
		protected init():void{
			let res = Laya.loader.getRes(this._url);
			if(res){
				this.complete();
			}
			else{
				// logd('RefAsset load', this._url);
				this._onProgressHandler = this._isEventProgress ? Handler.create(this, this.onProgress, null, false) : null
				Laya.loader.load(this._url, Handler.create(this, this.onComplete, [true]), this._onProgressHandler);
			}
		}

		private onProgress(v:number):void{
			this.event(LEvent.PROGRESS, v);
			// logd("onProgress", v, this._url);
		}

		

		private onComplete():void{
			let res = Loader.getRes(this._url);
			if(res){
				res.loadByRefAsset = true;
			}
			else{
				loge('RefAsset onComplete res is null', this._url);
			}
			this.complete();
		}

		private complete():void{
			this.onProgress(1);
			if(this._onProgressHandler){
				this._onProgressHandler. recover();
				this._onProgressHandler = null;
			}
			
			this._parseComplete = true;
			this.event(LEvent.COMPLETE);
		}

		// 引用
		retain():void{
			this._refCount ++;
			this._timeOut = 0;
		}

		// 释放引用
		release(checkNow:boolean = false):void{
			if(this._refCount <= 0){
				loge("release error this._reCount <= 0");
				return;
			}
			this._refCount --;
			if(checkNow){
				this.checkNow();
			}
			else{
				if(this._refCount == 0){
					this._timeOut = Laya.timer.currTimer + this._addTimeOut;
				}	
			}
		}

		forceMoveRef():void{
			this._refCount = 0;
			this._timeOut = Laya.timer.currTimer + this._addTimeOut;
		}

		private update(currTimer:number):boolean{
			let timeOut = this._timeOut && (currTimer > this._timeOut);
			if(timeOut){
				this.destroy();
			}
			return timeOut;
		}

		// 立即检查超时
		checkNow():void{
			if(this._refCount == 0){
				// 标记过期
				this._timeOut = Laya.timer.currTimer - 1;
			}
		}

		// 释放纹理
        protected destroy(): void{
			if(this._onProgressHandler){
				this._onProgressHandler. recover();
				this._onProgressHandler = null;
			}

			Laya.loader.cancelLoadByUrl(this._url);
			Laya.loader.clearRes(this._url, true);
			// logd("RefTexture.destroy", this._url);
		}
	}
}