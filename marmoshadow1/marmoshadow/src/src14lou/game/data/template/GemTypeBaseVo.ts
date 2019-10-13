/**
* name 
*/
module game.data.template {
    export class GemTypeBaseVo {
        public id: number; //宝石类型id
        public strname: string; //宝石类型名字
        public nicon: number; //宝石类型icon
        public stradddes: string; //提升文本
        public nitemid: number; //定位物品id
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.strname = data.getUTFBytes(data.getUint32());
            this.nicon = data.getUint32();
            this.stradddes = data.getUTFBytes(data.getUint32());
            this.nitemid = data.getUint32();
        }
    }
}