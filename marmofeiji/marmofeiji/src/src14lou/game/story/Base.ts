/**
* 剧情基类
*/
module game.story{
	export class Base{
		//有自己的视野显示规则
		haveSelfLookRule:boolean = false;
		//是否需要劫持摄像头
		needJieChiCamer:boolean = false;
		//假主玩家对象
		protected _mainFakeUnit:FakeUnit;

		protected _app:AppBase;
		constructor(app:AppBase){
			this._app = app;
		}

		//获取跟随对象
		get followUnit():FakeUnit{
			return this.needJieChiCamer? this._mainFakeUnit : null;
		}

		lookIn(obj:IAvatarObj):boolean{
			return false;
		}

		// 初始化
		init():void{
			this.addListener = true;
		}
		//剧情3D场景加载完成
		public onCompleteScene3D():void{

		}
		//移动场景
		public get isSceneMove(): boolean {
			return false;
		}
		/**
		 * 添加事件侦听(子类重写方法添加各类监听)
		 * 剧情初始化，清理函数会处理监听的开启和关闭
		 */
		protected set addListener(isAdd: boolean){

		}

		// 心跳
		update(diff:number):void{

		}

		//点击地面
		onSceneTouch(cellx:number, celly:number, hitObject:any):boolean{
			return false;
		}

		//释放技能
		castSpell(castr:Unit, spellId:number, isTrajectory:boolean = false, target:any = null):void{
			this._app.sceneRoot.onSpellCast(castr, spellId, isTrajectory, target);
		}

		//显示特效
		showEffect(target:Unit, name:string, x:number=0, y:number=0, z:number=0):void{
			this._app.sceneRoot.showEffect(target, name, x, y, z);
		}
		
		//显示特效(主要用于图集资源的特效，目前是技能使用)
		showFrameEffect(target:Unit, name:string, info:any = null, x:number=0, y:number=0, z:number=0):void{
			this._app.sceneRoot.showFrameEffect(target, name, info, x, y, z);
		}
		
		//清理特效
		clearEffect(target:Unit, name:string):void{
			this._app.sceneRoot.clearEffect(target, name);
		}

		//创建战斗飘字信息
		createdFightxt(target:Unit, type: number, data: any, isbottom: boolean = false):void{
			this._app.sceneRoot.createdFightxt(target, type, data, isbottom);
		}

		// 执行模拟移动
		doImitateMove(target:Unit, x: number, y: number, type: number, totalTime: number, delay: number = 0): void {
			this._app.sceneRoot.doImitateMove(target, x, y, type, totalTime, delay);
		}

		/**
		 * 战斗场景动作
		 * @param atnStus 动作枚举
		 * @param completeState 动作完成状态:0 循环,1 最后一幀,2 默认动作
		 */
		battleAction(target:Unit, atnStus:number, completeState:number = 2):void{
			this._app.sceneRoot.battleAction(target, atnStus, null, completeState);
		}

		//显隐战斗黑底
		showBack(isShow:boolean):void{
			this._app.sceneRoot.showBack(isShow);
		}

		// 清理
		clear():void{
			this.addListener = false;
		}
	}
}