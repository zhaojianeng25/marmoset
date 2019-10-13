/**
* name c宠物升级经验表
*/
module game.data.template{
	export class PetCPetNextExpBaseVo{
		public id:number;//当前等级
		public exp:number;//下级经验

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.exp = data.getUint32();
		}
	}
}