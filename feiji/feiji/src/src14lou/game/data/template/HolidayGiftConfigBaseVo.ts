/**
* name 
*/
module game.data.template{
	export class HolidayGiftConfigBaseVo{
		public id:number;//ID
		public name:string;//节日名称
		public day:string;//日期
		public daytext:string;//日期描述
		public itemid1:number;//道具1ID
		public itemnum1:number//道具1数量;
		public itemid2:number;//道具2ID
		public itemnum2:number;//道具2数量
		public itemid3:number;//道具3ID
		public itemnum3:number;//道具3数量
		public text:string;//描述
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.day =  data.getUTFBytes(data.getUint32());
			this.daytext =  data.getUTFBytes(data.getUint32());
			this.itemid1 = data.getUint32();
			this.itemnum1 = data.getUint32();
			this.itemid2 = data.getUint32();
			this.itemnum2 = data.getUint32();
			this.itemid3 = data.getUint32();
			this.itemnum3 = data.getUint32();
			this.text =  data.getUTFBytes(data.getUint32());
			
		}
	}
}