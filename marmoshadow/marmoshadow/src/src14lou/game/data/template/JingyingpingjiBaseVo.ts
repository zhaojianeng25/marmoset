/**
* name 
*/
module game.data.template {
    export class JingyingpingjiBaseVo {
        public id: number; //id
        public level: string; //等级
        public minround: number; //最小回合数
        public maxround: number; //最大回合数	
        public exppersent: number; //奖励经验百分比	
        public tubiaolujing: string; //图标路径
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.level = data.getUTFBytes(data.getUint32());
            this.minround = data.getUint32(); 
            this.maxround = data.getUint32(); 
            this.exppersent = data.getUint32(); 
            this.tubiaolujing = data.getUTFBytes(data.getUint32());
        }
    }
}