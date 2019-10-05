module battle.aciton.stage {
    /**
     * stage行为播放基类
     */
    export class BaseStageAction extends BaseAction {
        protected result:game.scene.models.NewDemoResultVo;
        protected stage_data:StageInfoBaseVo;
        protected attacker:FightModel;
        protected attacker_units:FakeUnit[];
        onInit(result:game.scene.models.NewDemoResultVo, stage_data:StageInfoBaseVo, attacker:FightModel, attacker_units:FakeUnit[]):void {
            this.result = result;
            this.stage_data = stage_data;
            this.attacker = attacker;
            this.attacker_units = attacker_units;
            if(this.stage_data)
            this.setDelayTicks(this.stage_data.delay);
        }
         public setDelayTicks(delay:number):void{
            this.stage_data.delay += delay;
        }

        onLogic(delay:number):void {
            super.onLogic(delay);
            this.onSubLogic(delay);
        }

        protected getPhantomUnit():FakeUnit {
            return this.getPhantom(this.stage_data.phantomid);
        }

        protected getPhantom(id:number):FakeUnit {
            const len = this.attacker_units.length;
            for (let i = len; i <= id; i++) {
                this.attacker_units.push(this.battle.scene.createFakeUnit(this.attacker, true));
            }
            return this.attacker_units[id];
        }
        protected is_stage_end:boolean;
        isEnd():boolean {
            return this.is_stage_end;
        }

        protected onSubLogic(delay:number):void {
        }
    }
}