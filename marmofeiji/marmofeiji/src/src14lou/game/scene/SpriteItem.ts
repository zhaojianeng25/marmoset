/**
* name 
*/
module game.scene{
	export class SpriteItem{
		//路径
		private static _path:string;		
		static set path(v:string){
			this._path = v;
		}

		private static G_BUFFER:ByteArray;
		//索引文件列表
		private static G_IDXaddressFiles:laya.utils.Dictionary;
		/*错误累计次数*/
		private static G_errorCount:number = 0;
		/*是否出错*/
		private static G_isError:boolean = false;
		/*错误重试次数*/
		private static ERRORTRY_COUNT:number = 3;
		/*所有请求的回调*/
		private static G_callers:Array<SpriteItem> = new Array<SpriteItem>();
		
		// 加载idxzip文件 	
		private static loadIdxZip(caller:SpriteItem):void{
			//回调不允许为空
			if(caller== null)
				loge("AvatarItem.loadIdxZip callBack is null.");
			
			//解压出来的在，则忽略下面
			if(SpriteItem.G_IDXaddressFiles){
				caller.onComplete();
				return;
			}
			//如果该回调存在，则忽略，不需要重复监听
			if(SpriteItem.G_callers.indexOf(caller) >=0 ) 
				return;			
			//插入到队列
			SpriteItem.G_callers.push(caller);
			let url = SpriteItem._path + "idxzip.bin";
			let refAsset = RefAsset.Get(url);
			refAsset.retain();
			if(!refAsset.parseComplete){
				refAsset.once(LEvent.COMPLETE, this, ()=>{
					let data = Laya.loader.getRes(url);
					refAsset.release(true);
					this.onG_SOURCE_Complete(data);
				});
			}
			else{
				let data = Laya.loader.getRes(url);
				refAsset.release(true);
				this.onG_SOURCE_Complete(data);
			}
		}
		
		//索引文件下载完成
		private static onG_SOURCE_Complete(data:any):void{
			//转换成ByteArray
			SpriteItem.G_BUFFER = new ByteArray(data);
			SpriteItem.G_BUFFER.uncompress();
			//读取
			var filesCount:number = SpriteItem.G_BUFFER.readUnsignedInt();
			SpriteItem.G_IDXaddressFiles = new laya.utils.Dictionary();
			//内存地址偏移
			for (var i:number = 0; i < filesCount; i++) {
				var fileName:string = SpriteItem.G_BUFFER.readUTF();
				var fileSize:number = SpriteItem.G_BUFFER.readUnsignedShort();
				SpriteItem.G_IDXaddressFiles.set(fileName, SpriteItem.G_BUFFER.position);
				SpriteItem.G_BUFFER.position += fileSize;
			}
			
			//开始处理回调
			for (var j:number = 0; j < SpriteItem.G_callers.length; j++) {
				let si:SpriteItem = SpriteItem.G_callers[j];
				si.onComplete();
			}
			SpriteItem.G_callers.length = 0;
		}

		/*正在下载...*/
		protected _loading:boolean = false;
		/*当前已全部下载*/
		protected _loaded:boolean = false;
		/*是否错误*/
		protected _isError:boolean = false;
		
		/**
		 * 加载是否出错 
		 * @return 
		 * 
		 */		
		public get isError():boolean{
			//return SpriteItem.G_isError || this._isError;
			return this._isError;
		}
		
		/**
		 * 是否已下载 
		 * @return 
		 * 
		 */		
		public get isLoaded():boolean{
			return this._loaded;
		}
		/*索引文件已下载*/
		protected _idxLoaded:boolean = false;		
		/*物品素材名称*/
		protected _itemName:string;		
		/*装备图来源*/
		protected _sheetLoaders:Array<AvatarPacketLoader> = new Array<AvatarPacketLoader>();
		/*路径*/
		protected _fullPath:string;
		/*是否预加载*/
		protected _isPreload:boolean = false;
		/*指定预加载包索引列表*/
		private _resPacketIdxs:Array<number>;
		//idx文件地址
		protected _idxURL:string;

		
		/**
		 * 装备名称 
		 * @return 
		 * 
		 */		
		public get itemName():string{
			return this._itemName;
		}
		
		constructor (itemName:string)
		{			
			this._itemName = itemName;
			this._fullPath = SpriteItem._path + this._itemName;
		}
		
		/**
		 * 下一次下载时间 
		 */		
		public static NEXT_PRELOAD_TIME:number;
		/**
		 * 间隔时间 
		 */		
		public static INTERVAL_TIME:number = 2000;
		
		/**
		 * 不得超过的最大间隔 
		 */		
		public static MAX_INTERVAL_TIME:number = 2000;
		
		/**
		 * 预加载 
		 * 
		 */		
		private preLoad():void
		{			
			var i:number;
			//如果有指定预加载包
			if(this._resPacketIdxs)
			{
				for (i = 0; i < this._resPacketIdxs.length; i++) 
				{
					var resIdx:number = this._resPacketIdxs[i];
					if(resIdx>= 0 && resIdx < AvatarData.MAX_RES_PACKET)
						this.startLoadPacket(resIdx);
				}
			}
			else
			{//没有 则加载所有
				for (i = 0; i < AvatarData.MAX_RES_PACKET; i++)
				{
					this.startLoadPacket(i);
				}
			}
			
		}
		
		/**
		 * 开始加载包 
		 * @param resIdx
		 * 
		 */		
		private startLoadPacket(resIdx:number):void
		{
			//如果时间已经到达，则直接下载
			var spanTime:number = SpriteItem.NEXT_PRELOAD_TIME - Laya.timer.currTimer;
			SpriteItem.NEXT_PRELOAD_TIME = Laya.timer.currTimer + SpriteItem.INTERVAL_TIME;
			
			if(spanTime < 0 || spanTime> SpriteItem.MAX_INTERVAL_TIME){
				this.loadPacket(resIdx);
			}else{
				setTimeout(this.loadPacket, spanTime, resIdx);
				SpriteItem.NEXT_PRELOAD_TIME += spanTime;
			}
		}
		
		
		/**
		 * 加载资源包 
		 * @param resIdx
		 * @return 
		 * 
		 */		
		public loadPacket(sheetid:number):AvatarPacketLoader
		{
			//得到png加载器,如果没有则创建并加载
			var aploader:AvatarPacketLoader = this._sheetLoaders.length > sheetid ? this._sheetLoaders[sheetid] : null;
			var url:string = this._fullPath + "_" + sheetid.toString() + ".png";
			if(!aploader){
				aploader = new AvatarPacketLoader(url);
				this._sheetLoaders[sheetid] = aploader;
				aploader.index = sheetid;
			}
			return aploader;
		}
		
		/**
		 * 开始下载  
		 * @param isPreload			是否预加载
		 * @param resPacketIdxs		指定预加载包索引列表
		 * 
		 */			
		public download(isPreload:boolean,resPacketIdxs:Array<number> = null):void
		{
			this._isPreload = isPreload;
			this._resPacketIdxs = resPacketIdxs;	
			//已经处于下载完成状态，无需下载
			if(this._loaded || this._loading)	return;
			this._loading = true;
			//loadzip
			SpriteItem.loadIdxZip(this);
		}

		protected onComplete():void
		{
			var addressValue:number = SpriteItem.G_IDXaddressFiles.get(this.itemName);
			if(!addressValue){
				this._isError = true;
				return;
			}
			try{
				 //开始解析idx文件
				 SpriteItem.G_BUFFER.position = addressValue as number;
				 this.readIdxFile(SpriteItem.G_BUFFER);
			}catch(e){
				this._isError = true;
				logd("AvatarItem.onComplete.readIdxFile is Error :" + e.message + "[" + this._itemName + "]");
				return;
			}
			// //转换成ByteArray
			// var data:ByteArray = new ByteArray(Laya.loader.getRes(this._idxURL));
			// // data.endian = Endian.BIG_ENDIAN;
			// if(data.length==0){
			// 	this._isError = true;
			// 	return;
			// }
			// try{
			// 	this.readIdxFile(data);
			// }catch(e){
			// 	logd("[game.scene.SpriteItem.readIdxFile] error.",e);
			// }
			
			//广播事件
			this._loaded = true;
			//启动预加载
			if(this._isPreload)
				this.preLoad();
		}
		
		protected readIdxFile(stream:ByteArray):void{
			throw new Error("Unrealized function:readIdFile ");
		}
		
		public clear(checkNow:boolean):void{
			for (var i:number = 0; i < this._sheetLoaders.length; i++) {
				if(this._sheetLoaders[i]){
					this._sheetLoaders[i].close(checkNow);
					this._sheetLoaders[i] = null;
				}
			}	
			this._sheetLoaders.length = 0;
		}
	}
}