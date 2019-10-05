/**
* name 
*/
module game.scene.models{
	export class DemoBuffVo{		
		public fighterid:number;
		public buffid:number;
		public round:number;	//-1为删除该buff，0为没有回合数的buff，>0为回合数
		public fromByteArray(bytes:ByteArray):void {
			this.fighterid = bytes.readInt32();
			this.buffid = bytes.readInt32();
			this.round = bytes.readInt32();
		}
	}
}