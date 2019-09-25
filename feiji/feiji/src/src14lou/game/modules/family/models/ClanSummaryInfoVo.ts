/**
* 公会信息 
*/
module game.modules.family.models {
      export class ClanSummaryInfoVo {
            /**公会key */
            public clanid: number;
            /**公会序号 */
            public index: number;
            /**公会名称 */
            public clanname: string;
            /**公会人数*/
            public membernum: number;
            /**公会等级 */
            public clanlevel: number;
            /**会长名字 */
            public clanmastername: string;
            /**会长id */
            public clanmasterid: number;
            /**公会曾用名 */
            public oldclanname: string;
            /**公会旅馆等级 */
            public hotellevel: number;
            constructor() {

            }
            public fromByteArray(bytes: ByteArray): void {
                  this.clanid = bytes.readLong();
                  this.index = bytes.readInt32();
                  this.clanname = ByteArrayUtils.readUtf16String(bytes);
                  this.membernum = bytes.readInt32();
                  this.clanlevel = bytes.readInt32();
                  this.clanmastername = ByteArrayUtils.readUtf16String(bytes);
                  this.clanmasterid = bytes.readLong();
                  this.oldclanname = ByteArrayUtils.readUtf16String(bytes);
                  this.hotellevel = bytes.readInt32();

            }
      }
}