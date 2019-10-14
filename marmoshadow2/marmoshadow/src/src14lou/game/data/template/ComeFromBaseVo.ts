/**
* name 
*/
module game.data.template {
    export class ComeFromBaseVo {
        public id: number; //序列
        public etype: number; //类型
        public nuiidornpcid: number; //对应ID
        public strname: string; //文本名
        public stricon: string; //图标
        public stricon2: string; //图标2
        public nparam: number; //参数
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.etype = data.getUint32();
            this.nuiidornpcid = data.getUint32();
            this.strname = data.getUTFBytes(data.getUint32());
            this.stricon = data.getUTFBytes(data.getUint32());
            this.stricon2 = data.getUTFBytes(data.getUint32());
            this.nparam = data.getUint32();
        }
    }
}