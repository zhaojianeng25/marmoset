/**
* name 
*/
module game.data.template {
    export class HuanhuaUseBaseVo {
        public id: number; //id
        public skillid: number; //技能id
        public level: number; //等级
        public cardid1: number; //可以使用变化卡1
        public cardid2: number; //可以使用变化卡2
        public cardid3: number; //可以使用变化卡3
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.skillid = data.getUint32();
            this.level = data.getUint32();
            this.cardid1 = data.getUint32();
            this.cardid2 = data.getUint32();
            this.cardid3 = data.getUint32();

        }
    }
}