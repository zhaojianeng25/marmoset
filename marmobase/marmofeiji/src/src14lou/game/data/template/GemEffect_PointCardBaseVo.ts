/**
* name 
*/
module game.data.template {
    export class GemEffect_PointCardBaseVo {
        public id: number; //编号id
        public equiptype: Array<number>; //对应装备类型1,对应装备类型2 
        public effecttype: Array<number>; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6  
        public effect: Array<number>; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6 
        public tipsicon: string; //tips图标
        public tipsemotion: number; //tips特效表情
        public genegemid: number; //合成宝石ID
        public successrate: number; //合成成功率
        public bCanSale: number; //可否摆摊上架
        public dbCanSale: number; //点卡服可否摆摊上架
        public effectdes: string; //功能说明
        public inlaypos: string; //镶嵌部位
        public inlayeffect: string; //镶嵌效果
        public ngemtype: number; //宝石类型
        public treasure: number; //是否珍品
        public ncanfenjie: number; //可否分解
        public nfenjieid: number; //分解成道具
        public nfenjienum: number; //分解数量
        public level: number; //等级
        public name: string; //显示名
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            let equiptypeLength: number = data.getUint32();
            this.equiptype = [];
            for (var index = 0; index < equiptypeLength; index++) {
                this.equiptype.push(data.getUint32());
            }
            let effecttypeLength: number = data.getUint32();
            this.effecttype = [];
            for (var index = 0; index < effecttypeLength; index++) {
                this.effecttype.push(data.getUint32());
            }
            let effectLength: number = data.getUint32();
            this.effect = [];
            for (var index = 0; index < effectLength; index++) {
                this.effect.push(data.getUint32());
            }
            this.tipsicon = data.getUTFBytes(data.getUint32());
            this.tipsemotion = data.getUint32();
            this.genegemid = data.getUint32();
            this.successrate = data.getUint32();
            this.bCanSale = data.getUint32();
            this.dbCanSale = data.getUint32();
            this.effectdes = data.getUTFBytes(data.getUint32());
            this.inlaypos = data.getUTFBytes(data.getUint32());
            this.inlayeffect = data.getUTFBytes(data.getUint32());
            this.ngemtype = data.getUint32();
            this.treasure = data.getUint32();
            this.ncanfenjie = data.getUint32();
            this.nfenjieid = data.getUint32();
            this.nfenjienum = data.getUint32();
            this.level = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
        }
    }
}