/**
* name 
*/
module game.utils{
	export class Vesion{
		// 版本文件加载完成
		static LOAD_VESION_COMPLETE:string = "LOAD_VESION_COMPLETE";
		// 数据加载完成
		static LOAD_DATA_COMPLETE:string = "LOAD_DATA_COMPLETE";

		
		/*文件搜索路径*/
		private static _searchPaths:Array<string> = [];
		private static _searchPathLangRes:Array<string> = [];
		private static _searchPathFiels:Object = {};

		private static _eventDispatcher:EventDispatcher;
		static get eventDispatcher():EventDispatcher{
			if(!this._eventDispatcher)
				this._eventDispatcher = new EventDispatcher();
			return this._eventDispatcher;
		}

		static on(type: string, caller: any, listener: Function, args?: Array<any>): EventDispatcher{
			return this.eventDispatcher.on(type, caller, listener, args);
		}

		static once(type: string, caller: any, listener: Function, args?: Array<any>): EventDispatcher{
			return this.eventDispatcher.once(type, caller, listener, args);
		}

		static off(type: string, caller: any, listener: Function, onceOnly?: boolean): EventDispatcher{
			return this.eventDispatcher.off(type, caller, listener, onceOnly);
		}

		static event(type: string, data?: any): boolean{
			return this.eventDispatcher.event(type, data);
		}

		/**
		 * 添加文件搜索路径
		 * @param path				路径
		 * @param isFront			是否插在前面
		 */
		static addSearchPath(path:string, langRes:string = null, isFront:Boolean = false):void{
			if(isFront){
				this._searchPaths.unshift(path);
				this._searchPathLangRes.unshift(langRes);
			}
			else{
				this._searchPaths.push(path);
				this._searchPathLangRes.push(langRes);
			}
		}

		// 加载文件版本信息文件
		static loadVesionFile():void{
			let url:string = gameConf.vesionFileUrl;
			if(url && url != ""){
				//加载vesionFile
				Laya.loader.load(url, Handler.create(this, (data:any)=>{
					let str = data ? StringU.readZlibData(new ByteArray(data)) : null;
					Laya.loader.clearRes(url, true);
					this.initVesionFiles(str);
				}, null, true));
			}
			else{
				Laya.loader.clearRes(url, true);
				this.initVesionFiles(null);
			}
		}

		private static _defaultVesion:String;
		/*文件版本控制*/		
		private static _VESION_FILES:Object = {};
		// 初始化文件版本控制	
		private static initVesionFiles(value:String):void	{
			if(value){
				let lines = value.split("\n");
				this._defaultVesion = lines[1];
				for (let i = 0; i < lines.length; i++){
					if(!lines[i] || lines[i].length==0) continue;
					let cols = lines[i].split(" ");
					if(cols.length == 2){
						this._VESION_FILES[cols[0]] =  cols[1];
					}
				}
			}

			// 重写一下url格式化函数
			this.baseFormatURL = Laya.URL.formatURL;
			// 加载语言包的formatURL
			Laya.URL.formatURL = (url: string, base?: string):string =>{
				url = this.createVersion(url);
				return this.baseFormatURL(url);
			};

			this.event(this.LOAD_VESION_COMPLETE);

			this.loadLangRes();
		}

		private static baseFormatURL:Function;
		
		// 获取url formatURL(url: string, base?: string): string;
		private static formatURL(url: string, base?: string):string{
			if(!url || url.indexOf('?v=') != -1){
				return url;
			}

			if(!base){
				base = Laya.URL.basePath;
			} 

			if(url.indexOf(base) == 0){
				url = url.replace(base, "");
			}
			const commonPath = "common/";
			var path:String = null;
			if(url.indexOf(commonPath) == 0){
				// 已经是版本路径了
				path = "";
			}
			if(path == null){
				for(let i = 0; i < this._searchPaths.length; i ++){
					if(url.indexOf(this._searchPaths[i]) == 0){
						// 已经是版本路径了
						path = "";
						break;
					}
					let fiels = this._searchPathFiels[this._searchPaths[i]];
					if(fiels && fiels[url]){
						path = this._searchPaths[i];
						break;
					}
				}
			}
			if(path == null){
				path = commonPath;
			}
			//生成版本号
			url = this.createVersion(path + url);
			// else{
			// 	logd("formatURL repeat", url, base);
			// }
			url = this.baseFormatURL(url);
			// logd("xxx", url)
			return url;
		}

		private static createVersion(url:string):string{
			//生成版本号
			let v = null;
			if(!this._VESION_FILES || !this._VESION_FILES[url]){
				// 没有版本信息使用默认版本号
				v = this._defaultVesion;
			}
			else{
				// 使用版本信息文件里描述的版本号
				v = this._VESION_FILES[url];
			}

			// 使用版本信息的版本号
			return v ? url + "?v=" + v : url;
		}
		
		/**
		 * 加载语言包信息
		 * @param callBack
		 */		
		private static loadLangRes(idx:number = 0):void{
			if(idx >= this._searchPathLangRes.length){
				// 正常阶段的formatURL
				Laya.URL.formatURL = (url: string, base?: string):string =>{
					return this.formatURL(url, base);
				};
				this.event(this.LOAD_DATA_COMPLETE);
				return;
			}
			var langRes:string = this._searchPathLangRes[idx];
			var searchPath:string = this._searchPaths[idx];
			idx ++;
			if(!langRes || langRes == ''){
				this.loadLangRes(idx);
				return;
			}
			let url = searchPath + langRes;
			Laya.loader.load(url, Handler.create(this, (data:any)=>{
					Laya.loader.clearRes(url, true);
					this.initLang(data, url);
					this.loadLangRes(idx);
			}, null, true));
		}

		/**
		 * 初始化语言资源包
		 */		
		private static initLang(data:any, searchPath:string, covered:Boolean = false):void{
			if(!data){
				return;
			}
			data = new ByteArray(data);
			var fielsPath = this._searchPathFiels[searchPath];
			if(!fielsPath){
				fielsPath = {};
				this._searchPathFiels[searchPath] = fielsPath;
			}
			let pathStrs = StringU.readZlibData(data);
			// let t1 = new Date().getTime();
			let jsStrs = StringU.readZlibData(data);
			// logd(111111, new Date().getTime() - t1);
		}
	}
}