/**
* ChargeReturnProfitVo 
*/
module game.modules.shop.models {
    export class ChargeReturnProfitVo {
		public id:number;    
		public value:number;        // 当前值 by changhao
		public maxvalue:number;     // 最大值 by changhao
		public status:number;       // 0是领取了1是未领取2是未到达 by changhao

        constructor() {

        }
        public fromByteArray(bytes: ByteArray): void {
            this.id = bytes.readInt32();
            this.value = bytes.readInt32();
            this.maxvalue = bytes.readInt32();
            this.status = bytes.readInt32();
        }
    }
}