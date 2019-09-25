/**
* name 
*/
module game.data{
	export class MapTeleportIndex{
		//静态
		static _inst:MapTeleportIndex;
		static get inst():MapTeleportIndex{
			if(!this._inst){
				this._inst = new MapTeleportIndex();
			}
			return this._inst;
		}
		/*版本号*/
		public mapDataVersion:number;
		
		/**
		 * 索引数据
		 * 结构为：向量数组[mapid] = 传送点列表 
		 */		
		private _data:Array<Array<Teleport>>;
		public get data():Array<Array<Teleport>>{
			return this._data;
		}
		
		/*关闭列表*/
		private _closeList:Array<number> = new Array<number>();
		
		constructor(){
			
		}

		//获取某地图所有传送点
		public getTeleportsByMapid(mapid:number):Array<Teleport>{
			return this._data[mapid];
		}

		//初始
		public init():void{
			//地图个数
			let len:number = Template.data["tb_map"].length;
			this._data = new Array<Array<Teleport>>(len);
			let teleport_data:Array<any> = Template.data["tb_teleport"];
			if(!teleport_data) return;
			let tele_len:number = teleport_data.length;
			for(let i:number = 0; i < tele_len; i++)
			{
				let single_tele:any = teleport_data[i];
				//地图id
				let mapid:number = single_tele.map_id;
				//冗余，设置数组长度
				if(mapid >= this._data.length)
					this._data.length = mapid + 1;
				
				//传送点列表
				if(!this._data[mapid]){
					this._data[mapid] = new Array<Teleport>();
				}
				
				var teleport:Teleport = new Teleport();
				//坐标
				teleport.srcPortX =  single_tele.pos_x;
				teleport.srcPortY =  single_tele.pos_y;
				//目标地图id
				teleport.dstMapid = single_tele.dst_map_id;
				//目标坐标
				teleport.dstPortX = single_tele.dst_pos_x ;
				teleport.dstPortY = single_tele.dst_pos_y ;
				this._data[mapid].push(teleport);

				//判断是否单双向
				if(teleport.dstMapid <= 0 || !single_tele.toward || single_tele.toward < 1) continue;
				//回去的也要
				if(!this._data[teleport.dstMapid]){
					this._data[teleport.dstMapid] = new Array<Teleport>();
				}

				var returnTele:Teleport = new Teleport();
				//坐标
				returnTele.srcPortX =  single_tele.dst_pos_x;
				returnTele.srcPortY =  single_tele.dst_pos_y;
				//目标地图id
				returnTele.dstMapid = mapid;
				//目标坐标
				returnTele.dstPortX = single_tele.pos_x ;
				returnTele.dstPortY = single_tele.pos_y ;
				this._data[teleport.dstMapid].push(returnTele);
				
			}	
		}
		
		/**
		 * 跨地图寻路算法
		 * @param srcMapid 来源地图id
		 * @param dstMapid 目标地图id
		 * @return 如果找不到各地图传送点数组，则返回空
		 * 
		 */	
		public find(srcMapid:number, dstMapid:number):Array<any>
		{
			this._closeList.length = 0;
			var ref:Array<any> = [];
			//如果搜索得到路径，则返回路径，否则返回空
			if(this.searching(srcMapid, dstMapid, ref)){
				ref = ref.reverse();
				return ref;
			}
			return null;
		}
		
		/**
		 * 递归搜索路径 
		 * @param firstMapid 进入点
		 * @param exitMapid 退出点
		 * @param ref 返回路径
		 * @return  返回是否搜索到
		 * 
		 */	
		private searching(firstMapid:number, exitMapid:number, ref:Array<any>):Boolean
		{
			//尝试过的点加入列表
			this._closeList[this._closeList.length] = firstMapid;
			
			//找到了点
			if(firstMapid == exitMapid)
				return true;
			
			//开始遍历所有传送点的目的地查找
			var teleports:Array<Teleport> = this._data[firstMapid];
			if(!teleports) return false;
			let len:number = teleports.length;
			for(var i:number = 0; i < len ; i++)
			{
				var telport:Teleport = teleports[i];
				if(!telport) continue;
				//该地图还未遍历过
				if(this._closeList.indexOf(telport.dstMapid)==-1)
				{
					//找到匹配，则递归要回家了。
					if(this.searching(telport.dstMapid, exitMapid, ref))
					{
						ref[ref.length] = telport;
						return true;
					}	
				}
			}
			return false;
		}
		
	}
}