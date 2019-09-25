/**
* name 
*/
module game.data.template {
    export class EquipAddattributelibBaseVo {
        public id: number; //附加属性id
        public name: string; //名称
        public namecolour: string; //颜色
        public attributeid: number; //属性id
        public attributeidinterval: string; //区间
        public buffid: number; //buffid
        public skillid: number; //技能id 
        public isshow: number; //拍卖筛选是否显示 
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.namecolour = data.getUTFBytes(data.getUint32());
            this.attributeid = data.getUint32();
            this.attributeidinterval = data.getUTFBytes(data.getUint32());
            this.buffid = data.getUint32();
            this.skillid = data.getUint32();
            this.isshow = data.getUint32();
        }
    }
}