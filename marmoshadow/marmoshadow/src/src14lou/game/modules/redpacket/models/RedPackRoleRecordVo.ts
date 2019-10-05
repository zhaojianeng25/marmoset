/**
*  红包记录的信息VO
*/
module game.modules.redPacket.models{
	export class RedPackRoleRecordVo{
        //红包类型
        public modeltype:number;
        //红包Id
        public redpackid:string;
        //角色Id
        public roleid:number;//long型数据
        //角色名字
        public rolename:string;
        //职业
        public school:number;
        //外形
        public shape:number;
        //红包金额
        public redpackmoney:number;
        //时间
        public time:number;//long型数据

		constructor(){

		}
	    
        public fromByteArray(bytes:ByteArray):void {
            this.modeltype = bytes.readInt32();
            bytes.readUint8();
            this.redpackid = ByteArrayUtils.readUtf16String(bytes);
            //如果红包id没有，则返回，因为服务器那边会删除过期的红包
            if( !this.redpackid ) return;
            this.roleid = bytes.readLong();
            this.rolename = ByteArrayUtils.readUtf16String(bytes);
            this.school = bytes.readInt32();
            this.shape = bytes.readInt32();
            this.redpackmoney = bytes.readInt32();
            this.time = bytes.readLong();
        }
    }	
}