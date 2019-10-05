/**
* name 
*/
module game.object{
	export class SpellCastData{
		//oid  uint32  --目标ID
        public oid:number;
		public target:Unit;

        //values int32 --伤害或者治疗值
        public values:number;

         //atk_type  uint8--攻击类型baoji shanbi  putong
         public atk_type:number;

          //hp uint32 --剩余血量
         public hp:number;

		constructor(){
			
		}

		/**
		 * 创建技能结果数据
		 */
		public static Create():SpellCastData{
			return new SpellCastData();
		}
	}
}