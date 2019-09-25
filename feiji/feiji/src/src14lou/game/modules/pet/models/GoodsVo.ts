/**
* 商品
*/
module game.modules.pet.models {
	export class GoodsVo {
		/**商品ID*/
		public goodsid: number;
		/**商品价格*/
		public price: number;
		/**价格波动数值*/
		public priorperiodprice: number;
		constructor() {
		}
		fromByteArray(byte: ByteArray): void {
			this.goodsid = byte.readInt32();
			this.price = byte.readInt32();
			this.priorperiodprice = byte.readInt32();
		}
	}
}