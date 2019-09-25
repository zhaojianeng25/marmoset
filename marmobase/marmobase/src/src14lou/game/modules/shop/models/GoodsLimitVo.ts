/**
* GoodsLimitVo 
*/
module game.modules.shop.models {
    export class GoodsLimitVo {
        public goodsid: number; // 商品id
        public number: number;  // 可购买或可售卖数量 

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.goodsid = bytes.readUint32();
            this.number = bytes.readUint32();
        }
    }
}