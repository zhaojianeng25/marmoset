/**
* d基础信息封装
*/
module game.modules.friend.models{
	export class InfoBeanVo {
        /**角色id */
        public roleId: number;
        /**角色名 */
        public name: string;
        /**等级 */
        public roleLevel: number;
        /**职业 */
        public school: number;
        /**0=不在线 1=在线 */
        public online: number;
        /** 头像*/    
        public shape: number;
        /** 0中立 1部落 2联盟*/
        public camp: number;
        /** 好友关系 位与0=普通好友 1=结婚2=结交4=师徒*/
        public relation: number;
        /** 公会id*/
        public factionid: number;
        /**公会名称 */
        public factionname: string;
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.roleId = bytes.readLong();
            this.name = ByteArrayUtils.readUtf16String(bytes);
            this.roleLevel = bytes.readShort(); 
            this.school = bytes.readUint8(); 
            this.online = bytes.readUint8();
            this.shape = bytes.readInt32();
            this.camp = bytes.readUint8();
            this.relation = bytes.readShort();
            this.factionid = bytes.readLong();
            this.factionname = ByteArrayUtils.readUtf16String(bytes);
		}
	}
}