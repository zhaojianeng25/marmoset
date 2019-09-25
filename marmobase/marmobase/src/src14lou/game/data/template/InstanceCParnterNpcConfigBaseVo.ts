/**
* name z战斗NPC_协战_28xxx
*/
module game.data.template{
	export class InstanceCParnterNpcConfigBaseVo{
		public id:number;//id
		public name:string;//名称
		public schoolid:number;//职业
		public type:number;//职业类型
		public modelid:number;//造型id
		public serverid:number;//NPC服务
		public bufferid:number;//BuffID
		public follownpcid:number;//跟随NPC
		public jiadian:string;//方案
		public skillname:string;//携带技能
		public roleintro:string;//角色背景

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.schoolid = data.getUint32();
			this.type = data.getUint32();
			this.modelid = data.getUint32();
			this.serverid = data.getUint32();
			this.bufferid = data.getUint32();
			this.follownpcid = data.getUint32();
			this.jiadian = data.getUTFBytes(data.getUint32());
			this.skillname = data.getUTFBytes(data.getUint32());
			this.roleintro = data.getUTFBytes(data.getUint32());
		}
	}
}