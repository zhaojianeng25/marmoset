
module battle.aciton.stage {
    /**
     * 文字特效
     */
    export class TextEffectStage extends BaseAction {
        protected textEffectName: string;
        protected target: FightModel;

        onInit(textEffectName: string, target: FightModel): void {
            this.textEffectName = textEffectName;
            this.target = target;
        }
        onStart(): void {
            var data: any = [];
            data.name = this.textEffectName;
            this.battle.ShowFightxt(this.target, FlyTextType.PIC, data, false);
        }
    }
}