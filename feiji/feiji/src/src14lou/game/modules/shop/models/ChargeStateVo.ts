/**
* ChargeStateVo 
*/
module game.modules.shop.models {
    export class ChargeStateVo {
        public state: number;
        public flag: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.state = bytes.readUint32();
            this.flag = bytes.readUint32();
        }
    }
}