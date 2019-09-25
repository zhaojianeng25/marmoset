/**
* 好友信息
*/
module game.modules.friend.models{
	export class FriendInfoVo {
        /**基础信息封装 */
        public FriendInfoBean: models.InfoBeanVo;
        /** 好友度 */
        public friendLevel: number;
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.FriendInfoBean =  new models.InfoBeanVo();
			this.FriendInfoBean.fromByteArray(bytes);
            this.friendLevel = bytes.readInt32();
		}
	}
}