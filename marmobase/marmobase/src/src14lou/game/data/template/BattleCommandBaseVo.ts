module game.data.template{
    export class BattleCommandBaseVo{
        public id:number;
        public commandstring:string;//commandstring
      
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.commandstring = data.getUTFBytes(data.getUint32());      
       
            
        }
    }
}   