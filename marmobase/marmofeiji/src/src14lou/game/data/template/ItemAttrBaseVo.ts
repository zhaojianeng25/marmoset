/**
* name 
*/
module game.data.template {
	export class ItemAttrBaseVo {
		public id: number; //id
		public itemtypeid: number; //类型
		public name: string; //显示名
		public level: number; //等级
		public icon: number; //造型编号,客户端包裹栏小图标的数字id
		public battleuse: number;  //战斗内使用对象
		public battleuser: number; //战斗内使用者对象
		public outbattleuse: number; //战斗外使用对象
		public destribe: string; //描述
		public usemethod: string; //道具使用方法			
		public maxNum: number; //最大堆叠数量
		public bBind: number; //是否绑定   boolean
		public needLevel: number; //需求等级
		public bManuleDesrtrol: number; //可否摧毁  boolean
		public units: string; //单位 
		public bCanSale: number; //可否摆摊上架
		public dbCanSale: number; //点卡服可否摆摊上架
		public bCanSaleToNpc: number; //可否卖店
		public npcid2: number; //售卖NPCID
		public colour: string; //道具名颜色
		public effectdes: string; //功能说明
		public vcomefrom: Array<number> //获取途径1,获取途径2,获取途径3,获取途径4,获取途径5,获取途径6,获取途径7,获取途径8,获取途径9
		public nusetype: number; //使用按钮功能类型
		public vuseparam: Array<number> //使用按钮功能参数1,使用按钮功能参数2,使用按钮功能参数3
		public nshoptype: number; //售卖商店类型
		public nquality: number; //颜色品质
		public special: number; //寻路特殊处理
		constructor() {

		}
		public parse(data: Byte) {
			this.id = data.getUint32();
			this.itemtypeid = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.level = data.getUint32();
			this.icon = data.getUint32();
			this.battleuse = data.getUint32();
			this.battleuser = data.getUint32();
			this.outbattleuse = data.getUint32();
			this.destribe = data.getUTFBytes(data.getUint32());
			this.usemethod = data.getUTFBytes(data.getUint32());
			this.maxNum = data.getUint32();
			this.bBind = data.getByte();
			this.needLevel = data.getUint32();
			this.bManuleDesrtrol = data.getByte();
			this.units = data.getUTFBytes(data.getUint32());
			this.bCanSale = data.getUint32();
			this.dbCanSale = data.getUint32();
			this.bCanSaleToNpc = data.getUint32();
			this.npcid2 = data.getUint32();
			this.colour = data.getUTFBytes(data.getUint32());
			this.effectdes = data.getUTFBytes(data.getUint32());
			let vcomefromLength = data.getInt32();
			this.vcomefrom = [];
			for (var index = 0; index < vcomefromLength; index++) {
				this.vcomefrom.push(data.getUint32());
			}
			this.nusetype = data.getUint32();
			let vuseparamLength = data.getInt32();
			this.vuseparam = [];
			for (var index = 0; index < vuseparamLength; index++) {
				this.vuseparam.push(data.getUint32());
			}
			this.nshoptype = data.getUint32();
			this.nquality = data.getUint32();
			this.special = data.getUint32();
		}
	}
}