module battle.action.operation {
    /**
     * 逃跑效果
     */
    export class Runaway {
        /** 攻击结果 */
        private subresult: game.scene.models.NewSubResultItemVo;
        /** 攻击者*/
        private attacker_id: number;
        /** 当前战场 */
        private battle: Battle;

        constructor(subresult: game.scene.models.NewSubResultItemVo, attacker_id: number, battle: Battle) {
            this.subresult = subresult;
            this.attacker_id = attacker_id;
            this.battle = battle;

        }
        /**
         * 播放逻辑
         */
        public doAction(): BaseAction[] {
            let stage_actions: BaseAction[] = [];
            let stage_action: BaseAction;


            let pSender = this.battle.findRoleByIndex(this.attacker_id);
            if (!pSender) return;


            let pBattlerPet: FightModel;
            if (pSender.fighterType === FighterType.FIGHTER_ROLE) {
                pBattlerPet = this.battle.findRoleByIndex(pSender.index + 5);
            }


            let iTarget = 0;
            if (this.subresult.resultlist.length > 0) {
                iTarget = this.subresult.resultlist[0].targetID;
            }
            // 组装stage
            var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
            stage_data.postype = eMagicPosType.eMagicPos_Static;
            stage_data.actiontype = ActionType.RUN;
            stage_data.phantomid = 0;
            stage_data.delay = 0;
            if (this.subresult.resultlist[0].target_result == 0) //逃跑失败 
            {
                pSender.fakeUnit.toward = 58;
                //人物动作
                stage_action = new battle.aciton.stage.PlayAction(this.battle, this.subresult.resultlist[0], stage_data, pSender, [pSender.fakeUnit]);
                stage_actions.push(stage_action);

                //播放音效
                stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-taopaoshibai.ogg");
                stage_actions.push(stage_action);
                Laya.timer.once(1800,this,()=>{ pSender.fakeUnit.toward = -155; })
                /** 逃跑失败弹出提示框 */
                if (pSender.is_self_role || (pBattlerPet && pBattlerPet.is_pet)) {
                    stage_action = new battle.aciton.stage.MessageTip(this.battle, 144760);
                    stage_actions.push(stage_action);
                }
            }
            else  //逃跑成功
            {
                //动作的集合
                stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pSender, [pSender.fakeUnit], pSender.fakeUnit.GetPosY(), pSender.fakeUnit.GetPosX());
                stage_actions.push(stage_action);

                stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-taopaochenggong.ogg");
                stage_actions.push(stage_action);
                if (pBattlerPet && pBattlerPet.is_pet) {

                    stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pBattlerPet, [pBattlerPet.fakeUnit], pBattlerPet.fakeUnit.GetPosY(), pBattlerPet.fakeUnit.GetPosX());
                    stage_actions.push(stage_action);
                }

            }

            // for (var _index = 0; _index < this.subresult.resultlist.length; _index++) {
                // stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[0], this.attacker_id);
                // stage_actions.push(stage_action);

            // }
            return stage_actions;

        }
    }
}
