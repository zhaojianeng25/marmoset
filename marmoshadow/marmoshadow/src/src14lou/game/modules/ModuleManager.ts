/**
* name 
*/
module game.modules{
	export class ModuleManager{
		constructor(){

		}
		public static instanceDic:Laya.Dictionary = new Laya.Dictionary();
		private static clientDic:Laya.Dictionary = new Laya.Dictionary();//模块名字为key ，客户端事件为value，用于处理客户端发出的 请求（模块未加载时候）
		private static _LoadModuleCmd:any;
		
		/*public static init(LoadModuleCmd:any):void {
			this._LoadModuleCmd = LoadModuleCmd;
		}*/
		public static loadAndDispatch(name:string, e:string, data:any = null, app:AppBase):void {
			
			//显示新模块
			this.clientDic.set(name, new ModuleEvent(e, data));
			//new this._LoadModuleCmd().execute(name, this.onLoad);
			this.loadModuleExecute(name, app, this.onLoad);
		}
		private static onLoad(m:any, n:string):void {
			if(ModuleManager.clientDic.get(n)){
				//var fun:ModuleEvent = ModuleManager.clientDic[n];
				var fun:ModuleEvent = ModuleManager.clientDic.get(n);
				m.event(fun.type, fun.data);
				
				ModuleManager.clientDic.remove(n);
			}
		}
		public static dispatchWhenLoaded(name:string, e:string, data:Object=null):void {
			if(this.instanceDic[name] != null) {
				if(!(this.instanceDic[name] as UiMediator).isShow) {
					return;
				}
				(this.instanceDic[name] as EventDispatcher).event(e, data);
			}
		}
		
		/*public static regForLoader(mainCmd:int, subCmd:int, name:String):void {
			var eventType:String=(mainCmd*256+subCmd).toString(); 
			SocketService.getInstance().addRspdEvent(mainCmd, subCmd, onNetMsgEvent);
			mDic[eventType]=name;
		}*/
		
		public static show(name:string, app:AppBase):void {
			ModuleManager.loadAndDispatch(name, ModuleEvent.SHOW,null, app);
		}
		public static jumpPage(name:string, page:number, app:AppBase):void {
			ModuleManager.loadAndDispatch(name, ModuleEvent.JUMP, page, app);
		}
		
		public static hide(name:string):void {
			ModuleManager.dispatchWhenLoaded(name, ModuleEvent.HIDE);
		}
		
		public static swap(name:string, app:AppBase):void {
			ModuleManager.loadAndDispatch(name, ModuleEvent.SWAP, null, app);
		}

		public static loadModuleExecute(moduleName:string, app:AppBase, loadCmpFn:any=null):void
		{
			//this.moduleName = moduleName;
			//this.loadCmpFn = loadCmpFn;			
			
			var sp:IUiMediator = ModuleManager.instanceDic[moduleName] as IUiMediator;
			if(sp){//如果模块已经加载过，就直接显示
				if (loadCmpFn != null) {
					loadCmpFn(sp,moduleName);
				}
				console.log("已经初始化过该模块了");
				return;
			}
			var res:String = "common/" + "res/atlas/ui/" + moduleName.toLocaleLowerCase() + ".atlas";
			//var res:String = PassportModel.getInstance().resroot + "res/atlas/" + moduleName + ".json";
			Laya.loader.load([{url: res, type: Loader.ATLAS}], Handler.create(null, function ():void {
				let ModuleClass:any = ModuleNames.getInstance().moduleClassDic[moduleName];
				var _sp:IUiMediator = new ModuleClass(app) as IUiMediator;
				if (!_sp) {
					console.log("模块未定义" + moduleName);
					return;
				}
				ModuleManager.instanceDic[moduleName] = _sp;
				if (loadCmpFn != null) {
					loadCmpFn(_sp,moduleName);
				}
				console.log("模块初始化:",moduleName,res);
			}));
			
			
		}
	}
}