module battle.aciton.stage {
    /**
     * 2 特效播放
     */
    export class PlayEffects extends BaseStageAction {
        private reinit_end: boolean;
        onSubLogic(delay: number): void {
            if (!this.reinit_end) {
                const unit = this.getPhantomUnit();
                if (!unit.userData) {
                    return;
                }
                this.reinit_end = true;
            }
            if (this.is_stage_end) {
                return;
            }
            this.is_stage_end = true;
            var target = this.battle.findRoleByIndex(this.result.targetID);
           // console.log("玩家释放特效:" + this.attacker.fakeUnit.name );

            let data = this.stage_data;
            var effectname = data.effectname;

            if (!effectname || effectname.length === 0) {
                console.log("特效名称为空");
                return;
            }
            var info: any = [];
            info.x = this.stage_data.x;
            info.y = this.stage_data.y;
            info.frameScale = this.stage_data.scale;

           // console.log("------------------effname=", effectname, " type = ", this.stage_data.postype, " pu = ", this.stage_data.phantomid);

            // 判断特效播放时间
            if (data.movetime > 0 && data.actionlimittime > 0)
                info.timeLen = data.actionlimittime;

            const unit = this.getPhantomUnit();
            const postype = this.stage_data.postype;
            switch (postype) {
                case eMagicPosType.eMagicPos_Static: {//静止于人物
                    if (data.youfangxiang) {
                          // 判断方向，设置播放位置
                        if (this.attacker.index > BattleConst.MAX_POS) {
                            info.x = this.stage_data.x0;
                            info.y = this.stage_data.y0;
                            info.frameScale = this.stage_data.scale0;
                        }
                        effectname += this.attacker.isBottom ? 1 : 0;
                    }
                    this.battle.scene.showFrameEffect(unit, effectname, info);
                    break;
                }
                case eMagicPosType.eMagicPos_Friend: {//友方阵型中间
                    const effectIndex = this.battle.findRoleByIndex(1);
                    this.battle.scene.showFrameEffect(effectIndex.fakeUnit, effectname, info);
                    break;
                }
                case eMagicPosType.eMagicPos_Enemy: {//敌方阵型中间
                    const effectIndex = this.battle.findRoleByIndex(15);
                    this.battle.scene.showFrameEffect(effectIndex.fakeUnit, effectname, info);
                    break;
                }
                case eMagicPosType.eMagicPos_ToSelf: {//从目标到自身
                    if (!target) return;
                    if (data.youfangxiang) {
                        // 判断方向，设置播放位置
                        if (target.index > BattleConst.MAX_POS) {
                            info.x = this.stage_data.x0;
                            info.y = this.stage_data.y0;
                            info.frameScale = this.stage_data.scale0;
                        }
                        effectname += target.isBottom ? 1 : 0;
                    }
                    this.battle.scene.showFrameEffect(target.fakeUnit, effectname, info);
                    break;
                }

            }
        }
    }
}