/**
* NotifyBuySuccessVo 
*/
module game.modules.shop.models {
    export class NotifyBuySuccessVo {
        public notifytype: number;
        public name: string;
        public number: number;
        public money: number;
        public currency: number;
        public itemorpet: number;
        public units: string;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.notifytype = bytes.readInt32();
            this.name = ByteArrayUtils.readUtf16String(bytes);
            this.number = bytes.readInt32();
            this.money = bytes.readInt32();
            this.currency = bytes.readInt32();
            this.itemorpet = bytes.readInt32();
            this.units = ByteArrayUtils.readUtf16String(bytes);
        }
    }
}