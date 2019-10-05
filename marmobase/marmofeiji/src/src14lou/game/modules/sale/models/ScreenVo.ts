/*
* 拍卖品质筛选
*/
module game.modules.sale.models {
    export class ScreenVo {
        /**种类名字或者等级 */
        public name: string;
        /** 白色品质名，用于默认显示 */
        public typeName: string;
        /**三级菜单序号id */
        public id: number;
        /**一级菜单页签类型 */
        public firstno: number;
        /**二级菜单页签类型 */
        public twono: number;
        /**二级菜单页签类型 */
        public threeno: Array<number>;
        /**物品类型 */
        public itemtype: number;
        /**子类型*/
        public subType: number;
        /**等级 */
        public level: number;
        /**条件下限 */
        public limitmin: number = 0;
        /**条件上限 */
        public limitmax: number = 0;
        /**当前页 */
        public currpage: number = 1;
        /**价格排序 1升序  2降序*/
        public priceSort: number = 1;
        /**0筛选 1搜索 */
        public issearch: number = 0;
        /**区间的等级名字*/
        public valuerange: Array<number>;

        constructor() {

        }
    }
}