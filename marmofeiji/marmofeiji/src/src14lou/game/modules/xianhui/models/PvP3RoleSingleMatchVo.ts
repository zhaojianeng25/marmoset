/**
* 通知匹配结果
*/
module game.modules.xianhui.models {
    export class PvP3RoleSingleMatchVo {
        public roleId: number;
        public level: number;
        public shape: number;
        public school: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.roleId = bytes.readLong();
            this.level = bytes.readInt16();
            this.shape = bytes.readInt32();
            this.school = bytes.readInt32();
        }

    }
}