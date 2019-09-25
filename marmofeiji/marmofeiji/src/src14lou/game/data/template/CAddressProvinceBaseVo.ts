/**
* name  d地理位置表
*/
module game.data.template{
	export class CAddressProvinceBaseVo{
		public id:number;//ID
		public strprovince:string;//省	
     	public vncountryid:Array<number> = [];//对应市id1,对应市id2,对应市id3,对应市id4,对应市id5,对应市id6,对应市id7,对应市id8,对应市id9,对应市id10,对应市id11,对应市id12,对应市id13,对应市id14,对应市id15,对应市id16,对应市id17,对应市id18,对应市id19,对应市id20,对应市id21,对应市id22,对应市id23,对应市id24,对应市id25" />	            
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.strprovince = data.getUTFBytes(data.getUint32());
			let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {	
				this.vncountryid.push(data.getUint32())			
				// console.log(data.getUint32());				
			}
		}
	}
}