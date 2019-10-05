/**
* name g公会福利表
*/
module game.data.template{
	export class ClanCFactionFuLiBaseVo{
		public id:number;//编号
		public name:string;//公会福利名称
		public icon:string;//ICON
		public desc:string;//活动说明
		public isgive:number;//是否可领取

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.icon = data.getUTFBytes(data.getUint32());
			this.desc = data.getUTFBytes(data.getUint32());
			this.isgive = data.getUint32();
		}
	}
}