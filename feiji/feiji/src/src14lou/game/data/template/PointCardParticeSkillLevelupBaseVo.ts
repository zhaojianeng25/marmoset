/**
* name 
*/
module game.data.template {
    export class PointCardParticeSkillLevelupBaseVo {
        public id: number; //id
        public vecskillexp: Array<number>; //修炼技能1,修炼技能2,修炼技能3,修炼技能4,修炼技能5,修炼技能6,修炼技能7,修炼技能8,幻化技能1,幻化技能2,幻化技能3" />
        public playerlevel: number; //需求人物等级
        public factionlevel: number; //需求工会等级
        public maxcon: number; //需求历史帮贡
        public huanhuaplayerlevel: number; //幻化需求人物等级
        public huanhuafactionlevel: number; //幻化需求工会等级
        public huanhuamaxcon: number; //幻化需求历史帮贡
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            let vecskillexpLength: number = data.getUint32();
            this.vecskillexp = [];
            for (var index = 0; index < vecskillexpLength; index++) {
                this.vecskillexp.push(data.getUint32());
            }
            this.playerlevel = data.getUint32(); 
            this.factionlevel = data.getUint32(); 
            this.maxcon = data.getUint32(); 
            this.huanhuaplayerlevel = data.getUint32();
            this.huanhuafactionlevel = data.getUint32();
            this.huanhuamaxcon = data.getUint32();
        }
    }
}