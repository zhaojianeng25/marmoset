/**
* name 
*/
module game.data.template {
    export class DashiSpaceGiftBaseVo {
        public id: number;
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
        }
    }
}