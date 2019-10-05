/**
* name t通用配置表
*/
module game.data.template{
	export class CCommonBaseVo{
		public id:number;//ID
		public value:string;//客户端参数

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.value = data.getUTFBytes(data.getUint32());
		}
	}
}