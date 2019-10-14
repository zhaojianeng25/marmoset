/**
* FushiNumVo 
*/
module game.modules.shop.models {
    export class FushiNumVo {
        public num: number;
        public bindNum: number;
        public totalnum: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.num = bytes.readInt32();
            this.bindNum = bytes.readInt32();
            this.totalnum = bytes.readInt32();

        }
    }
}