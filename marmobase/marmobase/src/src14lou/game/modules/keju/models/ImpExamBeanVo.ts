/**
* name 
*/
module game.modules.keju.models{
	export class ImpExamBeanVo
	{
		/** 题目的id */
		public questionid:number;
		/** 这道题是第几题,从1开始计数 */
		public questionnum:number;
		/** 已答对题目数 */
		public righttimes:number;
		/** 距离活动结束时间（只有第一道题目给时间  以后不给时间） */
		public remaintime:number;
		/** 上一题答对了还是答错了,1表示对,0表示错 -1=第一次发出来题目 */
		public lastright:number;
		/** 本次累积获得多少经验 */
		public accuexp:number;
		/** 本次累积获得多少钱 */
		public accumoney:number;
		/** 地王令 */
		public delwrongval:number;
		/** 天王令 */
		public chorightval:number;
		/** 求助次数 */
		public helpcnt:number;
		constructor(){

		}
		public fromByteArray(bytes:ByteArray):void {
			this.questionid = bytes.readInt32();
			this.questionnum = bytes.readInt32();
			this.righttimes  = bytes.readUint32();
			this.remaintime = ByteArrayUtils.readLong(bytes);
			this.lastright  = bytes.readByte();
			this.accuexp   = bytes.readInt32();
			this.accumoney =  bytes.readInt32();
			this.delwrongval = bytes.readInt32();
			this.chorightval = bytes.readInt32();
			this.helpcnt = bytes.readInt32();

		}
	}
}