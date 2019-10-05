module game.data.template {
    export class CHeroBaseInfoBaseVo {
        public id: number;//伙伴id
        public name: string;//伙伴名称
        public type: number;//类型
        public acttype: number;//攻击类型
        public school: number;//职业
        public shapeid: number;//造型id
        public headid: number;//头像id
        public skillid: Array<number> =[];//技能1,技能2,技能3,技能4,技能5,技能6,技能7,技能8
        public first_skill: number;//精通技能
        public day7_money: Array<number> =[];//7天花费1,7天花费2
        public day30_money: Array<number>=[];//30天花费1,30天花费2
        public forever_money: Array<number>=[];//永久花费1,永久花费2
        public scalefactor: number;//大小比例

        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());
            this.type = data.getUint32();
            this.acttype = data.getUint32();
            this.school = data.getUint32();
            this.shapeid = data.getUint32();
            this.headid = data.getUint32();
            let listCount: number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.skillid.push(data.getUint32());
            }
            this.first_skill = data.getUint32();

            listCount = data.getUint32();

            for (var index = 0; index < listCount; index++) {
                this.day7_money.push(data.getUint32());
            }
            listCount = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                 this.day30_money.push(data.getUint32());
            }
            listCount = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                 this.forever_money.push(data.getUint32());
            }

            this.scalefactor = data.getFloat64();
        }
    }
}