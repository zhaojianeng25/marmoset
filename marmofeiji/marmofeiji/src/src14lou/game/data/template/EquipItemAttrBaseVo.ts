/**
* name 
*/
module game.data.template {
    export class EquipItemAttrBaseVo {
        public id: number; //编号 id
        public addhpmax: number; //增加最大生命上限
        public addmpmax: number; //增加真气上限
        public addwaigongshuanghai: number; //增加外功伤害
        public addniegongshanghai: number; //增加内功伤害
        public addniegongdefence: number; //增加内功防御
        public addwaigongdefence: number; //增加外功防御
        public addmingzhong: number; //增加命中
        public addduoshan: number; //增加躲闪
        public addspeed: number; //增加速度
        public addfengyin: number; //加强封印
        public fengyinkangxing: number; //封印抗性
        public equipqianzhui: number; //装备前缀
        public appendAttrid: Array<number>; //附加属性1id,附加属性2id,附加属性3id
        public appendAttrValue: Array<number>; //附加属性1值,附加属性2值,附加属性3值
        public roleNeed: Array<number>; //角色需求1,角色需求2
        public saleratio: number; //出售价格系数
        public naijiuratio: number; //耐久度系数
        public cuilianlv: number; //淬炼等级
        public naijiumax: number; //耐久上限
        public ptxlfailrate: number; //装备普通修理失败几率
        public ptxlcailiaoid: number; //装备修理材料ID
        public ptxlcailiaonum: number; //装备修理材料消耗数量
        public commonidlist: Array<number>; //装备修理材料ID1,装备修理材料ID2,装备修理材料ID3,装备修理材料ID4,装备修理材料ID5,装备修理材料ID6,装备修理材料ID7,装备修理材料ID8,装备修理材料ID9,装备修理材料ID10 普通修理材料id列表
        public commonnumlist: Array<number>; //装备修理材料消耗数量1,装备修理材料消耗数量2,装备修理材料消耗数量3,装备修理材料消耗数量4,装备修理材料消耗数量5,装备修理材料消耗数量6,装备修理材料消耗数量7,装备修理材料消耗数量8,装备修理材料消耗数量9,装备修理材料消耗数量10 普通修理材料数量列表
        public tsxlcailiaoid: number; //装备特殊修理材料ID
        public tsxlcailiaonum: number; //装备特殊修理材料消耗数量
        public ptxlmoneynum: number; //装备普通修理消耗金钱
        public ptxlmoneytype: number; //普通修理消耗金钱类型
        public tsxlmoneynum: number; //装备特殊修理消耗金钱
        public tsxlmoneytype: number; //特殊修理消耗金钱类型
        public gemsLevel: number; //可镶嵌最高等级宝石
        public hols: number; //宝石槽数量
        public vgemboxlevel: Array<number>; //槽1开启等级,槽2开启等级,槽3开启等级
        public gems: Array<number>; //宝石1,宝石2,宝石3,宝石4,宝石5,宝石6,宝石7,宝石8,宝石9,宝石10
        public needSex: number; //性别需求 
        public equipcolor: number; //装备颜色 
        public suiting: number; //套装id 
        public skillid: string; //特技id
        public effectid: string; //特效id
        public jianding: number; //是否已鉴定
        public specialAttr: number; //是否生成特殊属性
        public baseAttrId: number; //装备基础属性ID
        public randomAttrId: string; //附加属性随机库ID
        public randomSkillId: number; //特效随机库ID
        public randomEffectId: number; //特技随机库ID
        public vgemtype: Array<number>; //可镶嵌宝石类型1,可镶嵌宝石类型2,可镶嵌宝石类型3,可镶嵌宝石类型4,可镶嵌宝石类型5
        public eequiptype: number; //部件ID
        public treasureScore: number; //珍品评分
        public nautoeffect: number; //是否自动播放特效
        public ncanfenjie: number; //是否有分解按钮
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.addhpmax = data.getUint32();
            this.addmpmax = data.getUint32();
            this.addwaigongshuanghai = data.getUint32();
            this.addniegongshanghai = data.getUint32();
            this.addniegongdefence = data.getUint32();
            this.addwaigongdefence = data.getUint32();
            this.addmingzhong = data.getUint32();
            this.addduoshan = data.getUint32();
            this.addspeed = data.getUint32();
            this.addfengyin = data.getUint32();
            this.fengyinkangxing = data.getUint32();
            this.equipqianzhui = data.getUint32();
            let appendAttridLength: number = data.getUint32();
            this.appendAttrid = [];
            for (var index = 0; index < appendAttridLength; index++) {
                this.appendAttrid.push(data.getUint32());
            }
            let appendAttrValueLength: number = data.getUint32();
            this.appendAttrValue = [];
            for (var index = 0; index < appendAttrValueLength; index++) {
                this.appendAttrValue.push(data.getUint32());
            }
            let roleNeedLength: number = data.getUint32();
            this.roleNeed = [];
            for (var index = 0; index < roleNeedLength; index++) {
                this.roleNeed.push(data.getUint32());
            }
            this.saleratio = data.getUint32();
            this.naijiuratio = data.getUint32();
            this.cuilianlv = data.getUint32();
            this.naijiumax = data.getUint32();
            this.ptxlfailrate = data.getUint32();
            this.ptxlcailiaoid = data.getUint32();
            this.ptxlcailiaonum = data.getUint32();
            let commonidlistLength: number = data.getUint32();
            this.commonidlist = [];
            for (var index = 0; index < commonidlistLength; index++) {
                this.commonidlist.push(data.getUint32());
            }
            let commonnumlistLength: number = data.getUint32();
            this.commonnumlist = [];
            for (var index = 0; index < commonnumlistLength; index++) {
                this.commonnumlist.push(data.getUint32());
            }
            this.tsxlcailiaoid = data.getUint32();
            this.tsxlcailiaonum = data.getUint32();
            this.ptxlmoneynum = data.getUint32();
            this.ptxlmoneytype = data.getUint32();
            this.tsxlmoneynum = data.getUint32();
            this.tsxlmoneytype = data.getUint32();
            this.gemsLevel = data.getUint32();
            this.hols = data.getUint32();
            let vgemboxlevelLength: number = data.getUint32();
            this.vgemboxlevel = [];
            for (var index = 0; index < vgemboxlevelLength; index++) {
                this.vgemboxlevel.push(data.getUint32());
            }
            let gemsLength: number = data.getUint32();
            this.gems = [];
            for (var index = 0; index < gemsLength; index++) {
                this.gems.push(data.getUint32());
            }
            this.needSex = data.getUint32();
            this.equipcolor = data.getUint32();
            this.suiting = data.getUint32();
            this.skillid = data.getUTFBytes(data.getUint32());
            this.effectid = data.getUTFBytes(data.getUint32());
            this.jianding = data.getUint32();
            this.specialAttr = data.getUint32();
            this.baseAttrId = data.getUint32();
            this.randomAttrId = data.getUTFBytes(data.getUint32());
            this.randomSkillId = data.getUint32();
            this.randomEffectId = data.getUint32();
            let vgemtypeLength: number = data.getUint32();
            this.vgemtype = [];
            for (var index = 0; index < vgemtypeLength; index++) {
                this.vgemtype.push(data.getUint32());
            }
            this.eequiptype = data.getUint32();
            this.treasureScore = data.getUint32();
            this.nautoeffect = data.getUint32();
            this.ncanfenjie = data.getUint32();
        }
    }
}