/**
* name 
*/
module game.data.template {
    export class TaskRelativeBaseVo {
        public id: number; //编号 id
        public task: string; //功能说明 
        public bCanSale: number; //可否摆摊上架
        public dbCanSale: number; //点卡服可否摆摊上架
        public readtime: number; //进度条时间
        public readtext: string; //进度条文字
        public usemap: number; //使用地图 
        public ltx: number; //左上X 
        public lty: number; //左上Y 
        public rbx: number; //右下X 
        public rby: number; //右下Y 
        public caiji: number; //是否采集获得 
        public neffectid: number; //显示特效ID 
        public treasure: number; //是否珍品 			
        public nroleeffectid: number; //使用特效ID 
        public neffectposx: number; //显示特效X轴 
        public neffectposy: number; //显示特效Y轴 
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.task = data.getUTFBytes(data.getUint32());
            this.bCanSale = data.getUint32();
            this.dbCanSale = data.getUint32();
            this.readtime = data.getUint32();
            this.readtext = data.getUTFBytes(data.getUint32());
            this.usemap = data.getUint32();
            this.ltx = data.getUint32();
            this.lty = data.getUint32();
            this.rbx = data.getUint32();
            this.rby = data.getUint32();
            this.caiji = data.getUint32();
            this.neffectid = data.getUint32();
            this.treasure = data.getUint32();
            this.nroleeffectid = data.getUint32();
            this.neffectposx = data.getUint32();
            this.neffectposy = data.getUint32();
        }
    }
}