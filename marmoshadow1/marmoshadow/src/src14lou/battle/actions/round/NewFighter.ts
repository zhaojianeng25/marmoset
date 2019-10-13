module battle.aciton {
    export class NewFighter extends BaseAction {
        private fighters:game.scene.models.FighterInfoVo[];
        onInit(fighters:game.scene.models.FighterInfoVo[]):void {
            this.fighters = fighters;
        }
        onStart():void {
            for (let i = 0; i < this.fighters.length; i++) {
                const element = this.fighters[i];
                this.battle.addNewFighter(element);
            }
        }
    }
}