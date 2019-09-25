/**
* name c宠物灵兽提升
*/
module game.data.template{
	export class PetCShenShouIncBaseVo{
		public id:number;//属性ID
		public petid:number;//宠物id
		public inccount:number;//提升次数
		public attinc:number;//成长提升
		public atkinc:number;//攻击资质提升
		public definc:number;//防御资质提升
		public hpinc:number;//体力资质提升
		public mpinc:number;//法力资质提升
		public spdinc:number;//速度资质提升
		public inclv:number;//提升等级
		constructor(){

		}
		public parse(data:Byte){
			this.id = data.getUint32();
			this.petid = data.getUint32();
			this.inccount = data.getUint32();
			this.attinc = data.getUint32();
			this.atkinc = data.getUint32();
			this.definc = data.getUint32();
			this.hpinc = data.getUint32();
			this.mpinc = data.getUint32();
			this.spdinc = data.getUint32();
			this.inclv = data.getUint32();
		}
	}
}