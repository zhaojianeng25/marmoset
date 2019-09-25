module battle.action.operation {
    /**
     * 技能效果
     */
    export class SelectNormalAttack {
        /** 攻击结果 */
        private subresult: game.scene.models.NewSubResultItemVo;
        /** 攻击者*/
        private attacker_id: number;
        /** 当前战场 */
        private battle: Battle;
        /** 提示消息 */
        private msgID: number;

        constructor(subresult: game.scene.models.NewSubResultItemVo, attacker_id: number, battle: Battle, msgID: number) {
            this.subresult = subresult;
            this.attacker_id = attacker_id;
            this.battle = battle;
            this.msgID = msgID;
        }
        /**
         * 播放效果
         */
        public doAction(): BaseAction[] {
            var stage_actions: BaseAction[] = [];
            let stage_action: BaseAction;
            if (this.attacker_id == 0)return;
            const attacker = this.battle.findRoleByIndex(this.attacker_id);
            const attacker_units: FakeUnit[] = [attacker.fakeUnit];
            
            // DemoExecute的消息在stage中处理为了保证播放时机
            if (this.msgID > 0 && (attacker.is_pet || attacker.is_self_role))
                stage_action = new battle.aciton.stage.MessageTip(this.battle, this.msgID);

            //console.log("---------@@@@@@@@@@@@普攻 this.subresult.resultlist", this.subresult.resultlist);
            var iLastResultType = 0;
            // 组装stage
            var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
            stage_data.postype = eMagicPosType.eMagicPos_Static;
            stage_data.actiontype = ActionType.ATTACK;
            stage_data.phantomid = 0;
            for (let i = 0; i < this.subresult.resultlist.length; i++) {
                if (attacker != null && i == 0)
                    this.battle.CheckBuffBeforeOperate(attacker, OperationType.ACTION_ATTACK);

                const result: game.scene.models.NewDemoResultVo = this.subresult.resultlist[i];
                var iProtecter: FightModel = this.battle.findRoleByIndex(result.protecter_id);
                var iResultType: number = result.resultType;
                // 获取攻击者是远程还是近程
                let iShapeID = attacker.shape;
                if( !iShapeID ) return;
                var iNearOrFar: number = LoginModel.getInstance().cnpcShapeInfo[iShapeID].nearorfar;
                var target = this.battle.findRoleByIndex(result.targetID);
                if (target == null && iResultType != 6) continue;
                if (attacker.fighterType == FighterType.FIGHTER_ROLE) {
                    if (!game.modules.bag.models.BagModel._instance._getequipTypeisEquipped(EquipType.ARMS))
                        iNearOrFar = 0;
                }
                
                if (iResultType == 0)//普通
                {
                    if (iNearOrFar == 0)//近程
                    {
                        //攻击者和保护者一起跑到目标
                        stage_action = new battle.aciton.stage.Move(this.battle, result, stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        if (iProtecter){
                            stage_action = new battle.aciton.stage.Move(this.battle, result, stage_data, iProtecter, [iProtecter.fakeUnit]);
                            stage_actions.push(stage_action);
                        }
                        stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        stage_action = new battle.aciton.CResultStage(this.battle, result, this.attacker_id)
                        stage_actions.push(stage_action);
                    }
                    else if (iNearOrFar == 1)//远程
                    {
                        // 播放攻击
                        stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);

                        // 播放音效
                        stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-yc-pg.ogg");
                        //stage_action.setDelayTicks(500);
                        stage_actions.push(stage_action);

                        // 残影1
                        stage_data.phantomid = 0;
                        // 移动
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        if( iProtecter)
                        {
                            stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, iProtecter, [iProtecter.fakeUnit]);
                            stage_actions.push(stage_action);
                        }
                        // 复位
                        stage_action = new Recover(this.battle, attacker, attacker_units);
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);

                        // 增加结果stage
                        stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[i], this.attacker_id)
                        // 增加延迟
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);

                    }
                    // 如果有保护者
                    if (iProtecter) {
                        // 保护者移动到目标
                        stage_action = new Recover(this.battle, iProtecter, [iProtecter.fakeUnit]);
                        stage_actions.push(stage_action);
                    }
                }
                else if (iResultType == 1)//反击
                {
                    // 1、攻击动作 2、动作结果 demoExcute h5翻译调用 BuildNormalAttackAttackAndResult
                    this.BuildNormalAttackAttackAndResult(target, result, stage_actions);
                    // 播放特效
                    // stage_action = new battle.aciton.stage.TextEffectStage(this.battle, "fanji", target);
                    // stage_actions.push(stage_action);

                }
                else if (iResultType == 2)//连击
                {
                    if (iNearOrFar == 0)//近程
                    {
                        if (iProtecter) {
                            // 保护者移动到目标
                            stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, iProtecter, [iProtecter.fakeUnit]);
                            stage_actions.push(stage_action);
                        }
                        // 播放特效
                        stage_action = new battle.aciton.stage.TextEffectStage(this.battle, "wulilianji", attacker);
                        stage_actions.push(stage_action);
                        // 第二次攻击要等受击的人复位再打所以加个延迟
                        stage_actions.push(new aciton.DelayPlay(this.battle, 200));
                        // 1、攻击动作 2、动作结果 demoExcute h5翻译调用 BuildNormalAttackAttackAndResult
                        this.BuildNormalAttackAttackAndResult(attacker, result, stage_actions);
                        
                    }
                    else if (iNearOrFar == 1)//远程
                    {
                        // 攻击动作
                        stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        // 播放音效
                        stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-yc-pg.ogg");
                        //stage_action.setDelayTicks(500);
                        stage_actions.push(stage_action);
                        // 设置残影数
                        stage_data.phantomid = 1;

                        // 攻击者保护者移动到目标
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        if (iProtecter){
                            stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, iProtecter, [iProtecter.fakeUnit]);
                            stage_actions.push(stage_action);
                        }
                        
                        // 增加特效
                        //stage_data.effectname = "lianji";
                        stage_action = new battle.aciton.stage.TextEffectStage(this.battle, "lianji", attacker);
                        stage_actions.push(stage_action);

                        // 攻击者复位
                        stage_action = new Recover(this.battle, attacker, attacker_units);
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);

                        // 增加结果stage
                        stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[i], this.attacker_id);
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);
                    }
                    if (iProtecter) {
                        stage_action = new Recover(this.battle, iProtecter, [iProtecter.fakeUnit]);
                        stage_actions.push(stage_action);
                    }
                }
                else if (iResultType == 3)//追击
                {
                    if (iNearOrFar == 0)//近程
                    {
                        // 攻击者保护者一起跑到目标
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        if( iProtecter )
                        {
                            stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, iProtecter, [iProtecter.fakeUnit]);
                            stage_actions.push(stage_action);
                        }
                        // 攻击动作
                        this.BuildNormalAttackAttackAndResult(attacker, result, stage_actions);
                        stage_action = new battle.aciton.stage.TextEffectStage(this.battle, "zhuiji", attacker);
                        stage_actions.push(stage_action);
                    }
                    else if (iNearOrFar == 1)//远程
                    {
                        // 攻击动作
                        stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        // 增加音效
                        stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-yc-pg.ogg");
                        stage_actions.push(stage_action);
                        // 设定残影
                        stage_data.phantomid = 1;

                        // 攻击者保护者一起跑到目标
                        stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, attacker, attacker_units);
                        stage_actions.push(stage_action);
                        if (iProtecter){
                             stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, iProtecter, [iProtecter.fakeUnit]);
                             stage_actions.push(stage_action);
                        }

                        // 组装特效
                        stage_action = new battle.aciton.stage.TextEffectStage(this.battle, "zhuiji", attacker);
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);
                        // 攻击者复位
                        stage_action = new Recover(this.battle, attacker, attacker_units);
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);
                        // 计算结果
                        stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[i], this.attacker_id);
                        //stage_action.setDelayTicks(730);
                        stage_actions.push(stage_action);
                    }
                    if (iProtecter) {
                        // 保护者复位
                        stage_action = new Recover(this.battle, iProtecter, [iProtecter.fakeUnit]);
                        stage_actions.push(stage_action);
                    }
                }
                else if (iResultType == 4)//溅射
                {
                    if ((iLastResultType == 0 || iLastResultType == 4) && stage_actions) {
                        // 计算结果
                        stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[i], this.attacker_id);
                        // 特效
                        stage_action = new battle.aciton.stage.TextEffectStage(this.battle, "jianshe", attacker);
                        //stage_action.setDelayTicks(500);
                        stage_actions.push(stage_action);
                    }
                }
                else if (iResultType == 6)//去buffer
                {
                    // 计算结果
                    stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[i], this.attacker_id);
                    stage_actions.push(stage_action);
                }
                iLastResultType = iResultType;
                // if (iLastResultType != 0 && iLastResultType != 4) {
                //     // 动作置空？
                //     // pLastNormalAttackParallelStage = NULL;
                //     stage_actions = [];
                // }
            }
            if (iNearOrFar == 0)//近程
            {
                // 判断是否复位
                stage_action = new Recover(this.battle, attacker, attacker_units);
               // stage_action.setDelayTicks(500);
                stage_actions.push(stage_action);
            }
            //console.log("---------@@@@@@@@@@@@普攻 END");
            return stage_actions;
        }

        public BuildNormalAttackAttackAndResult(attacker: FightModel, result: game.scene.models.NewDemoResultVo, stage_actions: BaseAction[]): void {
            let stage_action: BaseAction;
            var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
            stage_data.postype = eMagicPosType.eMagicPos_Static;
            stage_data.actiontype = ActionType.ATTACK;
            stage_data.phantomid = 0;
            let npcShape = game.modules.createrole.models.LoginModel.getInstance().cnpcShapeInfo;
            let attack;
            if(npcShape && npcShape[attacker.shape])
            attack =  npcShape[attacker.shape].attack;
            if (attack) {
                stage_action = new battle.aciton.stage.SoundEffectStage(this.battle, "sounds/skill/mt3-jc-pg.ogg");
                stage_actions.push(stage_action);
            }
            if( attacker )
            {
                const attacker_units: FakeUnit[] = [attacker.fakeUnit];
                stage_action = new battle.aciton.stage.PlayAction(this.battle, result, stage_data, attacker, attacker_units);
                // stage_action.setDelayTicks(700);
                stage_actions.push(stage_action);
            }
            stage_action = new battle.aciton.CResultStage(this.battle, result, this.attacker_id);
            stage_actions.push(stage_action);
        }
    }
}