/**
* name 
*/
module game.modules.team.models{
	export class TeamMemberSimpleVo{
		public roleid:number // 角色ID
		public rolename:string; // 角色名称
		public level:number; // 等级
		public school:number; // 门派
		public shape:number; // 造型id
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void 
		{
			this.roleid   = ByteArrayUtils.readLong(bytes);
			this.rolename = ByteArrayUtils.readUtf16String(bytes);
			this.level    = bytes.readInt32();
			this.school   = bytes.readInt32();
			this.shape    = bytes.readInt32(); 	
		}
	}
}