/**
* name l聊天配置/l聊天常用语
*/
module game.data.template{
	export class CquickchatBaseVo{
		public id:number;//ID
		public tips:string;//内容

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.tips = data.getUTFBytes(data.getUint32());
		}
	}
}