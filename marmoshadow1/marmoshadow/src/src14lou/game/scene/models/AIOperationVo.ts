/**
* name 
*/
module game.scene.models{
	export class AIOperationVo{
		public actionSeq:number;		//在一回合的脚本中，第几个ResultItem
		public actionMoment:number;		//-1:攻击者行动前；0：攻击者行动后;1-28：对应ID的战斗者死亡时
		public actionFighterId:number;	//做动作的战斗者
		public actionId:number;			//需要做的AIAction ID
		public fromByteArray(bytes:ByteArray):void {
			this.actionSeq = bytes.readInt32();
			this.actionMoment = bytes.readInt32();
			this.actionFighterId = bytes.readInt32();
			this.actionId = bytes.readInt32();
		}
	}
}