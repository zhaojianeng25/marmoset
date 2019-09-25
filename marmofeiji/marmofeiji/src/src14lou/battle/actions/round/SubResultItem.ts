module battle.aciton {
    export class SubResultItem extends ActionMgr {
        /**开始时间 */
        private start_time: number;
        /**指令结果 */
        private subresult: game.scene.models.NewSubResultItemVo;
        /**攻击者 */
        private attacker_id: number;
        /**指令 */
        private operation: OperationType;
        /**操作的值（使用物品时示物品ID，招唤宠物时为宠物） */
        private operstionID: number;
        /**msgID */
        private msgID: number;
        /**法术连击 */
        private isFaShuLianJi: boolean;
        private subIndex: number;
        onInit(subresult: game.scene.models.NewSubResultItemVo, attacker_id: number, operation: OperationType, operationId: number, msgID: number, isFaShuLianJi: boolean, subIndex: number): void {
            super.onInit();
            this.subresult = subresult;
            this.attacker_id = attacker_id;
            this.operation = operation;
            this.operstionID = operationId;
            this.msgID = msgID;
            this.isFaShuLianJi = isFaShuLianJi;
            this.subIndex = subIndex;
        }
        onStart(): void {
          //  console.log("-----------SubResultItem opt=", this.operation, "  attacker_id=", this.attacker_id, "  subresult=", this.subresult);
           
            var stage_actions: BaseAction[] = [];
            var stage_action: BaseAction;
            var attacker: FightModel = this.battle.findRoleByIndex(this.attacker_id);
            var subSkillID = this.subresult.subskillid;
            var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
            if (this.operation == OperationType.ACTION_ATTACK)// 普攻
                stage_actions = new action.operation.SelectNormalAttack(this.subresult, this.attacker_id, this.battle, this.msgID).doAction();
            else if (this.operation == OperationType.ACTION_SKILL || this.operation == OperationType.ACTION_SPECIAL_SKILL || this.operation == OperationType.ACTION_USEITEM)// 技能和使用道具
                stage_actions = new action.operation.SelectSkill(this.subresult, this.attacker_id, this.battle, this.operstionID, this.isFaShuLianJi).doAction();
            else if (this.operation == OperationType.ACTION_SUMMON) {// 召唤
                if (this.subresult.subskillid != 0)// 有技能ID
                    stage_actions = new action.operation.SelectSkill(this.subresult, this.attacker_id, this.battle, this.operstionID, this.isFaShuLianJi).doAction();
                else {
                    stage_data.actiontype = ActionType.MAGIC;
                    stage_data.phantomid = 0;
                    stage_action = new stage.PlayAction(this.battle, this.subresult.resultlist[this.subIndex], stage_data, attacker, [attacker.fakeUnit]);
                }
            } else if (this.operation == OperationType.ACTION_CATHCH) {// 捕捉
                let MainCatch = new action.operation.MainCatch(this.subresult, this.attacker_id, this.battle);
                stage_actions = MainCatch.doAction();
            } else if (this.operation == OperationType.ACTION_ESCAPE) {// 逃跑
                stage_actions = new action.operation.Runaway(this.subresult, this.attacker_id, this.battle).doAction();
            } else if (this.operation == OperationType.ACTION_REST) {// 休息
                if (attacker.is_self_role || attacker.is_pet)
                   stage_action = new battle.aciton.stage.MessageTip(this.battle,150123);
            } else if (this.operation == OperationType.ACTION_SUMMON_INSTANT) {//瞬间召唤
                // var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
                // stage_data.actiontype = ActionType.MAGIC;
                // stage_data.phantomid = 0;
                // stage_action = new stage.PlayAction(this.battle, this.subresult.resultlist[this.subIndex], stage_data, attacker, [attacker.fakeUnit]);
                // stage_actions.push(stage_action);
                stage_action = stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[this.subIndex], this.attacker_id);
                stage_actions.push(stage_action);
            } else if (this.operation == OperationType.ACTION_REPLACE) {// 替换
                //新增战斗单位在resultitem处理了
                // GetBattleMagicControl()->AddNewBattler(false);
                // ParallelSkillStage* pParStage = new ParallelSkillStage(600);
                var battleAI: BattleAIConfigBaseVo = this.battle.battleProxy.BattleAIConfigData[this.operstionID];
                var effectid: number = battleAI.effectid;
                // 新来的人加特效？？
                // ParallelSkillStage* pParStage = new ParallelSkillStage(600);
                // for (unsigned i = 0; i < aScript.listBattler.size(); i++)
                // 	pParStage->AddStage(new CPetSummonStage(aScript.listBattler[i].iBattleID, 100, effectID));
                stage_action = stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[this.subIndex], this.attacker_id);
                stage_actions.push(stage_action);
            } else if (this.operation == OperationType.ACTION_FAILURE || this.operation == OperationType.ACTION_FAILURE_NO_WONDER) {// 操作失败 || 操作失败不带感叹号的
                 stage_action = new battle.aciton.stage.MessageTip(this.battle,this.msgID);
            } else if (this.operation == OperationType.ACTION_ROUNDENDDEMO) {// 战场未结算demo
                // c++这个更新属性，我们在ResultItem就处理了

                // GetBattleManager() ->ProcessRoundEndScript(aScript.listResults[SubSkillIndex].listResults);
                // //处理主角和宠物属性改变
                // if (!aScript.RoleAttribute.empty()) {
                //     std::map<int, int>::iterator it = aScript.RoleAttribute.find(fire::pb::attr::AttrType::SP);
                //     if (it != aScript.RoleAttribute.end()) {
                //         int spchange = aScript.RoleAttribute[fire::pb::attr::AttrType::SP] - GetMainRoleDataAttr(fire::pb::attr::AttrType::SP);
                //         cocos2d::gGetScriptEngine() ->executeGlobalFunctionWithIntegerData("MainRoleData_UpdateSpChange", spchange);
                //         aScript.RoleAttribute.erase(it);
                //     }
                //     CMainRoleDataManager::UpdateMainBattlerAttribute(aScript.RoleAttribute);
                //     aScript.RoleAttribute.clear();
                // }
                // if (!aScript.PetAttribute.empty()) {
                //     CMainRoleDataManager::UpdateMainPetAttribute(aScript.PetAttribute);
                //     aScript.PetAttribute.clear();
                // }
            }
            // 动作增加到队列
            if (stage_actions && stage_actions.length > 0) {
                for (let i = 0; i < stage_actions.length; i++) {
                    const action = stage_actions[i];
                    this.addQueue(action);
                }
            }
        }

        onLogic(delay: number): void {
            if (this.start_time > 0) {
                this.start_time -= delay;
                return;
            }

            super.onLogic(delay);
        }
    }
}