/**
* name 
*/
module game.data.template {
    export class ActivityMapListBaseVo {
        public id: number; //序列
        public levelmin: number; //等级下限		
        public levelmax: number; //等级上限	
        public mapid: number; //地图
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.levelmin = data.getUint32();		
			this.levelmax = data.getUint32();
			this.mapid = data.getUint32();
        }
    }
}