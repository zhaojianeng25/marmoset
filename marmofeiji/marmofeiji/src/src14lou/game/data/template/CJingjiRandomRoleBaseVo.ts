//CJingjiRandomRoleBaseVo

module game.data.template {
    export class CJingjiRandomRoleBaseVo {
        public id: number;//ID
        public nheadid: number;//头像ID
        public njobid: number;//职业
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.nheadid = data.getUint32();
            this.njobid = data.getUint32();

        }
    }
}