/**
* 幸运大转盘奖励类型 
*/
module game.modules.friend.models{
	export class ForturneWheelTypeVo {
        /**1为物品,2为经验,3为金钱 */
        public itemtype: number;
        /**物品的id,经验和金钱的id为0 */
        public id: number;
        /**金钱或经验的数量,物品的数量 */
        public num: number;
        /**真正的倍数值*10 */
        public times: number;
        
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.itemtype = bytes.readInt32();
            this.id = bytes.readInt32();
            this.num = bytes.readLong();
            this.times = bytes.readInt32();
     
		}
	}
}