//CNpcChatBaseVo
module game.data.template {
    export class CNpcChatBaseVo {
        public id: number;//id
        public chat: string;//对白
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.chat = data.getUTFBytes(data.getUint32());
        }
    }

}