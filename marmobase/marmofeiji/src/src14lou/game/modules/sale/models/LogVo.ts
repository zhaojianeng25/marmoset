/**
* 交易记录 
*/
module game.modules.sale.models {
      export class LogVo {
            /**道具id */
            public itemid: number;
            /**数量*/
            public num: number;
            /**价格 */
            public price: number;
            /**等级或品质*/
            public level: number;


            constructor() {

            }
            public fromByteArray(bytes: ByteArray): void {
                  this.itemid = bytes.readInt32();
                  this.num = bytes.readInt32();
                  this.price = bytes.readInt32();
                  this.level = bytes.readInt32();

            }
      }
}