/**
* name
*/
module game.scene.models{
	export class DemoExecuteVo{
		/** 攻击发起者id */
		public attackerID:number;
		/** 攻击者耗血，始终为正好了 */
		public hpconsume:number;
		/** 攻击者耗蓝，始终为正好了 */
		public mpconsume:number;
		/** 攻击者耗怒，始终为正好了 */
		public spconsume:number;
		/** 操作类型 参考OperationType中的值		如果是操作失败 ACTION_FAILURE */
		public operationType:number;
		/** 操作的值（使用物品时示物品ID，招唤宠物时为宠物） */
		public operationID:number;
		/** 当不为0时，为动作时的提示ID */
		public msgID:number;
		public demobuffs:Array<DemoBuffVo>;
		public fromByteArray(bytes:ByteArray):void {
			this.attackerID = bytes.readInt32();
			this.hpconsume = bytes.readInt32();
			this.mpconsume = bytes.readInt32();
			this.spconsume = bytes.readInt32();
			this.operationType = bytes.readInt32();
			this.operationID = bytes.readInt32();
			this.msgID = bytes.readInt32();

			this.demobuffs = [];
			let demobuffsSize:number = bytes.readUint8();
			let demoBuff:DemoBuffVo;
			for (var index = 0; index < demobuffsSize; index++) {
				demoBuff = new DemoBuffVo();
				demoBuff.fromByteArray(bytes);
				this.demobuffs.push(demoBuff);
			}
		}
		// <variable name="attackerID" type="int"/>		攻击发起者id
		// <variable name="hpconsume" type="int"/>		攻击者耗血，始终为正好了
		// <variable name="mpconsume" type= "int"/>		攻击者耗蓝，始终为正好了
		// <variable name="spconsume" type= "int"/>		攻击者耗怒，始终为正好了
		// <variable name="operationType" type="int"/>	操作类型 参考OperationType中的值		如果是操作失败 ACTION_FAILURE
		// <variable name="operationID" type= "int"/>	操作的值（使用物品时示物品ID，招唤宠物时为宠物）
		// <variable name="msgID" type= "int"/>			当不为0时，为动作时的提示ID

		//OperationType中的值
		/*<enum name="ACTION_ATTACK" value="1"/>			攻击
		<enum name="ACTION_SKILL" value="2"/>			使用技能
		<enum name="ACTION_USEITEM" value="3"/>			使用物品
		<enum name="ACTION_DEFEND" value="4"/>			防御
		<enum name="ACTION_PROTECT" value="5"/>			保护
		<enum name="ACTION_SUMMON" value="6"/>			召唤宠物
		<enum name="ACTION_WITHDRAW" value="7"/>		召还宠物
		<enum name="ACTION_CATHCH" value="8"/>			捕捉
		<enum name="ACTION_ESCAPE" value="9"/>			逃跑
		<enum name="ACTION_REST" value="10"/>			休息
		<enum name="ACTION_SPECIAL_SKILL" value="11"/>	特殊技能
		<enum name="ACTION_SUMMON_INSTANT" value="12"/> 瞬时召唤
		<enum name="ACTION_ESCAPE_INSTANT" value="13"/> 瞬时逃跑
		<enum name="ACTION_FAILURE" value="14"/>		操作失败
		<enum name="ACTION_BATTLE_END" value="15"/>		战斗结束,只有AI怪的AI指令有这个Action
		<enum name="ACTION_ENVIRONMENTDEMO" value="16"/>	不带施法者的Demo，attackID填0
		<enum name="ACTION_ENVIRONMENTCHANGE" value="17"/>	战场环境改变 operateid填战场环境id
		<enum name="ACTION_ROUNDENDDEMO" value="18"/>	回合末结算demo
		<enum name="ACTION_UNIQUE_SKILL" value="19"/>	绝技
		<enum name="ACTION_FAILURE_NO_WONDER" value="20"/>		操作失败_不带叹号的！
		<enum name="ACTION_REPLACE" value="21"/> 替换 by changhao*/

	}
}