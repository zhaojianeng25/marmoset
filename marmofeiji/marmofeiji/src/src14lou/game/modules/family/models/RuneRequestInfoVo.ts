/**
* 符文选择的信息
*/
module game.modules.family.models {
    export class RuneRequestInfoVo {
        /**物品id */
        public itemid: number;

        constructor() {

        }

        public fromByteArray(bytes: ByteArray): void {
            this.itemid = bytes.readInt32();
        }
    }
}