/**
* 通用枚举转换类
*/
module game.gui.component {
    export class Common {

        /**
         * 获取属性名字
         * @param attrID 属性枚举
         */
        static getAttrName(attrID: number): string {
            switch (attrID) {
                case WujiangField.HP:
                    return "血量";
                case WujiangField.ATK:
                    return "物攻";
                case WujiangField.MAGIC_ATTACK:
                    return "魔攻";
                case WujiangField.DEF:
                    return "物防";
                case WujiangField.MAGIC_DEF:
                    return "魔防";
                case WujiangField.CRIT:
                    return "暴击";
                case WujiangField.CRIT_DEF:
                    return "抗暴击";
                case WujiangField.HIT:
                    return "命中";
                case WujiangField.EVA:
                    return "闪避";
                case WujiangField.DAMGE_BONUS:
                    return "伤害加成";
                case WujiangField.DAMGE_REDUCE:
                    return "伤害减免";
                case WujiangField.FACTION_DAMGE_BONUS:
                    return "阵营伤害加成";
                case WujiangField.FACTION_DAMGE_REDUCE:
                    return "阵营伤害减免";
                case WujiangField.PVP_DAMGE_BONUS:
                    return "PVP伤害加成";
                case WujiangField.PVP_DAMGE_REDUCE:
                    return "PVP伤害减免";
                case WujiangField.MIE_WEI:
                    return "灭魏";
                case WujiangField.KANG_WEI:
                    return "抗魏";
                case WujiangField.MIE_SHU:
                    return "灭蜀";
                case WujiangField.KANG_SHU:
                    return "抗蜀";
                case WujiangField.MIE_WU:
                    return "灭吴";
                case WujiangField.KANG_WU:
                    return "抗吴";
                case WujiangField.MIE_QUN:
                    return "灭群";
                case WujiangField.KANG_QUN:
                    return "抗群";
            }
        }
    }
}