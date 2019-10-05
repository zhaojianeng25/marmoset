//CNPCConfigBaseVo
module game.data.template {
    export class CNPCConfigBaseVo {
        public id: number;//编号
        public bodytype: number;//大小比例
        public npctype: number;//npctype
        public modelID: number;//modelID
        public name: string;//名称
        public minimapquery: string;//小地图查询
        public minimapshow: string;//小地图显示
        public foottitle: string;//脚下称谓
        public headtitle: string;//头顶特效
        public title: string;//脚下称谓策划看
        public chitchatidlist: Array<number> = [];//chitchat1,chitchat2,chitchat3,chitchat4,chitchat5
        public area1colour: number;//area1colour
        public area2colour: number;//area2colour
        public mapid: number;//所在地图的id
        public xPos: number;//所在地图的x坐标
        public yPos: number;//所在地图的y坐标
        public hide: number;//是否任务隐藏
        public voices: Array<string> = [];//声音1,声音2,声音3,声音4
        public ndir: number;//朝向
        public nstate: number;//状态
        public time: number;//时间
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            // this.bodytype = data.getUint32();
            this.bodytype = data.getFloat64();
            this.npctype = data.getUint32();
            this.modelID = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.minimapquery = data.getUTFBytes(data.getUint32());
            this.minimapshow = data.getUTFBytes(data.getUint32());
            this.foottitle = data.getUTFBytes(data.getUint32());
            this.headtitle = data.getUTFBytes(data.getUint32());
            this.title = data.getUTFBytes(data.getUint32());

            let listCount: number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.chitchatidlist.push(data.getUint32());
            }
            this.area1colour = data.getUint32();
            this.area2colour = data.getUint32();
            this.mapid = data.getUint32();
            this.xPos = data.getUint32();
            this.yPos = data.getUint32();
            this.hide = data.getUint32();

            // let length: number = data.getUint32();
            listCount = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.voices.push(data.getUTFBytes(data.getUint32()));
            }
            this.ndir = data.getUint32();
            this.nstate = data.getUint32();
            this.time = data.getUint32();
        }
    }

}