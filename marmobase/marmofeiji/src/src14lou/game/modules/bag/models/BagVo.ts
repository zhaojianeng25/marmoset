/**
* name 
*/
module game.modules.bag.models{
	export class BagVo {
		/**key 货币类型,参见MoneyType */
        public currency: Object = {};
		public capacity: number;
		/**服务端传回的道具信息 */
        public items;
		//获取、设置属性
		constructor(){

		}

		public fromByteArray(bytes:ByteArray): void 
		{
			let mapSize = bytes.readUint8();
			for(var index = 0; index < mapSize; index++) {
				this.currency[bytes.readInt8()] = bytes.readLong();
			}
			this.capacity = bytes.readInt32();
			this.items = [];
			mapSize = bytes.readUint8();
			let item:ItemVo;
			for (var index = 0; index < mapSize; index++) {
				item = new ItemVo();
				item.fromByteArray(bytes);
				this.items.push(item);
			}
		}
	}
}