/**
* name 
*/
module game.data.template {
    export class TikuBaseVo {
        public id: number; //题目ID
        public question: string; //题目 
        public answer1: string; //选项1
        public answer2: string; //选项2
        public answer3: string; //选项3
        public answer4: string; //选项4
        public titlestr: string; //标题
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.question = data.getUTFBytes(data.getUint32());
            this.answer1 = data.getUTFBytes(data.getUint32());
            this.answer2 = data.getUTFBytes(data.getUint32());
            this.answer3 = data.getUTFBytes(data.getUint32());
            this.answer4 = data.getUTFBytes(data.getUint32());
            this.titlestr = data.getUTFBytes(data.getUint32());
        }
    }
}