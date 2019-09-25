/**
* 阵法信息
*/
module game.modules.huoban.models {
	export class FormBeanVo {
		public activeTimes: number; 
		 /**阵法等级*/ 
		public level: number;
		/** 阵法经验 */
		public exp: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray) {
			this.activeTimes = bytes.readInt32();
			this.level = bytes.readInt32();
			this.exp = bytes.readInt32();
		}
	}
}