/**
* name 
*/
module game.modules{
	export class LoadModuleCmd{
		constructor(){

		}
		private moduleName:String;
		private loadCmpFn:Function;
		private loadingTimer:Timer;
		private loadCount:number;
		private totalLoadCount:number = 2;
		public execute(moduleName:string, loadCmpFn:any=null):void
		{
			this.moduleName = moduleName;
			this.loadCmpFn = loadCmpFn;			
			
			var sp:IUiMediator = ModuleManager.instanceDic[moduleName] as IUiMediator;
			if(sp){//如果模块已经加载过就直接显示
				if (loadCmpFn!=null) {
					loadCmpFn(sp,moduleName);
				}
				console.log("已经初始化过该模块了");
				return;
			}
			var res:String = "" + "res/atlas/" + moduleName + ".atlas";
			//var res:String = PassportModel.getInstance().resroot + "res/atlas/" + moduleName + ".json";
			Laya.loader.load([{url: res, type: Loader.ATLAS}], Handler.create(null, function ():void {
				let ModuleClass:any = ModuleNames.getInstance().moduleClassDic[moduleName];
				var _sp:IUiMediator = new ModuleClass() as IUiMediator;
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