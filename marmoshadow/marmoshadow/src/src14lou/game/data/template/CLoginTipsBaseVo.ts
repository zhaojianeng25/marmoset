module game.data.template{
	export class CLoginTipsBaseVo{
		public id:number;//ID
		public tip:string;//语录内容
		public maxnum:number;//最大行数
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.tip = data.getUTFBytes(data.getUint32());
			this.maxnum = data.getUint32();
		}
	}
	
}