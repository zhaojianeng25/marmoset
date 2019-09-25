/**
* 颜色获取工具 
* name: AnswerHom
*/
module game.utils {

    export class ColorU {
        /**类型 */
        public static COLOR_WHITE: string = "#f5f0dc";//白
        public static COLOR_GREEN: string = "#188043";//绿
        public static COLOR_BLUE: string = "#3f6cc9";//蓝
        public static COLOR_PURPLE: string = "#6e229e";//紫
        public static COLOR_ORANGE: string = "#aa3911";//橙
        public static COLOR_RED: string = "#b9181e";//红
        public static COLOR_GOLD: string = "ffe500";//红
        public static COLOR_NORMAL_WORD: string = "#c5a986";//正常描述文字颜色
        public static COLOR_BLACK: string = "#000000";//黑
        public static COLOR_GRAY: string = "#777777";//灰色

        /**
         * 获取颜色数值
         * @param type 字体类型
         * @return RGB颜色数值
         */
        static getColorByType(type: number): string {
            let color;
            switch (type) {
                // case ItemMgr.QUALITY_WHITE:
                //     color = ColorU.COLOR_WHITE;	//白色
                //     break;
                // case ItemMgr.QUALITY_GREEN:
                //     color = ColorU.COLOR_GREEN;	//绿色
                //     break;
                // case ItemMgr.QUALITY_BLUE:
                //     color = ColorU.COLOR_BLUE;	//蓝色
                //     break;
                // case ItemMgr.QUALITY_PURPLE:
                //     color = ColorU.COLOR_PURPLE;	//紫色
                //     break;
                // case ItemMgr.QUALITY_ORANGE:
                //     color = ColorU.COLOR_ORANGE;	//橙色
                //     break;
                // case ItemMgr.QUALITY_RED:
                //     color = ColorU.COLOR_RED;	//红色
                //     break
                // case ItemMgr.QUALITY_GOLD:
                //     color = ColorU.COLOR_GOLD;   //金色
                //     break;
                default:
                    color = ColorU.COLOR_NORMAL_WORD;
            }
            return color;
        }

    }
}