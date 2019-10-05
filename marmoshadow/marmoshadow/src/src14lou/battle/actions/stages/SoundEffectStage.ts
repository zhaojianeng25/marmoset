
module battle.aciton.stage {
    /**
     * 音效
     */
    export class SoundEffectStage extends BaseAction {
        protected soundEffectName : string;
        onInit(soundEffectName : string):void{
            this.soundEffectName = soundEffectName;
        }
        onStart(): void {
           super.onStart();
           Laya.SoundManager.playSound(this.soundEffectName);
        }
    }
}