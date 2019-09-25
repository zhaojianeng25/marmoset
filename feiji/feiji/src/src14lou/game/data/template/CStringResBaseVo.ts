/**
* name  客户端提示信息表/程序内字符串
*/
module game.data.template{
	export class CStringResBaseVo{
		public id:number;//ID
		public msg:string;//字符串	
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.msg = data.getUTFBytes(data.getUint32());
		}
	}
}