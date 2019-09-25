//CJingjiRandomChatBaseVo
module game.data.template {
    export class CJingjiRandomChatBaseVo {
        public id: number;//编号
        public strchat: string;//内容
       
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.strchat = data.getUTFBytes(data.getUint32());
         

        }
    }
}