/**
* name 
*/
module game.data.template{
	export class WorldMapConfigBaseVo{
		public id:number;//id
		public mapName:string;//名字
		public topx:number;//传送左上角x
		public topy:number;//传送左上角y
		public bottomx:number;//传送右下角x
		public bottomy:number//传送右下角y;
		public maptype:number;//地图类型
		public bShowInWorld:number;//是否显示在世界地图上
		public LevelLimitMin:number;//等级下限
		public LevelLimitMax:number;//等级上限
		public sonmapid:string;//从属暗雷
		public sonmapname:string;//从属暗雷名
		public sonmapnormal:string;//暗雷按钮图片普通
		public sonmappushed:string;//暗雷按钮图片按下
		public sonmapdisable:string;//暗雷按钮图片灰色
		public sculptid:number;//怪物造型
		public sculptimgid:string;//地图怪物
		public smallmapRes:string;//小地图资源路径
		public smallmapSize:string;//小地图大小
		public mapbg:string;//挂机地图背景图
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.mapName = data.getUTFBytes(data.getUint32());
			this.topx = data.getUint32();
			this.topy = data.getUint32();
			this.bottomx = data.getUint32();
			this.bottomy = data.getUint32();
			this.maptype = data.getUint32();
			this.bShowInWorld = data.getByte();
			this.LevelLimitMin = data.getInt32();
			this.LevelLimitMax = data.getInt32();
			this.sonmapid = data.getUTFBytes(data.getUint32());
			this.sonmapname = data.getUTFBytes(data.getUint32());
			this.sonmapnormal = data.getUTFBytes(data.getUint32());
			this.sonmappushed = data.getUTFBytes(data.getUint32());
			this.sonmapdisable = data.getUTFBytes(data.getUint32());
			this.sculptid = data.getUint32();
			this.sculptimgid = data.getUTFBytes(data.getUint32());
			this.smallmapRes = data.getUTFBytes(data.getUint32());
			this.smallmapSize = data.getUTFBytes(data.getUint32());
			this.mapbg = data.getUTFBytes(data.getUint32());
			
		}
	}
}