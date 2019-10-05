/**
* name 
*/
module game.data.template {
    export class PointCardEquipGemBaseVo {
        public id: number; //装备等级id
        public gemsLevel: number; //可镶嵌宝石最高等级
        public vgemboxlevel: Array<number>; //槽1开启等级,槽2开启等级,槽3开启等级
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.gemsLevel = data.getUint32();
            let vgemboxlevelLength: number = data.getUint32();
            this.vgemboxlevel = [];
            for (var index = 0; index < vgemboxlevelLength; index++) {
                this.vgemboxlevel.push(data.getUint32());
            }
        }
    }
}