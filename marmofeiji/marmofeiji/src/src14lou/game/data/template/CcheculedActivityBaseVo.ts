/**
* name d定时活动配置表
*/
module game.data.template{
	export class CcheculedActivityBaseVo{
		public id:number;//开始时间显示
		public startTime:string;//开启时间2
		

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.startTime = data.getUTFBytes(data.getUint32());
		}
	}
}