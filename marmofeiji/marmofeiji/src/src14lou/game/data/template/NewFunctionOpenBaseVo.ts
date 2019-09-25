/**
* name 
*/
module game.data.template {
    export class NewFunctionOpenBaseVo {
        public id: number; //ID 
        public functionname: string; //功能 
        public needlevel: number; //等级触发	
        public taskfinish: string; //任务完成触发			
        public icon: string; //图标
        public iseffect: number; //是否播发特效
        public site: number; //位置
        public index: number; //顺序
        public btn: string; //控件名
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this. functionname = data.getUTFBytes(data.getUint32()); 
			this. needlevel = data.getUint32(); 
			this. taskfinish = data.getUTFBytes(data.getUint32());		
			this. icon = data.getUTFBytes(data.getUint32());
			this. iseffect = data.getUint32(); 
			this. site = data.getUint32();
			this. index = data.getUint32();
			this. btn = data.getUTFBytes(data.getUint32());
        }
    }
}