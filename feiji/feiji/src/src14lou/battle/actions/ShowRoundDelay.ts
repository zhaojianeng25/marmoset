module battle.aciton {
    /**
     * 显示回合
     */
    export class ShowRoundDelay extends BaseAction {
        /**回合数 */
        private round:number;
        /**倒计时 */
        private delay:number;
        onInit(round:number, delay:number):void {
            this.round = round;
            this.delay = delay*1000;
            NotifyMgr.register(NotifyType.RoundOprateEnd, this, this._onEnd);
        }
        private is_end:boolean;
        private _onEnd():void {
            this.is_end = true;
        }
        onStart():void {
            this.battle.roundStart(this.round, this.delay);
        }
        onLogic(delay:number):void {
            if (this.is_end) {
                return;
            }
            this.delay -= delay;
            this.battle.page.setRoundDelay(this.delay);
        }
        isEnd():boolean {
            return this.is_end || this.delay <= 0;
        }
        onDestroy():void {
            NotifyMgr.remove(NotifyType.RoundOprateEnd, this, this._onEnd);
        }
    }
}