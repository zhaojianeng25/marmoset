module game.data.template {
    export class CSceneNPCBaseBaseVo {
        public id: number;//编号
        public shapeid: number;//modelID
        public name: string;//名称
        public type: number;//npctype
        public npcappear: string;//开始时间
        public namnpcdisappeare: string;//结束时间
        public scale: number;//大小比例
        public area1colour: number;//area1colour
        public chatidlist: Array<number> = [];//chitchat1,chitchat2,chitchat3
        public mask: number;//遮罩上层
        public transparent: number;//半透明
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.shapeid = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.type = data.getUint32();
            this.npcappear = data.getUTFBytes(data.getUint32());
            this.namnpcdisappeare = data.getUTFBytes(data.getUint32());
            this.scale = data.getUint32();
            this.area1colour = data.getUint32();

            let listCount: number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.chatidlist.push(data.getUint32());
            }
            this.mask = data.getUint32();
            this.transparent = data.getUint32();
        }
    }
}