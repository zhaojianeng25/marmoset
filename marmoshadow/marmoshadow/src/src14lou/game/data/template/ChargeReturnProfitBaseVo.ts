/**
* name 
*/
module game.data.template{
	export class ChargeReturnProfitBaseVo{
		public id:number;//
		public chargevalue:number;//充值符石额度
		public rewarditems:Array<number> = [];//奖励1,奖励2
		public rewardnums:Array<number> = [];//奖励1数量,奖励2数量
		public text:string;//文本提示
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.chargevalue = data.getUint32();
			let rewarditems1:number = data.getUint32();
			for (var index = 0; index < rewarditems1; index++) {				
				this.rewarditems.push(data.getUint32());			
			}
			let rewardnums1:number = data.getUint32();
			for (var index = 0; index < rewardnums1; index++) {				
				this.rewardnums.push(data.getUint32());		
			}
			this.text = data.getUTFBytes(data.getUint32());
			
		}
	}
}