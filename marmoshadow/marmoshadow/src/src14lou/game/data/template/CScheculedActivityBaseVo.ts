/**
* name d定时活动配置表
*/
module game.data.template{
	export class CScheculedActivityBaseVo{
		public id:number;
		public strserverid:string;//服务器id
		public startTime:string;//开启时间
		public endTime:string;//结束时间
		public startTime2:string; //开启时间2
		public activityid:number;//活动ID
		public weekrepeat:number;  //周循环活动

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.strserverid = data.getUTFBytes(data.getUint32());
			this.startTime = data.getUTFBytes(data.getUint32());
			this.endTime = data.getUTFBytes(data.getUint32());
			this.startTime2 = data.getUTFBytes(data.getUint32());
			this.activityid = data.getUint32();
			this.weekrepeat = data.getUint32();
		}
	}
}