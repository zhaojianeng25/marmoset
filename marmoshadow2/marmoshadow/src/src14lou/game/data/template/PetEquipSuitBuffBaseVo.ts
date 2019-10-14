/**
* name 
*/
module game.data.template {
    export class PetEquipSuitBuffBaseVo {
        public id: number; //品质ID
        public nbuffid: number; //BUFFID
        public npropertyid: number; //属性ID
        public naddvalue: number; //属性数值
        public name: string; //套装名称
        public desc: string; //效果描述
        public item1: number; //部件1
        public item2: number; //部件2
        public item3: number; //部件3
        public item4: number; //部件4
        public prop: string; //套装效果
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.nbuffid = data.getUint32(); 
            this.npropertyid = data.getUint32();
            this.naddvalue = data.getUint32(); 
            this.name = data.getUTFBytes(data.getUint32()); 
            this.desc = data.getUTFBytes(data.getUint32()); 
            this.item1 = data.getUint32(); 
            this.item2 = data.getUint32(); 
            this.item3 = data.getUint32();
            this.item4 = data.getUint32(); 
            this.prop = data.getUTFBytes(data.getUint32());
        }
    }
}