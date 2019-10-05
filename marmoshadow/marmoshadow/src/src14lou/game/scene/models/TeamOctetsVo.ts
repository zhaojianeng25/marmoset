/**
* 队伍信息
*/
module game.scene.models{
	export class TeamOctetsVo{
		/**队伍ID*/
		public teamid:number;
		/**队伍状态以及该成员在队伍的ID*/
		public teamindexstate:number;
		public hugindex:number;
		/**正常队员的数量 */
		public normalnum:number;
		constructor(){
		}
		public fromByteArray(bytes:ByteArray):void {
			this.teamid = bytes.readLong();		
			this.teamindexstate = bytes.readByte();
			this.hugindex = bytes.readByte();
			this.normalnum = bytes.readByte();	
		}
	}
}