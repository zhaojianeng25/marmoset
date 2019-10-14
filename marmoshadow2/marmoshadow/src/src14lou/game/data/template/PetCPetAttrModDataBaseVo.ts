/**
* name c宠物一级属性转换表
*/
module game.data.template{
	export class PetCPetAttrModDataBaseVo{
		public id:number;//属性ID
		public consfactor:number;//体质
		public iqfactor:number;//智力
		public strfactor:number;//力量
		public endufactor:number;//耐力
		public agifactor:number;//敏捷
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.consfactor = data.getFloat64();
			this.iqfactor = data.getFloat64();
			this.strfactor = data.getFloat64();
			this.endufactor = data.getFloat64();
			this.agifactor = data.getFloat64();
		}
	}
}