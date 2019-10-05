/**
* name 
*/
module game.data.template {
    export class FoodAndDrugFormulaBaseVo {
        public id: number; //物品ID
        public neffectid1: number; //效果1ID
        public nformulaa1: number; //系数1    double
        public nformulab1: number; //常数1    double
        public neffectid2: number; //效果2ID
        public nformulaa2: number; //系数2    double
        public nformulab2: number; //常数2    double
        public ndupercent: number; //中毒概率
        public strformula: string; //公式描述
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.neffectid1 = data.getUint32(); //效果1ID
            this.nformulaa1 = data.getFloat64(); //系数1    double
            this.nformulab1 = data.getFloat64(); //常数1    double
            this.neffectid2 = data.getUint32(); //效果2ID
            this.nformulaa2 = data.getFloat64(); //系数2    double
            this.nformulab2 = data.getFloat64(); //常数2    double
            this.ndupercent = data.getUint32(); //中毒概率
            this.strformula = data.getUTFBytes(data.getUint32());
        }
    }
}