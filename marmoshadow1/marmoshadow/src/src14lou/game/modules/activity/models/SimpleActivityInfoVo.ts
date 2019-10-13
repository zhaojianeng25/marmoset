/**
* RoleHookExpVo 
*/
module game.modules.activity.models {
    export class SimpleActivityInfoVo {
        public num: number;             // 活动次数
        public num2: number;            // 活动次数2
        public activevalue: number;     // 活动获得活跃度

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.num = bytes.readUint32();
            this.num2 = bytes.readUint32();
            this.activevalue = bytes.readUint32();
        }
    }
}