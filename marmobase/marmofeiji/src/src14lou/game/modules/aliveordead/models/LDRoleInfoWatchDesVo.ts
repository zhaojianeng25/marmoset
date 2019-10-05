module game.modules.aliveordead.models{
    /** 战仙会（生死斗）观战视角中2位对手详情 */
    export class LDRoleInfoWatchDesVo{
        /** 对手1 */
        public role1: LDRoleInfoDesVo;
        /** 对手2 */
        public role2: LDRoleInfoDesVo;
        /** 战斗id */
        public battleId: number;//long型数据

        constructor()
		{

		}

        public fromByteArray(bytes:ByteArray): void {
            let _role1 = new LDRoleInfoDesVo();
            _role1.fromByteArray(bytes);
            this.role1 = _role1;
            let _role2 = new LDRoleInfoDesVo();
            _role2.fromByteArray(bytes);
            this.role2 = _role2;
            this.battleId = bytes.readLong();
		}
    }
}