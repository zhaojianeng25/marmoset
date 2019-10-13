/**
* name b冰静态地图
*/
module game.data.template{
	export class InstanceCBingFengWangZuoMapBaseVo{
		public id:number;//编号
		public level:number;//等级
		public enemyNum:number;//关卡
		public mapName:string;//名称
		public image1:string;//图片1
		public image2:string;//图片2
		public image3:string;//图片3
		public image4:string;//图片4
		public image5:string;//图片5
		public image6:string;//图片6
		public image7:string;//图片7
		public image8:string;//图片8

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.level = data.getUint32();
			this.enemyNum = data.getUint32();
			this.mapName = data.getUTFBytes(data.getUint32());
			this.image1 = data.getUTFBytes(data.getUint32());
			this.image2 = data.getUTFBytes(data.getUint32());
			this.image3 = data.getUTFBytes(data.getUint32());
			this.image4 = data.getUTFBytes(data.getUint32());
			this.image5 = data.getUTFBytes(data.getUint32());
			this.image6 = data.getUTFBytes(data.getUint32());
			this.image7 = data.getUTFBytes(data.getUint32());
			this.image8 = data.getUTFBytes(data.getUint32());
		}
	}
}