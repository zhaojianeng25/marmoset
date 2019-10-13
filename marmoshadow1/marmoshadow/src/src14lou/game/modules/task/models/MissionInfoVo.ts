/**
* 任务状态信息 
*/
module game.modules.task.models {
    export class MissionInfoVo {
        /**任务ID*/
        public missionid: number;
        /**是否完成任务*/
        public missionstatus: number;
        /**任务状态值 */
        public missionvalue: number;    
        /**任务的环数*/ 
        public missionround: number;     
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