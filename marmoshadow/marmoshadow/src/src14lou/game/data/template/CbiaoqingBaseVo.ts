/**
* name b表情配置
*/
module game.data.template{
	export class CbiaoqingBaseVo{
		public id:number;//ID
		public imagenum:number;//总帧数
		public time:number;//播放时间
		public tips:string;//Tips
		public key:string;//快捷键

		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.imagenum = data.getUint32();
			this.time = data.getFloat64();
			this.tips = data.getUTFBytes(data.getUint32());
			this.key = data.getUTFBytes(data.getUint32());
		}
	}
}