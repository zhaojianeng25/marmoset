/**
* pvp3证道战个人排行榜信息 
*/
module game.modules.xianhui.models {
    export class PvP3RoleSingleScoreVo {
        public roleId: number;
        public rolename: string;
        public score: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.roleId = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.score = bytes.readInt32();
        }

    }
}