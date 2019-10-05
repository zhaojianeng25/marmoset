/**
* VipInfoVo 
*/
module game.modules.reward.models {
    export class BindTelVo {
        public tel: number;
        public createDate: number;
        public isFistLoginOfDay: number;
        public isGetBindTelAward: number;
        public isBindTelAgain: number;
        public bindTelTime: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.tel = bytes.readLong();
            this.createDate = bytes.readLong();
            this.isFistLoginOfDay = bytes.readByte();
            this.isGetBindTelAward = bytes.readByte();
            this.isBindTelAgain = bytes.readByte();
            this.bindTelTime = bytes.readLong();
        }
    }
}