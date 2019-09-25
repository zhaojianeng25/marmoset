/**
*  玩家红包tipVO
*/
module game.modules.redPacket.models{
	export class RedPackRoleTipVo{
        //红包类型
        public modeltype:number;
        //红包Id
        public redpackid:string;
        //角色名
        public rolename:string;
        //符石数
        public fushi:number;

		constructor(){

		}
	    
        public fromByteArray(bytes:ByteArray):void {
            this.modeltype = bytes.readInt32();
            bytes.readUint8();
            this.redpackid = ByteArrayUtils.readUtf16String(bytes);
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.fushi = bytes.readInt32();
        }
    }	
}