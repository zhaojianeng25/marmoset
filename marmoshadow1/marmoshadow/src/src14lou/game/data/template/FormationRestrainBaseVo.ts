/**
* name 
*/
module game.data.template{
	export class FormationRestrainBaseVo{
		public id:number;//编号
		public restrain1:string;//克制一
		public restrainArg1:string;//克制一参数
		public restrain2:string;//克制二
		public restrainArg2:string;//克制2参数
		public beRestrained1:string//被克一;
		public beRestrainedArg1:string;//被克一参数
		public beRestrained2:string;//被克二
		public beRestrainedArg2:string;//被克二参数
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.restrain1 = data.getUTFBytes(data.getUint32());
			this.restrainArg1 =data.getUTFBytes(data.getUint32());
			this.restrain2 = data.getUTFBytes(data.getUint32());
			this.restrainArg2 = data.getUTFBytes(data.getUint32());
			this.beRestrained1 = data.getUTFBytes(data.getUint32());
			this.beRestrainedArg1 = data.getUTFBytes(data.getUint32());
			this.beRestrained2 = data.getUTFBytes(data.getUint32());
			this.beRestrainedArg2 = data.getUTFBytes(data.getUint32());
			
		}
	}
}