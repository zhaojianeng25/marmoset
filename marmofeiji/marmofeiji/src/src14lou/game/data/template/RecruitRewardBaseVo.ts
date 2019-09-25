module game.data.template{
    export class RecruitRewardBaseVo{
        public id:number;
        public friendnum:number;//好友数量
        public items:string;//道具
        public text:string;//描述
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.friendnum = data.getUint32();
            this.items = data.getUTFBytes(data.getUint32());
            this.text = data.getUTFBytes(data.getUint32());
        }
    }
}