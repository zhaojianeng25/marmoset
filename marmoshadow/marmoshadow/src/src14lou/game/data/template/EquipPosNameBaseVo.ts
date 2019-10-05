/**
* name 
*/
module game.data.template {
    export class EquipPosNameBaseVo {
        public id: number; //部件ID
        public strname: string; //部件类型
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.strname = data.getUTFBytes(data.getUint32());
        }
    }
}