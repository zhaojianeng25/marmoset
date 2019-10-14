/**
* name 
*/
module game.data.template {
    export class PointCardActiveGiftBox {
        public id: number; //id
        public needactvalue: number; //需求活跃度
        public text: string; //文本
        public itemid: number; //道具ID
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.needactvalue = data.getUint32();
			this.text = data.getUTFBytes(data.getUint32());
			this.itemid = data.getUint32();
        }
    }
}