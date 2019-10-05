/**
* name 
*/
module game.data.template {
    export class SkillConfigBaseVo {
        public id: number; //技能ID
        public name: string; //技能名称
        public isonlypve: number; //是否PVP不能使用
        public isfilterbuff: number; //状态过滤是否能使用
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.isonlypve = data.getUint32();
            this.isfilterbuff = data.getUint32();
        }
    }
}