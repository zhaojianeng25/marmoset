/**
* 申请入帮人物基本信息 
*/
module game.modules.family.models {
    export class RoleBaseInfoVo {
        /**公会key */
        public roleid: number;
        /**名称 */
        public rolename: string;
        /**等级 */
        public rolelevel: number;
        /**职业 */
        public roleschool: number;
        /**申请时间*/
        public applytime: number;
        /**综合战力 */
        public fightvalue: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.rolelevel = bytes.readInt32();
            this.roleschool = bytes.readInt32();
            this.applytime = bytes.readLong();
            this.fightvalue = bytes.readInt32();
        }
    }
}