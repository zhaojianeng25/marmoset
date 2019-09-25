module game.modules.bag.models {
    /** 珍品找回信息Vo */
    export class ItemRecoverInfoVo {
        /** 道具id */
        public itemId: number;
        /** 唯一id */
        public uniqId: number;//long类型数据
        /** 剩余时间(单位:秒数) */
        public remainTime: number;
        /** 找回消耗金币 */
        public cost: number;
        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.itemId = bytes.readInt32();
            this.uniqId = bytes.readLong();
            this.remainTime = bytes.readInt32();
            this.cost = bytes.readInt32();
        }
    }
}