/**
* name 
*/
module game.modules.team.models{
	export class TeamInfoBasicWithMembersVo
	{
	    public TeamInfoBasicVo: TeamInfoBasicVo;  			//队伍数据结构带成员数据
	    public TeamMemberSimpleVo: Array<TeamMemberSimpleVo> = [];  	//队伍数据结构带成员数据
		public membermaxnum:  number;	         			// 队伍最大人数 匹配队伍需要
		public status:  number;		          				// 状态 0是正常1是申请中

		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void 
		{
			this.TeamInfoBasicVo = new TeamInfoBasicVo();
			this.TeamInfoBasicVo.fromByteArray(bytes);
			let teamMemberSimpleSize = bytes.readUint8();
			// let TeamMemberSimpleArray :Array<any> = [];
			for (let teamMemberSimpleIndex = 0; teamMemberSimpleIndex < teamMemberSimpleSize; teamMemberSimpleIndex++) 
			{
				let teamMemberSimpleVo  = new TeamMemberSimpleVo();
				 teamMemberSimpleVo.fromByteArray(bytes);
				this.TeamMemberSimpleVo.push(teamMemberSimpleVo);
			}
			this.status  = bytes.readInt32();
		}
	}
}