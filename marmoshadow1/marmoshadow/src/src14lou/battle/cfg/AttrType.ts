module battle {
    /** 
     * 属性定义 不要擅自在此加名称与ID，如果要加一个新的属性和ID，先与策划商量，以免冲突
    */
    class AttrType {
        static readonly CONS = 10; // 体质
        static readonly IQ = 20; // 智力
        static readonly STR = 30; // 力量
        static readonly ENDU = 40; // 耐力
        static readonly AGI = 50; // 敏捷
        static readonly MAX_HP = 60; // 最大生命上限
        static readonly UP_LIMITED_HP = 70; // 当前生命上限（小于等于最大生命上限）
        static readonly HP = 80; // 当前生命
        static readonly SPIRIT = 90; // 灵力
        static readonly MAX_MP = 90; // 最大法力
        static readonly MP = 100; // 当前法力
        static readonly MAX_SP = 110; // 最大怒气
        static readonly SP = 120; // 怒气
        static readonly ATTACK = 130; // 攻击
        static readonly DEFEND = 140; // 防御
        static readonly MAGIC_ATTACK = 150; // 法术攻击力
        static readonly MAGIC_DEF = 160; // 法术防御力
        static readonly MEDICAL = 170; // 治疗强度
        static readonly SEAL = 180; // 控制命中
        static readonly UNSEAL = 190; // 控制抗性
        static readonly SPEED = 200; // 速度
        static readonly HIT_RATE = 210; // 命中值
        static readonly DODGE_RATE = 220; // 躲避值
        static readonly PHY_CRIT_PCT = 250; // 物理暴击程度（初始为200%,即2倍普通伤害）
        static readonly MAGIC_CRIT_PCT = 280; // 魔法暴击程度（初始为200%）
        static readonly PHY_CRITC_LEVEL = 230; // 物理暴击等级
        static readonly ANTI_PHY_CRITC_LEVEL = 240; // 物理抗性等级
        static readonly MAGIC_CRITC_LEVEL = 260; // 魔法暴击等级
        static readonly ANTI_MAGIC_CRITC_LEVEL = 270; // 魔法抗性等级
        static readonly HEAL_CRIT_LEVEL = 290; // 治疗暴击等级
        static readonly HEAL_CRIT_PCT = 300; // 治疗暴击程度
        static readonly PHFORCE = 450; // 当前体力
        static readonly EXP = 470; // 经验
        static readonly NEXP = 480; // 升级经验
        static readonly RENQI = 610; // 人气值
        static readonly SCHOOLFUND = 850; // 职业贡献度
        static readonly WULI_CHUANTOU = 950; // 物理穿透
        static readonly WULI_DIKANG = 960; // 物理抵抗
        static readonly FASHU_CHUANTOU = 970; // 法术穿透
        static readonly FASHU_DIKANG = 980; // 法术抵抗
        static readonly ZHILIAO_JIASHEN = 990; // 治疗加深
        static readonly EFFECT_POINT = 1010; // 技能效果点
        static readonly TEMP_SP = 1020; // 临时怒气
        static readonly MASTER_REPUTATION = 1080; // 师徒声望
        static readonly PET_XUEMAI_MAX = 1150; // 宠物资质上限
        static readonly PET_LOW_SKILL = 1170; // 宠物低级技能数
        static readonly PET_HIGH_SKILL = 1180; // 宠物高级技能数
        static readonly PET_SUPER_SKILL = 1190; // 宠物超级技能数
        static readonly LEVEL = 1230; // 等级
        static readonly PET_LIFE = 1360; // 宠物寿命
        static readonly ACTIVESTAR = 1380; // 活跃度幸运星
        static readonly POINT = 1400; // 潜能
        static readonly QILIZHI = 1410; // 气力值
        static readonly QILIZHI_LIMIT = 1420; // 气力值上限
        static readonly PET_XUE_MAI_LEVEL = 1430; // 资质星级
        static readonly PET_FIGHT_LEVEL = 1430; // 宠物出战等级
        static readonly PET_ATTACK_APT = 1440; // 宠物攻击资质
        static readonly PET_DEFEND_APT = 1450; // 宠物防御资质
        static readonly PET_PHYFORCE_APT = 1460; // 宠物体力资质
        static readonly PET_MAGIC_APT = 1470; // 宠物法力资质
        static readonly PET_SPEED_APT = 1480; // 宠物速度资质
        static readonly PET_DODGE_APT = 1490; // 宠物躲闪资质
        static readonly PET_GROW_RATE = 1500; // 宠物成长率
        static readonly ENLIMIT = 1520; // 活力上限
        static readonly PFLIMIT = 1530; // 体力上限
        static readonly PET_SCALE = 1810; // 宠物大小 1-4
        static readonly ACTIVENESS = 1820; // 活跃度值
        static readonly ANTI_CRIT_LEVEL = 2090; // 暴击抗性等级
        static readonly KONGZHI_JIACHENG = 2130; // 控制加成
        static readonly KONGZHI_MIANYI = 2140; // 控制免疫
        static readonly ENERGY = 3010; // 当前活力
    }
}