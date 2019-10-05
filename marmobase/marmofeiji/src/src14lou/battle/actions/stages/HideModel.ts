
module battle.aciton.stage {
    /**
     * 6 隐身，填透明度即可
     */
    export class HideModel extends BaseStageAction {
        onStart(): void {
            super.onStart();
            console.log("玩家:"+this.attacker.index+ "隐身 = ",this.stage_data.phantomalpha / 255 , " stage: " + this.stage_data.id);
        }
        onSubLogic(): void {
            if (this.is_stage_end) {
                return;
            }
            this.is_stage_end = true;
            const reuslt = this.result;
            if (this.stage_data.phantomalpha == -1) { //移除模型
                this.battle._scene.removeFakeUint(this.attacker.fakeUnit);
                this.battle.removeRoleByIndex(this.attacker.index);
                return;
            }
            this.battle._scene._scene.updateAlpha(this.attacker.fakeUnit, this.stage_data.phantomalpha / 255);
        }
    }
}