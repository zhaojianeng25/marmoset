module game.data.template {
    export class CNpcServerConfigBaseVo {
        public id: number;//服务编号
        public icon: number;//标示图标
        public servicedescribe: string;//菜单介绍
        public childservice: Array<number> = [];//子服务1,子服务2,子服务3,子服务4,子服务5,子服务6
      
        public severStr: string;//描述
        public webaddress: string;//打开网页
        public nautocommit: number;//是否自动
     
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.icon = data.getUint32();
            this.servicedescribe = data.getUTFBytes(data.getUint32());

            let listCount: number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.childservice.push(data.getUint32());
            }
            this.severStr = data.getUTFBytes(data.getUint32());
            this.webaddress = data.getUTFBytes(data.getUint32());
            this.nautocommit = data.getUint32();
        }
    }

}