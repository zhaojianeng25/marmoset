/**
* name 
*/
module game.data.template {
    export class ExpFactorItemInfoBaseVo {
        public id: number; //ID
        public factor: number; //经验加成比例
        public time: number; //持续时间
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.factor = data.getFloat64();
            this.time = data.getUint32();
        }
    }
}