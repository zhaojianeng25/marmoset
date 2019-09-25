/**
* name 
*/
module game.object{
	
	export class BuffCastData{
		//目标ID
        public target_oid:number;
        //对象
        public target:Unit;
        //加BUFF的人的ID 可能为0
        public buff_giver_oid:number;
        //伤害或者治疗值
        public values:number;
        //攻击类型baoji shanbi putong
        public atk_type:number;
        //剩余血量
        public hp:number;

		constructor(){

		}

		/**
		 * 创建技能结果数据
		 */
		public static Create():BuffCastData{
			return new BuffCastData();
		}
	}
}