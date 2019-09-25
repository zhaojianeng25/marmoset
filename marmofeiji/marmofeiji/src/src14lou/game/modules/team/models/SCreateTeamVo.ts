/**
* name 
*/
module game.modules.team.models{
	export class SCreateTeamVo
	{
		public teamid:number   			// 队伍ID
		public formation:number; 		// 队伍光环
		public teamstate:number; 		// 队伍状态，参考TeamState：1=普通队伍；2=等待中的队伍；3=召集令队伍
		public smapId:number; 			// 地图玩法ID，当处于普通队伍状态时，smapId为0
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void {
			this.teamid = bytes.readLong();
			this.formation = bytes.readUint32();
			this.teamstate = bytes.readUint32();
			this.smapId = bytes.readUint32();
			
		}
	}
}