/**
* 移动栈基类 
*/
module game.cotrl{
	
	export class BaseMoveStack extends BaseStack{
		
		/*目的地*/
		protected  _dstX:number;
		protected  _dstY:number;
		/*接受距离*/
		protected  _distance:number;

		private _nextUpdateTime:number = 0;
		
		/**
		 * 干道寻路完成后，路径的最后一点和要到达的点允许最大的距离 
		 */		
		protected static MAX_TRUNKGOTO_DIS:number = 5;

		constructor(app: AppBase, dstX:number, dstY:number, distance:number)
		{
			super(app);
			this._dstX = dstX;
			this._dstY = dstY;
			this._distance = distance;
		}
		
		/**
		 * 执行并返回子类是否有继续执行的必要
		 */		
		public initialize():boolean{
			if(!super.initialize()){
				return false;
			}
			
			let mapAssetInfo = this._sceneObjectMgr.mapAssetInfo;
			if(!mapAssetInfo){
				return false;
			}
			//如果目标点在障碍里 就不执行了
			if(mapAssetInfo.isObstacle(this._dstX,this._dstY)){
				return false;
			}
			
			if(!this._controller.canMove){
				return false;
			}
			
			return true;
		}
		
		public doReady():void{
			
		}
		
		/**
		 * 释放 
		 */		
		public finalize():void{
			this._nextUpdateTime = 0;
			super.finalize();
		}
		
		/**
		 * 心跳 
		 * @param diff
		 */		
		public update(diff:number):boolean{

			let cur_time:number = Laya.timer.currTimer;
			if(this._nextUpdateTime && this._nextUpdateTime > cur_time) return false;
			this._nextUpdateTime = cur_time + 200;

			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return true;
			}
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			if(MathU.getDistance(mpx,mpy,this._dstX,this._dstY) <= this._distance){
				return true;
			}
			
			return false;
		}
		
		
		/**
		 * 地图内部传送点中，最靠近指定点的传送点
		 * @param dstX 指定点x
		 * @param dstY 指定点y
		 * @return 
		 * 
		 */		
		protected findNearyTelePort(dstX:number, dstY:number):game.data.Teleport{
			var mUnit:game.object.Unit = this._sceneObjectMgr.mainUnit;
			//传送了 | 自己挂了 退出栈
			if(!mUnit  || mUnit.isDied){
				return null;
			}
			//地图传送点列表和id
			let mpx:number = mUnit.pos.x;
			let mpy:number = mUnit.pos.y;
			var id:number = 1;//this._objectMgr.mainPlayerData.GetMapID();
			
			var teleports:Array<game.data.Teleport> = this._sceneObjectMgr.mapAssetInfo.teleports;
			if(!teleports) return null;
			var shortTkP:game.data.Teleport;
			var shortdistance:number = Number.MAX_VALUE;
			var len:number = teleports.length;
			for(var i:number = 0; i < len; i ++)
			{
				var teleP:game.data.Teleport = teleports[i];
				//必须目标本地图的才行
				if(teleP.dstMapid != id)
					continue;
				//距离比以前短，太优越了，这点比以前更近更好
				var distance:number = MathU.getDistance(teleP.dstPortX, teleP.dstPortY, dstX, dstY);	
				if(distance < shortdistance)
				{
					//自己的位置 -> 传送点是否有路可走
					if(!this.canArrive(mpx, mpy, teleP.srcPortX, teleP.srcPortY))
						continue;
					//传送点之后的点 -> 目的地有路可走
					if(!this.canArrive(teleP.dstPortX, teleP.dstPortY, dstX, dstY))
						continue;
					
					//经过了苛刻的筛选，成功突破
					shortTkP = teleP;
					shortdistance = distance;
				}
			}
			return shortTkP;
		}
		
		/**
		 * 同张地图里面，目标起点X，Y是否能到达dstX，dstY 
		 * @param srcX 起点X
		 * @param srcY 起点Y
		 * @param dstX 目标X
		 * @param dstY 目标Y
		 * @return 
		 */		
		protected  canArrive(srcX:number, srcY:number, dstX:number, dstY:number):boolean{
			var mapData:game.data.MapAssetInfo = this._sceneObjectMgr.mapAssetInfo;
			//校验起点是否能到达
			// var path:Array<number> = mapData.trukPath.find(srcX, srcY, dstX, dstY);
			// if(game.utils.AStar.isInvalidPath(path)) return false;
			// //是否得到靠近的标准
			// //路径的最后端距离实际的点是否够近
			// var dis:number = MathU.getDistance(path[path.length-2],  path[path.length-1], dstX, dstY);
			// if(dis > BaseMoveStack.MAX_TRUNKGOTO_DIS)
			// 	return false;
			return true;
		}
		
		/**
		 * 能否直线到达
		 * @param srcX
		 * @param srcY
		 * @param dstX
		 * @param dstY
		 */		
		public canLineArrive(mapData:game.data.MapAssetInfo, srcX:number, srcY:number, dstX:number,dstY:number):boolean{
			var temp_x:number;
			var temp_y:number;
			//得到以自己为圆心的角度
			var angle:number = MathU.getAngle(srcX, srcY, dstX,dstY);
			
			//要求站的位置距离
			var dis:number = MathU.getDistance(srcX, srcY, dstX,dstY);	
			if(dis < 1) return false;
			for(var i:number = 1;i < dis;i++){
				temp_x = srcX + Math.cos(angle) * i;
				temp_y = srcY + Math.sin(angle) * i;
				if(mapData.isObstacle(temp_x, temp_y)){
					break;
				}
			}
			return temp_x == dstX && temp_y == dstY;
		}
	}
}