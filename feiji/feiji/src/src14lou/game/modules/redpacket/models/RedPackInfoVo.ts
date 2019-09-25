/**
*  红包信息VO
*/
module game.modules.redPacket.models{
	export class RedPackInfoVo{
        //红包Id
        public redpackid:string;
        //角色Id
        public roleid:number;//long型数据
        //角色名
        public rolename:string;
        //红包寄语
        public redpackdes:string;
        //红包状态
        public redpackstate:number;//参考RedPackState
        //符石数  
        public fushi:number;

		constructor(){

		}
	    
        public fromByteArray(bytes:ByteArray):void {
			bytes.readUint8();
            this.redpackid = ByteArrayUtils.readUtf16String(bytes);
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.redpackdes = ByteArrayUtils.readUtf16String(bytes);
            this.redpackstate = bytes.readInt32();
            this.fushi = bytes.readInt32();
        }
    }	
}