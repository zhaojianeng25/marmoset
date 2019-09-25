/**
* name 
*/
module game.data.template {
    export class FumoEffectFormulaBaseVo {
        public id: number; //道具ID
        public strname: string; //策划备注
        public npropertyid: number; //属性ID
        public fmin: number; //下限系数   double
        public fmax: number; //上限系数   double
        public npropertyid2: number; //属性2ID
        public fmin2: number; //下限系数2 double
        public fmax2: number; //上限系数2 double
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.strname = data.getUTFBytes(data.getUint32());
            this.npropertyid = data.getUint32();
            this.fmin = data.getFloat64();
            this.fmax = data.getFloat64();
            this.npropertyid2 = data.getUint32();
            this.fmin2 = data.getFloat64();
            this.fmax2 = data.getFloat64();
        }
    }
}