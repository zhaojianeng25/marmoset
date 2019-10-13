/**
* 字典相关处理工具
*/
module game.utils {
    export class DictionaryU {
        /**
         * 属性数组转换成字典
         * @param attrs 数组[key , value]
         */
        static toDict(attrs: number[]): Dictionary {
            let dict = new Dictionary();
            for (let i = 0; i < attrs.length / 2; i++) {
                let key = attrs[2 * i];
                let value = attrs[2 * i + 1];
                dict.set(key, value);
            }
            return dict;
        }

        /**
         * 字典数据累加
         * @param dic 原字典
         * @param addDic 增加的字典
         */
        static add(dic: Dictionary, addDic: Dictionary): void {
            for (let key of addDic.keys) {
                let addValue = addDic.get(key);
                let oldValue = dic.get(key);
                if (!oldValue) {
                    dic.set(key, addValue);
                } else {
                    dic.set(key, oldValue + addValue);
                }
            }
        }

        /**
         * 加百分比累加
         * @param dic 原字典
         * @param addDic 添加的百分比 字典
         */
        static addPct(dic: Dictionary, addDic: Dictionary): void {
            for (let key of addDic.keys) {
                let pct = addDic.get(key);
                let oldValue = dic.get(key);
                if (oldValue) {
                    let newValue = Math.ceil(oldValue * (1 + pct / 10000));
                    dic.set(key, newValue);
                }
            }
        }
    }
}