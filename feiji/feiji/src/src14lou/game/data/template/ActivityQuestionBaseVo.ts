/**
* name 
*/
module game.data.template {
    export class ActivityQuestionBaseVo {
        public id: number; //题目ID
        public questionid: number; //题
        public step: number; //步骤 步骤
        public question: string; //题目		
        public answer1: string; //选项1
        public answer2: string; //选项2
        public answer3: string; //选项3
        public rightrewardid: number; //正确奖励id
        public errorrewardid: number; //错误奖励id
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.questionid = data.getUint32();
            this.step = data.getUint32();
            this.question = data.getUTFBytes(data.getUint32());
            this.answer1 = data.getUTFBytes(data.getUint32());
            this.answer2 = data.getUTFBytes(data.getUint32());
            this.answer3 = data.getUTFBytes(data.getUint32());
            this.rightrewardid = data.getUint32();
            this.errorrewardid = data.getUint32();
        }
    }
}