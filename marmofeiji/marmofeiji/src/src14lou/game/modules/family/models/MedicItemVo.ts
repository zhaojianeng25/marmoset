/**
* 打开药房信息
*/
module game.modules.family.models {
    export class MedicItemVo {
        /**物品id */
        public itemid: number;
        /**物品数量 */
        public itemnum: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.itemid = bytes.readInt32();
            this.itemnum = bytes.readInt32();
        }
    }
}