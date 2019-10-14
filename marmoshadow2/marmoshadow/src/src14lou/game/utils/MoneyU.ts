/**
 * @describe  钱币处理的工具类
 * @author  LQW
 */

module game.utils {
	export class MoneyU {

		constructor() {

		}

        /**
         * @describe  数字拆分为千分位标识。比如把1000，拆分为1,000
         * @param num  需要拆分的数字，通常是金币数量
         * @return  string
         */
        public static number2Thousands(num: number): string {
            // 正则表达式
            if (typeof(num) != "number") return "number2Thousands error";
            let str: string = num.toString().replace(/(\d)(?=(?:\d{3})+$)/g,'$1,');
            return str;
        }
	}
}