/**
* RegDataVo 
*/
module game.modules.reward.models {
    export class RegDataVo {
        public month: number // 月
        public times: number; // 签到次数
        public suppregtimes: number; // 补签次数
        public cansuppregtimes: number; // 可补签次数
        public suppregdays: Array<number>; // 补签日子
        public rewardflag: number; //1-领取过 2-未领取

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.month = bytes.readUint32();
            this.times = bytes.readUint32();
            this.suppregtimes = bytes.readUint32();
            this.cansuppregtimes = bytes.readUint32();

            this.suppregdays = [];
            let suppregdaysSize: number = bytes.readUint8();
            for (var index = 0; index < suppregdaysSize; index++) {
                this.suppregdays.push(bytes.readInt32());
            }
            this.rewardflag = bytes.readUint32();
        }
    }
}