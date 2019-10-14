/**
*  查看被领取红包的信息的VO
*/
module game.modules.redPacket.models{
	export class RedPackHisViewVo{
        /** 红包类型*/
        public modeltype: number;
        /** 红包ID*/
        public redpackid: string;
        /** 红包寄语*/
        public redpackdes: string;
        /** 红包总个数*/
        public redpackallnum: number;
        /** 红包总金额*/
        public redpackallmoney: number;
        /** 时间*/
        public time: number;//long型数据

		constructor(){

		}
	    
        public fromByteArray(bytes:ByteArray):void {
        }
    }	
}