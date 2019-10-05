/**
* name 
*/
module game.data.template {
    export class AnswerQuestionBaseVo {
        public id: number; //序列
        public topic: number; //题
        public step: number; //步骤
        public title: string; //题目
        public object1: string; //选项1
        public image1: number; //选项1图
        public icon1: number; //选项1小图
        public object2: string; //选项2
        public image2: number; //选项2图
        public icon2: number; //选项2小图
        public object3: string; //选项3
        public image3: number; //选项3图
        public icon3: number; //选项3小图
        public trueanswer: number; //正确答案
        public truereward: number; //正确奖励id
        public falsereward: number; //错误奖励id
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.topic = data.getUint32(); 
			this.step = data.getUint32(); 
			this.title = data.getUTFBytes(data.getUint32()); 
			this.object1 = data.getUTFBytes(data.getUint32()); 
			this.image1 = data.getUint32(); 
			this.icon1 = data.getUint32(); 
			this.object2 = data.getUTFBytes(data.getUint32()); 
			this.image2 = data.getUint32(); 
			this.icon2 = data.getUint32(); 
			this.object3 = data.getUTFBytes(data.getUint32()); 
			this.image3 = data.getUint32(); 
			this.icon3 = data.getUint32(); 
			this.trueanswer = data.getUint32();
			this.truereward = data.getUint32(); 
			this.falsereward = data.getUint32();
        }
    }
}