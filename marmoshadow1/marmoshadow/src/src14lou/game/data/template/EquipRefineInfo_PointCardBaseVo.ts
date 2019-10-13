/**
* name 
*/
module game.data.template {
    export class EquipRefineInfo_PointCardBaseVo {
        public id: number; //装备id id
        public cailiaoid: number; //消耗道具id
        public cailiaonum: number; //消耗道具数量
        public moneytype: number; //消耗货币类型
        public moneynum: number; //消耗货币数量
        public allcailiaoid: number; //全部洗炼消耗道具
        public allcailiaonum: number; //全部洗炼消耗道具数量
        public allmoneytype: number; //全部洗炼消耗金钱类型
        public allmoneynum: number; //全部洗炼消耗金钱数量
        public refineid1: Array<string>; //洗炼属性id1区间1,洗炼属性id1区间2,洗炼属性id1区间3,洗炼属性id1区间4,洗炼属性id1区间5,洗炼属性id1区间6,洗炼属性id1区间7,洗炼属性id1区间8,洗炼属性id1区间9,洗炼属性id1区间10
        public refinerate1: Array<string>; //属性id1权重1,属性id1权重2,属性id1权重3,属性id1权重4,属性id1权重5,属性id1权重6,属性id1权重7,属性id1权重8,属性id1权重9,属性id1权重10
        public refineid2: Array<string>; //洗炼属性id2区间1,洗炼属性id2区间2,洗炼属性id2区间3,洗炼属性id2区间4,洗炼属性id2区间5,洗炼属性id2区间6,洗炼属性id2区间7,洗炼属性id2区间8,洗炼属性id2区间9,洗炼属性id2区间10
        public refinerate2: Array<string>; //属性id2权重1,属性id2权重2,属性id2权重3,属性id2权重4,属性id2权重5,属性id2权重6,属性id2权重7,属性id2权重8,属性id2权重9,属性id2权重10
        public refineid3: Array<string>; //洗炼属性id3区间1,洗炼属性id3区间2,洗炼属性id3区间3,洗炼属性id3区间4,洗炼属性id3区间5,洗炼属性id3区间6,洗炼属性id3区间7,洗炼属性id3区间8,洗炼属性id3区间9,洗炼属性id3区间10
        public refinerate3: Array<string>; //属性id3权重1,属性id3权重2,属性id3权重3,属性id3权重4,属性id3权重5,属性id3权重6,属性id3权重7,属性id3权重8,属性id3权重9,属性id3权重10
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.cailiaoid = data.getUint32();
            this.cailiaonum = data.getUint32();
            this.moneytype = data.getUint32();
            this.moneynum = data.getUint32();
            this.allcailiaoid = data.getUint32();
            this.allcailiaonum = data.getUint32();
            this.allmoneytype = data.getUint32();
            this.allmoneynum = data.getUint32();
            let refineid1Length: number = data.getUint32();
            this.refineid1 = [];
            for (var index = 0; index < refineid1Length; index++) {
                this.refineid1.push(data.getUTFBytes(data.getUint32()));
            }
            let refinerate1Length: number = data.getUint32();
            this.refinerate1 = [];
            for (var index = 0; index < refinerate1Length; index++) {
                this.refinerate1.push(data.getUTFBytes(data.getUint32()));
            }
            let refineid2Length: number = data.getUint32();
            this.refineid2 = [];
            for (var index = 0; index < refineid2Length; index++) {
                this.refineid2.push(data.getUTFBytes(data.getUint32()));
            }
            let refinerate2Length: number = data.getUint32();
            this.refinerate2 = [];
            for (var index = 0; index < refinerate2Length; index++) {
                this.refinerate2.push(data.getUTFBytes(data.getUint32()));
            }
            let refineid3Length: number = data.getUint32();
            this.refineid3 = [];
            for (var index = 0; index < refineid3Length; index++) {
                this.refineid3.push(data.getUTFBytes(data.getUint32()));
            }
            let refinerate3Length: number = data.getUint32();
            this.refinerate3 = [];
            for (var index = 0; index < refinerate3Length; index++) {
                this.refinerate3.push(data.getUTFBytes(data.getUint32()));
            }
        }
    }
}