/**
* 伙伴信息 
*/
module game.modules.huoban.models {
	export class HuoBanInfoVo {
		/**伙伴ID*/
		public huobanID: number;
		/**是否出战*/
		public infight: number;
		/**是否周费*/
		public weekfree: number;
		/**限时还是永久*/
		public state: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.huobanID = bytes.readUint32();
			this.infight = bytes.readUint32();
			this.weekfree = bytes.readUint32();
			this.state = bytes.readLong();
		}
	}
}