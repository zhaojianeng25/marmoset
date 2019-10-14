/**
* 任务进度对象 
*/
module game.object{
	export class QuestStatusObject{
		/**
		 *任务ID 
		 */		
		public quest_id:number;
		/**
		 *任务状态 
		 */		
		public status :number;
		/**
		 *是否接受后自动引导 
		 */		
		public isAutoGuide:boolean = false;
		/**
		 *所在任务下标 
		 */		
		public slot:number;
		/**
		 *需要任务物品 
		 */		
		public items:Array<QuestItemObject> = new Array<QuestItemObject>();
		/**
		 *需要任务生物或GO 
		 */
		public creatures:Array<QuestItemObject> = new Array<QuestItemObject>();
		/**
		 *接受NPC 
		 */
		public startNPC:QuestItemObject;
		/**
		 *完成NPC 
		 */
		public endNPC:QuestItemObject;

		constructor(){

		}
	}
}