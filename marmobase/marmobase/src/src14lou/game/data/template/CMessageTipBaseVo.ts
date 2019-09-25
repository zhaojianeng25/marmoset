/**
* name  客户端提示信息表/客户端提示
*/
module game.data.template{
	export class CMessageTipBaseVo{
		public id:number;//ID
		public type:string;//提示对话框类型	
     	public msg:string; //提示内容
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.type = data.getUTFBytes(data.getUint32());
			this.msg = data.getUTFBytes(data.getUint32());
		}
	}
}