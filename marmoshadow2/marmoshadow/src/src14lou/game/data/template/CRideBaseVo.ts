//CRideBaseVo.ts
module game.data.template {
    export class CRideBaseVo {
        public id: number;//坐骑ID
        public ridemodel: number;//坐骑模型
        public speed: number;//坐骑移动速度
        public effectId: number;//坐骑特效
        public effectPosX: number;//坐骑特效坐标X
        public effectPosY: number;//坐骑特效坐标Y
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.ridemodel = data.getUint32();
            this.speed = data.getUint32();
            this.effectId = data.getUint32();
            this.effectPosX = data.getUint32();
            this.effectPosY = data.getUint32();
        }
    }
}