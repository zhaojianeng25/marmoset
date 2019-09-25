/**
* name 
*/
module game.data.template {
    export class PetSkillEffectBaseVo {
        public id: number; //技能id
        public attrs: Array<number>; //影响属性1,影响属性2
        public formulas: Array<string>; //公式1,公式2
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            let attrsLength: number = data.getUint32();
            this.attrs = [];
            for (var index = 0; index < attrsLength; index++) {
                this.attrs.push(data.getUint32());
            }
            let formulasLength: number = data.getUint32();
            this.formulas = [];
            for (var index = 0; index < formulasLength; index++) {
                this.formulas.push(data.getUTFBytes(data.getUint32()));
            }
        }
    }
}