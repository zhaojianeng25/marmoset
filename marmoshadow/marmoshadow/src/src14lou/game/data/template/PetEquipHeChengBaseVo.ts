/**
* name 
*/
module game.data.template {
    export class PetEquipHeChengBaseVo {
        public id: number; //id
        public money: number; //合成消耗货币
        public moneytype: number; //合成消耗货币类型
        public nextid: number; //合成产物显示
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.money = data.getUint32();
            this.moneytype = data.getUint32();
            this.nextid = data.getUint32();
        }
    }
}