/**
* 邮件信息
*/
module game.modules.friend.models{
	export class MailInfoVo {
        /**类型 0=定时邮件 1=GM邮件 */
        public kind: number;
        /**id kind=0:服务ID kind=1:key */
        public id: number;
        /**读取标记 0=未读 1=已读 */
        public readflag: number;
        /** 邮件时间*/    
        public time: string;
        /**邮件标题 */
        public title: string;
        /**邮件内容id kind=0 */
        public contentid: number;
        /**邮件内容 kind=1 */
        public content: string;
        /**奖励ID kind=0 */
        public awardid: number;
        /**奖励列表 kind=1 */
        public items: Laya.Dictionary;
        /**经验 */
        public awardexp: number;
        /**符石 */
        public awardfushi: number;
        /**金币 */
        public awardgold: number;
        /**银币 */
        public awardmoney: number;
        /**vip经验 */
        public awardvipexp: number;
        /**天梯币 */
        public awardtianticoin: number;
        /** NPCID>0时,可以找NPC领取奖励 kind=0 */
        public npcid: number;
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.kind = bytes.readByte();
            this.id = bytes.readLong();
            this.readflag = bytes.readByte();
            this.time = ByteArrayUtils.readUtf16String(bytes);
            this.title = ByteArrayUtils.readUtf16String(bytes);
            this.contentid = bytes.readInt32();
            this.content = ByteArrayUtils.readUtf16String(bytes);
            this.awardid = bytes.readInt32();
            this.items = new Laya.Dictionary();
            let mapSize = bytes.readUint8();
			for(var index = 0; index < mapSize; index ++) {
				this.items.set(bytes.readUint32(),bytes.readUint32());
			}
            this.awardexp = bytes.readLong();
            this.awardfushi = bytes.readLong();
            this.awardgold = bytes.readLong();
            this.awardmoney = bytes.readLong();
            this.awardvipexp = bytes.readLong();
            this.awardtianticoin = bytes.readLong();
            this.npcid = bytes.readInt32();
		}
	}
}