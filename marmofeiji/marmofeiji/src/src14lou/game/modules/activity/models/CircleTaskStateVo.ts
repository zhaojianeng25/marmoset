/**
* RoleHookExpVo 
*/
module game.modules.activity.models {
    export class CircleTaskStateVo {
        public questid: number;
        public state: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.questid = bytes.readUint32();
            this.state = bytes.readUint32();
        }
    }
}