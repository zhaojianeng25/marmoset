module game.data.template{
    export class DTeamListInfoBaseVo{
        public id:number;
        public content:string;//显示内容
        public target:string;//目标
        public type:number;//类型
        public minlevel:number;//等级下限
        public maxlevel:number;//等级上限
        public minMember:number;//人数下限  
        public maxMember:number;//人数上限
        public additional:number;//附加
        public requirement:string;//进入条件
        public opentime:string;//开放时间
       
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.content = data.getUTFBytes(data.getUint32());
            this.target =data.getUTFBytes(data.getUint32());
            this.type = data.getUint32();
            this.minlevel = data.getUint32();
            this.maxlevel = data.getUint32();   
            this.minMember = data.getUint32();
            this.maxMember = data.getUint32();
            this.additional = data.getUint32();
            this.requirement = data.getUTFBytes(data.getUint32());
            this.opentime =data.getUTFBytes(data.getUint32());
                   
        }
    }
}