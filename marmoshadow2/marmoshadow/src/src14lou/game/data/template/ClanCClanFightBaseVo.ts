/**
* name g公会战
*/
module game.data.template{
	export class ClanCClanFightBaseVo{
		public id:number;//编号
		public name:string;//名称
		public mapid:number;//副本地图ID
		public x1:number;//初始X1坐标
		public y1:number;//初始Y1坐标
		public x2:number;//初始X2坐标
		public y2:number;//初始Y2坐标
		public outmapid:number;//跳出地图ID
		public outx1:number;//跳出X坐标
		public outy1:number;//跳出Y坐标

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.mapid = data.getUint32();
			this.x1 = data.getUint32();
			this.y1 = data.getUint32();
			this.x2 = data.getUint32();
			this.y2 = data.getUint32();
			this.outmapid = data.getUint32();
			this.outx1 = data.getUint32();
			this.outy1 = data.getUint32();
		}
	}
}