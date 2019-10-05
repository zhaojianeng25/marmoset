/**
* name 
*/
module game.data.template {
    export class PetSkillupgradeBaseVo {
        public id: number; //技能ID
        public nextid: number; //下一技能id
        public book: number; //对应书籍
        public needexp: number; //升级所需经验
        public offerbaseexp: number; //提供基础经验
        public skilllevel: number; //技能等级
        public sign: number; //技能标示
        public iscanremovable: number; //能否被摘除
        public range: number; //适用范围
        public iscancertification: number; //能否法术认证
        public iscertificationappend: number; //法术认证附加技能 是否可以作为法术认证后的附加技能
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.nextid = data.getUint32();
            this.book = data.getUint32();
            this.needexp = data.getUint32();
            this.offerbaseexp = data.getUint32();
            this.skilllevel = data.getUint32();
            this.sign = data.getUint32();
            this.iscanremovable = data.getUint32();
            this.range = data.getUint32();
            this.iscancertification = data.getUint32();
            this.iscertificationappend = data.getUint32();
        }
    }
}