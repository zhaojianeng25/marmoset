/**
* pvp5证道战个人排行榜信息 
*/
module game.modules.xianhui.models {
    export class PvP5RoleSingleScoreVo {
        public roleId: number;
        public rolename: string;
        public score: number;
        public battlenum: number;
        public winnum: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.roleId = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.score = bytes.readInt32();
            this.battlenum = bytes.readByte();
            this.winnum = bytes.readByte();
        }

    }
}