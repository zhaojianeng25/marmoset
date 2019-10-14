module game.modules.aliveordead.models {
    /** 战仙会（生死斗）录像视角中2位对手详情 */
    export class LDVideoRoleInfoDesVo {
        /** 对手1 */
        public role1: LDRoleInfoDesVo;
        /** 对手2 */
        public role2: LDRoleInfoDesVo;
        /** 对手1若有组队，其队员详情 */
        public teamlist1: Array<LDTeamRoleInfoDesVo>;
        /** 对手2若有组队，其队员详情 */
        public teamlist2: Array<LDTeamRoleInfoDesVo>;
        /** 生死斗的结果 */
        public battleresult: number;
        /** 点赞次数 */
        public rosenum: number;
        /** 是否可以点赞 */
        public roseflag: number;
        /** 录像id */
        public videoid: string;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            let _role1 = new LDRoleInfoDesVo();
            _role1.fromByteArray(bytes);
            this.role1 = _role1;
            let _role2 = new LDRoleInfoDesVo();
            _role2.fromByteArray(bytes);
            this.role2 = _role2;
            this.teamlist1 = [];
            let _teamlist1Size = bytes.readUint8();
            for (let i = 0; i < _teamlist1Size; i++) {
                let _team1 = new LDTeamRoleInfoDesVo();
                _team1.fromByteArray(bytes);
                this.teamlist1.push(_team1);
            }
            this.teamlist2 = [];
            let _teamlist2Size = bytes.readUint8();
            for (let i = 0; i < _teamlist2Size; i++) {
                let _team2 = new LDTeamRoleInfoDesVo();
                _team2.fromByteArray(bytes);
                this.teamlist2.push(_team2);
            }
            this.battleresult = bytes.readInt32();
            this.rosenum = bytes.readInt32();
            this.roseflag = bytes.readInt32();
            this.videoid = ByteArrayUtils.readUtf16String(bytes);
        }
    }
}