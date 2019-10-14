/**
* name 
*/
module game.data.template {
    export class WeekListBaseVo {
        public id: number; //序号
        public week: number; //星期几
        public text1: string; //时间文本1
        public time1: string; //活动时间1
        public text2: string; //时间文本2
        public time2: string; //活动时间2
        public text3: string; //时间文本3
        public time3: string; //活动时间3
        public text4: string; //时间文本4
        public time4: string; //活动时间4
        public text5: string; //时间文本5
        public time5: string; //活动时间5
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.week = data.getUint32();
			this.text1 = data.getUTFBytes(data.getUint32()); 
			this.time1 = data.getUTFBytes(data.getUint32()); 
			this.text2 = data.getUTFBytes(data.getUint32()); 
			this.time2 = data.getUTFBytes(data.getUint32()); 
			this.text3 = data.getUTFBytes(data.getUint32()); 
			this.time3 = data.getUTFBytes(data.getUint32()); 
			this.text4 = data.getUTFBytes(data.getUint32()); 
			this.time4 = data.getUTFBytes(data.getUint32()); 
			this.text5 = data.getUTFBytes(data.getUint32());
			this.time5 = data.getUTFBytes(data.getUint32());
        }
    }
}