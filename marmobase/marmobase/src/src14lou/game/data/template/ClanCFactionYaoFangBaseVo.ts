/**
* name y药品购买配置
*/
module game.data.template{
	export class ClanCFactionYaoFangBaseVo{
		public id:number;//编号
		public name:string;//名称
		public money:number;//银币
		public banggong:number;//公会贡献
		public Factionrandom:number;//随机类型

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.money = data.getUint32();
			this.banggong = data.getUint32();
			this.Factionrandom = data.getUint32();
		}
	}
}