/**
* name 
*/
module game.data.template{
	export class GuoQingChargeGiftConfigBaseVo{
		public id:number;//id
		public itemid1:number;//充值奖励
		public itemnum1:number;//数量
		public title:string;//横幅文字
		public desc:string;//描述文字
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.itemid1 = data.getUint32();
			this.itemnum1 = data.getUint32();
			this.title = data.getUTFBytes(data.getUint32());
			this.desc = data.getUTFBytes(data.getUint32());
			
		}
	}
}