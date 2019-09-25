/**
* name 
*/
module game.modules.team.models{
	export class InviteJoinTeamVo
	{
	    public leaderroleid: number;     	  // 队长id 只有op是2的时候才用
		public invitername: string;			  //邀请者名字 
		public inviterlevel: number;		  //邀请者等级 
		public op: number;					  //0是正常1是强制邀请2是队员邀请
		constructor()
		{
	

		}
		public fromByteArray(bytes:ByteArray):void 
		{
			this.leaderroleid	 = bytes.readLong();
			this.invitername 	 = ByteArrayUtils.readUtf16String(bytes);
			this.inviterlevel	 = bytes.readUint32();
			this.op 			 = bytes.readUint32();
		}
	}
}