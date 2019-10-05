/**
* name <!-- 修炼技能 -->
*/
module game.modules.skill.models{
	export class ParticleSkillVo{
		/**修炼技能id */
		public id:number;
		/**等级 */
		public level:number;
		/**最大等级 */
		public maxlevel:number;
		/**当前经验 */
		public exp:number;
		/**属性效果字典key:属性加成字段，value:加成值 */
		public effects:Laya.Dictionary;
		/**下一级属性效果key:属性加成字段，value:加成值 */
		public nexteffect:Laya.Dictionary;
		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.id = bytes.readInt32();
			this.level = bytes.readInt32();
			this.maxlevel = bytes.readUint32();
			this.exp = bytes.readInt32();
			this.effects = new Laya.Dictionary();
			let effectsSize:number = bytes.readUint8();
			for (var index = 0; index < effectsSize; index++) {
               this.effects.set(bytes.readInt32(),bytes.readFloat());
           	}
			this.nexteffect = new Laya.Dictionary();
			let nexteffectSize:number = bytes.readUint8();
			for (var index = 0; index < nexteffectSize; index++) {
               this.nexteffect.set(bytes.readInt32(),bytes.readFloat());
           	}
		}
	}
}