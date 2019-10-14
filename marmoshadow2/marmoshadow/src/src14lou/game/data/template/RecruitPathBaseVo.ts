module game.data.template{
    export class RecruitPathBaseVo{
        public id:number;
        public path1:string;//服务器某角色信息
        public path2:string;//角色宣言
        public path3:string;//校验招募码
        public path4:string;//校验招募码同时校验被招募人
        public path5:string;//招募人提交招募码
        public path6:string;//招募人获取被招募人列表
        public path7:string;//领取招募奖励
        public path8:string;//获取某被招募人的奖励进度状态
        public path9:string;//获取某被招募人的奖励状态
        public path10:string;//获取招募人招募人数
        public path11:string;//领取招募次数奖励
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.path1 = data.getUTFBytes(data.getUint32());
            this.path2 = data.getUTFBytes(data.getUint32());
            this.path3 = data.getUTFBytes(data.getUint32());
             this.path4 = data.getUTFBytes(data.getUint32());
            this.path5 = data.getUTFBytes(data.getUint32());
            this.path6 = data.getUTFBytes(data.getUint32());
             this.path7 = data.getUTFBytes(data.getUint32());
            this.path8 = data.getUTFBytes(data.getUint32());
            this.path9 = data.getUTFBytes(data.getUint32());
            this.path10 = data.getUTFBytes(data.getUint32());
            this.path11 = data.getUTFBytes(data.getUint32());
        }
    }
}