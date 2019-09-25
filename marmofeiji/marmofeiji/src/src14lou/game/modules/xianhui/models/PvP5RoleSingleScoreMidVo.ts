/**
* pvp5证道战排行榜信息 
*/
module game.modules.xianhui.models {
    export class PvP5RoleSingleScoreMidVo {
        public listId: number;
        public index: number;
        public roleId: number;
        public rolename: string;
        public score: number;
        public battlenum: number;
        public winnum: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {

            this.listId = bytes.readByte();
            this.index = bytes.readInt16();
            this.roleId = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.score = bytes.readInt32();
            this.battlenum = bytes.readByte();
            this.winnum = bytes.readByte();
        }

    }
}