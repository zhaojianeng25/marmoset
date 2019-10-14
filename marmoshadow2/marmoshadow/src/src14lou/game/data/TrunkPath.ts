/**
* 寻路
*/
module game.data {
	export class TrunkPath {
		/*A星*/
		private _aStar: AStar;
		/*干道点*/
		private _trunkPoints: Array<TrunkPoint>;
		/*节点到其他节点的距离描述 -- 有序的*/
		private _dijkstra_map: Array<any>;

		constructor(aStar :AStar) {
			this._aStar = aStar;
		}

		/**
		 * A*
		 */
		get aStar(): AStar {
			return this._aStar;
		}

		/**	干道点 */
		set trunkPoints(v: Array<TrunkPoint>){
			this._trunkPoints = v;
			this._dijkstra_map = [];
			if (!this._trunkPoints) {
				return;
			}
			for (var i: number = 0; i < this._trunkPoints.length; i++) {
				var part: Array<number> = this.createdDistanceArr();
				this._dijkstra_map[this._dijkstra_map.length] = part;
				for (var j: number = 0; j < this._trunkPoints[i].nextPoints.length; j++) {
					var trunkPoint: TrunkPoint = this.findTrunkPointId(this._trunkPoints[i].nextPoints[j]);
					if (trunkPoint && trunkPoint != this._trunkPoints[i]) {
						var distance: number = MathU.getDistance(this._trunkPoints[i].x, this._trunkPoints[i].y, trunkPoint.x, trunkPoint.y);
						part[trunkPoint.id] = distance;
					}
				}
			}

			// logd('--------------------------------------------')
			// for(let i = 0; i < this._dijkstra_map.length; i ++){
			// 	logd(this._dijkstra_map[i])
			// }
			// logd('--------------------------------------------')
			// logd('this.find(130, 250, 272, 150)')
			// logd(this.find(130, 250, 272, 150))
		}

		/**
		 * 创建dijkstra_map需要的距离数组
		 * @return 
		 */
		private createdDistanceArr(): Array<number> {
			var arr: Array<number> = [];
			for (var i: number = 0; i < this._trunkPoints.length; i++) {
				arr[arr.length] = Dijkstra.NO_PATH;
			}
			return arr;
		}

		/**
		 * 找到关键点
		 * @param p
		 * @return 
		 */
		private findTrunkPointId(p: point): TrunkPoint {
			for (var i: number = 0; i < this._trunkPoints.length; i++) {
				if (this._trunkPoints[i].equals(p))
					return this._trunkPoints[i];
			}
			return null;
		}

		/**
		 * 查找线段两端最近的点 
		 * @param x
		 * @param y
		 * @param refPath 返回x，y 到 该点的路径
		 * @return 
		 */
		private nearyPoint(x: number, y: number, refPath: Array<number>): TrunkPoint {
			if (!this._trunkPoints) return null;
			var list: Array<TrunkPoint> = this._trunkPoints.concat();
			var len: number = list.length;
			//算出距离
			for (var i: number = 0; i < len; i++) {
				var cur: TrunkPoint = list[i];
				cur.distance = MathU.getDistance(x, y, cur.x, cur.y);
			}
			//按距离从小到大有序的排列
			list = list.sort(this.nearyPointCompare);
			this._aStar.maxTry = 300;
			len = len > 5 ? 5 : len;//最多尝试5次
			for (i = 0; i < len; i++) {
				//必须可到达
				var path: Array<number> = this._aStar.findByStraightLine(x, y, list[i].x, list[i].y);
				if (AStar.isInvalidPath(path))
				 	continue;
				let len = path.length;
				refPath.length = len;
				for(let j = 0; j < len; j ++){
					refPath[j] = path[j];
				}
				return list[i];
			}
			//执行到这一句，就是悲剧的时候，说明无法到达，所以只能随便给第一点了
			return list[0];
		}

		private nearyPointCompare(a: TrunkPoint, b: TrunkPoint): number {
			return a.distance - b.distance;
		}

		/**
		 * 获得路径总里程 
		 * @param path 路径
		 * @return 
		 */
		private getPathMileage(path: Array<number>): number {
			var len: number = path.length / 2;
			if (len <= 1) return 0;

			var nodeX: number = path[0];
			var nodeY: number = path[1];

			var total: number = 0;
			for (var i: number = 1; i < len; i++) {
				var idx: number = i * 2;
				total += MathU.getDistance(path[idx], path[idx + 1], nodeX, nodeY);
				nodeX = path[idx];
				nodeY = path[idx + 1];
			}
			return total;
		}

		/**
		 * 查找路径 
		 * @param startX
		 * @param startY
		 * @param endX
		 * @param endY
		 * @return 
		 */
		public find(startX: number, startY: number, endX: number, endY: number, NEAREST_ASTART_DISTANCE: number = 15): Array<number> {
			///////////////////// 1.如果射线直接可以到达，何苦走干道/////////////////////////////
			var path: Array<number>;			
			path = this._aStar.findByStraightLine(startX, startY, endX, endY);
			if(path != null)
				return path;
			////////////////////// 2.寻找最近干道入口点 ///////////////////////////////
			var entrAStatPath: Array<number> = new Array<number>();
			var exitAStatPath: Array<number> = new Array<number>();
			//寻找离起点最近干道入口点
			var entrRamp: TrunkPoint = this.nearyPoint(startX, startY, entrAStatPath);
			//寻找离终点最近干道出口点
			var exitRamp: TrunkPoint = this.nearyPoint(endX, endY, exitAStatPath);
			//找不到入口点或出口点则返回null
			if (!entrRamp || !exitRamp) return null;
			/////////////////////// 3.获得入口和出口的干道路径 //////////////////////////
			//干道的中间路径
			path = new Array<number>();
			//从干道入口到干道出口的路径
			var dijkResult: Object = Dijkstra.getShortedPath(this._dijkstra_map, entrRamp.id, exitRamp.id);//地图数组,起点,终点
			//转换到干道中间路径
			var drltLen: number = dijkResult["path"].length;
			for (var i: number = 0; i < drltLen; i++) {
				path.push(this._trunkPoints[dijkResult["path"][i]].x, this._trunkPoints[dijkResult["path"][i]].y);
			}
			//从干道入口到干道出口是否有效
			if (!path.length) return null;
			//////////////////////// 4.寻找最佳干道入口点 //////////////////////////////
			//////////////////////// 有可能会绕远了，所以有时候可以从干道节点第二点开始查
			//起点不是入口才需要判断干道入口那一段
			if (startX != entrRamp.x || startY != entrRamp.y) {
				if(path.length >= 4){
					let secondX = path[2];
					let secondY = path[3];
					let secondPath: Array<number> = this._aStar.findByStraightLine(startX, startY, secondX, secondY);
					if (!AStar.isInvalidPath(secondPath)){
						let secondDist = this.getPathMileage(secondPath);
						let fristDist = this.getPathMileage(entrAStatPath) + MathU.getDistance(path[0], path[1], secondX, secondY);
						if(secondDist < fristDist){
							path.splice(0, 2); 			// 去掉干道第一点
							entrAStatPath = secondPath;	// 启用备选更短路径
						}
					}
				}
				//开始连接在一起
				path.splice(0, 2);
				path = entrAStatPath.concat(path);
			}
			//////////////////////// 5.寻找最佳干道出口点 //////////////////////////////
			//////////////////////// 有可能会绕远了，所以有时候可以从干道节点倒数第二点开始查
			if (endX != exitRamp.x || endY != exitRamp.y) {
				if(path.length >= 4){
					let pathSize = path.length;
					let secondX = path[pathSize - 4];
					let secondY = path[pathSize - 3];
					let secondPath: Array<number> = this._aStar.findByStraightLine(endX, endY, secondX, secondY);
					if (!AStar.isInvalidPath(secondPath)){
						let secondDist = this.getPathMileage(secondPath);
						let fristDist = this.getPathMileage(exitAStatPath) + MathU.getDistance(path[pathSize - 2], path[pathSize - 1], secondX, secondY);
						if(secondDist < fristDist){
							// 去掉干道第最后一点
							if(path.length > 2){
								path.length = path.length - 2
							} 			
							exitAStatPath = secondPath;	// 启用备选更短路径
						}
					}
				}

				//开始连接在一起
				if(path.length > 2){
					path.length = path.length - 2
				}
				let count = exitAStatPath.length / 2;
				for(let i = 0; i < count; i ++){
					let index = (count - i - 1) * 2;
					path.push(exitAStatPath[index], exitAStatPath[index + 1]);
				}
			}
			return path;
		}
	}
}