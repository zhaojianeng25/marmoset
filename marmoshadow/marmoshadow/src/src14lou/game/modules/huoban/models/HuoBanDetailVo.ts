/**
* 伙伴详情
*/
module game.modules.huoban.models {
	export class HuoBanDetailVo {
		/** 伙伴id*/
		public huobanID: number;
		/**是否参战,1为参战*/
		public infight: number;
		/**是否解锁, 0为未解锁; 1为永久使用; 大于10为有多少分钟的剩余时间,如 134 表示为免费134 - 10 = 124分钟*/
		public state: number;
		/** 本周是否免费 0不免费; 1本周免费*/
		public weekfree: number;
		/** 变量值ID，变量值,气血,攻击,防御等等都在这里面*/
		public datas: Array<number> = [];
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.huobanID = bytes.readUint32();
			this.infight = bytes.readUint32();
			this.state = bytes.readLong();
			this.weekfree = bytes.readUint32();
			let size = bytes.readUint8();
			for (var index = 0; index < size; index++) {
				this.datas[index] = bytes.readUint32();
			}
		}
	}
}