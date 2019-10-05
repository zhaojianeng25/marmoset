/**
* name 
*/
module game.data.template{
	export class FreeDisRewardConfigBaseVo{
		public id:number;//ID
		public name:string;//礼包名称
		public itemids:Array<number> = [];//道具1,道具2,道具3,道具4,道具5,道具6
		public num:number;//道具总数量
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			let rewarditems:number = data.getUint32();
			for (var index = 0; index < rewarditems; index++) {				
				this.itemids.push(data.getUint32());			
			}
			this.num = data.getUint32();
			
		}
	}
}