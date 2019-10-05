/**
* name 
*/
module game.data.template {
    export class ItemUseTipBaseVo {
        public id: number; //id
        public kind: number; //类型orID
        public idnum: number; //值
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.kind = data.getUint32();
            this.idnum = data.getUint32();
        }
    }
}