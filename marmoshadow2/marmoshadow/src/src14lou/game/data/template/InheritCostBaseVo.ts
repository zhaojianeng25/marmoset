/**
* name 
*/
module game.data.template {
    export class InheritCostBaseVo {
        public id: number; //id
        public skillid: number; //技能id
        public level: number; //等级
        public costitem: number; //消耗物品
        public costitemnum: number; //消耗物品数量
        public veccard: Array<number>; //制作变化卡1,制作变化卡2,制作变化卡3,制作变化卡4,制作变化卡5,制作变化卡6,制作变化卡7,制作变化卡8,制作变化卡9
        public desc: string; //简介
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.skillid = data.getUint32();
            this.level = data.getUint32();
            this.costitem = data.getUint32();
            this.costitemnum = data.getUint32();
            let veccardLength: number = data.getUint32();
            this.veccard = [];
            for (var index = 0; index < veccardLength; index++) {
                this.veccard.push(data.getUint32());
            }
            this.desc = data.getUTFBytes(data.getUint32());
        }
    }
}