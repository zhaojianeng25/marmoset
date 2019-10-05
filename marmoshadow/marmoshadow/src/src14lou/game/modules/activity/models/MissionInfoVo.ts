/**
* RoleHookExpVo 
*/
module game.modules.activity.models {
    export class MissionInfoVo {
        public missionid: number;
        public missionstatus: number;
        public missionvalue: number;     //任务状态值 
        public missionround: number;     //任务的环数
        public dstnpckey: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.missionid = bytes.readInt32();
            this.missionstatus = bytes.readInt32();
            this.missionvalue = bytes.readInt32();
            this.missionround = bytes.readInt32();
            this.dstnpckey = bytes.readLong();
        }
    }
}