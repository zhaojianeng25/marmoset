/**
* name 
*/
module game.data.template {
    export class ItemTypeBaseVo {
        public id: number; //编号id
        public name: string; //类型名
        public weapon: string; //武器前缀
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.weapon = data.getUTFBytes(data.getUint32());
        }
    }
}