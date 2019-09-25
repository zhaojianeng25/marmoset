/**
* name  d地理位置市表
*/
module game.data.template{
	export class CAddressCountryBaseVo{
		public id:number;//ID
		public strcountry:string;//市	
     	public nprovinceid:number;        //对应省id
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.strcountry = data.getUTFBytes(data.getUint32());
			this.nprovinceid = data.getUint32();
		}
	}
}