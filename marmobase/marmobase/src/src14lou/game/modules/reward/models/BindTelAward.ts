/**
* VipInfoVo 
*/
module game.modules.reward.models {
    export class BindTelAwardVo {
        public status: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.status = bytes.readByte();
        }
    }
}