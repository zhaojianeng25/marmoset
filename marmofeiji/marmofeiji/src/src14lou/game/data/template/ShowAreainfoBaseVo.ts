/**
* name 
*/
module game.data.template{
	export class ShowAreainfoBaseVo{
		public id:number;//id
		public colour:string;//颜色信息
		public discribe:string;//描述
		public lootid:number;//掉落id
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.colour = data.getUTFBytes(data.getUint32());
			this.discribe = data.getUTFBytes(data.getUint32());
			this.lootid = data.getUint32();
		  
		}
	}
}