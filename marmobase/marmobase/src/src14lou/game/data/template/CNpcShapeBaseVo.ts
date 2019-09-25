module game.data.template {
    export class CNpcShapeBaseVo {
        public id: number;//造型id
        public shape: string;//造型
        public roleimage: string;//全身像
        public headID: number;//半身像id
        public littleheadID: number;//小头像id
        public mapheadID: number;//小地图头像
        public name: string;//描述
        public dir: number;//几个方向
        public hitmove: number;//是否进行位移
        public shadow: number;//影子尺寸
        public attack: string;//攻击音效
        public magic: string;//施法音效
        public nearorfar: number;//是否远程
        public shadertype: number;//是否染色
        public part0: Array<number> =[];//部件1
        public part1: Array<number> =[];//部件2
        public part2: Array<number> =[];//部件3
        public showWeaponId: number;//显示武器ID
        public showHorseShape: number;//显示坐骑ID



        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.shape = data.getUTFBytes(data.getUint32());
            this.roleimage = data.getUTFBytes(data.getUint32());
            this.headID = data.getUint32();
            this.littleheadID = data.getUint32();
            this.mapheadID = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.dir = data.getUint32();
            this.hitmove = data.getUint32();
            this.shadow = data.getUint32();
            this.attack = data.getUTFBytes(data.getUint32());
            this.magic = data.getUTFBytes(data.getUint32());
            this.nearorfar = data.getUint32();//是否yuanc
            this.shadertype = data.getUint32();//是否
            let listCount: number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.part0.push(data.getUint32());
            }

            listCount = data.getUint32();

            for (var index = 0; index < listCount; index++) {
                this.part1.push(data.getUint32());
            }
            listCount = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                 this.part2.push(data.getUint32());
            }
            this.showWeaponId = data.getUint32();
            this.showHorseShape = data.getUint32();
        }
    }
}