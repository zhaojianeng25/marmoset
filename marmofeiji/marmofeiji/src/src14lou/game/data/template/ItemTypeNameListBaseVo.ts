/**
* name 
*/
module game.data.template {
    export class ItemTypeNameListBaseVo {
        public id: number;
        public itemtypename: string; //名称
        public items: Array<number>; //物品id1,物品id2,物品id3,物品id4,物品id5,物品id6,物品id7,物品id8,物品id9,物品id10,物品id11,物品id12,物品id13,物品id14,物品id15,物品id16,物品id17,物品id18,物品id19,物品id20,物品id21,物品id22,物品id23,物品id24,物品id25,物品id26,物品id27,物品id28,物品id29,物品id30,物品id31,物品id32,物品id33,物品id34,物品id35,物品id36,物品id37,物品id38,物品id39,物品id40,物品id41,物品id42,物品id43,物品id44,物品id45,物品id46,物品id47,物品id48,物品id49,物品id50,物品id51,物品id52,物品id53,物品id54,物品id55,物品id56
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.itemtypename = data.getUTFBytes(data.getUint32());
            let itemsLength: number = data.getUint32();
            this.items = [];
            for (var index = 0; index < itemsLength; index++) {
                this.items.push(data.getUint32());
            }
        }
    }
}