/**
* name 公会副本参数
*/
module game.data.template{
	export class InstanceCInstaceConfigBaseVo{
		public id:number;//id
		public name:string;//名称
		public serversid:number;//npc服务id

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.serversid = data.getUint32();
		}
	}
}