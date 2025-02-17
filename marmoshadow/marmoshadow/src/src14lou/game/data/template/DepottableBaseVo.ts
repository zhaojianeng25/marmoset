/**
* name 
*/
module game.data.template {
    export class DepottableBaseVo {
        public id: number; //id
        public haveCount: number; //已有仓库格
        public needyinbi: number; //所需银币数
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.haveCount = data.getUint32();
            this.needyinbi = data.getUint32();
        }
    }
}