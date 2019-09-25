/**
* 摆摊珍品装备搜索-基础属性结构 
*/
module game.modules.sale.models {
    export class MarketSearchAttrVo {
        /**基础属性id */
        public attrid: number;
        /**属性最小值 */
        public attrval: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.attrid = bytes.readInt32();
            this.attrval = bytes.readInt32();
        }

        public writeByteArray(bytes: ByteArray) {
            bytes.writeInt32(this.attrid);
            bytes.writeInt32(this.attrval);

        }
    }
}