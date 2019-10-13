module battle.aciton.stage {
    /**
     * 5 变身，在残影对象填变身模型id
     */
    export class ChangeModel extends BaseStageAction {
        onStart(): void {
            super.onStart();
            //console.log("玩家:"+this.attacker.index+ "变身, stage: " + this.stage_data.id);
        }
        onSubLogic(): void {
            if (this.is_stage_end) {
                return;
            }
       
            this.is_stage_end = true;
            const result = this.result;
            
            const target = this.battle.findRoleByIndex(result.targetID);
            if (!target) {
                console.warn("找不到目标", this.stage_data.id,  result.targetID);
                return;
            }
            target.shape =  Math.max(this.stage_data.phantomid, result.shape_change);

            // 还原变身
            if (target.shape == 0) target.shape = target.baseShape;

            this.battle._scene.removeFakeUint(target.fakeUnit);
            this.battle._scene.createFakeUnit(target);
        }
    }
}