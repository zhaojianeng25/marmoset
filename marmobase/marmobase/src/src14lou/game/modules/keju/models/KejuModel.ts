
/** 科举类型 */
enum ImpExamType
{
	/** 全村统考 */
	IMPEXAM_VILL = 1,
	/** 全省统考 */
	IMPEXAM_PROV = 2,
	/** 全国统考 */
	IMPEXAM_STATE = 3,
	/** 服务器全村统考 */
	IMPEXAM_VILL_INSERVER = 214,
	/** 服务器全省统考 */
	IMPEXAM_PROV_INSERVER = 215,
	/** 服务器全国统考 */
	IMPEXAM_STATE_INSERVER = 216,
};
enum ImpExamAssistType
{
	/** 不使用协助 */
	NOASSIST = 0,
	/** 删除一个错误答案 */
	DELWRONG = 1,
	/** 直接选择正确答案 */
	CHORIGHT = 2,
};
/** 科举介绍配置表 */
enum kejuIntroduce
{
	/** 乡试说明 */
    XIANGSHI_INT = 11405,
	/** 会试说明 */
    HUISHI_INT = 11436,
	/** 殿试说明 */
    DIANSHI_INT = 11437,
}
module game.modules.keju.models{
	export class KejuModel{
		/** 科举类型 */
		public impexamtype: number = -1;
		/** 协助类型 */
		public assisttype: number = -1;
		/** x乡试配置表数据 */
		public wisdomtrialVillData: Object = {};
		/** h会试配置表数据 */
		public wisdomtrialProvData: Object = {};
		/** d殿试配置表数据 */
		public wisdomtrialStateData: Object = {};
		/** 乡试数据 */
		public ExamVill:Laya.Dictionary;
		/** 会试数据 */
		public ExamProv:Laya.Dictionary;
		/** 殿试数据 */
		public ExamState:Laya.Dictionary;
		/** 求助次数 */
		public helpcnt: number = 0;
		/** 当前界面是否打开 */
		public isOpen: boolean = false;
		
		constructor()
		{
			KejuModel._instance = this;
			this.ExamVill = new Laya.Dictionary();
			this.ExamProv = new Laya.Dictionary();
			this.ExamState = new Laya.Dictionary();
		}
		public static _instance:KejuModel;
		public static getInstance():KejuModel {
			if(!this._instance) {
				this._instance = new KejuModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			keju.models.KejuModel._instance.impexamtype = -1;
			keju.models.KejuModel._instance.ExamVill = new Laya.Dictionary();
			keju.models.KejuModel._instance.ExamProv = new Laya.Dictionary();
			keju.models.KejuModel._instance.ExamState = new Laya.Dictionary();
			keju.models.KejuModel._instance.helpcnt = 0;
			keju.models.KejuModel._instance.isOpen = false;
		}
		/** 当前考试模式下的配置表数据
		 * @param examType 考试类型
		 */
		public getExamConfigData(examType:number):any
		{
			let configData;
			if(examType == ImpExamType.IMPEXAM_VILL || examType == ImpExamType.IMPEXAM_VILL_INSERVER) //
			{
				return this.wisdomtrialVillData;
			}else if(examType == ImpExamType.IMPEXAM_PROV || examType == ImpExamType.IMPEXAM_PROV_INSERVER)
			{
				return this.wisdomtrialProvData;
			}else if(examType == ImpExamType.IMPEXAM_STATE || examType == ImpExamType.IMPEXAM_STATE_INSERVER)
			{
				return this.wisdomtrialStateData;
			}else return null;
		}
		/** ABCD选项添加 
		 * @param index 下标位
		*/
		public getchooseIndex(index:number):string
		{
			switch (index) {
				case 0:
					return "A";
				case 1:
					return "B";
				case 2:
					return "C";
				case 3:
					return "D";
				default:
					return null;
			}
		}
	}
}