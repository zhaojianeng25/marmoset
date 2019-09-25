/**
* name 
*/
module game.data.template{
	export class VipInfoBaseVo{
		public id:number;//VIP等级
		public exp:number;//所需经验
		public itemids:Array<number> = [];//道具奖励1,道具奖励2,道具奖励3,道具奖励4,道具奖励5
		public itemcounts:Array<number> = [];//道具奖励1数量,道具奖励2数量,道具奖励3数量,道具奖励4数量,道具奖励5数量
		public type1:string;//特权1说明
		public type2:string//特权2说明;
		public type3:string;//特权3说明
		public limitnumber1:number;//周打折限购数量
		public limitnumber2:number;//商会每日限购数量
		public petextracount:number;//c宠物栏数量
		public giftBagNum:number;//背包格数
		public bagextracount:number;//c背包格数
		public dpotextracount:number;//c仓库格数
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.exp = data.getUint32();
			let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {				
				this.itemids.push(data.getUint32());				
			}
			let listCount2:number = data.getUint32();
			for (var index = 0; index < listCount2; index++) {				
				this.itemcounts.push(data.getUint32());			
			}
			this.type1 = data.getUTFBytes(data.getUint32());
			this.type2 = data.getUTFBytes(data.getUint32());
			this.type3 = data.getUTFBytes(data.getUint32());
			this.limitnumber1 = data.getUint32();
			this.limitnumber2 = data.getUint32();
			this.petextracount = data.getUint32();
			this.giftBagNum = data.getUint32();
			this.bagextracount = data.getUint32();
			this.dpotextracount = data.getUint32();
			
		}
	}
}