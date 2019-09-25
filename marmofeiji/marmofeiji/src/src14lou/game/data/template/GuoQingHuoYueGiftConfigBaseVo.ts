/**
* name 
*/
module game.data.template{
	export class GuoQingHuoYueGiftConfigBaseVo{
		public id:number;//id
		public hyd1:number;//活跃度1
		public itemid1:number;//道具ID1
		public itemnum1:number;//数量1
		public hyd2:number;//活跃度2
		public itemid2:number//道具ID2;
		public itemnum2:number;//数量2
		public hyd3:number;//活跃度3
		public itemid3:number;//道具ID3
		public itemnum3:number;//数量3
		public hyd4:number;//活跃度4
		public itemid4:number;//道具ID4
		public itemnum4:number;//数量4
		public hyd5:number;//活跃度5
		public itemid5:number;//道具ID5
		public itemnum5:number;//数量5
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.hyd1 = data.getUint32();
			this.itemid1 = data.getUint32();
			this.itemnum1 = data.getUint32();
			this.hyd2 = data.getUint32();
			this.itemid2 = data.getUint32();
			this.itemnum2 = data.getUint32();
			this.hyd3 = data.getUint32();
			this.itemid3 = data.getUint32();
			this.itemnum3 = data.getUint32();
			this.hyd4 = data.getUint32();
			this.itemid4 = data.getUint32();
			this.itemnum4 = data.getUint32();
			this.hyd5 = data.getUint32();
			this.itemid5 = data.getUint32();
			this.itemnum5 = data.getUint32();
			
		}
	}
}