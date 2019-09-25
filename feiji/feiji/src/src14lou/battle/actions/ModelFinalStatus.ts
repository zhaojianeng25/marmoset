module battle.aciton {
    /**
     * 回合结束属性变化
     */
    export class ModelFinalStaus extends BaseAction {
        private hps:Laya.Dictionary;
        private mps:Laya.Dictionary;
        onInit(hps:Laya.Dictionary, mps:Laya.Dictionary):void {
			console.log(">>>>> 战斗者血量的最终值", hps);
			console.log(">>>>> 战斗者兰量的最终值", mps);
            this.hps = hps;
            this.mps = mps;
        }
        onStart():void {
            const hp_keys = this.hps.keys;
            for (let index = 0; index < hp_keys.length; index++) {
                const key = hp_keys[index] as number;
                const role = this.battle.findRoleByIndex(key);
                role.hp = this.hps.get(key);
            }

            const mp_keys = this.mps.keys;
            for (let index = 0; index < mp_keys.length; index++) {
                const key = mp_keys[index] as number;
                const role = this.battle.findRoleByIndex(key);
                role.mp = this.hps.get(key);
            }
        }

        onDestroy():void {
            //RequesterProtocols._instance.c2s_CSendRoundPlayEnd([]);
        }
    }
}