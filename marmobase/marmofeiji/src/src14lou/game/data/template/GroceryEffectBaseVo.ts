/**
* name 
*/
module game.data.template {
    export class GroceryEffectBaseVo {
        public id: number; //编号id
        public effect: string; //功能说明 
        public bCanSale: number; //可否摆摊上架
        public dbCanSale: number; //点卡服可否摆摊上架
        public needDuanzaoLevel: string; //需求锻造等级
        public needCaifengLevel: string; //需求裁缝等级
        public needLianjinLevel: string; //需求炼金等级
        public tmpType: string; //临时类型	
        public treasure: number; //是否珍品
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.effect = data.getUTFBytes(data.getUint32());
            this.bCanSale = data.getUint32();
            this.dbCanSale = data.getUint32();
            this.needDuanzaoLevel = data.getUTFBytes(data.getUint32());
            this.needCaifengLevel = data.getUTFBytes(data.getUint32());
            this.needLianjinLevel = data.getUTFBytes(data.getUint32());
            this.tmpType = data.getUTFBytes(data.getUint32());
            this.treasure = data.getUint32();
        }
    }
}