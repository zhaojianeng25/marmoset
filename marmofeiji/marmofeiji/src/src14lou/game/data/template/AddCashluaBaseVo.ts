/**
* name 
*/
module game.data.template{
	export class AddCashluaBaseVo{
		public id:number;//
		public sellpricenum:number;//价格
		public itemicon:string;//道具图标
		public kind:number;//商品类型
		public roofid:string;//渠道id
		public maxcash:number//是否最大额度;
		public cashkind:number;//货币类型
		public unititem:string;//单位图标
		public foodid:string;//商品ID
		public dayRes:string;//天数资源图
		public foodname:string;//商品
		public credit:number;//信用度
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.sellpricenum = data.getUint32();
			this.itemicon = data.getUTFBytes(data.getUint32());
			this.kind = data.getUint32();
			this.roofid = data.getUTFBytes(data.getUint32());
			this.maxcash = data.getUint32();
			this.cashkind = data.getUint32();
			this.unititem = data.getUTFBytes(data.getUint32());
			this.foodid = data.getUTFBytes(data.getUint32());
			this.dayRes = data.getUTFBytes(data.getUint32());
			this.foodname = data.getUTFBytes(data.getUint32());
			this.credit = data.getUint32();
			
		}
	}
}