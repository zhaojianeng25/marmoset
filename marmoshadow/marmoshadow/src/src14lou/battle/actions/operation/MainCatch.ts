module battle.action.operation {
    /**
     * 捕捉
     */
    export class MainCatch {
        /** 攻击结果 */
        private subresult: game.scene.models.NewSubResultItemVo;

        /** 攻击者*/
        private attacker_id: number;
        /** 当前战场 */
        private battle: Battle;
        public bCatchOK: boolean = false;
        constructor(subresult: game.scene.models.NewSubResultItemVo, attacker_id: number, battle: Battle) {
            this.subresult = subresult;
            this.attacker_id = attacker_id;
            this.battle = battle;

        }
        /**
         * 播放逻辑
         */
        public doAction(): BaseAction[] {
            var stage_actions: BaseAction[] = [];
            var stage_action: BaseAction;

            let pBattler = this.battle.findRoleByIndex(this.attacker_id);
            if (!pBattler) return stage_actions;

            let bCatchOK = false;
            let iTargetID = 0;
            if (this.subresult.resultlist.length != 1) return stage_actions;
            else {
                iTargetID = this.subresult.resultlist[0].targetID;
                if (this.subresult.resultlist[0].target_result && 2048) //eBattleResult_Seized		= 1<<11,//目标被捕捉
                {
                    bCatchOK = true;
                }
            }
            this.bCatchOK = bCatchOK

            let pTarget = this.battle.findRoleByIndex(iTargetID);
            if (!pTarget) return stage_actions;


            //获取当前捕捉者的坐标 以及获取目标的坐标 
            let LocalPos = new Vector2(pBattler.fakeUnit.GetPosX(), pBattler.fakeUnit.GetPosY())
            let TargetPos = new Vector2(pTarget.fakeUnit.GetPosX(), pTarget.fakeUnit.GetPosY());


            // BuildCatchMove 方法
            let iMoveOffsetX = (TargetPos.x - LocalPos.x) * 1000 / 2000;
            let iMoveOffsetY = (TargetPos.y - LocalPos.y) * 1000 / 2000;

            const attacker_units: FakeUnit[] = [pBattler.fakeUnit];
            const pTarget_units: FakeUnit[] = [pTarget.fakeUnit];


            //获取当前捕捉者的坐标 以及获取目标的坐标 
            // LocalPos = new Vector2()
            let stage_data = this.getSageInfo();
            if (bCatchOK) {//bCatchOK
                //自身位移
                stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pBattler, attacker_units,0,0,false,RunType.MATCH_RUN);
                stage_actions.push(stage_action);
                // this.subresult.resultlist[0].targetID =  pBattler.index;
                let Demoresult = new game.scene.models.NewDemoResultVo();
                Demoresult.targetID = pBattler.index;
                // stage_data.delay = 0;
                // stage_action.setDelayTicks(1200);
                // stage_actions.push(new aciton.DelayPlay(this.battle, 1000));   
                //自身转向返回
                stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pBattler, attacker_units,0,0,false,RunType.MATCH_BACK);
                stage_actions.push(stage_action);
                //目标跟着移动
                stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pTarget, pTarget_units,0,0,false,RunType.MATCH_RUN);
                stage_actions.push(stage_action);
                //复位
                let stage_data1 = this.getSageInfo(); 
                stage_action = new Recover(this.battle, pBattler, attacker_units, stage_data1);
                stage_actions.push(stage_action);
                //弹窗提示捕捉成功
                stage_action = new battle.aciton.stage.MessageTip(this.battle, 141172);
                stage_actions.push(stage_action);
                //增加结果stage
                stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[0]);
                stage_actions.push(stage_action);
                //隐藏模型
                stage_data = this.getSageInfo();
                stage_data.phantomalpha = -1;
                // stage_data.delay = 1500;
                // stage_action.setDelayTicks(1500)
                // stage_actions.push(new aciton.DelayPlay(this.battle, 1500));                
                stage_action = new battle.aciton.stage.HideModel(this.battle, this.subresult.resultlist[0], stage_data, pTarget, attacker_units);
                stage_actions.push(stage_action);

            }
            else //捕捉失败
            {
                //自身位移
                stage_action = new battle.aciton.stage.Move(this.battle, this.subresult.resultlist[0], stage_data, pBattler, attacker_units,0,0,false,RunType.MATCH_RUN);
                stage_actions.push(stage_action);
                // this.subresult.resultlist[0].targetID =  pBattler.index;
                let Demoresult = new game.scene.models.NewDemoResultVo();
                Demoresult.targetID = pBattler.index;
                let pBattlerY = pBattler.fakeUnit.GetPosY();
                let pTargetY = pTarget.fakeUnit.GetPosY();
                let centerY = (pBattlerY + pTargetY) / 2;
                let pBattlerX = pBattler.fakeUnit.GetPosX();
                let pTargetX = pTarget.fakeUnit.GetPosX();
                let centerX = (pBattlerX + pTargetX) / 2;
                //自身转向返回
                stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pBattler, attacker_units,0,0,false,RunType.MATCH_BACK);
                stage_actions.push(stage_action);
                //目标移动=>中心点
                stage_action = new battle.aciton.stage.Move(this.battle, Demoresult, stage_data, pTarget, pTarget_units, centerY, centerX, true,RunType.MATCH_RUN);
                stage_actions.push(stage_action);
                // this.subresult.resultlist[0].targetID =  pTarget.index;
                
                 //目标复位
                stage_action = new Recover(this.battle, pTarget, pTarget_units);
                stage_actions.push(stage_action);
                //自己复位
                stage_actions.push(new aciton.DelayPlay(this.battle, 750));
                let stage_data1 = this.getSageInfo();
                stage_action = new Recover(this.battle, pBattler, attacker_units, stage_data1);
                stage_actions.push(stage_action);
                // //播放攻击动作
                // let stage_data2 = this.getSageInfo();
                // // stage_data2.delay = 800;
                // stage_action.setDelayTicks(800)
                // stage_action = new battle.aciton.stage.PlayAction(this.battle, this.subresult.resultlist[0], stage_data2, pBattler, attacker_units);
                // stage_actions.push(stage_action);
               
                // 播放特效
                // stage_data.effectname = "buzhuoshibai";
                // stage_action = new battle.aciton.stage.TextEffectStage(this.battle);
                // stage_actions.push(stage_action);

                //弹窗提示捕捉成功
                stage_action = new battle.aciton.stage.MessageTip(this.battle, 141173);
                stage_actions.push(stage_action);
                //增加结果stage
                stage_action = new battle.aciton.CResultStage(this.battle, this.subresult.resultlist[0]);
                stage_actions.push(stage_action);
            }
            return stage_actions;
        }
        //组装stage 
        getSageInfo(): StageInfoBaseVo 
        {
            // 组装stage
            var stage_data: StageInfoBaseVo = new StageInfoBaseVo();
            stage_data.postype = eMagicPosType.eMagicPos_Static;
            stage_data.actiontype = ActionType.RUN;
            stage_data.phantomid = 0;
            return stage_data;
        }
    }
}