/**
* name 
*/
module game.data.template {
    export class SBLevelLimitBaseVo {
        public id: number; //等级
        public levelLimit: number; //可达到技能等级上限
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.levelLimit = data.getUint32();
        }
    }
}