/**
* name 
*/
module game.data.template {
    export class TasktrackingorderBaseVo {
        public id: number; //id
        public mintaskid: number; //任务最小id
        public maxtaskid: number; //任务最大id
        public priority: number; //优先级
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.mintaskid = data.getUint32();
            this.maxtaskid = data.getUint32();
            this.priority = data.getUint32();
        }
    }
}