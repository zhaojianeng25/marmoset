/**
* 抢红包信息的Vo
*/
module game.modules.redPacket.models {
    export class GetRedPackVo {
        /** 红包类型*/
        public modeltype: number;
        /** 红包Id*/
        public redpackid: string;
        /** 红包状态*/
        public state: number;
        /** 领取成功标志  0失败    1成功*/
        public successflag: number;
        /** 符石数量*/
        public fushinum: number;

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {

        }
    }
}