/**
* name 
*/
module game.data.template {
    export class EquipRefineSkillInfo_PointCardBaseVo {
        public id: number; //id
        public partid: number; //部件id
        public quality: number; //装备品质
        public cailiaoid: number; //消耗道具id
        public cailiaonum: number; //消耗道具数量
        public moneytype: number; //消耗货币类型
        public moneynum: number; //消耗货币数量
        public skillids: Array<number>; //附加属性id1,附加属性id2,附加属性id3,附加属性id4,附加属性id5,附加属性id6,附加属性id7,附加属性id8,附加属性id9,附加属性id10,附加属性id11,附加属性id12,附加属性id13,附加属性id14,附加属性id15,附加属性id16,附加属性id17,附加属性id18,附加属性id19,附加属性id20,附加属性id21,附加属性id22,附加属性id23,附加属性id24,附加属性id25,附加属性id26,附加属性id27,附加属性id28,附加属性id29,附加属性id30,附加属性id31,附加属性id32,附加属性id33,附加属性id34,附加属性id35,附加属性id36,附加属性id37,附加属性id38,附加属性id39,附加属性id40
        public skillidrates: Array<number>; //附加属性id1权重,附加属性id2权重,附加属性id3权重,附加属性id4权重,附加属性id5权重,附加属性id6权重,附加属性id7权重,附加属性id8权重,附加属性id9权重,附加属性id10权重,附加属性id11权重,附加属性id12权重,附加属性id13权重,附加属性id14权重,附加属性id15权重,附加属性id16权重,附加属性id17权重,附加属性id18权重,附加属性id19权重,附加属性id20权重,附加属性id21权重,附加属性id22权重,附加属性id23权重,附加属性id24权重,附加属性id25权重,附加属性id26权重,附加属性id27权重,附加属性id28权重,附加属性id29权重,附加属性id30权重,附加属性id31权重,附加属性id32权重,附加属性id33权重,附加属性id34权重,附加属性id35权重,附加属性id36权重,附加属性id37权重,附加属性id38权重,附加属性id39权重,附加属性id40权重
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.partid = data.getUint32();
            this.quality = data.getUint32();
            this.cailiaoid = data.getUint32();
            this.cailiaonum = data.getUint32();
            this.moneytype = data.getUint32();
            this.moneynum = data.getUint32();
            let skillidsLength: number = data.getUint32();
            this.skillids = [];
            for (var index = 0; index < skillidsLength; index++) {
                this.skillids.push(data.getUint32());
            }
            let skillidratesLength: number = data.getUint32();
            this.skillidrates = [];
            for (var index = 0; index < skillidratesLength; index++) {
                this.skillidrates.push(data.getUint32());
            }
        }
    }
}