import ChatMessageVo = game.modules.chat.models.ChatMessageVo;
module battle.action.ai {
    export class AiAction extends ActionMgr {
        actionMoment: number;		//-1:攻击者行动前；0：攻击者行动后;1-28：对应ID的战斗者死亡时
        actionFighterId: number;	//做动作的战斗者
        actionId: number;			//需要做的AIAction ID
        onInit(actionMoment: number, actionFighterId: number, actionId: number): void {
            super.onInit();
            this.actionMoment = actionMoment;
            this.actionFighterId = actionFighterId;
            this.actionId = actionId;
            //const GameTable::battle::CBattleAIConfig& BattleAI = GameTable::battle::GetCBattleAIConfigTableInstance().getRecorder(pAction->AIActionID);
        }
        onStart(): void {
            this.dealAiAction();
        }

        protected sendChatMessage(battleAI: BattleAIConfigBaseVo, battler: FightModel, message : string, messagetype : ChannelType): void {
            var chatMessageVo: ChatMessageVo = new ChatMessageVo;
            chatMessageVo.shapeid = battler.shape;
            chatMessageVo.roleid = battler.dataID;
            chatMessageVo.rolename = battler.fighterName;
            chatMessageVo.titleid = battler.titleId;
            chatMessageVo.messagetype =messagetype;
            chatMessageVo.message = message;
            ChatModel._instance.insertChatMessage(chatMessageVo);
        }
        protected dealAiAction(): void {
            var battleAI: BattleAIConfigBaseVo = this.battle.battleProxy.BattleAIConfigData[this.actionId];
            var battler = this.battle.findRoleByIndex(this.actionFighterId);
            if (battleAI.id != -1) {
                //说话信息
                if (battleAI.talkinfo != "" && battler) {
                    var talkstr: string;
                    // 查看是否是富文本
                    if (battleAI.talkinfo.search("<T") > 0) {
                        var stream: string = "<span style='color:#693F00;fontSize:24'>"+battleAI.talkinfo+"</span>";
                        this.battle.showTips(stream);
                    }
                    else {
                        talkstr = battleAI.talkinfo;
                        this.battle.showTips(talkstr);
                        // pAIExecutor -> AddTalk(BattleAI.talkinfo, false);
                    }
                }
                // 聊天频道发消息
                if (battleAI.talkshow != 0 ) 
                    this.sendChatMessage(battleAI,battler, battleAI.talkinfo, ChannelType.CHANNEL_TEAM);
            
                if (battleAI.tipsinfo != "")//提示框信息
                    this.battle.showTips(battleAI.tipsinfo);

                if (battleAI.appearchange != 0 && battler)//换造型
                {
                    battler.shape = battleAI.appearchange;
                    this.battle._scene.removeFakeUint(battler.fakeUnit);
                    this.battle._scene.createFakeUnit(battler);
                }
                // TODO 改变战场地图
                if (battleAI.changeground != 0) {
                    // GetBattleManager() -> ChangeBattleGround(BattleAI.changeground);
                }
                if (battleAI.playsound != 0)
                    this.battle.playBattleGroundMusic(battleAI.playsound);

                if (battleAI.playeffect != "" && battler)
                    this.battle.scene.showFrameEffect(battler.fakeUnit, battleAI.playeffect, []);

                if (battleAI.speak != "" && battler) {
                    var speak: string;
                    var mID = battler.shape;
                    if (1010101 <= mID && mID <= 1010110) {
                        var sexfile: string = battleAI.speak;
                        var sex = mID % 2;
                        // TODO 这段根据性别替换字符
                        if (sex == 1)
                            sexfile = sexfile.replace(".", "m.");
                        else if (sex == 0)
                            sexfile = sexfile.replace(".", "w.");
                        this.battle.PlayAISpeak(sexfile, battler);
                        speak = sexfile;
                    }
                    else {
                        speak = battleAI.speak;
                        this.battle.PlayAISpeak(speak, battler);
                    }
                    if (battleAI.speakshow != 0) {
                        if (battler) {
                            var talkstr: string;
                            if (battleAI.talkinfo.search("<T") > 0)
                                talkstr = "<span style='color:#693F00;fontSize:24'>"+battleAI.talkinfo+"</span>";
                            else
                                talkstr = battleAI.talkinfo;

                            var stime: string = battleAI.speaktime;
                            if (stime == "") stime = "5";
                            // 组装聊天
                            var sinfo:string = "file=\"" + speak + "\" text=\"" + talkstr + "&\" time=" + stime;
    
                            this.sendChatMessage(battleAI,battler, sinfo, battleAI.speakshow);

                            this.sendChatMessage(battleAI,battler, talkstr, battleAI.speakshow);
                        }
                    }
                }
            }
        }
    }
    export class DieAiAction extends AiAction {
        private is_die: boolean;
        onInit(actionMoment: number, actionFighterId: number, actionId: number): void {
            super.onInit(actionMoment, actionFighterId, actionId);
            NotifyMgr.register(NotifyType.FighterDie, this, this.onDieNotify);
        }
        onStart(): void {
        }
        onDestroy(): void {
            NotifyMgr.clean(this);
            super.onDestroy();
        }
        private onDieNotify(id: number): void {
            if (this.is_die) {
                return;
            }
            if (this.actionMoment === id) {
                this.is_die = true;
                this.dealAiAction();
            }
        }
        isEnd(): boolean {
            return this.is_die && super.isEnd();
        }
    }
}