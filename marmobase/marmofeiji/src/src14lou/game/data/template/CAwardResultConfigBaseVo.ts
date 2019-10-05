/**
* CAwardResultConfigBaseVO
*/
module game.data.template{
	export class CAwardResultConfigBaseVo{
		public id:number;//ID
		public propertyId:number;//道具ID
		public result:string;//开奖结果
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.propertyId = data.getUint32();
			this.result = data.getUTFBytes(data.getUint32());
		}
	}
	
}