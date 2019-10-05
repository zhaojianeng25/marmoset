/**
* MulDayLoginVo 
*/
module game.modules.reward.models {
    export class MulDayLoginVo {
        public logindays: number;	//累计登录天数
        public rewardmap: Laya.Dictionary;	//七日登录礼包奖励数据(1.key-奖励配置ID 2.val-领取时间(0-未领取))

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.logindays = bytes.readInt32();

            let mapSize: number = bytes.readUint8();
            this.rewardmap = new Laya.Dictionary();
            for (var index = 0; index < mapSize; index++) {
                this.rewardmap.set(bytes.readUint32(), bytes.readLong());
            }
        }
    }
}