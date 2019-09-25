/**
* name 
*/
module game.object{

	export class SpellCastInfo{
		//释放者
		public caster_id:number;
		public caster:Unit;

		//技能id
		public spell_id:number;

		//目标
		public target_id:number;
		public target:Unit;

		//技能数据
		public data:Array<SpellCastData>;

		constructor(){
			this.data = new Array<SpellCastData>();
		}

		/**
		 * 创建技能结果数据
		 */
		public static Create():SpellCastInfo{
			return new SpellCastInfo();
		}
	}
}