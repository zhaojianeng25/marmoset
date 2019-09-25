/**
* name 
*/
module game.modules.team.models{
	export class TeamInfoBasicVo
	{
	    public teamid:   	number;      // 队伍ID
		public leaderid:	number;		//  队长ID
		public minlevel: 	 	number;		// 等级下限
		public maxlevel:  	number;		// 等级上限
		public leadername:    	string;		// 队长名字
		public leaderlevel:    	number;		// 队长等级
		public leaderschool:  number;		// 队长职业
		public membernum:  number;		// 队伍人数
		public membermaxnum:  number;		// 队伍最大人数 匹配队伍需要
		public targetid:  number;		// 队伍目标

		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void {
			this.teamid = ByteArrayUtils.readLong(bytes);
			this.leaderid = ByteArrayUtils.readLong(bytes);
			this.minlevel = bytes.readUint32();
			this.maxlevel = bytes.readUint32();
			this.leadername = ByteArrayUtils.readUtf16String(bytes);
			this.leaderlevel = bytes.readUint32();
			let leaderschool = bytes.readUint32();
			this.membernum =  bytes.readUint32();
			this.membermaxnum = bytes.readUint32();
			this.targetid =  bytes.readUint32();
			
			
		}
	}
}