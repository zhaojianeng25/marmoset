/**
* 自动挂机
*/
module game.modules.autohangup.models {
	export class AutoHangUpModel {
		/**已经无操作的时间*/
		public notaketimer: number;
		/**是否处于行走中*/
		public ismove: number;
		/**人物行走的方式 0 自动任务 1 场景点击 2 任务点击*/
		public istaskwalk: number;
		/**是否在自动做任务*/
		public autotask: number;
		/**挂机任务类型*/
		public tasktype: number;
		/**是否进行挂机 */
		public isstar: number;
		constructor() {
			this.notaketimer = 0;
			this.ismove = 0
			this.autotask = 0
			this.istaskwalk = 0
			this.isstar = 1
			AutoHangUpModel._instance = this;
		}
		public static _instance: AutoHangUpModel;
		public static getInstance(): AutoHangUpModel {
			if (!this._instance) {
				this._instance = new AutoHangUpModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			autohangup.models.AutoHangUpModel._instance.notaketimer = 0;
			autohangup.models.AutoHangUpModel._instance.ismove = 0;
			autohangup.models.AutoHangUpModel._instance.autotask = 0;
			autohangup.models.AutoHangUpModel._instance.istaskwalk = 0;
			autohangup.models.AutoHangUpModel._instance.isstar = 1;
			autohangup.models.AutoHangUpModel._instance.tasktype = 0;
		}
	}
}