/**
* name 
*/
module game.object{
	export class BuffCastInfo{
		//buff拥有者OID
        public buff_owner_oid:number;
        //BUFF ID
        public buff_id:number;

		//Buff数据
		public data:Array<BuffCastData>;

		constructor(){
			this.data = new Array<BuffCastData>();
		}

		/**
		 * 创建Buff结果数据
		 */
		public static Create():BuffCastInfo{
			return new BuffCastInfo();
		}
	}
}