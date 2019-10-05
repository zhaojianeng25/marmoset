/**
* name g公会符文配置
*/
module game.data.template{
	export class ClanCRuneSetBaseVo{
		public id:number;//编号
		public name:string;//公会福利名称
		public desc:string;//描述

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.desc = data.getUTFBytes(data.getUint32());
		}
	}
}