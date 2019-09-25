/**
* name 
*/
module game.data.template {
    export class EquipSkillInfoBaseVo {
        public id: number; //技能ID
        public name: string; //技能名称
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
        }
    }
}