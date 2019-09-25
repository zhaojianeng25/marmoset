/**
* name 
*/
module game.modules.bag.models{
	export class ItemVo {
        /** 编号*/
        public id: number;
        /** 标志，叠加的时候，flags 也 OR 叠加*/
        public flags: number;
        /** 背包属性*/
        public key: number;
        /** 背包属性，位置*/
        public position: number;
        /** 背包属性，数量 */
        public number: number;
        /** 到期时间。如果为0，代表没有时间限制*/
        public timeout: number;
        /** 1为新物品,0为旧物品*/
        public isnew: number;
        /** 失效时间*/
        public loseeffecttime: number;
        /** 摆摊道具冻结时间*/
        public markettime: number;
        
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.id = bytes.readInt32();
            this.flags = bytes.readInt32(); 
            this.key = bytes.readInt32(); 
            this.position = bytes.readInt32(); 
            this.number = bytes.readInt32();
            this.timeout = bytes.readLong();
            this.isnew = bytes.readInt32();
            this.loseeffecttime = bytes.readLong();
            this.markettime = bytes.readLong();
		}
	}
}