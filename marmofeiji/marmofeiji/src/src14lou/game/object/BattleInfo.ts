module game.object{
	/**
	 * 战斗数据
	 * name 王谦
	 */
	export class BattleInfo{
		/**赢家:0 还没有,1 进攻方,2 防守方*/
		public winner:number;
		/**当前回合*/
		public round:number;
		/**新回合*/
		public isNewRound:boolean;
		/**出手数据*/
		public hurts:BattleHurt[][];
		/**当前玩家出手*/
		public spos:number;
		/**是否进攻方*/
		public isAttack:boolean;
		/**阵位*/
		public pos:number;
		/**下标*/
		public index:number;
	}
	/**战斗战将数据*/
	export class BattleRole{
		public name:string;
		/**服务端阵位*/
		public spos:number;
		/**阵位*/
		public pos:number;
		/**模板id*/
		public entry:number;
		/**初始血量*/
		public initHp:number;
		/**当前血量*/
		public curHp:number;
		/**最大血量*/
		public maxHp:number;
		/**技能信息*/
		public spells:any[];
		/**buff信息*/
		public buffs:any[];
	}
	/**战斗出手数据*/
	export class BattleHurt{
		/**服务端阵位*/
		public spos:number;
		/**新回合*/
		public isNewRound:boolean;
		/**状态：-2 buff不出手,-1 buff减血死亡,id 技能id*/
		public state:number;
		/**战斗目标武将数据*/
		public targets:BattleTarget[];
		/**战斗额外目标武将数据*/
		public extras:BattleExtra[];
		/**buff触发数据：{buff_id,value}*/
		public buffInfo:any[];
		/**技能信息*/
		public spells:any[];
		/**自身buff更新：结果值*/
		public buffs:any[];
		/**血量增减*/
		public value:number;
		/**当前怒气点数*/
		public anger:number;
		/**当前血量*/
		public curHp:number;
		/**伤害次数*/
		public times:number;
		/**是否进攻方*/
		public isAttack:boolean;
		/**阵位*/
		public pos:number;
		/**下标*/
		public index:number;
	}
	/**战斗目标战将数据*/
	export class BattleTarget{
		/**服务端阵位*/
		public spos:number;
		/**攻击类型*/
		public hit:number[];
		/**血量增减*/
		public value:number[];
		/**自身buff更新：结果值*/
		public buffs:any[];
		/**当前血量*/
		public curHp:number[];
		/**是否进攻方*/
		public isAttack:boolean;
		/**阵位*/
		public pos:number;
		/**下标*/
		public index:number;
	}
	/**战斗额外目标战将数据*/
	export class BattleExtra{
		/**服务端阵位*/
		public spos:number;
		/**血量增减*/
		public value:number;
		/**当前血量*/
		public curHp:number;
		/**是否进攻方*/
		public isAttack:boolean;
		/**阵位*/
		public pos:number;
		/**下标*/
		public index:number;
	}
}