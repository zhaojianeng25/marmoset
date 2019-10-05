/**
* name 
*/
module game.data.template {
    export class GuideCourseLabelBaseVo {
        public id: number; //id
        public name: string; //页签名
        public level: number; //等级
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
			this.level = data.getUint32();
        }
    }
}