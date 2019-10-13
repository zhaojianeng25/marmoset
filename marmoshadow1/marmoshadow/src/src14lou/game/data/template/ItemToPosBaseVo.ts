/**
* name 
*/
module game.data.template{
	export class ItemToPosBaseVo{
		public id:number;//道具ID
		public mapRemotePos:number;//使用偏移范围
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.mapRemotePos = data.getUint32();
		  
		}
	}
}