/**
* name c宠物仓库扩充价格
*/
module game.data.template{
	export class PetCPetDepotPriceBaseVo{
		public id:number;//id
		public num:number;//已有宠物仓库数量
		public nextneedmoney:number;//扩充所需银币数

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.num = data.getUint32();
			this.nextneedmoney = data.getUint32();
		}
	}
}