/**
* 搜索的角色基础信息封装
*/
module game.modules.friend.models{
	export class BlackRoleInfoVo {
        /**角色id */
        public roleId: number;
        /**名字 */
        public name: string;
        /**等级 */
        public level: number;
        /** 头像*/    
        public shape: number;
        /**职业*/
        public school: number;
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.roleId = bytes.readLong();
            this.name = ByteArrayUtils.readUtf16String(bytes);
            this.level = bytes.readShort();
            this.shape = bytes.readInt32(); 
            this.school = bytes.readUint8();    
		}
	}
}