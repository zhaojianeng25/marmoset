module game.data.template{
    export class ColorEffectBaseVo{
        public id:number;//数字id
        public red:number;//红色  
        public yellow:number;//黄色
        public blue:number;//蓝色
        public orgreender:number;//绿色
             
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.red =data.getUint32();
            this.yellow = data.getUint32();
            this.blue = data.getUint32();
            this.orgreender = data.getUint32();
         
            
        }
    }
}