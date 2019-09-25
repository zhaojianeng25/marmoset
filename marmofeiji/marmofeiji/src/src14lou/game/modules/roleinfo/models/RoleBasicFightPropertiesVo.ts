/**
* name <!-- 角色基础战斗属性 -->
*/
module game.modules.roleinfo.models{
	export class RoleBasicFightPropertiesVo{
		/**体质 */
		public cons:number;
		/**智力 */
		public iq:number;
		/**力量 */
		public str:number;
		/**耐力 */
		public endu:number;
		/**敏捷 */
		public agi:number;
		/**已分配体质字典key:方案,value:分配的属性点 */
		public cons_save:Laya.Dictionary;
		/**已分配智力字典key:方案,value:分配的属性点 */
		public iq_save:Laya.Dictionary;
		/**已分配力量字典key:方案,value:分配的属性点 */
		public str_save:Laya.Dictionary;
		/**已分配耐力字典key:方案,value:分配的属性点 */
		public endu_save:Laya.Dictionary;
		/**已分配敏捷字典key:方案,value:分配的属性点 */
		public agi_save:Laya.Dictionary;
		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.cons = bytes.readShort();
			this.iq = bytes.readShort();
			this.str = bytes.readShort();
			this.endu = bytes.readShort();
			this.agi = bytes.readShort();
			this.cons_save = new Laya.Dictionary();
			let cons_saveSize:number = bytes.readUint8();
			for (var index = 0; index < cons_saveSize; index++) {
               this.cons_save.set(bytes.readInt32(),bytes.readInt32());
           	}
			this.iq_save = new Laya.Dictionary();
			let iq_saveSize:number = bytes.readUint8();
			for (var index = 0; index < iq_saveSize; index++) {
               this.iq_save.set(bytes.readInt32(),bytes.readInt32());
           	}
			this.str_save = new Laya.Dictionary();
			let str_saveSize:number = bytes.readUint8();
			for (var index = 0; index < str_saveSize; index++) {
               this.str_save.set(bytes.readInt32(),bytes.readInt32());
           	}
			this.endu_save = new Laya.Dictionary();
			let endu_saveSize:number = bytes.readUint8();
			for (var index = 0; index < endu_saveSize; index++) {
               this.endu_save.set(bytes.readInt32(),bytes.readInt32());
           	}
			this.agi_save = new Laya.Dictionary();
			let agi_saveSize:number = bytes.readUint8();
			for (var index = 0; index < agi_saveSize; index++) {
               this.agi_save.set(bytes.readInt32(),bytes.readInt32());
           	}
		}
	}
}