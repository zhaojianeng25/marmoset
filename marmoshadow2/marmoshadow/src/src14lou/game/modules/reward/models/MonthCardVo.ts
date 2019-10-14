/**
* MonthCardVo 
*/
module game.modules.reward.models {
    export class MonthCardVo {
        public endtime: number; //月卡结束时间戳
        public grab: number;    // 1是可以领取0是不能领取

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.endtime = bytes.readLong();
            this.grab = bytes.readInt32();
        }
    }
}