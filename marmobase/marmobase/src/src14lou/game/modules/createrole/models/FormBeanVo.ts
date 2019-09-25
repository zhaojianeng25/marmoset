/**
* name 
*/
module game.modules.createrole.models{
	export class FormBeanVo{
		/**活跃时间 */
		public activeTimes: number;
		/**等级 */
		public level: number;
		/**经验 */
		public exp: number;

		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.activeTimes = bytes.readUint32();
			this.level = bytes.readUint32();
			this.exp = bytes.readUint32();
		}
	}
}