/**
* 公会邀请
*/
module game.modules.family.models {
    export class InvitationRoleInfoVo {
        /**角色Id */
        public roleid: number;
        /**角色名 */
        public rolename: string;
        /**角色造型*/
        public shape: number;
        /**角色等级 */
        public level: number;
        /**性别*/
        public sex: number;
        /**职业 */
        public school: number;
        /**综合战力 */
        public fightvalue: number;
        /**vip*/
        public vip: number;
        /**角色换装信息key值参考SpriteComponents的枚举，value为0代表脱下某件换装 */
        public components: Dictionary = new Dictionary();

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.shape = bytes.readInt32();
            this.level = bytes.readInt32();
            this.sex = bytes.readInt32();
            this.school = bytes.readInt32();
            this.fightvalue = bytes.readInt32();
            this.vip = bytes.readInt32();
            var size = bytes.readInt8();
            for (var i = 0; i < size; i++) {
                this.components.set(bytes.readByte(), bytes.readInt32());
            }

        }
    }
}