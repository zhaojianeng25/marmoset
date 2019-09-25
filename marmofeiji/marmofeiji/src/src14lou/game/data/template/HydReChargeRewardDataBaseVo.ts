/**
* name 
*/
module game.data.template{
	export class HydReChargeRewardDataBaseVo{
		public id:number;//
		public starttime:string;//开始时间
		public endtime:string;//结束时间
		public rechargevalue:Array<number> = [];//充值金额类型1,充值金额类型2,充值金额类型3,充值金额类型4,充值金额类型5,充值金额类型6
		public rewarditemid1:Array<number> = [];//类型1奖励道具ID1,类型2奖励道具ID1,类型3奖励道具ID1,类型4奖励道具ID1,类型5奖励道具ID1,类型6奖励道具ID1
		public rewarditemnum1:Array<number> = []//类型1道具数量1,类型2道具数量1,类型3道具数量1,类型4道具数量1,类型5道具数量1,类型6道具数量1
		public rewarditembind1:Array<number> = [];//类型1道具是否绑定1,类型2道具是否绑定1,类型3道具是否绑定1,类型4道具是否绑定1,类型5道具是否绑定1,类型6道具是否绑定1
		public rewarditemid2:Array<number> = [];//类型1奖励道具ID2,类型2奖励道具ID2,类型3奖励道具ID2,类型4奖励道具ID2,类型5奖励道具ID2,类型6奖励道具ID2
		public rewarditemnum2:Array<number> = [];//类型1道具数量2,类型2道具数量2,类型3道具数量2,类型4道具数量2,类型5道具数量2,类型6道具数量2
		public rewarditembind2:Array<number> = [];//类型1道具是否绑定2,类型2道具是否绑定2,类型3道具是否绑定2,类型4道具是否绑定2,类型5道具是否绑定2,类型6道具是否绑定2
		public rewarditemid3:Array<number> = [];//类型1奖励道具ID3,类型2奖励道具ID3,类型3奖励道具ID3,类型4奖励道具ID3,类型5奖励道具ID3,类型6奖励道具ID3
		public rewarditemnum3:Array<number> = [];//类型1道具数量3,类型2道具数量3,类型3道具数量3,类型4道具数量3,类型5道具数量3,类型6道具数量3
		public rewarditembind3:Array<number> = [];//类型1道具是否绑定3,类型2道具是否绑定3,类型3道具是否绑定3,类型4道具是否绑定3,类型5道具是否绑定3,类型6道具是否绑定3
		public rewarditemid4:Array<number> = [];//类型1奖励道具ID4,类型2奖励道具ID4,类型3奖励道具ID4,类型4奖励道具ID4,类型5奖励道具ID4,类型6奖励道具ID4
		public rewarditemnum4:Array<number> = [];//类型1道具数量4,类型2道具数量4,类型3道具数量4,类型4道具数量4,类型5道具数量4,类型6道具数量4
		public rewarditembind4:Array<number> = [];//类型1道具是否绑定4,类型2道具是否绑定4,类型3道具是否绑定4,类型4道具是否绑定4,类型5道具是否绑定4,类型6道具是否绑定4
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.starttime = data.getUTFBytes(data.getUint32());
			this.endtime = data.getUTFBytes(data.getUint32());
			let list1:number = data.getUint32();
			for (var index = 0; index < list1; index++) {
				this.rechargevalue.push(data.getUint32());
			}
			let list2:number = data.getUint32();
			for (var index = 0; index < list2; index++) {
				this.rewarditemid1.push(data.getUint32());
			}
			let list3:number = data.getUint32();
			for (var index = 0; index < list3; index++) {
				this.rewarditemnum1.push(data.getUint32());
			}
			let list4:number = data.getUint32();
			for (var index = 0; index < list4; index++) {
				this.rewarditembind1.push(data.getUint32());
			}
			let list5:number = data.getUint32();
			for (var index = 0; index < list5; index++) {
				this.rewarditemid2.push(data.getUint32());
			}
			let list6:number = data.getUint32();
			for (var index = 0; index < list6; index++) {
				this.rewarditemnum2.push(data.getUint32());
			}
			let list7:number = data.getUint32();
			for (var index = 0; index < list7; index++) {
				this.rewarditembind2.push(data.getUint32());
			}
			let list8:number = data.getUint32();
			for (var index = 0; index < list8; index++) {
				this.rewarditemid3.push(data.getUint32());
			}
			let list9:number = data.getUint32();
			for (var index = 0; index < list9; index++) {
				this.rewarditemnum3.push(data.getUint32());
			}
			let list10:number = data.getUint32();
			for (var index = 0; index < list10; index++) {
				this.rewarditembind3.push(data.getUint32());
			}
			let list11:number = data.getUint32();
			for (var index = 0; index < list11; index++) {
				this.rewarditemid4.push(data.getUint32());
			}
			let list12:number = data.getUint32();
			for (var index = 0; index < list12; index++) {
				this.rewarditemnum4.push(data.getUint32());
			}
			let list13:number = data.getUint32();
			for (var index = 0; index < list13; index++) {
				this.rewarditembind4.push(data.getUint32());
			}
		}
	}
}