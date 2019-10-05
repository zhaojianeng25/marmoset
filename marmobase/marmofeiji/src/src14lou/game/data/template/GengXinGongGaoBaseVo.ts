module game.data.template{
    export class GengXinGongGaoBaseVo{
        public id:number;
        public content:string;//内容
         public gengxinshijian:string;//更新时间
        public banbenhao:number;//版本号
     
        
      
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.content = data.getUTFBytes(data.getUint32());      
            this.gengxinshijian = data.getUTFBytes(data.getUint32());
            this.banbenhao = data.getUint32(); 
         
        }
    }
}   