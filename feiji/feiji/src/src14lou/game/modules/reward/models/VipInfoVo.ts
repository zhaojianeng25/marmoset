/**
* VipInfoVo 
*/
module game.modules.reward.models {
    export class VipInfoVo {
        public vipexp: number;
        public viplevel: number;
        public bounus: number;
        public gotbounus: number;
        public viprights: Array<number>;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.vipexp = bytes.readInt32();
            this.viplevel = bytes.readInt32();
            this.bounus = bytes.readInt32();
            this.gotbounus = bytes.readInt32();

            this.viprights = [];
            let viprightsSize: number = bytes.readUint8();
            for (var index = 0; index < viprightsSize; index++) {
                this.viprights.push(bytes.readInt32());
            }
        }
    }
}