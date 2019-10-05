module game.data.template{
    export class GameconfigResetBaseVo{
        public id:number;
        public iosvalue:string;//ios默认值
        public andvalue:number;//安卓默认值
     
        
      
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.iosvalue = data.getUTFBytes(data.getUint32());      
            this.andvalue = data.getUint32(); 
         
        }
    }
}   