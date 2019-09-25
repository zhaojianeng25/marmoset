/**
* 活动推送信息 
*/
module game.modules.activity.models {
    export class ActMessageVo {
        /** 活动提醒时间 */
        public startTime: string;
        /** 活动开启时间 */
        public startTime2: string;
        /** 活动结束时间 */
        public endTime: string;
        /** 活动推送表中的id */
        public num: string;

        constructor() {

        }
    }
}