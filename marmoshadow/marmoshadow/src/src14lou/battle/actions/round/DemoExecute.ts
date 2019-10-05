module battle.aciton {
    export class DemoExecute extends ActionMgr {
        private data: game.scene.models.DemoExecuteVo;
        onInit(data: game.scene.models.DemoExecuteVo): void {
            super.onInit();
            this.data = data;
        }
        onStart(): void {

            if (this.data.attackerID != 0) {
                // 攻击者
                const attacker = this.battle.findRoleByIndex(this.data.attackerID);
                if( !attacker ) return;
                // 攻击者属性变化
                // attacker.changeHp(this.data.hpconsume);
                 // 更新hp
                 if( this.data.hpconsume != 0)
                this.battle.page.updateHp(attacker, this.data.hpconsume, 1, false);
                // attacker.changeMp(this.data.mpconsume);
                // 更新mp
                if( this.data.mpconsume != 0)
                this.battle.page.updateMp(attacker, this.data.mpconsume);
                // attacker.changeSp(this.data.spconsume);
                //更新sp
                // this.battle.page.updateSp(attacker, this.data.spconsume);
            }

            //当不为0时，为动作时的提示ID 在stage中处理 为了保证播放时机
            // if (this.data.msgID > 0)
            //     this.battle.showTips(this.data.msgID);
            
            // buf处理
            for (let i = 0; i < this.data.demobuffs.length; i++) {
                const buff = this.data.demobuffs[i];
                this.battle.updateBuff(buff.fighterid,buff.buffid,buff.round);
            }
            //  console.log("---DemoExecute-----attackerID = ",this.data.attackerID," msgID = ",this.data.msgID," operationType = ",this.data.operationType," operationID = ",this.data.operationID);

            // 指令操作失败
            if (this.data.operationType == OperationType.ACTION_FAILURE || this.data.operationType == OperationType.ACTION_FAILURE_NO_WONDER) {
                console.log("---指令操作失败 DemoExecute-----attackerID = ", this.data.attackerID, " operationType = ", this.data.operationType, " operationID = ", this.data.operationID);
            }
        }
    }
}