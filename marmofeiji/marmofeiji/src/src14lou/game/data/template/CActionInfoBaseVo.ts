module game.data.template {
    export class CActionInfoBaseVo {
        public id: number;//编号
        public model: string;//人物模型资源
        public weapon: number;//武器造型编号
        public attack: string;//物理攻击动作名
        public magic: string;//施法攻击动作名
        public attacked: string;//受击动作名
        public dying: string;//死亡过程名
        public death: string;//死亡状态名
        public defence: string;//防御名
        public run: string;//跑动名
        public battlestand: string;//战斗内待机名
        public stand: string;//战斗外待机名
        public ridrun: string;//坐骑飞行动作名
        public ridstand: string;//坐骑待机动作名

        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.model = data.getUTFBytes(data.getUint32());
            this.weapon = data.getUint32();
            this.attack = data.getUTFBytes(data.getUint32());
            this.magic = data.getUTFBytes(data.getUint32());
            this.attacked = data.getUTFBytes(data.getUint32());
            this.dying = data.getUTFBytes(data.getUint32());
            this.death = data.getUTFBytes(data.getUint32());
            this.defence = data.getUTFBytes(data.getUint32());
            this.run = data.getUTFBytes(data.getUint32());
            this.battlestand = data.getUTFBytes(data.getUint32());
            this.stand = data.getUTFBytes(data.getUint32());
            this.ridrun = data.getUTFBytes(data.getUint32());
            this.ridstand = data.getUTFBytes(data.getUint32());
        }
    }
}