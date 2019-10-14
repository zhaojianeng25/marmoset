/**
* name g公会活动表
*/
module game.data.template{
	export class ClanCFactionHuoDongBaseVo{
		public id:number;//编号
		public name:string;//公会活动名称
		public icon:string;//ICON
		public leveldesc:string;//等级限制
		public opentimedesc:string;//开放时间
		public huodongdesc:string;//活动说明
		public isclicked:number;//是否可点击
		
		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.icon = data.getUTFBytes(data.getUint32());
			this.leveldesc = data.getUTFBytes(data.getUint32());
			this.opentimedesc = data.getUTFBytes(data.getUint32());
			this.huodongdesc = data.getUTFBytes(data.getUint32());
			this.isclicked = data.getUint32();
		}
	}
}