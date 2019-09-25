/**
* name 
*/
module game.data.template{
	export class ChargeConfiBaseVo{
		public id:number;//
		public serverid:number;//服务器id
		public roofid:string;//渠道id
		public sellpricenum:number;//价格
		public sellnum:number;//符石
		public sellnummore:number//赠送;
		public kind:number;//商品類型
		public name:number;//商品名称
		public gameshow:number;//游戏内显示
		public productid:string;//商品ID
		public productstr:number;//结果
		public chargecount:number;//充值次数
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.serverid = data.getUint32();
			this.roofid = data.getUTFBytes(data.getUint32());
			this.sellpricenum = data.getUint32();
			this.sellnum = data.getUint32();
			this.sellnummore = data.getUint32();
			this.kind = data.getUint32();
			this.name = data.getUint32();
			this.gameshow = data.getUint32();
			this.productid = data.getUTFBytes(data.getUint32());
			this.productstr = data.getUint32();
			this.chargecount = data.getUint32();
			
		}
	}
}