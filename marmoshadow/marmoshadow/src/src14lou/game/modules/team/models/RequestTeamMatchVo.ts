/**
* name 
*/
module game.modules.team.models{
	export class RequestTeamMatchVo
	{
	    public typematch: any;      //类型为0是个人组队匹配1是队伍匹配3是只设置队伍目标 便捷客户端返回 
		public targetid: any;		//目标id 便捷客户端返回 
		public levelmin: any;		//等级下限 如果是个人匹配这个忽略
		public levelmax: any;		//等级上限 如果是个人匹配这个忽略
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void {
			this.typematch = bytes.readUint32();
			this.targetid = bytes.readUint32();
			this.levelmin = bytes.readUint32();
			this.levelmax = bytes.readUint32();
			
		}
	}
}