
module battle.aciton.stage {
    /**
     * 0 播放动作
     */
    export class PlayAction extends BaseStageAction {
        private reinit_end:boolean;
        private _delay:number;
        onSubLogic(delay:number):void {
            if (!this.reinit_end) {
                const unit = this.getPhantomUnit();
                if (!unit.userData) {
                    return;
                }
                this.reinit_end = true;

                console.log("玩家:"+this.attacker.fakeUnit.name + " 站位:" + this.attacker.index +", 动作: " + this.actionStringMap[this.stage_data.actiontype]);

                const action = this.stage_data.actiontype == ActionType.DEATH ? 1 : 2

                if (this.stage_data.actiontype == ActionType.ROLL)
                {
                     // 击飞
                    this.battle._scene._scene.beatBackFly(this.attacker.fakeUnit, this.attacker.index);
                    Laya.timer.once(500, this, () => {
                            this.attacker.fakeUnit.setVisible(false);
                    });
                    this._delay = 500;
                    return;
                }
                // 闪避都要执行移动
                if(this.stage_data.actiontype == ActionType.DODGE || this.stage_data.actiontype == ActionType.ATTACKED)
                    this.battle.scene._scene.onBeatMove(unit ,this.attacker.index);

                if( action === UnitField.LIVE_STATU_DIE) //死亡判断职业移除特效
                {
                    let school = this.battle._GetSchoolByModel(this.attacker);
                    if (school == zhiye.qixing)//如果是七星观职业则清除对应连击点特效
                    {
                        this.battle.scene.clearEffect(this.attacker.fakeUnit,SceneBattleRes.EFFECT_COMBO_POINT_1);
                        this.battle.scene.clearEffect(this.attacker.fakeUnit,SceneBattleRes.EFFECT_COMBO_POINT_2);
                        this.battle.scene.clearEffect(this.attacker.fakeUnit,SceneBattleRes.EFFECT_COMBO_POINT_3);
                        this.battle.scene.clearEffect(this.attacker.fakeUnit,SceneBattleRes.EFFECT_COMBO_POINT_4);
                        this.battle.scene.clearEffect(this.attacker.fakeUnit,SceneBattleRes.EFFECT_COMBO_POINT_5);
                    }
                }

                var unitAction = this.actionMap[this.stage_data.actiontype];
                // 以下门派职业的攻击动作使用attack2
                if (this.attacker.fighterType == FighterType.FIGHTER_ROLE && this.stage_data.actiontype == ActionType.ATTACK
                && this.attack2Array.indexOf(this.attacker.shape + "," + this.attacker.school) >= 0){
                    unitAction = AvatarData.STATE_ATTACKGO2;
                }
                
                this.battle.scene.battleAction(unit, unitAction, null, action);
                this._delay = this.getActionTime(this.stage_data.actiontype);
                return;
            }
            this._delay -= delay;
            this.is_stage_end = this._delay <= 0;
        }

        private getActionTime(action:battle.ActionType):number {
            switch (action) {
                case ActionType.ATTACKED: return 500; //受击
                case ActionType.ATTACK: return 800; //攻击
                case ActionType.MAGIC: return 800; //魔法
                case ActionType.DEFEND: return 330; //防御
                case ActionType.DEATH: return 330; //死亡
                default: return 0;
            }
        }

        // 动作配置表，配置actiontype对应的动作
        private actionMap:{[key:number]:number} = {
            [ActionType.STAND] : AvatarData.STATE_STAND,
            [ActionType.RUN] : AvatarData.STATE_RUNNING,//"run",
            [ActionType.ATTACKED] : AvatarData.STATE_BEATEN,//"attacked",
            [ActionType.ATTACK] : AvatarData.STATE_ATTACKGO,//"attack",
            [ActionType.MAGIC] : AvatarData.STATE_MACGO,//"magic",
            [ActionType.DEFEND] : AvatarData.STATE_DEFENSE,//"defend",
            [ActionType.DEATH] : AvatarData.STATE_DIED,//"death",
        }

        /**
         * 主角根据造型和职业id决定攻击动作是不是atack2
         */
        private attack2Array : Array<String> = [
            "1010101,12",
            "1010101,17",
            "1010102,11",
            "1010103,18",
            "1010104,14",
            "1010104,18",
            "1010105,15",
            "1010105,19",
            "1010106,15",
            "1010106,16",
            ];

         private actionStringMap:{[key:string]:string} = {
            [ActionType.STAND] :"站立",
            [ActionType.RUN] : "跑动",//"run",
            [ActionType.ATTACKED] : "被击",//"attacked",
            [ActionType.ATTACK] : "攻击",//"attack",
            [ActionType.MAGIC] : "法术攻击",//"magic",
            [ActionType.DEFEND] : "防御",//"defend",
            [ActionType.DEATH] : "死亡",//"death",
        }

    }
}