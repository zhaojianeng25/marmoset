module game.modules.tianjixianling.models{
    /** 天机仙令任务Vo */
	export class AnYeTaskVo{
        /** 任务栏位 */
        public pos:number;
        /** 任务id */
        public id:number;
        /** 任务类型 */
        public kind:number;
        /** 任务状态 */
        public state:number;
        /** 目的道具的id */
        public dstitemid:number;
        /** 目的道具的数量 */
        public dstitemnum:number;
        /** 目的npc的key */
        public dstnpckey:number;//long型数据
        /** 目的npc的id */
        public dstnpcid:number;
        /** 传说状态(探索的状态) */
        public legend:number;//0不能传说 1可以传说 2已传说 3成功 4失败
        /** 传说持续时间 */
        public legendtime:number;//long型数据
        /** 传说结束时间 */
        public legendend:number;//long型数据

        constructor(){
       }

       public fromByteArray(bytes:ByteArray):void {
           this.pos = bytes.readInt32();
           this.id = bytes.readInt32();
           this.kind = bytes.readInt32();
           this.state = bytes.readInt32();
           this.dstitemid = bytes.readInt32();
           this.dstitemnum = bytes.readInt32();
           this.dstnpckey = bytes.readLong();
           this.dstnpcid = bytes.readInt32();
           this.legend = bytes.readInt32();
           this.legendtime = bytes.readLong();
           this.legendend = bytes.readLong();
       }
    }
}