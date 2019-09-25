/**
* 合成宝石 
*/
module game.modules.strengThening.models{
	export class ComposeGemInfoBeanVo{
		/**如果是背包里的,就是itemId,如果是商店里的,就是goodid */
        public itemIdOrGoodId:number;
		/**数量 */
		public num:number;
		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.itemIdOrGoodId = bytes.readUint32();
			this.num = bytes.readUint32();
		}
	}
}