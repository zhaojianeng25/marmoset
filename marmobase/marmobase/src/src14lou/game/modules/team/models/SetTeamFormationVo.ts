/**
* name 
*/
module game.modules.team.models{
	export class SetTeamFormationVo
	{
	    public formation: number;      		//
		public formationLevel: number;		//光环等级
		public msg: number;					//等于1时给消息提示，等于0时不给消息提示
		
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void 
		{
			this.formation = bytes.readInt32();
			this.formationLevel = bytes.readInt32();
			this.msg = bytes.readByte();
		}
	}
}