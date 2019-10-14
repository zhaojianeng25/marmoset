/**
* name 
*/
module game.data.template {
    export class PresentConfigPayBaseVo {
        public id: number; //编号
        public itemid: number; //礼包道具ID
        public dutyallow: number; //角色限制
        public careerallow: number; //职业限制
        public maleallow: number; //性别限制
        public clienttip: number; //打开礼包时的客户端提示
        public rewardcfgid: number; //奖励表ID
        public coinreward: number; //银币奖励  long
        public yuanbaoreward: number; //符石奖励
        public itemids: Array<number>; //道具1ID,道具2ID,道具3ID,道具4ID,道具5ID,道具6ID,道具7ID,道具8ID,道具9ID,道具10ID,道具11ID,道具12ID
        public itemnums: Array<number>; //道具1数量,道具2数量,道具3数量,道具4数量,道具5数量,道具6数量,道具7数量,道具8数量,道具9数量,道具10数量,道具11数量,道具12数量
        public itembinds: Array<number>; //道具1绑定,道具2绑定,道具3绑定,道具4绑定,道具5绑定,道具6绑定,道具7绑定,道具8绑定,道具9绑定,道具10绑定,道具11绑定,道具12绑定
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.itemid = data.getUint32();
            this.dutyallow = data.getUint32();
            this.careerallow = data.getUint32();
            this.maleallow = data.getUint32();
            this.clienttip = data.getUint32();
            this.rewardcfgid = data.getUint32();
            this.coinreward = data.getFloat64();
            this.yuanbaoreward = data.getUint32();
            let itemidsLength: number = data.getUint32();
            this.itemids = [];
            for (var index = 0; index < itemidsLength; index++) {
                this.itemids.push(data.getUint32());
            }
            let itemnumsLength: number = data.getUint32();
            this.itemnums = [];
            for (var index = 0; index < itemnumsLength; index++) {
                this.itemnums.push(data.getUint32());
            }
            let itembindsLength: number = data.getUint32();
            this.itembinds = [];
            for (var index = 0; index < itembindsLength; index++) {
                this.itembinds.push(data.getUint32());
            }
        }
    }
}