/**
* name 
*/
module game.data.template {
    export class PetItemEffect_PointCardBaseVo {
        public id: number; //编号id
        public petskillid: number; //对应宠物技能
        public effectdes: string; //功能说明
        public effecttype: Array<number>; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6 
        public effect: Array<number>; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6
        public bCanSale: number; //可否摆摊上架
        public dbCanSale: number; //点卡服可否摆摊上架
        public treasure: number; //是否珍品
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.petskillid = data.getUint32();
            this.effectdes = data.getUTFBytes(data.getUint32());
            let effecttypeLength: number = data.getUint32();
            this.effecttype = [];; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6 
            for (var index = 0; index < effecttypeLength; index++) {
                this.effecttype.push(data.getUint32());
            }
            let effectLength: number = data.getUint32();
            this.effect = [];; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6
            for (var index = 0; index < effectLength; index++) {
                this.effect.push(data.getUint32());
            }
            this.bCanSale = data.getUint32();
            this.dbCanSale = data.getUint32();
            this.treasure = data.getUint32();
        }
    }
}