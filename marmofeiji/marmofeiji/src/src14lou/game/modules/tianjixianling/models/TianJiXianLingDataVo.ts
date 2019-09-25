module game.modules.tianjixianling.models{
    /** 天机仙令信息数据Vo */
	export class TianJiXianLingDataVo{
        /** 任务累计次数 */
		public times: number;
		/** 已经任性次数 */
		public renxins: number;
		/** 奖励经验 */
		public awardexp: number;//long型数据
		/** 奖励银币 */
		public awardsilver: number;//long型数据
		/** 奖励金币 */
		public swardgold: number;//long型数据
		/** 首次参加时间 */
		public jointime: number;//long型数据
		/** 当前的在传说任务（正在探索的任务），如果是超出0~7（显示范围）外的值，代表当前没有传说任务 */
		public legendpos: number;

        constructor(){
       }
    }
}