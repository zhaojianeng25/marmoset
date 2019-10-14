/**
* name 
*/
module game.data.template {
    export class PracticeItemExpBaseVo {
        public id: number;
        public exp: number; //增加经验
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.exp = data.getUint32();
        }
    }
}