/**
* GoodInfoVo 
*/
module game.modules.shop.models {
    export class GoodInfoVo {
        public goodid: number;       //商品id
        public price: number;        //rmb价格
        public fushi: number;        //可获得的符石
        public present: number;      //额外赠送的符石
        public beishu: number;       //该项倍数 

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.goodid = bytes.readUint32();
            this.price = bytes.readUint32();
            this.fushi = bytes.readUint32();
            this.present = bytes.readUint32();
            this.beishu = bytes.readUint32();
        }
    }
}