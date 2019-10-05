/**
* name c宠物培养显示表
*/
module game.data.template{
	export class PetCPetFeedItemListBaseVo{
		public id:number;//排序
		public itemid:number;//道具ID

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.itemid = data.getUint32();
		}
	}
}