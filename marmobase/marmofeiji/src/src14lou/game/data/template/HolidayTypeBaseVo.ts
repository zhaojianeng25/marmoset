/**
* name 
*/
module game.data.template{
	export class HolidayTypeBaseVo{
		public id:number;//id
		public name:string;//节日名称
		public starttime:string;//开启时间
		public endtime:string;//结束时间
		public type:number;//类型
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.starttime = data.getUTFBytes(data.getUint32());
			this.endtime = data.getUTFBytes(data.getUint32());
			this.type = data.getUint32();
			
		}
	}
}