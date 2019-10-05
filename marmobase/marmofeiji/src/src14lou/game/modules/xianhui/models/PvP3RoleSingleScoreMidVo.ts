/**
* pvp3证道战排行榜信息 
*/
module game.modules.xianhui.models {
    export class PvP3RoleSingleScoreMidVo {
        public index: number;
        public roleId: number;
        public rolename: string;
        public score: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.index = bytes.readInt16();
            this.roleId = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.score = bytes.readInt32();
        }
    }
}