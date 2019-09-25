/**
* 精英副本信息 
*/
module game.modules.activity.models {
    export class LineInfoVo {
        /** 活动id */
        public id: number;
        /** 参与状态 */
        public state: number;
        /** 是否完成 */
        public finish: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.id = bytes.readInt32();
            this.state = bytes.readInt32();
            this.finish = bytes.readInt32();
        }
    }
}