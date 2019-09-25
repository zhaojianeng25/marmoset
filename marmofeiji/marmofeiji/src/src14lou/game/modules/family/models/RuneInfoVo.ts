/**
* 符文请求信息 
*/
module game.modules.family.models {
    export class RuneInfoVo {
        /**请求角色roleid */
        public roleid: number;
        /**角色名 */
        public rolename: string;
        /**目标roleid */
        public targetroleid: number;
        /**目标角色名 */
        public targetrolename: string;
        /**角色等级*/
        public level: number;
        /**职业职业 */
        public school: number;
        /**角色造型头像*/
        public shape: number;
        /**捐符数 */
        public givenum: number;
        /**收符数 */
        public acceptnum: number;
        /**动作类型  0 请求符文    1捐献符文 */
        public actiontype: number;
        /**请求时间 */
        public requesttime: number;
        /**物品id*/
        public itemid: number;
        /**物品等级 */
        public itemlevel: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.targetroleid = bytes.readLong();
            this.targetrolename = ByteArrayUtils.readUtf16String(bytes);
            this.level = bytes.readInt32();
            this.school = bytes.readInt32();
            this.shape = bytes.readInt32();
            this.givenum = bytes.readInt32();
            this.acceptnum = bytes.readInt32();
            this.actiontype = bytes.readInt32();
            this.requesttime = bytes.readLong();
            this.itemid = bytes.readInt32();
            this.itemlevel = bytes.readInt32();
        }
    }
}