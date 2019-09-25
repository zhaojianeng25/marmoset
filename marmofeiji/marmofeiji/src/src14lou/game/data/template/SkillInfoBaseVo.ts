/**
* name 
*/
module game.data.template{
	export class SkillInfoBaseVo{
		public id:number;//技能ID
		public stagelist:string;//阶段列表
		public stagelist2:string;//阶段列表_远程
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.stagelist = data.getUTFBytes(data.getUint32());
			this.stagelist2 = data.getUTFBytes(data.getUint32());

		}
	}
}