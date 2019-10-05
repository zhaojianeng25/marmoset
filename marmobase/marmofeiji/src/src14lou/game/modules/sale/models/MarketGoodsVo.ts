/**
* 摆摊信息 
*/
module game.modules.sale.models {
      export class MarketGoodsVo {
            /**唯一id(是我服务器数据库的id,传给前端的目的是在购买物品时给我返回) */
            public id: number;
            /**卖家角色id */
            public saleRoleid: number;
            /**道具id*/
            public itemid: number;
            /**数量 */
            public num: number;
            /**关注数 */
            public noticenum: number;
            /**itemkey*/
            public key: number;
            /**价格 */
            public price: number;
            /**公示时间 */
            public showtime: number;
            /**过期时间 */
            public expiretime: number;
            /**物品类型 1道具, 2宠物*/
            public itemtype: number;
            /**等级或品质*/
            public level: number;
            /**关注数量 */
            public attentionnumber: number;

            constructor() {

            }
            public fromByteArray(bytes: ByteArray): void {
                  this.id = bytes.readLong();
                  this.saleRoleid = bytes.readLong();
                  this.itemid = bytes.readInt32();
                  this.num = bytes.readInt32();
                  this.noticenum = bytes.readInt32();
                  this.key = bytes.readInt32();
                  this.price = bytes.readInt32();
                  this.showtime = bytes.readLong();
                  this.expiretime = bytes.readLong();
                  this.itemtype = bytes.readInt32();
                  this.level = bytes.readInt32();
                  this.attentionnumber = bytes.readInt32();
            }
      }
}