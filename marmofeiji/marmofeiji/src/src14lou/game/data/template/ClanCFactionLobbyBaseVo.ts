/**
* name g公会大厅数据表
*/
module game.data.template{
	export class ClanCFactionLobbyBaseVo{
		public id:number;//公会等级
		public levelupcost:number;//升级消耗银币
		public costeveryday:number;//每日维护费用
		public downcompensate:number;//降级补偿
		public othersum:number;//升级所需其他建筑等级总和

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.levelupcost = data.getUint32();
			this.costeveryday = data.getUint32();
			this.downcompensate = data.getUint32();
			this.othersum = data.getUint32();
		}
	}
}