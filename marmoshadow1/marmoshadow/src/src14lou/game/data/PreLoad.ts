module game.data{
	 
    interface LoadMap {
        [index: string]: RefAsset;
    }
    /*
    * 预加载
    */
    export class PreLoad extends Laya.EventDispatcher{
        private _loadMap:LoadMap = {};
        private _loadCount:number = 0;
        private _totalCount:number = 0;
        constructor(){
            super();
        }

        get totalCount():number{
            return this._totalCount;
        }

        get loadCount():number{
            return this._loadCount;
        }

        load(url:string, type:number):void{
            // logd('PreLoad', url, type);
            let asset = this._loadMap[url];
            if(asset){
                return;
            }
            switch(type){
                case RefAsset.GENRAL:
                    asset = RefAsset.Get(url);
                    break;
                case RefAsset.TEMPLET:
                    asset = RefTemplet.Get(url);
                    break;
                default:
                    return;
            }
            asset.retain();
            if(!asset.parseComplete){
                asset.once(LEvent.COMPLETE, this, ()=>{ 
                    this._loadCount ++;
                    this.event(LEvent.CHANGED);
                });
            }
            else{
                this._loadCount ++;
            }
            this._loadMap[url] = asset;
            this._totalCount ++;
        }
        
        // 删除预加载
        clear(url:string, cancelLoad:boolean = false):void{
            let asset = this._loadMap[url];
            if(!asset){
                return;
            }
            if(asset.parseComplete){
                 this._loadCount --;
            }
            asset.release(cancelLoad);
            delete this._loadMap[url];
            this._totalCount --;
        }
    }
}
