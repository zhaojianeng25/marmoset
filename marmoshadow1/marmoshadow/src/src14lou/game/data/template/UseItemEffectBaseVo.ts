module game.data.template{
    export class UseItemEffectBaseVo{
        public id:number;//道具ID
        public destWindow:string;//目标控件
      
             
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.destWindow = data.getUTFBytes(data.getUint32());        
         
            
        }
    }
}