/**
* name 
*/
module game.data.template{
	export class CommonDayPayBaseVo{
		public id:number;//id
		public value:string;//客户端参数
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.value = data.getUTFBytes(data.getUint32());

		}
	}
}