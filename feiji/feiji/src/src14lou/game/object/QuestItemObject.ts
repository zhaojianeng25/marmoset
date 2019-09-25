/**
* 任务物品,即任务条件类，目前只两个字段 
*/
module game.object{
	export class QuestItemObject{
		public id:number;
		public count:number;
		public reqCount:number;
		public slotIndex:number;
		public entryID:number;
		public mapID:number;
		public x:number;
		public y:number;

		
		constructor(itemid:number = 0,itemcount:number = 0,rCount:number = 0,sIndex:number = -1)
		{
			this.id = itemid;
			this.count = itemcount;
			this.reqCount = rCount;
			this.slotIndex = sIndex;
		}
	}
}