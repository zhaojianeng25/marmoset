/**
* name 
*/
module game.data.template {
    export class FriendSkillBaseVo {
        public id: number; //int
        public name: string; //技能名
        public imageID: number; //图标编号
        public desc: string; //技能升级描述
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.imageID = data.getUint32();
            this.desc = data.getUTFBytes(data.getUint32());
        }
    }
}