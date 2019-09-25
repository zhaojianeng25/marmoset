/**
* name 
*/
module game.data.template {
    export class HuanhuaInfoBaseVo {
        public id: number; //幻化角色id
        public name: string; //伙伴名称
        public type: number; //类型
        public shapeid: number; //造型id
        public headid: number; //头像id
        public scalefactor: number; //大小比例 double
        public skillid: Array<number>; //技能1,技能2,技能3,技能4,技能5,特殊技能,特殊技能2,特殊技能3
        public desc: string; //描述
        public itemid: number; //对应道具id
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.type = data.getUint32(); 
            this.shapeid = data.getUint32();
            this.headid = data.getUint32(); 
            this.scalefactor = data.getFloat64();
            let skillidLength: number = data.getUint32();            
            this.skillid = [];
            for (var index = 0; index < skillidLength; index++) {
                this.skillid.push(data.getUint32());
            }
            this.desc = data.getUTFBytes(data.getUint32());
            this.itemid = data.getUint32();
        }
    }
}