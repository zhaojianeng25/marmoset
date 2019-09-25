module game.object{
	/**
	 * 战斗单位角色
	 * name 王谦
	 */
	export class FightRole{
		/**战斗单位属性英文名*/
		public static ATTR_STRS:string[] = ["hp","atk","def","hit","eva","crit","crit_hurt","agile","hit_buff","resist"];

		public name: string = "";		//
		public entry: number = 0;		//模板
		public level:number = 0;		//等级
		public faction: number = 0;   	//阵营
		public spells:any[];			//技能{id,lv,round},{id,lv,round}
		public passives:any[];			//被动技能(id,rate),(id,rate)

		public pos:number = 0;			//阵位 
		public buffs:any[];				//BUFF信息 {}

		public speed:number = 0;		//速度
		public rare:number = 0;			//稀有度
		public gram:number = 0;			//克制属性<=>克制属性

		public max_hp:number = 0;		//最大血量
		public hp:number = 0;			//当前血量
		public atk:number = 0;			//攻击<=>防御
		public def:number = 0;			//防御<=>攻击
		public hit:number = 0;			//命中<=>闪避
		public eva:number = 0;			//闪避<=>命中
		public crit:number = 0;			//暴击
		public crit_hurt:number = 0;	//暴击伤害
		public agile:number = 0;		//敏捷
		public hit_buff:number = 0;		//效果命中<=>抵抗
		public resist:number = 0;		//抵抗<=>效果命中

		public force: number = 0;		//战斗力
		
		public test_damage : number = 0;//测试数据
		public test_old_hps : any[] = [];//测试数据

		constructor(){

		}
		/**设置属性列表*/
		public set attrs(attrs:number[]){
			if(!attrs) return;
			let len:number = Math.floor(attrs.length/2);
			let base:number;
			let typeStr:string;
			for(let i:number = 0; i < len; i++){
				base = 2*i;
				typeStr = FightRole.ATTR_STRS[attrs[base]-1];
				this[typeStr] = attrs[base+1];
			}
			this.max_hp = this.hp;
		}
	}
}