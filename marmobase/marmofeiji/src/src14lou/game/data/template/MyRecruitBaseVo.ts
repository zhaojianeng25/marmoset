module game.data.template{
    export class MyRecruitBaseVo{
        public id:number;
        public level:number;//等级
        public items:string;//道具
        public text:string;//描述
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.level = data.getUint32();
            this.items = data.getUTFBytes(data.getUint32());
            this.text = data.getUTFBytes(data.getUint32());
        }
    }
}