/**
* 被领取红包里领取记录信息的Vo
*/
module game.modules.redPacket.models {
    export class RedPackRoleHisInfoVo {
        /** 角色Id*/
        public roleid: number;
        /** 角色名*/
        public rolename: string;
        /** 红包金额*/
        public redpackmoney: number;


        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.redpackmoney = bytes.readInt32();
        }
    }
}