
module game.data.template {
    export class CRideItemBaseVo {
        public id: number;//道具ID
        public rideid: number;//坐骑ID

        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.rideid = data.getUint32();

        }
    }
}