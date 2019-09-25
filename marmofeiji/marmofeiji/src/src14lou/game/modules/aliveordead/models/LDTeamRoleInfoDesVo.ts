module game.modules.aliveordead.models{
    /** 战仙会（生死斗）队员详情 */
    export class LDTeamRoleInfoDesVo{
        /** 角色Id */
        public roleid: number;//long型数据
        /** 角色名 */
        public rolename: string;
        /** 角色造型 */
        public shape: number;
        /** 角色等级 */
        public level: number;
        /** 职业 */
        public school: number;

        constructor()
		{

		}

        public fromByteArray(bytes:ByteArray): void {
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.shape = bytes.readInt32();
            this.level = bytes.readInt32();
            this.school = bytes.readInt32();
		}
    }
}