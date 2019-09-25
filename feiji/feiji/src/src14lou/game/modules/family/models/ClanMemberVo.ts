
module game.modules.family.models {
    /** 公会成员数据Vo */
    export class ClanMemberVo {
        /**角色id */
        public roleid: number;
        /**头像id */
        public shapeid: number;
        /**成员名字 */
        public rolename: string;
        /**角色等级 */
        public rolelevel: number;
        /**公会贡献度 */
        public rolecontribution: number;
        /**本周公会贡献度 */
        public weekcontribution: number;
        /**历史公会贡献度 */
        public historycontribution: number;
        /**冻结的公会贡献度 */
        public rolefreezedcontribution: number;
        /**上周公会贡献度*/
        public preweekcontribution: number;
        /**为0表示在线，否则表示上次离线时间,单位毫秒 */
        public lastonlinetime: number;
        /**职位 */
        public position: number;
        /**职业(职业)*/
        public school: number;
        /**加入公会时间 */
        public jointime: number;
        /**本周援助*/
        public weekaid: number;
        /**历史援助 */
        public historyaid: number;
        /**是否禁言  0 未禁言， 1禁言 */
        public isbannedtalk: number;
        /**综合战力 */
        public fightvalue: number;
        /**参加公会副本次数 */
        public claninstnum: number;
        /**参加公会战次数 */
        public clanfightnum: number;

        constructor() {

        }


        public fromByteArray(bytes: ByteArray): void {
            this.roleid = bytes.readLong();
            this.shapeid = bytes.readInt32();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.rolelevel = bytes.readInt16();
            this.rolecontribution = bytes.readInt32();
            this.weekcontribution = bytes.readInt32();
            this.historycontribution = bytes.readInt32();
            this.rolefreezedcontribution = bytes.readInt32();
            this.preweekcontribution = bytes.readInt32();
            this.lastonlinetime = bytes.readInt32();
            this.position = bytes.readInt8();
            this.school = bytes.readInt8();
            this.jointime = bytes.readInt32();
            this.weekaid = bytes.readInt16();
            this.historyaid = bytes.readInt32();
            this.isbannedtalk = bytes.readInt8();
            this.fightvalue = bytes.readInt32();
            this.claninstnum = bytes.readInt16();
            this.clanfightnum = bytes.readInt16();

        }
    }
}