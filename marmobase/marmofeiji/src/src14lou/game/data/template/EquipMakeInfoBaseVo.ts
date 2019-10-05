/**
* name 
*/
module game.data.template {
    export class EquipMakeInfoBaseVo {
        public id: number; //装备ID" /> id
        public nlevel: number; //等级" /> 
        public type: number; //装备分类" /> 
        public tuzhiid: number; //制造图纸ID" />
        public tuzhinum: number; //制造图纸数量" />
        public hantieid: number; //千年寒铁ID" />
        public hantienum: number; //千年寒铁数量" />
        public zhizaofuid: number; //制造符ID" />
        public zhizaofunum: number; //制造符数量" />
        public qianghuaid: number; //强化材料ID" />
        public qianghuanum: number; //强化材料数量" />
        public moneynum: number; //打造金钱消耗" />
        public moneytype: number; //打造消耗金钱类型" />
        public chanchuequipid: number; //强化打造产出装备ID" />
        public vptdazhaoid: Array<number>; //普通打造装备ID1,普通打造装备ID2,普通打造装备ID3,普通打造装备ID4,普通打造装备ID5"/> 普通打造产出装备id
        public vptdazhaorate: Array<number>; //普通打造装备概率1,普通打造装备概率2,普通打造装备概率3,普通打造装备概率4,普通打造装备概率5"/> 普通打造产出装备概率
        public vqhdazhaoid: Array<number>; //强化打造装备ID1,强化打造装备ID2,强化打造装备ID3,强化打造装备ID4,强化打造装备ID5"/> 强化打造产出装备id
        public vqhdazhaorate: Array<number>; //强化打造装备概率1,强化打造装备概率2,强化打造装备概率3,强化打造装备概率4,强化打造装备概率5"/> 强化打造产出装备概率
        public vcailiaotie: Array<number>; //材料铁1,材料铁2,材料铁3,材料铁4,材料铁5,材料铁6,材料铁7,材料铁8,材料铁9,材料铁10,材料铁11,材料铁12,材料铁13,材料铁14,材料铁15"/>
        public vcailiaotienum: Array<number>; //材料铁数量1,材料铁数量2,材料铁数量3,材料铁数量4,材料铁数量5,材料铁数量6,材料铁数量7,材料铁数量8,材料铁数量9,材料铁数量10,材料铁数量11,材料铁数量12,材料铁数量13,材料铁数量14,材料铁数量15"/>
        public vcailiaozhizaofu: Array<number>; //制造符1,制造符2,制造符3,制造符4,制造符5,制造符6,制造符7,制造符8,制造符9,制造符10,制造符11,制造符12,制造符13,制造符14,制造符15"/>
        public vcailiaozhizaofunum: Array<number>; //制造符数量1,制造符数量2,制造符数量3,制造符数量4,制造符数量5,制造符数量6,制造符数量7,制造符数量8,制造符数量9,制造符数量10,制造符数量11,制造符数量12,制造符数量13,制造符数量14,制造符数量15"/>
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.nlevel = data.getUint32();
            this.type = data.getUint32();
            this.tuzhiid = data.getUint32();
            this.tuzhinum = data.getUint32();
            this.hantieid = data.getUint32();
            this.hantienum = data.getUint32();
            this.zhizaofuid = data.getUint32();
            this.zhizaofunum = data.getUint32();
            this.qianghuaid = data.getUint32();
            this.qianghuanum = data.getUint32();
            this.moneynum = data.getUint32();
            this.moneytype = data.getUint32();
            this.chanchuequipid = data.getUint32();
            let vptdazhaoidLength: number = data.getUint32();
            this.vptdazhaoid = [];
            for (var index = 0; index < vptdazhaoidLength; index++) {
                this.vptdazhaoid.push(data.getUint32());
            }
            let vptdazhaorateLength: number = data.getUint32();
            this.vptdazhaorate = [];
            for (var index = 0; index < vptdazhaorateLength; index++) {
                this.vptdazhaorate.push(data.getUint32());
            }
            let vqhdazhaoidLength: number = data.getUint32();
            this.vqhdazhaoid = [];
            for (var index = 0; index < vqhdazhaoidLength; index++) {
                this.vqhdazhaoid.push(data.getUint32());
            }
            let vqhdazhaorateLength: number = data.getUint32();
            this.vqhdazhaorate = [];
            for (var index = 0; index < vqhdazhaorateLength; index++) {
                this.vqhdazhaorate.push(data.getUint32());
            }
            let vcailiaotieLength: number = data.getUint32();
            this.vcailiaotie = [];
            for (var index = 0; index < vcailiaotieLength; index++) {
                this.vcailiaotie.push(data.getUint32());
            }
            let vcailiaotienumLength: number = data.getUint32();
            this.vcailiaotienum = [];
            for (var index = 0; index < vcailiaotienumLength; index++) {
                this.vcailiaotienum.push(data.getUint32());
            }
            let vcailiaozhizaofuLength: number = data.getUint32();
            this.vcailiaozhizaofu = [];
            for (var index = 0; index < vcailiaozhizaofuLength; index++) {
                this.vcailiaozhizaofu.push(data.getUint32());
            }
            let vcailiaozhizaofunumLength: number = data.getUint32();
            this.vcailiaozhizaofunum = [];
            for (var index = 0; index < vcailiaozhizaofunumLength; index++) {
                this.vcailiaozhizaofunum.push(data.getUint32());
            }
        }
    }
}