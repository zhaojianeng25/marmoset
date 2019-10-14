module battle {
    /**
     * 攻击结束恢复站位
     */
    export class Recover extends BaseAction {
        /** 攻击者*/
        protected attacker:FightModel;
        /** 攻击者残影 */
        protected attacker_units:FakeUnit[];
        onInit(attacker:FightModel, attacker_units:FakeUnit[]):void {
            this.attacker = attacker;
            this.attacker_units = attacker_units;
        }
        onStart():void {
            const p = this.battle.scene.getMapPoint(this.attacker.pos-1, this.attacker.isBottom);
            //console.log("---------------攻击结束恢复站位 ", this.attacker.fakeUnit.name);
            
            this.battle._scene.moveBack(this.attacker.fakeUnit,this.attacker.pos-1, this.attacker.isBottom);
        }

        onDestroy():void{
           // console.log("-------------onDestroy");
            for(let i = this.attacker_units.length-1; i>0; i--){
               let fakeUnit :FakeUnit = this.attacker_units[i];
               this.battle.scene._objMgr.ReleaseObject(fakeUnit);
               this.attacker_units.splice(i,1)
            }
        }
    }
}