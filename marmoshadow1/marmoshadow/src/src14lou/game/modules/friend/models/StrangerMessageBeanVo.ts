/**
*  陌生人消息
*/
module game.modules.friend.models{
	export class StrangerMessageBeanVo {
        /**基础信息封装 */
        public FriendInfoBean: models.InfoBeanVo;
        /**内容 */
        public content: string;
        /**展示品信息 */
        public details: Array<any>;
        /**展示的物品，宠物，技能或者修炼的信息 */
        public displayinfo: Array<any>;
		constructor(){

        }
		public fromByteArray(bytes:ByteArray): void {
            this.FriendInfoBean =  new models.InfoBeanVo();
			this.FriendInfoBean.fromByteArray(bytes);
            this.content = ByteArrayUtils.readUtf16String(bytes);
            this.details = new Array<any>();
			let detailsInfo: number;
			let detailsSize: number = bytes.readUint8();
			for (var index = 0; index < detailsSize; index++) {
				detailsInfo = bytes.readUint8();
				this.details.push(detailsInfo);
			}
            this.displayinfo = new Array<any>();
            let displayinfoSize:number = bytes.readUint8();
            let displayInfo:game.modules.chat.models.DisplayInfoVo;
            displayInfo = new game.modules.chat.models.DisplayInfoVo();
            for (var index = 0; index < displayinfoSize; index++) {
                displayInfo.fromByteArray(bytes);
                this.displayinfo.push(displayInfo);
            }//DisplayInfo
		}
	}
}