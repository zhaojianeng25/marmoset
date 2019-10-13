/**
* name c宠物基本数据
*/
module game.data.template{
	export class PetCPetAttrBaseVo{
		public id:number;//编号
		public name:string;//名称
		public colour:string;//名称颜色
		public quality:number;//宠物品质
		public unusualid:number;//是否稀有
		public modelid:number;//造型id
		public whethershow:number;//图鉴是否显示
		public kind:number;//类型
		public uselevel:number;//参战等级
		public takelevel:number;//携带等级
		public area1colour:number;//area1colour
		public area2colour:number;//area2colour
		public life:number;//初始寿命
		public attackaptmin:number;//攻资最小值
		public attackaptmax:number;//攻资最大值
		public defendaptmin:number;//防资最小值
		public defendaptmax:number;//防资最大值
		public phyforceaptmin:number;//体资最小值
		public phyforceaptmax:number;//体资最大值
		public magicaptmin:number;//法资最小值
		public magicaptmax:number;//法资最大值
		public speedaptmin:number;//速资最小值
		public speedaptmax:number;//速资最大值
		public growrate:Array<number>;//成长率
		public addpoint:Array<number>;//推荐加点
		public skillid:Array<number>;//技能
		public skillrate:Array<number>;//出现几率
		public washitemid:number;//洗宠消耗材料ID
		public washitemnum:number;//洗宠消耗材料数量
		public washnewpetid:string;//洗练后ID
		public certificationcost:number;//技能认证花费银币
		public cancelcertificationcost:number;//取消认证花费银币
		public thewildid:number;//对应野生ID
		public thebabyid:number;//对应宝宝ID
		public thebianyiid:number;//对应变异ID
		public bornmapid:number;//可出现场景地图ID
		public bornmapdes:string;//出现场景描述
		public treasureScore:number;//珍品评分
		public nshoptype:number;//售卖商店类型
		public nshopnpcid:number;//售卖NPCID
		public treasureskillnums:number;//珍品需要技能数
		public nskillnumfull:number;//多少次变成满技能
		public dyelist:string;//染色方案选择
		public marketfreezetime:number;//摆摊冻结时间
		public isbindskill:Array<number>;//技能是否绑定
		public pointcardisshow:number;//点卡服图鉴是否显示
		public pointcardbornmapid:number;//点卡服可出现场景地图ID
		public pointcardbornmapdes:string;//点卡服出现场景描述

		constructor(){
			this.growrate = new Array<number>();
			this.addpoint = new Array<number>();
			this.skillid = new Array<number>();
			this.skillrate = new Array<number>();
			this.isbindskill = new Array<number>();
		}

		public parse(data:Byte){
			this.id = data.getUint32();
			this.name = data.getUTFBytes(data.getUint32());
			this.colour = data.getUTFBytes(data.getUint32());
			this.quality = data.getUint32();
			this.unusualid = data.getUint32();
			this.modelid = data.getUint32();
			this.whethershow = data.getUint32();
			this.kind = data.getUint32();
			this.uselevel = data.getUint32();
			this.takelevel = data.getUint32();
			this.area1colour = data.getUint32();
			this.area2colour = data.getUint32();
			this.life = data.getUint32();
			this.attackaptmin = data.getUint32();
			this.attackaptmax = data.getUint32();
			this.defendaptmin = data.getUint32();
			this.defendaptmax = data.getUint32();
			this.phyforceaptmin = data.getUint32();
			this.phyforceaptmax = data.getUint32();
			this.magicaptmin = data.getUint32();
			this.magicaptmax = data.getUint32();
			this.speedaptmin = data.getUint32();
			this.speedaptmax = data.getUint32();
			let listCount1:number = data.getUint32();
			for (var index = 0; index < listCount1; index++) {	
				this.growrate.push(data.getUint32());					
			}
			let listCount2:number = data.getUint32();
			for (var index = 0; index < listCount2; index++) {	
				this.addpoint.push(data.getUint32());						
			}
			let listCount3:number = data.getUint32();
			for (var index = 0; index < listCount3; index++) {	
				this.skillid.push(data.getUint32());						
			}
			let listCount4:number = data.getUint32();
			for (var index = 0; index < listCount4; index++) {	
				this.skillrate.push(data.getUint32());						
			}
			this.washitemid = data.getUint32();
			this.washitemnum = data.getUint32();
			this.washnewpetid = data.getUTFBytes(data.getUint32());
			this.certificationcost = data.getUint32();
			this.cancelcertificationcost = data.getUint32();
			this.thewildid = data.getUint32();
			this.thebabyid = data.getUint32();
			this.thebianyiid = data.getUint32();
			this.bornmapid = data.getUint32();
			this.bornmapdes = data.getUTFBytes(data.getUint32());
			this.treasureScore = data.getUint32();
			this.nshoptype = data.getUint32();
			this.nshopnpcid = data.getUint32();
			this.treasureskillnums = data.getUint32();
			this.nskillnumfull = data.getUint32();
			this.dyelist = data.getUTFBytes(data.getUint32());
			this.marketfreezetime = data.getUint32();
			let listCount5:number = data.getUint32();
			for (var index = 0; index < listCount5; index++) {	
				this.isbindskill.push(data.getUint32());				
			}
			this.pointcardisshow = data.getUint32();
			this.pointcardbornmapid = data.getUint32();
			this.pointcardbornmapdes = data.getUTFBytes(data.getUint32());
		}
	}
}