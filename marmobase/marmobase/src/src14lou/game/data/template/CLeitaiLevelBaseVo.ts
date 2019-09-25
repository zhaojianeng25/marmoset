//CLeitaiLevelBaseVo

module game.data.template {
    export class CLeitaiLevelBaseVo {
        public id: number;//ID
        public levelmin: number;//等级下限
        public levelmax: number;//等级上限
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.levelmin = data.getUint32();
            this.levelmax = data.getUint32();

        }
    }
}