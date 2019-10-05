/**
* name 
*/
module game.data.template{
	export class RedPackConfigBaseVo{
		public id:number;//id
		public name:string;//策划备注
		public fushimin:number;//最小数量
		public fishimax:number;//最大数量
		public daysendmax:number;//每日发红包个数上限
		public dayreceivemax:number//每日收红包个数上限;
		public dayfushisendmax:number;//每日发红包符石上限
		public packmin:number;//最小红包拆包数
		public packmax:number;//最大红包拆包数
		public level:number;//最小等级
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.fushimin = data.getUint32();
			this.fishimax = data.getUint32();
			this.daysendmax = data.getUint32();
			this.dayreceivemax = data.getUint32();
			this.dayfushisendmax = data.getUint32();
			this.packmin = data.getUint32();
			this.packmax = data.getUint32();
			this.level = data.getUint32();
			
		}
	}
}