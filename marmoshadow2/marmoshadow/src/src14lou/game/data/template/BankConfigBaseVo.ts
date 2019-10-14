/**
* name 
*/
module game.data.template{
	export class BankConfigBaseVo{
		public id:number;//ID序号
		public buynummin:number;//求购符石数量MIN
		public buynummax:number;//求购符石数量MAX
		public buyunitmin:number;//求购符石单价MIN
		public buyunitmax:number;//求购符石单价MAX
		public buyfee:number; //交易手续费;
		public sellnummin:number;//寄卖符石数量MIN
		public sellnummax:number;//寄卖符石数量MAX
		public sellunitmin:number;//寄卖符石单价MIN
		public sellunitmax:number;//寄卖符石单价MAX
		public cellfee:number  ;//预计交易税
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.buynummin = data.getUint32();
			this.buynummax = data.getUint32();
			this.buyunitmin = data.getUint32();
			this.buyunitmax = data.getUint32();
			this.buyfee = data.getFloat64();
			this.sellnummin = data.getUint32();
			this.sellnummax = data.getUint32();
			this.sellunitmin = data.getUint32();
			this.sellunitmax = data.getUint32();
			this.cellfee = data.getFloat64();
			
		}
	}
}