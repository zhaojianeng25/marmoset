module game.utils {

	/**
	* 最短路径算法
	*/
	export class Dijkstra {
		//无法通过的距离;
		static NO_PATH: number = 1000000;

		constructor() {

		}

		//从某一源点出发，找到到某一结点的最短路径
		static getShortedPath(G: Array<any>, star: number, end: number, maxlong: number = Dijkstra.NO_PATH): Object {
			var len: number = G.length;
			var s: Array<any> = new Array<any>();
			var min: number;
			var curNode: number = 0;
			var dist: Array<any> = new Array<any>();
			var prev: Array<any> = new Array<any>();

			var path: Array<any> = new Array<any>();

			for (var v: number = 0; v < len; v++) {
				s[v] = false;
				dist[v] = G[star][v];
				if (dist[v] >= maxlong) {
					prev[v] = 0;
				}
				else {
					prev[v] = star;
				}
			}
			path[0] = end;
			dist[star] = 0;
			s[star] = true;

			for (var i: number = 1; i < len; i++) {
				min = maxlong;
				for (var w: number = 0; w < len; w++) {
					if ((!s[w]) && (dist[w] < min)) {
						curNode = w;
						min = dist[w];
					}
				}
				s[curNode] = true;
				for (var j: number = 0; j < len; j++) {
					if ((!s[j]) && ((min + G[curNode][j]) < dist[j])) {
						dist[j] = min + G[curNode][j];
						prev[j] = curNode;
					}
				}
			};

			var e: number = end;
			var step: number = 0;
			const maxTitl: number = 3000;
			var curTitl: number = 0;
			while (e != star) {
				curTitl++;
				if (curTitl > maxTitl) {
					return { dist: dist[end], path: [] };
				}

				step++;
				path[step] = prev[e];
				e = prev[e];
			}
			for (var q: number = step; q > (step / 2); q--) {
				var temp: number = path[step - q];
				path[step - q] = path[q];
				path[q] = temp;
			}

			return { dist: dist[end], path: path };
		}



		//从某一源点出发,找出到所有节点的最短路径
		static getShortedPathList(G: Array<any>, star: number, maxlong: number = Dijkstra.NO_PATH): Object {
			var len: number = G.length;
			var pathID: Array<any> = new Array<any>(len);
			var s: Array<any> = new Array<any>(len);
			var max: number;
			var curNode: number = 0;
			var dist: Array<any> = new Array<any>(len);
			var prev: Array<any> = new Array<any>(len);

			var path: Array<any> = new Array<any>(len);
			for (var n: number = 0; n < len; n++) {
				path[path.length] = [];
			}

			for (var v: number = 0; v < len; v++) {
				s[v] = false;
				dist[v] = G[star][v];
				if (dist[v] > maxlong) {
					prev[v] = 0;
				}
				else {
					prev[v] = star;
				}
				path[v][0] = v;
			}
			dist[star] = 0;
			s[star] = true;

			for (var i: number = 1; i < len; i++) {
				max = maxlong;
				for (var w: number = 0; w < len; w++) {
					if ((!s[w]) && (dist[w] < max)) {
						curNode = w;
						max = dist[w];
					}
				}
				s[curNode] = true;
				for (var j: number = 0; j < len; j++) {
					if ((!s[j]) && ((max + G[curNode][j]) < dist[j])) {
						dist[j] = max + G[curNode][j];
						prev[j] = curNode;
					}
				}
			}

			for (var k: number = 0; k < len; k++) {
				var e: number = k;
				var step: number = 0;
				const maxTitl: number = 3000;
				var curTitl: number = 0;
				while (e != star) {
					curTitl++;
					if (curTitl > maxTitl) {
						return { dist: dist, path: [] };
					}
					step++;
					path[k][step] = prev[e];
					e = prev[e];
				}
				for (var p: number = step; p > (step / 2); p--) {
					var temp: number = path[k][step - p];
					path[k][step - p] = path[k][p];
					path[k][p] = temp;
				}
			}
			return { dist: dist, path: path };
		}
	}

	/**
	* 地图接口
	*/
	export interface IMapElement {
		/**
		 * 是否可通过
		 * @param curX 当前X轴
		 * @param curY 当前Y轴
		 * @param nextX 下一个X轴
		 * @param nextY 下一个Y轴
		 * @return 通过true，不通过为false
		 */
		isBlock(curX: number, curY: number, nextX: number, nextY: number): boolean;

		/**
		 * 两点直线网格碰撞 (是否可通过)
		 * @param x0 起点x
		 * @param y0 起点y
		 * @param x1 终点x
		 * @param y1 终点y
		 * @return 返回是否可以通过 
		 */
		canTransit(x0: number, y0: number, x1: number, y1: number): boolean;
	}

	/**
	* A*寻路算法
	*/
	export class AStar {
		//====================================
		//    Constants
		//====================================
		//横或竖向移动一格的路径评分
		private COST_STRAIGHT: number = 10;
		//斜向移动一格的路径评分
		private COST_DIAGONAL: number = 14;

		//(单个)节点数组 节点ID 索引
		private NOTE_ID: number = 0;
		//(单个)节点数组 是否在开启列表中 索引
		private NOTE_OPEN: number = 1;
		//(单个)节点数组 是否在关闭列表中 索引
		private NOTE_CLOSED: number = 2;
		//====================================
		//    Member iables
		//====================================
		//地图模型
		private m_mapTileModel: IMapElement;
		//最大寻路步数，限制超时返回
		private m_maxTry: number;

		//开放列表，存放节点ID
		private m_openList: Array<any>;
		//开放列表长度
		private m_openCount: number;
		//节点加入开放列表时分配的唯一ID(从0开始)
		//根据此ID(从下面的列表中)存取节点数据
		private m_openId: number;

		//节点x坐标列表
		private m_xList: Array<any>;
		//节点y坐标列表
		private m_yList: Array<any>;
		//节点d坐标列表
		private m_dList: Array<any>;

		//节点路径评分列表
		private m_pathScoreList: Array<any>;
		//(从起点移动到)节点的移动耗费列表
		private m_movementCostList: Array<any>;
		//节点的父节点(ID)列表
		private m_fatherList: Array<any>;

		//节点(数组)地图,根据节点坐标记录节点开启关闭状态和ID
		private m_noteMap: Array<any>;

		constructor(p_mapTileModel: IMapElement, p_maxTry: number = 300) {
			this.m_mapTileModel = p_mapTileModel;
			this.m_maxTry = p_maxTry;
		}

		/**
		 * 最大寻路步数，限制超时返回
		 */
		get maxTry(): number {
			return this.m_maxTry;
		}
		set maxTry(p_value: number) {
			this.m_maxTry = p_value;
		}

		/**
		 * 是否为无效的路径 
		 * @param path 路径数据
		 * @return 
		 */
		static isInvalidPath(path: Array<number>): Boolean {
			return !path || path.length < 2 || (path.length & 0x01) == 1;
		}



		/**
		 * 开始寻路，返回关键点路径, 根据射线返回
		 * @param p_startX      起点X坐标
		 * @param p_startY      起点Y坐标
		 * @param p_endX        终点X坐标
		 * @param p_endY        终点Y坐标
		 * @return              找到的路径(二维数组 : [p_startX, p_startY, direct], ... , [p_endX, p_endY, direct])
		 */
		find3(p_startX: number, p_startY: number, p_endX: number, p_endY: number): Array<number> {
			var result: Array<any> = this.find(p_startX, p_startY, p_endX, p_endY);
			if (!result || result.length < 2) {
				return null;
			}

			//路径
			var path: Array<number> = new Array<number>();
			path.push(p_startX, p_startY);

			//开始筛选出关键点
			var index: number = 1;
			var fromX: number = p_startX;
			var fromY: number = p_startY;

			//允许最大的过期次数
			const maxTTL: number = 20000;
			//过期次数
			var ttl: number = 0;

			while (true)/* loop */ {
				if (ttl >= maxTTL) {
					loge("AStar.find3，TTL超过最大次数：" + maxTTL.toString());
					return null;
				}
				ttl++;

				index++;
				if (index >= result.length)
					break;

				if (this.m_mapTileModel.canTransit(fromX, fromY, result[index][0], result[index][1])) {
					continue;
				}
				else {
					//插入到路径里
					// var pt:[] = result[index - 1];
					fromX = result[index - 1][0];
					fromY = result[index - 1][1];
					path.push(fromX, fromY);
				}
			}

			path.push(p_endX, p_endY);
			return path;
		}

		/**
		 * 开始寻路
		 * 
		 * @param p_startX        起点X坐标
		 * @param p_startY        起点Y坐标
		 * @param p_endX        终点X坐标
		 * @param p_endY        终点Y坐标
		 * 
		 * @return                 找到的路径(二维数组 : [p_startX, p_startY, direct], ... , [p_endX, p_endY, direct])
		 */
		find(p_startX: number, p_startY: number, p_endX: number, p_endY: number): Array<any> {
			if (!this.m_mapTileModel.isBlock(p_startX, p_startY, p_endX, p_endY)) {
				//logd("[AStart.find] 目标点为路障 " + p_endX + "," + p_endY);
			}
			this.initLists();
			this.m_openCount = 0;
			this.m_openId = -1;

			this.openNote(p_startX, p_startY, 9, 0, 0, 0);

			var currTry: number = 0;
			var currId: number;
			var currNoteX: number;
			var currNoteY: number;
			var aroundNotes: Array<any>;

			var checkingId: number;

			var cost: number;
			var score: number;

			const maxTTL: number = 20000;
			var ttl: number = 0;


			while (this.m_openCount > 0) {
				ttl++;
				if (ttl > maxTTL)
					loge("循环次数超过最大值：" + maxTTL);

				//超时返回
				if (++currTry > this.m_maxTry) {
					this.destroyLists();
					return null;
				}
				//每次取出开放列表最前面的ID
				currId = this.m_openList[0];
				//将编码为此ID的元素列入关闭列表
				this.closeNote(currId);
				currNoteX = this.m_xList[currId];
				currNoteY = this.m_yList[currId];

				//如果终点被放入关闭列表寻路结束，返回路径
				if (currNoteX == p_endX && currNoteY == p_endY) {
					return this.getPath(p_startX, p_startY, currId);
				}
				//获取周围节点，排除不可通过和已在关闭列表中的
				aroundNotes = this.getArounds(currNoteX, currNoteY);
				//对于周围的每一个节点
				for (let note of aroundNotes) {
					//计算F和G值
					cost = this.m_movementCostList[currId] + ((note[0] == currNoteX || note[1] == currNoteY) ? this.COST_STRAIGHT : this.COST_DIAGONAL);
					score = cost + (Math.abs(p_endX - note[0]) + Math.abs(p_endY - note[1])) * this.COST_STRAIGHT;
					//                    score = cost;
					if (this.isOpen(note[0], note[1])) //如果节点已在播放列表中
					{
						checkingId = this.m_noteMap[note[1]][note[0]][this.NOTE_ID];
						//如果新的G值比节点原来的G值小,修改F,G值，换父节点
						if (cost < this.m_movementCostList[checkingId]) {
							this.m_movementCostList[checkingId] = cost;
							this.m_pathScoreList[checkingId] = score;
							this.m_fatherList[checkingId] = currId;
							//获取某ID节点在开放列表中的索引(去掉先前函数使用数组api查询可使效率提高1/4左右)
							this.aheadNote(this.m_openList.indexOf(checkingId));
						}
					} else //如果节点不在开放列表中
					{
						//将节点放入开放列表
						this.openNote(note[0], note[1], note[2], score, cost, currId);
					}
				}
			}
			//开放列表已空，找不到路径
			this.destroyLists();
			return null;
		}
		//====================================
		//    Private Methods
		//====================================
		/**
		 * @private
		 * 将节点加入开放列表
		 * 
		 * @param p_x        节点在地图中的x坐标
		 * @param p_y        节点在地图中的y坐标
		 * @param P_score    节点的路径评分
		 * @param p_cost    起始点到节点的移动成本
		 * @param p_fatherId    父节点
		 */
		private openNote(p_x: number, p_y: number, p_d: number, p_score: number, p_cost: number, p_fatherId: number): void {
			this.m_openCount++;
			this.m_openId++;

			if (this.m_noteMap[p_y] == null) {
				this.m_noteMap[p_y] = [];
			}
			this.m_noteMap[p_y][p_x] = [];
			this.m_noteMap[p_y][p_x][this.NOTE_OPEN] = true;
			this.m_noteMap[p_y][p_x][this.NOTE_ID] = this.m_openId;

			this.m_xList[this.m_xList.length] = p_x;
			this.m_yList[this.m_yList.length] = p_y;
			this.m_dList[this.m_dList.length] = p_d;
			this.m_pathScoreList[this.m_pathScoreList.length] = p_score;
			this.m_movementCostList[this.m_movementCostList.length] = p_cost;
			this.m_fatherList[this.m_fatherList.length] = p_fatherId;
			this.m_openList[this.m_openList.length] = this.m_openId;

			this.aheadNote(this.m_openCount);
		}
		/**
		 * @private
		 * 将节点加入关闭列表
		 */
		private closeNote(p_id: number): void {
			this.m_openCount--;
			var noteX: number = this.m_xList[p_id];
			var noteY: number = this.m_yList[p_id];
			this.m_noteMap[noteY][noteX][this.NOTE_OPEN] = false;
			this.m_noteMap[noteY][noteX][this.NOTE_CLOSED] = true;

			if (this.m_openCount <= 0) {
				this.m_openCount = 0;
				this.m_openList = [];
				return;
			}
			this.m_openList[0] = this.m_openList.pop();
			this.backNote();
		}
		/**
		 * @private
		 * 将(新加入开放别表或修改了路径评分的)节点向前移动
		 */
		private aheadNote(p_index: number): void {
			var father: number;
			var change: number;
			while (p_index > 1) {
				//父节点的位置
				father = Math.floor(p_index / 2);
				//如果该节点的F值小于父节点的F值则和父节点交换
				if (this.getScore(p_index) <= this.getScore(father)) {
					change = this.m_openList[p_index - 1];
					this.m_openList[p_index - 1] = this.m_openList[father - 1];
					this.m_openList[father - 1] = change;
					p_index = father;
				} else {
					break;
				}
			}
		}
		/**
		 * @private
		 * 将(取出开启列表中路径评分最低的节点后从队尾移到最前的)节点向后移动
		 */
		private backNote(): void {
			//尾部的节点被移到最前面
			var checkIndex: number = 1;
			var tmp: number;
			var change: number;

			const maxTitl: number = 5000;
			var curTitl: number = 0;

			while (true) {
				curTitl++;
				if (curTitl > maxTitl) {
					loge("AStar.backNote异常，超过了循环最大限制。");
					// return;
				}

				tmp = checkIndex;
				//如果有子节点
				if (2 * tmp <= this.m_openCount) {
					//如果子节点的F值更小
					if (this.getScore(checkIndex) > this.getScore(2 * tmp)) {
						//记节点的新位置为子节点位置
						checkIndex = 2 * tmp;
					}
					//如果有两个子节点
					if (2 * tmp + 1 <= this.m_openCount) {
						//如果第二个子节点F值更小
						if (this.getScore(checkIndex) > this.getScore(2 * tmp + 1)) {
							//更新节点新位置为第二个子节点位置
							checkIndex = 2 * tmp + 1;
						}
					}
				}
				//如果节点位置没有更新结束排序
				if (tmp == checkIndex) {
					break;
				}
				//反之和新位置交换，继续和新位置的子节点比较F值
				else {
					change = this.m_openList[tmp - 1];
					this.m_openList[tmp - 1] = this.m_openList[checkIndex - 1];
					this.m_openList[checkIndex - 1] = change;
				}
			}
		}
		/**
		 * @private
		 * 判断某节点是否在开放列表
		 */
		private isOpen(p_x: number, p_y: number): Boolean {
			if (this.m_noteMap[p_y] == null) return false;
			if (this.m_noteMap[p_y][p_x] == null) return false;
			return this.m_noteMap[p_y][p_x][this.NOTE_OPEN];
		}
		/**
		 * @private
		 * 判断某节点是否在关闭列表中
		 */
		private isClosed(p_x: number, p_y: number): Boolean {
			if (this.m_noteMap[p_y] == null) return false;
			if (this.m_noteMap[p_y][p_x] == null) return false;
			return this.m_noteMap[p_y][p_x][this.NOTE_CLOSED];
		}
		/**
		 * @private
		 * 获取某节点的周围节点，排除不能通过和已在关闭列表中的
		 */
		private getArounds(p_x: number, p_y: number): Array<any> {
			var arr: Array<any> = new Array<any>();
			var checkX: number;
			var checkY: number;
			var canDiagonal: Boolean;

			//右
			checkX = p_x + 1;
			checkY = p_y;
			var canRight: Boolean = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canRight && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.RIGHT]);
			}
			//下
			checkX = p_x;
			checkY = p_y + 1;
			var canDown: Boolean = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canDown && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.BOTTOM]);
			}

			//左
			checkX = p_x - 1;
			checkY = p_y;
			var canLeft: Boolean = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canLeft && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.LEFT]);
			}
			//上
			checkX = p_x;
			checkY = p_y - 1;
			var canUp: Boolean = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canUp && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.UP]);
			}
			//右下
			checkX = p_x + 1;
			checkY = p_y + 1;
			canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canDiagonal && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.BOTTOM_RIGHT]);
			}
			//左下
			checkX = p_x - 1;
			checkY = p_y + 1;
			canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canDiagonal && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.BOTTOM_LEFT]);
			}
			//左上
			checkX = p_x - 1;
			checkY = p_y - 1;
			canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canDiagonal && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.UPPER_LEFT]);
			}
			//右上
			checkX = p_x + 1;
			checkY = p_y - 1;
			canDiagonal = this.m_mapTileModel.isBlock(p_x, p_y, checkX, checkY);
			if (canDiagonal && !this.isClosed(checkX, checkY)) {
				arr.push([checkX, checkY, Direct.UPPER_RIGHT]);
			}

			return arr;
		}
		/**
		 * @private
		 * 获取路径
		 * 
		 * @param p_startX    起始点X坐标
		 * @param p_startY    起始点Y坐标
		 * @param p_id        终点的ID
		 * 
		 * @return             路径坐标(Point)数组
		 */
		private getPath(p_startX: number, p_startY: number, p_id: number): Array<any> {
			var arr: Array<any> = new Array<any>();
			var noteX: number = this.m_xList[p_id];
			var noteY: number = this.m_yList[p_id];
			var prve_p_id: number = p_id;


			//允许最大的过期次数
			const maxTTL: number = 20000;
			//过期次数
			var ttl: number = 0;

			while (noteX != p_startX || noteY != p_startY) {
				ttl++;
				if (ttl >= maxTTL) {
					loge("AStar.find3，TTL超过最大次数：" + maxTTL.toString());
					return null;
				}

				arr.unshift([noteX, noteY, this.m_dList[prve_p_id]]);
				prve_p_id = p_id;
				p_id = this.m_fatherList[p_id];
				noteX = this.m_xList[p_id];
				noteY = this.m_yList[p_id];
			}
			arr.unshift([p_startX, p_startY, this.m_dList[prve_p_id]]);
			this.destroyLists();
			return arr;
		}
		/**
		 * @private
		 * 获取某节点的路径评分
		 * 
		 * @param p_index    节点在开启列表中的索引(从1开始)
		 */
		private getScore(p_index: number): number {
			return this.m_pathScoreList[this.m_openList[p_index - 1]];
		}
		/**
		 * @private
		 * 初始化数组
		 */
		private initLists(): void {
			this.m_openList = [];
			this.m_xList = [];
			this.m_yList = [];
			this.m_dList = [];
			this.m_pathScoreList = [];
			this.m_movementCostList = [];
			this.m_fatherList = [];
			this.m_noteMap = [];
		}
		/**
		 * @private
		 * 销毁数组
		 */
		private destroyLists(): void {
			this.m_openList = null;
			this.m_xList = null;
			this.m_yList = null;
			this.m_dList = null;
			this.m_pathScoreList = null;
			this.m_movementCostList = null;
			this.m_fatherList = null;
			this.m_noteMap = null;
		}
		
		public findByStraightLine(startX:number, startY:number, endX:number, endY:number):Array<number>{
			if (startX == endX && startY == endY){
				//都到了就不处理了
				return null;
			}
			
			if(this.m_mapTileModel.canTransit(startX, startY, endX, endY)){
				var path:Array<number> = new Array<number>();
				path.push(startX);
				path.push(startY);
				path.push(endX);
				path.push(endY);
				return path;
			}
			return null;
		}

		/**
		* 直线寻路，并转为八方向路线
		* @param startX
		* @param startY
		* @param endX
		* @param endY
		* @return
		*/
		public findByLine(x0:number, y0:number, x1:number, y1:number):Array<number>
		{
			if (x0 == x1 && y0 == y1)
			{
				//都到了就不处理了
				return null;
			}
			
			var path:Array<number> = new Array<number>(); 
			var dx:number = Math.abs(x1 - x0);
			var dy:number = -Math.abs(y1 - y0);

			var sx:number = x0 < x1 ? 1 : -1;
			var sy:number = y0 < y1 ? 1 : -1;
			var sx1:number = sx, sy1:number = sy;

			var err:number = dx + dy;
			var e2:number; /* error value e_xy */

			//允许最大的过期次数
			const maxTTL:number = 3000;
			//过期次数
			var ttl :number= 0;
			
			//朝向判断，先给一个不可能的值，这样才会压入第一点
			var x_change:number = 3, y_change:number = 3;
			while (true)/* loop */
			{
				if (ttl >= maxTTL) {
					loge("MapData:MapData.canTransit,TTL more than MAX:" + maxTTL.toString());
					return null;
				}
				ttl++;

				//如果是路障，表示两点直线不可通过
				if (!this.m_mapTileModel.isBlock(0, 0, x0, y0))
					return null;

				if (x0 == x1 && y0 == y1)
					break;
				e2 = 2 * err;
				var xx:number = x0, yy:number = y0;
				if (e2 >= dy) { err += dy; x0 += sx; } /* e_xy+e_x > 0 */
				if (e2 <= dx) { err += dx; y0 += sy; } /* e_xy+e_y < 0 */
				//朝向发生该表，压入点
				if (x_change != x0 - xx || y_change != y0 - yy)
				{
					path.push(xx);
					path.push(yy);
					x_change = x0 - xx;
					y_change = y0 - yy;
				}
			}
			path.push(x1);
			path.push(y1);
			return path;
		}
	}
}