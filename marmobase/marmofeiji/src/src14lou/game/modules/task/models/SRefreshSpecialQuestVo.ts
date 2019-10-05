/**
*  循环任务信息
*/
module game.modules.task.models {
	export class SRefreshSpecialQuestVo {
		/**任务ID*/
		public questid: number;
		/**任务状态*/
		public queststate: number;
		/**任务环数*/
		public round: number;
		/**任务总次数*/
		public sumnum: number;
		/**任务类型*/
		public questtype: number;
		/**任务地图*/
		public dstmapid: number;
		/**NPCkey*/
		public dstnpckey: number;
		/**NPC名字*/
		public dstnpcname: string;
		/**NPCID*/
		public dstnpcid: number;
		/**道具1ID*/
		public dstitemid: number;
		/**道具1数量*/
		public dstitemnum: number;
		/**道具2ID*/
		public dstitemid2: number;
		/**道具2数量*/
		public dstitemidnum2: number;
		/**坐标*/
		public dstx: number;
		/**坐标*/
		public dsty: number;
		/**任务时间*/
		public validtime: number;
		/**是否登陆*/
		public islogin: number;
		constructor() {
		}
		public fromByteArray(bytes: ByteArray): void {
			this.questid = bytes.readUint32();
			this.queststate = bytes.readUint32();
			this.round = bytes.readUint32();
			this.sumnum = bytes.readUint32();
			this.questtype = bytes.readUint32();
			this.dstmapid = bytes.readUint32();
			this.dstnpckey = bytes.readLong();
			this.dstnpcname = ByteArrayUtils.readUtf16String(bytes);
			this.dstnpcid = bytes.readUint32();
			this.dstitemid = bytes.readUint32();
			this.dstitemnum = bytes.readUint32();
			this.dstitemid2 = bytes.readUint32();
			this.dstitemidnum2 = bytes.readUint32();
			this.dstx = bytes.readUint32();
			this.dsty = bytes.readUint32();
			this.validtime = bytes.readLong();
			this.islogin = bytes.readUint32();
		}
	}
}