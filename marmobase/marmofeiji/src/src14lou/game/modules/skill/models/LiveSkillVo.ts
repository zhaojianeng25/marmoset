/**
* <!-- 生活技能 -->
*/
module game.modules.skill.models{
	export class LiveSkillVo{
		/**生活技能id */
		public id:number;
		/**等级 */
		public level:number;
		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.id = bytes.readUint32();
			this.level = bytes.readUint32();
		}
	}
}