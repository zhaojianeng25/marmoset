/**
* name 新增物品VO
*/
module game.modules.bag.models{
	export class ItemAddVo {
        /** 编号*/
        public itemid: number;
        /** 数量*/
        public itemnum: number;
       
        
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.itemid = bytes.readInt32();
            this.itemnum = bytes.readInt32(); 
            
		}
	}
}