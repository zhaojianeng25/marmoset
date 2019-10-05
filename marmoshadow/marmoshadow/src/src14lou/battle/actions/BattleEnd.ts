module battle.aciton {
    export class BattleEnd extends BaseAction {
        onStart():void {
            Laya.timer.once(500, null, ()=>{
                console.log("============战斗结束")
                this.battle.exit();
                NotifyMgr.notify(NotifyType.BattleEnd);
            })
        }
    }
}