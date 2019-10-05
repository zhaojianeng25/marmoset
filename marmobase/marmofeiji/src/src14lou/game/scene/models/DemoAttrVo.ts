/**
* name 
*/
module game.scene.models{
	export class DemoAttrVo{		
		public fighterid:number;
		public attrid:number;
		public value:number;
		public fromByteArray(bytes:ByteArray):void {
			this.fighterid = bytes.readInt32();
			this.attrid = bytes.readInt32();
			this.value = bytes.readInt32();
		}
	}
}