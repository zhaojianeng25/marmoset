/**
* 对战数据
*/
module game.modules.family.models {
      export class ClanFightVo {
            /**公会1id */
            public clanid1: number;
            /**公会1名称 */
            public clanname1: string;
            /**公会2id*/
            public clanid2: number;
            /**公会2名称 */
            public clanname2: string;
            /**-1是还没结果0是第一个赢1是第二个赢*/
            public winner: number;
            constructor() {

            }
            public fromByteArray(bytes: ByteArray): void {
                  this.clanid1 = bytes.readLong();
                  this.clanname1 = ByteArrayUtils.readUtf16String(bytes);
                  this.clanid2 = bytes.readLong();
                  this.clanname2 = ByteArrayUtils.readUtf16String(bytes);
                  this.winner = bytes.readInt32();

            }
      }
}