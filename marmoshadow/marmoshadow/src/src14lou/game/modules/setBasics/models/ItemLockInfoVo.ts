
module game.modules.setBasics.models{
    /** 道具安全锁信息的Vo */
    export class ItemLockInfoVo{
        /** 安全锁密码 */
        public password: string;
        /** 强制删除密码时间 */
		public forceDelPdTime: number;
        /** 强制删除密码结束时间 */
		public forceDelEndTime: number;
        /** 是否第一次登陆 */
		public isFistLoginOfDay: number;
        /** 密码输入错误次数 */
		public errorTimes: number;
        /** 锁定结束时间点 */
		public lockEndTime: number;
        /** 是否开启了道具安全锁 */
		public isOpenSafeLock: number; //0:否  1:是

        constructor(){

        }
        
    }
    
}