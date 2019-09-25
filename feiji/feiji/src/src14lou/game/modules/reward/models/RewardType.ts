/**
* RewardType 
*/
enum rewardBtnType {
    SIGNIN = 0,     //每日签到
    CHARGE = 1,     //首充，vip
    MONTH = 2,      //月卡奖励
    SEVENDAY = 3,   //七日签到
    NEWPLAYER = 4,  //新手奖励
    PHONE = 5,      //手机关联
    LEVELUP = 6,    //升级礼包
}
module game.modules.reward.models {
    export class RewardType {
        public type: number
        public isShow: number;  //0不显示，1显示
        public name: string;
        public skin: string;

        constructor() {
        }

    }
}