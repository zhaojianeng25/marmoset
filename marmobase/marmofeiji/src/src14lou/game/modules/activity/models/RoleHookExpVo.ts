/**
* RoleHookExpVo 
*/
module game.modules.activity.models {
    export class RoleHookExpVo {
        public cangetdpoint: number;    //可领取双倍点数
        public getdpoint: number;       //已领取双倍点数
        public offlineexp: number;      //离线经验

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.cangetdpoint = bytes.readInt16();
            this.getdpoint = bytes.readInt16();
            this.offlineexp = bytes.readLong();
        }
    }
}