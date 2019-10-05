module battle.aciton.stage {
    /**
     * 1 移动
     */
    export class Move extends BaseStageAction {
        private Xpos: number;
        private Ypos:number;
        private center_return:boolean;
        private _moveflag:number;
        onInit(result:game.scene.models.NewDemoResultVo, stage_data:StageInfoBaseVo, attacker:FightModel, attacker_units:FakeUnit[],Ypos:number = 0,Xpos:number = 0,center_return:boolean = false,_moveflag:number = 0):void {
            super.onInit(result, stage_data, attacker, attacker_units);
            this.Ypos = Ypos;
            this.Xpos = Xpos;
            this.center_return = center_return;
            this._moveflag = _moveflag;
        }
        private reinit_end:boolean;
        private _delay:number;
        onSubLogic(delay:number): void {
            if (!this.reinit_end) {  
                const unit = this.getPhantomUnit();
                if (!unit.userData) {
                    return;
                }
                this.reinit_end = true;
                
                const target = this.battle.findRoleByIndex(this.result.targetID);
                if(!target) {
                    this.is_stage_end = true;
                    return;
                }
                let x = target.fakeUnit.GetPosX();
                let y = target.fakeUnit.GetPosY();
                console.log("targetID======",this.result.targetID + "  " + unit.name);
                if (target.isBottom) { //目标是己方
                    x -= 10;
                    y += 10;
                } else {
                    x += 10;
                    y -= 10;
                }
                let delay = 0;
                if( this._moveflag ==  RunType.MATCH_RUN && this.Ypos > 0 && this.Xpos > 0)  
                {//捕捉失败目标中心点折回
                    delay = this.battle._scene.moveHalfForward(unit,this.Ypos,this.Xpos);
                }else if( this._moveflag == RunType.MATCH_RUN )
                {//捕捉跑动
                    delay = this.battle._scene.moveCatchRun(unit,target.pos - 1,target.isBottom);
                }else if( this._moveflag == RunType.MATCH_BACK)
                {//捕捉返回
                     let p = this.battle._scene.getMapPoint(target.pos - 1, target.isBottom);
                     this.battle._scene.moveRun(unit,p.y,p.x,1500,10,1510);
                }
                else if(!this.center_return && this.Ypos > 0 && this.Xpos > 0)
                {//逃跑使用
                    this.Ypos += 20;
                    this.Xpos += 20;
                    this.battle._scene.moveRun(unit,this.Ypos,this.Xpos);
                }else 
                {
                    delay = this.battle._scene.moveForward(unit, target.pos - 1, target.isBottom);
                }
                this._delay = delay;
            }
            if (this.is_stage_end) {
                return;
            }
            this._delay -= delay;
            this.is_stage_end = this._delay <= 0;
        }
    }
}