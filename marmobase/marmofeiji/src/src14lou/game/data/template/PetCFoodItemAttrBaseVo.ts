/**
* name s食品表
*/
module game.data.template{
	export class PetCFoodItemAttrBaseVo{
		public id:number;//编号
		public addpetlife:string;//增加宠物寿命

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.addpetlife = data.getUTFBytes(data.getUint32());
		}
	}
}