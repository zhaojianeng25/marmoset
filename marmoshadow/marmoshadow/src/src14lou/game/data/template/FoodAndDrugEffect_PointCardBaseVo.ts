/**
* name 
*/
module game.data.template {
    export class FoodAndDrugEffect_PointCardBaseVo {
        public id: number; //编号 id
        public name: string; //显示名 name
        public itemtypeid: number; //类型 
        public level: number; //等级
        public effectdescribe: string; //说明描述
        public effect: Array<number>; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6 
        public bCanSale: number; //可否摆摊上架
        public dbCanSale: number; //点卡服可否摆摊上架
        public funtionid: number; //功能枚举
        public needPengrenLevel: string; //需求烹饪等级
        public pengrenWeight: string; //烹饪权重
        public needLianyaoLevel: string; //需求炼药等级
        public lianyaoWeight: string; //炼药权重
        public lianyaoMaterialWeight: string; //炼药材料附加权重
        public needQuality: number; //是否有品质
        public itemNameColor: string; //道具名颜色
        public treasure: number; //是否珍品
        public niscrossitem: number; //是否专属
        public ncrosssell: number; //是否可在专属商店出售
        public nsellprice: string; //出售价格
        public nqualitylv: number; //品质等级
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.itemtypeid = data.getUint32();
            this.level = data.getUint32();
            this.effectdescribe = data.getUTFBytes(data.getUint32());
            let effectLength: number = data.getUint32();
            this.effect = [];
            for (var index = 0; index < effectLength; index++) {
                this.effect.push(data.getUint32());
            }
            this.bCanSale = data.getUint32();
            this.dbCanSale = data.getUint32();
            this.funtionid = data.getUint32();
            this.needPengrenLevel = data.getUTFBytes(data.getUint32());
            this.pengrenWeight = data.getUTFBytes(data.getUint32());
            this.needLianyaoLevel = data.getUTFBytes(data.getUint32());
            this.lianyaoWeight = data.getUTFBytes(data.getUint32());
            this.lianyaoMaterialWeight = data.getUTFBytes(data.getUint32());
            this.needQuality = data.getUint32();
            this.itemNameColor = data.getUTFBytes(data.getUint32());
            this.treasure = data.getUint32();
            this.niscrossitem = data.getUint32();
            this.ncrosssell = data.getUint32();
            this.nsellprice = data.getUTFBytes(data.getUint32());
            this.nqualitylv = data.getUint32();
        }
    }
}