/**
* 公会事件
*/
module game.modules.family.models {
      export class ClanEventInfoVo {
            /**时间 */
            public eventtime: string;
            /**内容*/
            public eventinfo: string;
            /**类型 */
            public eventtype: number;
            /**值 */
            public eventvalue: number;
            constructor() {

            }
            public fromByteArray(bytes: ByteArray): void {
                  this.eventtime = ByteArrayUtils.readUtf16String(bytes);
                  this.eventinfo = ByteArrayUtils.readUtf16String(bytes);
                  this.eventtype = bytes.readInt32();
                  this.eventvalue = bytes.readLong();
            }
      }
}