/**
* name 
*/
module game.modules.team.models{
	export class PosVo
	{
		public x:	number   			// 
		public y:	number; 			// 
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void {
			this.x = bytes.readUint32();
			this.y = bytes.readUint32();
		}
	}
}