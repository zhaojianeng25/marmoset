/**
* name  x巡游配置/x巡游路径总表
*/
module game.data.template{
	export class CAutoMovePathBaseVo{
		public id:number;//巡游路径ID
		public paths:string;//路径组	
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.paths = data.getUTFBytes(data.getUint32());
		}
	}
}