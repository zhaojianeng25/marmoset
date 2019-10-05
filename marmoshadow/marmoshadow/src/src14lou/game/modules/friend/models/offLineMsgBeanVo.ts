/**
* 离线消息
*/
module game.modules.friend.models{
	export class offLineMsgBeanVo {
        /** 陌生人消息 */
        public strangerMessage: models.StrangerMessageBeanVo;
        /** 离线消息的服务器时间 */
        public time: string;
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.strangerMessage =  new models.StrangerMessageBeanVo();
			this.strangerMessage.fromByteArray(bytes);
            this.time = ByteArrayUtils.readUtf16String(bytes);;
		}
	}
}