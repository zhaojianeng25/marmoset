/**
* name 
*/
module game.data.template {
    export class EquipSkillBaseVo {
        public id: number; //技能id 
        public name: string; //技能名称
        public icon: number; //图标编号
        public skilltype: number; //主动被动
        public cost: string; //消耗显示
        public costnum: number; //消耗数量
        public costType: number; //消耗属性编号
        public describe: string; //技能描述
        public targettype: number; //目标类型
        public effectid: number; //魔法入口
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.icon = data.getUint32();
            this.skilltype = data.getUint32();
            this.cost = data.getUTFBytes(data.getUint32());
            this.costnum = data.getUint32();
            this.costType = data.getUint32();
            this.describe = data.getUTFBytes(data.getUint32());
            this.targettype = data.getUint32();
            this.effectid = data.getUint32();
        }
    }
}