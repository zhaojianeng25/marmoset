module game.data.template{
    export class FPSSettingBaseVo{
        public id:number;
        public morevalue:number;//频率高
        public lessvalue:number;//频率一般
             
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.morevalue = data.getUint32();        
            this.lessvalue = data.getUint32();
         
            
        }
    }
}