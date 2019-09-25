module battle.aciton {
    /**
     * 时间间隔, 默认0.2秒
     */
    export class DelayPlay extends BaseAction {
        private delay:number;
        onInit(delay:number = 200) {
            this.delay = delay;
        }
        onLogic(delay:number) {
            this.delay -= delay;
        }

        isEnd():boolean {
            return this.delay <= 0;
        }
    }
}