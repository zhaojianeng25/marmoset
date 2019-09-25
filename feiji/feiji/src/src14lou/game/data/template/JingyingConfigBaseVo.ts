/**
* name 
*/
module game.data.template {
    export class JingyingConfigBaseVo {
        public id: number; //id
        public taskid: number; //任务id
        public tasktype: number; //任务类型
        public mapid: number; //mapid
        public solonpcid: number; //npcid
        public step: number; //step
        public steprate: number; //出现几率
        public lefttopx: number; //LefttopX
        public lefttopy: number; //LefttopY
        public endtask: number; //结束任务
        public decoratenpc1: number; //装饰npc1
        public x1: number; //坐标x1
        public y1: number; //坐标y1
        public decoratenpc2: number; //装饰npc2
        public x2: number; //坐标x2
        public y2: number; //坐标y2
        public decoratenpc3: number; //装饰npc3
        public x3: number; //坐标x3
        public y3: number; //坐标y3
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.taskid = data.getUint32(); 
			this.tasktype = data.getUint32(); 
			this.mapid = data.getUint32(); 
			this.solonpcid = data.getUint32(); 
			this.step = data.getUint32(); 
			this.steprate = data.getUint32();
			this.lefttopx = data.getUint32(); 
			this.lefttopy = data.getUint32();
			this.endtask = data.getUint32();
			this.decoratenpc1 = data.getUint32(); 
			this.x1 = data.getUint32(); 
			this.y1 = data.getUint32(); 
			this.decoratenpc2 = data.getUint32(); 
			this.x2 = data.getUint32(); 
			this.y2 = data.getUint32(); 
			this.decoratenpc3 = data.getUint32(); 
			this.x3 = data.getUint32(); 
			this.y3 = data.getUint32();
        }
    }
}