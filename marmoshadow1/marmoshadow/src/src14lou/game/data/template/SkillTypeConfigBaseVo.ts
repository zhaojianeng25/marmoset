/**
* name 
*/
module game.data.template {
    export class SkillTypeConfigBaseVo {
        public id: number; //技能id
        public skilltype: number; //技能归类
        public skillname: string; //技能名称
        public showskillname: number; //是否显示技能名冒字
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.skilltype = data.getUint32();
            this.skillname = data.getUTFBytes(data.getUint32());
            this.showskillname = data.getUint32();
        }
    }
}