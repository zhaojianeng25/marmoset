module game.data.template{
    export class FriendGiveItemBaseVo{
        public id:number;//道具id
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
          
           
        }
    }
}