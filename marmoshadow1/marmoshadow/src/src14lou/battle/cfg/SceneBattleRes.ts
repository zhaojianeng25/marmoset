module battle {

	/**战斗场景配置*/
	export class SceneBattleRes{
		/**阵位数量*/
		public static MAX_POS:number = 14;//6;
		/**中心点偏移量*/
		public static CENTER_OFFSETX:number = 8.6;
		public static CENTER_OFFSETY:number = 4.4;
		/**上阵位:0~13*/
		public static TOP_POSX:number[] = [];
		public static TOP_POSY:number[] = [];
		/**下阵位:0~13*/
		public static BOTTOM_POSX:number[] = [];
		public static BOTTOM_POSY:number[] = [];
		/** 中阵位29-39观战站位 */
		public static MIDDLE_POX:number[] = [];
		public static MIDDLE_POY:number[] = [];
		/**上阵位战将进场坐标x*/
		public static ENTER_TOPX:number = 171.25;
		/**上阵位战将进场坐标y*/
		public static ENTER_TOPY:number = -367.25;
		/**下阵位战将进场坐标x*/
		public static ENTER_BOTTOMX:number = -171.25;
		/**下阵位战将进场坐标y*/
		public static ENTER_BOTTOMY:number = 373.25;
		/**战将普攻前往目标偏移量x*/
		public static FORWARD_OFFSETX:number = 36.75;
		/**战将普攻前往目标偏移量y*/
		public static FORWARD_OFFSETY:number = 78.75;
		/**战将受击偏移量x*/
		public static BEATEN_OFFSETX:number = 18.375;
		/**战将受击偏移量y*/
		public static BEATEN_OFFSETY:number = 39.375;
		/**战将受击击飞偏移量x*/
		public static BEATEN_FLYX:number = 294;
		/**战将受击击飞偏移量y*/
		public static BEATEN_FLYY:number = 630;
		/**通用受击技能*/
		public static BEATEN_SPELL:number = 1001;
		/**场景火特效名*/
		public static EFFECT_FIRE:string[] = ["smoke", "huoxing", "fire", "smoke", "huoxing", "fire", "smoke", "huoxing", "fire"];
		/**场景火特效y轴偏移*/
		public static EFFECT_FIRE_POS:number[] = [120,-250,2, 100,-300,2, 50,-220,1.5, 0,-270,2.2, -20,-320,2.2, -65,-217,1.8, -140,-260,2.2, -170,-320,2.2, -140,-230,1.5];
		/**施法者特效名*/
		public static EFFECT_CAST:string = "10104_shifa_lyf";
		/**施法者特效y轴偏移*/
		public static EFFECT_CAST_Y:number = 0;
		/**己方目标待选择特效名*/
		public static EFFECT_WAIT0:string = "wofang_01";
		/**敌方目标待选择特效名*/
		public static EFFECT_WAIT1:string = "difang_01";
		/**目标待选择特效y轴偏移*/
		public static EFFECT_WAIT_Y:number = 65;
		/**目标选中特效名*/
		public static EFFECT_SELECT:string = "npcxuanzhon_lyf";
		/**目标选中特效y轴偏移*/
		public static EFFECT_SELECT_Y:number = 65;
		/**技能闪光特效名*/
		public static EFFECT_SPELL:string = "dashan";
		/**技能闪光特效y轴偏移*/
		public static EFFECT_SPELL_Y:number = 160;
		/**加血特效名*/
		public static EFFECT_JIAXUE:string = "jiaxue";
		/**加血特效y轴偏移*/
		public static EFFECT_JIAXUE_Y:number = 50;
		/**衰落特效名*/
		public static EFFECT_SHUAIRUO:string = "10104_shouji1_lyf";
		/**衰落特效y轴偏移*/
		public static EFFECT_SHUAIRUO_Y:number = 20;
		/** 准备中特效*/
		public static EFFECT_READY:string = "ready_lyf";
		/** 连击点特效1*/
		public static EFFECT_COMBO_POINT_1:string = "lianji-1_lyf";
		/** 连击点特效2*/
		public static EFFECT_COMBO_POINT_2:string = "lianji-2_lyf";
		/** 连击点特效3*/
		public static EFFECT_COMBO_POINT_3:string = "lianji-3_lyf";
		/** 连击点特效4*/
		public static EFFECT_COMBO_POINT_4:string = "lianji-4_lyf";
		/** 连击点特效5*/
		public static EFFECT_COMBO_POINT_5:string = "lianji-5_lyf";
		/** 血量银边特效 */
		public static EFFECT_BLOOD_SILVER_EDGE:string = "yinbian_lyf";
		/** 门派图标_云霄殿 */
		public static EFFECT_YUNXIAO:string = "yunxiaodian_lyf";
		/** 门派图标_火云宗 */
		public static EFFECT_HUOYUN:string = "huoyunzon_lyf";
		/** 门派图标_苍羽宫 */
		public static EFFECT_CANGYU:string = "cangyugong_lyf";
		/** 门派图标_飞雪崖 */
		public static EFFECT_FEIXUE:string = "feixueya_lyf";
		/** 门派图标_天雷狱 */
		public static EFFECT_TIANLEI:string = "tianleiyu_lyf";
		/** 门派图标_无量宫 */
		public static EFFECT_WULIANG:string = "wulianggong_lyf";
		/** 门派图标_幽冥殿 */
		public static EFFECT_YOUMING:string = "youmingdian_lyf";
		/** 门派图标_七星观 */
		public static EFFECT_QIXING:string = "qixingguan_lyf";
		/** 门派图标_丹阳观 */
		public static EFFECT_DANYANG:string = "danngyangguang_lyf";
		
	}
}