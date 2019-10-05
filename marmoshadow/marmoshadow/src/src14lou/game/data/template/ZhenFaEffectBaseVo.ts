module game.data.template{
    export class ZhenFaEffectBaseVo{
        public id:number;
        public zhenfaid:number;//光环id
        public zhenfaLv:number;//光环等级
        public needexp:number;//升级经验
      //  public actionid:number;
        public descirbe:Array<string>=[];//描述1,描述2,描述3,描述4,描述5,描述6,描述7,描述8,描述9,描述10
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.zhenfaid = data.getUint32();
            this.zhenfaLv = data.getUint32();
            this.needexp = data.getUint32();
            let listCount:number = data.getUint32();          
            for (var index = 0; index < listCount; index++) {                
                this.descirbe.push(data.getUTFBytes(data.getUint32()));               
            }
        }
    }
}