
module battle.aciton.stage {
    /**
     * 提示
     */
    export class MessageTip extends BaseStageAction {
         protected msgID:number;
        onStart(): void {
            super.onStart();
        }
        onInit(msgid):void {
            this.msgID = msgid;
        }
        onSubLogic(): void {
            if (this.is_stage_end) {
                return;
            }
            this.is_stage_end = true;
           this.battle.showTipsByMsgID(this.msgID);
        }
    }
}