/**
* name 
*/
module game.data.template {
    export class OnLineGiftBaseVo {
        public id: number; //ID
        public time: number; //时间
        public itemid1: number; //奖励id1
        public itemidnew1: number; //道具id1
        public itemnum1: number; //数量1
        public itemid2: number; //奖励id2
        public itemnum2: number; //数量2
        public itemid3: number; //奖励id3
        public itemnum3: number; //数量3
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.time = data.getUint32();
            this.itemid1 = data.getUint32();
            this.itemidnew1 = data.getUint32();
            this.itemnum1 = data.getUint32();
            this.itemid2 = data.getUint32();
            this.itemnum2 = data.getUint32();
            this.itemid3 = data.getUint32();
            this.itemnum3 = data.getUint32();
        }
    }
}