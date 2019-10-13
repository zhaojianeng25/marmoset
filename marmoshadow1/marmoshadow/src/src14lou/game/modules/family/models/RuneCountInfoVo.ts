/**
* 符文统计
*/
module game.modules.family.models {
      export class RuneCountInfoVo {
            /**角色roleid */
            public roleid: number;
            /**名称 */
            public rolename: string;
            /**等级*/
            public level: number;
            /**职业 */
            public school: number;
            /**职务 */
            public position: number;
            /**捐献*/
            public givenum: number;
            /**收取 */
            public acceptnum: number;
            /**收取 */
            public givelevel: number;
            constructor() {

            }
            public fromByteArray(bytes: ByteArray): void {
                  this.roleid = bytes.readLong();
                  this.rolename = ByteArrayUtils.readUtf16String(bytes);
                  this.level = bytes.readInt32();
                  this.school = bytes.readInt32();
                  this.position = bytes.readInt32();
                  this.givenum = bytes.readInt32();
                  this.acceptnum = bytes.readInt32();
                  this.givelevel = bytes.readInt32();
            }
      }
}