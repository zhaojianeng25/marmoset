
module game.modules.huoban.models {
	/** 伙伴系统相关数据存储 HuoBanModel */
	export class HuoBanModel {
		/**伙伴阵容*/
		public huobaninfo: Array<HuoBanInfoVo> = [];
		/**伙伴信息配置表 */
		public cheroBaseInfoData: Object = {};
		/**伙伴技能表*/
		public friendSkillData: Object = {};
		/**光环*/
		public FormationbaseConfigData: Object = {};
		/**光环克制*/
		public FormationRestrainData: Object = {};
		/**光环效果图*/
		public ZhenFaEffectData: Object = {};
		/**出战的阵容ID*/
		public zhenrongid: number;
		/**出战的阵容*/
		public zrhuobanlist: Array<ZhenrongInfoVo> = [];
		/**查看的阵容ID 当前选择查看的*/
		public currentzrid: number;
		/**更新原因*/
		public reason: number;
		/**伙伴详情数据*/
		public huobandetail: HuoBanDetailVo;
		/**当阵容为空时可作为临时存储*/
		public currentzf: Array<number> = [];
		/**当阵容为空时可作为临时存储 阵法改变时调用*/
		public currentzr: number;
		/**是否处于阵法学习的界面*/
		public zhenfaui: number;
		/** 用来判断是否从阵法光环界面跳转到商会界面 */
		public is_frome_ZFGH_to_SH:boolean = false;

		constructor() {
			HuoBanModel._instance = this;
			this.huobaninfo = new Array<HuoBanInfoVo>();
			this.zrhuobanlist = new Array<ZhenrongInfoVo>();
			this.currentzf = [-1, -1, -1];
			this.currentzr = -1;
		}
		public static _instance: HuoBanModel;
		public static getInstance(): HuoBanModel {
			if (!this._instance) {
				this._instance = new HuoBanModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			huoban.models.HuoBanModel._instance.huobaninfo = new Array<HuoBanInfoVo>();
			huoban.models.HuoBanModel._instance.zhenrongid = 0;
			huoban.models.HuoBanModel._instance.zrhuobanlist = new Array<ZhenrongInfoVo>();
			huoban.models.HuoBanModel._instance.currentzrid = 0;
			huoban.models.HuoBanModel._instance.reason = 0;
			huoban.models.HuoBanModel._instance.huobandetail = new models.HuoBanDetailVo();
			huoban.models.HuoBanModel._instance.currentzf = [-1, -1, -1];
			huoban.models.HuoBanModel._instance.currentzr = -1;
			huoban.models.HuoBanModel._instance.zhenfaui = 0;
			huoban.models.HuoBanModel._instance.is_frome_ZFGH_to_SH = false;
		}
	}
}