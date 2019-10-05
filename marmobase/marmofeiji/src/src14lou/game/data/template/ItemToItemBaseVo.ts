/**
* name 
*/
module game.data.template {
    export class ItemToItemBaseVo {
        public id: number; //道具id
        public itemsid: Array<number>; //映射道具id1,映射道具id2,映射道具id3,映射道具id4,映射道具id5,映射道具id6,映射道具id7,映射道具id8,映射道具id9,映射道具id10,映射道具id11,映射道具id12,映射道具id13,映射道具id14,映射道具id15,映射道具id16,映射道具id17,映射道具id18,映射道具id19,映射道具id20,映射道具id21,映射道具id22,映射道具id23,映射道具id24,映射道具id25,映射道具id26,映射道具id27,映射道具id28,映射道具id29,映射道具id30,映射道具id31,映射道具id32,映射道具id33,映射道具id34,映射道具id35,映射道具id36,映射道具id37,映射道具id38,映射道具id39,映射道具id40,映射道具id41,映射道具id42,映射道具id43,映射道具id44,映射道具id45,映射道具id46,映射道具id47,映射道具id48,映射道具id49,映射道具id50
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            let itemsidLength: number = data.getUint32();
            this.itemsid = [];
            for (var index = 0; index < itemsidLength; index++) {
                this.itemsid.push(data.getUint32());
            }
        }
    }
}