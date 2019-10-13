/**
* 
*/
module game.modules.chat.models{
	export class FoodItemTipsVo{
		public quality:number; 					 				// 
		constructor()
		{

		}
		public fromByteArray(bytes:ByteArray):void 
		{
			this.quality = bytes.readUint32();
	
		}
	}
}