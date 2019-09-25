/**
* name 
*/
module game.data.template{
	export class MineAreainfoBaseVo{
		public id:number;//id
		public colour:string;//颜色信息
		public discribe:string;//描述
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.colour = data.getUTFBytes(data.getUint32());
			this.discribe = data.getUTFBytes(data.getUint32());
		  
		}
	}
}