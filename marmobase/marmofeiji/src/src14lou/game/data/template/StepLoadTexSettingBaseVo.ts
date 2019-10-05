module game.data.template{
    export class StepLoadTexSettingBaseVo{
        public id:number;//编号 
        public stepmovie:number;//   是否作用剧情
        public stepalways:number;//是否作用全程
      
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
           this.stepmovie= data.getByte();
             
             this.stepalways = data.getByte();   
         
            
        }
    }
}