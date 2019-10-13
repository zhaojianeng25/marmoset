/**
* name 
*/
module game.data.template{
	export class RoleFighteAIBaseVo{
		public id:number;//id
		public school:number;//职业组
		public ai:number;//AI组
		public skill:number;//技能ID
		public level:number;//技能等级
		public param:number;//连击点数参数
		public desc:string;//描述
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.school = data.getUint32();
			this.ai = data.getUint32();
			this.skill = data.getUint32();
			this.level = data.getUint32();
			this.param = data.getUint32();
			this.desc = data.getUTFBytes(data.getUint32());
			
			
		}
	}
}