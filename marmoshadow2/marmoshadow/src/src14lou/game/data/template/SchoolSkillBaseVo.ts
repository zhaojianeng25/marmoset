/**
* name 
*/
module game.data.template {
    export class SchoolSkillBaseVo {
        public id: number;
        public skillname: string; //技能名
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.skillname = data.getUTFBytes(data.getUint32());
        }
    }
}