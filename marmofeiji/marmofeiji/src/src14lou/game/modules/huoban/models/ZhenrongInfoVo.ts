/**
* 阵容信息
*/
module game.modules.huoban.models {
	export class ZhenrongInfoVo {
		/**阵法id*/
		public zhenfa: number;
		/**伙伴阵容id*/
		public huobanlist: Array<number> = [];
		constructor() {
			this.huobanlist = new Array<number>();
		}
		public fromByteArray(bytes: ByteArray): void {
			this.zhenfa = bytes.readUint32();
			this.huobanlist = [];
			let huobanlistSize: number = bytes.readUint8();
			for (var index = 0; index < huobanlistSize; index++) {
				this.huobanlist.push(bytes.readUint32());
			}
		}
	}
}