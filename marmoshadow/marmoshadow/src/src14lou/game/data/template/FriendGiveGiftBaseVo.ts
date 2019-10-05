module game.data.template{
    export class FriendGiveGiftBaseVo{
        public id:number;//道具id
        public oppositeSexFriendlyDegrees:number;//异性增加好友度
        public sameSexFriendlyDegrees:number;//同性增加好友度
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.oppositeSexFriendlyDegrees = data.getUint32();
            this.sameSexFriendlyDegrees = data.getUint32();
        }
    }
}