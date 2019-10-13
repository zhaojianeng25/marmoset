/**
* RoleHookExpVo 
*/
module game.modules.activity.models {
    export class ActivityInfoVo {
        public activityId: number;       // 活动id
        public state: number;            // 角色相对活动状态, 0不可进入,1可进入
        public activitystate: number;    // 状态, 0未开启,1开启
        public finishtimes: number;      // 完成次数
        public nextid: number;           // 下周要开启的活动id
        public nextnextid: number;       // 下下周要开启的活动id

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.activityId = bytes.readUint32();
            this.state = bytes.readUint32();
            this.activitystate = bytes.readUint32();
            this.finishtimes = bytes.readUint32();
            this.nextid = bytes.readUint32();
            this.nextnextid = bytes.readUint32();
        }
    }
}