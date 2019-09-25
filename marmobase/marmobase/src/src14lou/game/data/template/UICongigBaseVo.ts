/**
* name 
*/
module game.data.template {
    export class UICongigBaseVo {
        public id: number; //ID
        public name: string; //名称
        public layoutname: string; //layout
        public ngongnengid: number; //功能id
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.layoutname = data.getUTFBytes(data.getUint32());
            this.ngongnengid = data.getUint32();
        }
    }
}