module battle.aciton {
    /**
     * 回合倒计时
     */
    export class ResultItem extends ActionMgr {
        private data:game.scene.models.NewResultItemVo;
        private isFaShuLianJi: boolean;
        private dieAiActions:action.ai.AiAction[];
        /** 是否是最后一个动作 */
        private isLastAction:boolean;
        onInit(data:game.scene.models.NewResultItemVo, isFaShuLianJi:boolean, dieAiActions:action.ai.AiAction[],isLastAction:boolean = false) {
            super.onInit();
            this.data = data;
            this.isFaShuLianJi = isFaShuLianJi;
            this.dieAiActions = dieAiActions;
            this.isLastAction = isLastAction;
        }
        onStart():void {
            if (this.dieAiActions.length > 0) {
                this.add(...this.dieAiActions);
            }
            const data = this.data;
            const execute = data.demoExecuteVo;
            const list:BaseAction[] = [];
            // 攻击者表现
            list.push(new DemoExecute(this.battle, execute));

            // 受击效果表现
            const subresultlist = data.subresultlist;
            for (let i = 0; i < subresultlist.length; i++) {
                list.push(new SubResultItem(this.battle, subresultlist[i], execute.attackerID, execute.operationType, execute.operationID, execute.msgID, this.isFaShuLianJi, i));
            }
            this.addQueue(...list);

            // 新增战斗单位
            this.addQueue(new NewFighter(this.battle, data.newfighter));

            // 属性变化
            const roleChangedAttrs = data.roleChangedAttrs;
            const roleAttrs:string[] = [];
            for (let m = 0; m < roleChangedAttrs.keys.length; m++) {
                const key = roleChangedAttrs.keys[m];
                this.battle.updateAttr(this.battle.self_role.index, key, roleChangedAttrs.get(key));
                roleAttrs.push(key+":"+roleChangedAttrs.get(key));
            }
            console.log("  roleChangedAttrs:",roleAttrs.join(", "));

            const petChangedAttrs = data.petChangedAttrs;
            const petAttrs:string[] = [];
            for (let m = 0; m < petChangedAttrs.keys.length; m++) {
                const key = petChangedAttrs.keys[m];
                this.battle.updateAttr(this.battle.self_pet.index, key, petChangedAttrs.get(key));
                petAttrs.push(key+":"+petChangedAttrs.get(key));
            }
            console.log("  petChangedAttrs:",petAttrs.join(", "));
        }

        onDestroy():void {
            /** 确保是最后一个动作发送回合完成指令 */
            if (this.isLastAction)
                RequesterProtocols._instance.c2s_CSendRoundPlayEnd([1, 1, 1]);
        }
    }
}