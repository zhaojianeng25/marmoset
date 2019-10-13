/**
* name 
*/
module game.data.template{
	export class QQGiftConfigBaseVo{
		public id:number;//ID
		public itemids:Array<number>=[];//奖励1道具,奖励2道具,奖励3道具,奖励4道具,奖励5道具
		public itemidnums:Array<number>=[];//奖励1数量,奖励2数量,奖励3数量,奖励4数量,奖励5数量
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
		   let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {				
				this.itemids.push(data.getUint32())	;					
			}
			let listCount1:number = data.getUint32();
			for (var index = 0; index < listCount1; index++) {				
				this.itemidnums.push(data.getUint32())	;		
			}
		}
	}
}