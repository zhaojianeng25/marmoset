/**
* name 
*/
module game.data.template{
	export class HydScoreBaseVo{
		public id:number;//id
		public starttime:string;//开始时间
		public endtime:string;//结束时间
		public hydscore:Array<number> = [];//节日积分1,节日积分2,节日积分3,节日积分4,节日积分5
		public itemid:Array<number> = [];//类型1奖励道具ID,类型2奖励道具ID,类型3奖励道具ID,类型4奖励道具ID,类型5奖励道具ID
		public itemnum:Array<number> = []//类型1道具数量,类型2道具数量,类型3道具数量,类型4道具数量,类型5道具数量
		public itembind:Array<number> = [];//类型1道具是否绑定,类型2道具是否绑定,类型3道具是否绑定,类型4道具是否绑定,类型5道具是否绑定
		public title:string;//节日活动名称
		public desc:string;//节日活动描述
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.starttime = data.getUTFBytes(data.getUint32());
			this.endtime = data.getUTFBytes(data.getUint32());
			let list1:number = data.getUint32();
			for (var index = 0; index < list1; index++) {
				this.hydscore.push(data.getUint32());
			}
			let list2:number = data.getUint32();
			for (var index = 0; index < list2; index++) {
				this.itemid.push(data.getUint32());
			}
			let list3:number = data.getUint32();
			for (var index = 0; index < list3; index++) {
				this.itemnum.push(data.getUint32());
			}
			let list4:number = data.getUint32();
			for (var index = 0; index < list4; index++) {
				this.itembind.push(data.getUint32());
			}
			this.title = data.getUTFBytes(data.getUint32());
			this.desc = data.getUTFBytes(data.getUint32());
	
			}
		}
	}
