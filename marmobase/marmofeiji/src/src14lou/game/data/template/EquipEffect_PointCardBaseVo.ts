/**
* name 
*/
module game.data.template {
    export class EquipEffect_PointCardBaseVo {
        public id: number; //编号 id
        public equipcolor: number; //装备颜色
        public baseEffectType: Array<number>; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6 
        public baseEffect: Array<number>; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6
        public sexNeed: number; //性别需求 
        public scorecolor: Array<number>; //绿色评分,蓝色评分,紫色评分,橙色评分,暗金色评分
        public roleNeed: Array<number>; //角色需求1,角色需求2 
        public bCanSale: number; //可否摆摊上架
        public dbCanSale: number; //点卡服可否摆摊上架
        public sellpricecoef: number; //出售价格系数 出售价格系数
        public endurecoef: number; //耐久度系数耐久度系数
        public suiting: number; //套装id
        public weaponid: number; //武器造型编号
        public weaponeffectid: number; //武器特效编号
        public modelpathleft: Array<string>; //左手路径1,左手路径2		装备在场景里对应的精灵
        public modelpathright: Array<string>; //右手路径1,右手路径2
        public socketleft: Array<string>; //左手挂点1,左手挂点2			装备如果是左手，左手的挂点名
        public socketright: Array<string>; //右手挂点1,右手挂点2			装备如果是右手，右手的挂点名
        public needCareer: string; //职业需求
        public eequiptype: number; //部件ID
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32(); //编号 id
            this.equipcolor = data.getUint32(); //装备颜色
            let baseEffectTypeLength: number = data.getUint32();
            this.baseEffectType = []; //属性名1,属性名2,属性名3,属性名4,属性名5,属性名6 
            for (var index = 0; index < baseEffectTypeLength; index++) {
                this.baseEffectType.push(data.getUint32());
            }
            let baseEffectLength: number = data.getUint32();
            this.baseEffect = []; //属性值1,属性值2,属性值3,属性值4,属性值5,属性值6
            for (var index = 0; index < baseEffectLength; index++) {
                this.baseEffect.push(data.getUint32());
            }
            this.sexNeed = data.getUint32(); //性别需求 
            let scorecolorLength: number = data.getUint32();
            this.scorecolor = []; //绿色评分,蓝色评分,紫色评分,橙色评分,暗金色评分
            for (var index = 0; index < scorecolorLength; index++) {
                this.scorecolor.push(data.getUint32());
            }
            let roleNeedLength: number = data.getUint32();
            this.roleNeed = []; //角色需求1,角色需求2 
            for (var index = 0; index < roleNeedLength; index++) {
                this.roleNeed.push(data.getUint32());
            }
            this.bCanSale = data.getUint32(); //可否摆摊上架
            this.dbCanSale = data.getUint32(); //点卡服可否摆摊上架
            this.sellpricecoef = data.getUint32(); //出售价格系数 出售价格系数
            this.endurecoef = data.getUint32(); //耐久度系数耐久度系数
            this.suiting = data.getUint32(); //套装id
            this.weaponid = data.getUint32(); //武器造型编号
            this.weaponeffectid = data.getUint32(); //武器特效编号
            let modelpathleftLength: number = data.getUint32();
            this.modelpathleft = []; //左手路径1,左手路径2		装备在场景里对应的精灵
            for (var index = 0; index < modelpathleftLength; index++) {
                this.modelpathleft.push(data.getUTFBytes(data.getUint32()));
            }
            let modelpathrightLength: number = data.getUint32();
            this.modelpathright = []; //右手路径1,右手路径2
            for (var index = 0; index < modelpathrightLength; index++) {
                this.modelpathright.push(data.getUTFBytes(data.getUint32()));
            }
            let socketleftLength: number = data.getUint32();
            this.socketleft = []; //左手挂点1,左手挂点2			装备如果是左手，左手的挂点名
            for (var index = 0; index < socketleftLength; index++) {
                this.socketleft.push(data.getUTFBytes(data.getUint32()));
            }
            let socketrightLength: number = data.getUint32();
            this.socketright = []; //右手挂点1,右手挂点2			装备如果是右手，右手的挂点名
            for (var index = 0; index < socketrightLength; index++) {
                this.socketright.push(data.getUTFBytes(data.getUint32()));
            }
            this.needCareer = data.getUTFBytes(data.getUint32()); //职业需求
            this.eequiptype = data.getUint32();
        }
    }
}