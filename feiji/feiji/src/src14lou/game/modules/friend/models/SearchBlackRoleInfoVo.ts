/**
* 搜索的角色基础信息封装
*/
module game.modules.friend.models{
	export class SearchBlackRoleInfoVo {
        public roleId: number;
        public name: string;
        public roleLevel: number;
        public school: number;
        /**0=不在线 1=在线 */
        public online: number;
        /** 头像*/    
        public shape: number;
        /** 0中立 1部落 2联盟*/
        public camp: number;
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
		}
	}
}