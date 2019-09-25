/**
* name 
*/
module game.modules.createrole.models{
	export class TitleInfoVo{
		/**id */
		public titleid: number;
		/**名称 */
		public name: string;
		/**可使用的时间 */
		public availtime: number;

		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.titleid = bytes.readUint32();
			this.name = bytes.readUTFBytes(bytes.readUint8());
			this.availtime = ByteArrayUtils.readLong(bytes);
		}
	}
}