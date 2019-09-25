/**
* 模板扩展 
*/
module game.data {
	export class TemplateExpan {

		constructor() {

		}

		public static init(): void {

		}

		/**
		 * 根据系统类型获取系统名字
		 * @param sys_type 
		 */
		public static getSysNameBySysType(sys_type: number): string {
			if (!Template.data) return "";
			let datas: any[] = Template.data["tb_open_panel"];
			if (datas && datas.length) {
				let len: number = datas.length;
				for (let i: number = 0; i < len; i++) {
					let obj: any = datas[i];
					if (obj && sys_type == obj.sys_type) {
						return obj.name;
					}
				}
			}
			return "";
		}

		/**
		 * 根据系统类型获取窗口配置
		 * @param sys_type 
		 */
		public static getPageConfigBySysType(sys_type: number): string {
			if (!Template.data) return "";
			let datas: any[] = Template.data["tb_open_panel"];
			if (datas && datas.length) {
				let len: number = datas.length;
				for (let i: number = 0; i < len; i++) {
					let obj: any = datas[i];
					if (obj && sys_type == obj.sys_type) {
						return obj.open_panel;
					}
				}
			}
			return "";
		}

		/**
		 * 获取表有效数据的数量
		 * @param tb_name 表名
		 */
		public static getValidLength(tb_name: string): number {
			let len: number = 0;
			let dataArray = Template.data[tb_name];
			if (dataArray && dataArray.length > 0) {
				for (let data of dataArray) {
					if (data)
						len++;
				}
			}
			return len;
		}

		/**
		 * 根据升级类型和等级获取武将升级模板
		 * @param type 对应tb_wujiang_level表的 upgrade_type
		 * @return 武将升级模板
		 */
		public static getWJLevelTemp(type: number): any {
			let dataArray = Template.data['tb_wujiang_level'];
			for (let data of dataArray) {
				if (data.upgrade_type == type) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获取升级花费模板
		 * @param quality 品质 
		 * @param level 等级
		 */
		public static getWJLevelCostTemp(quality: number, level: number): any {
			let dataArray = Template.data['tb_wujiang_levelcost'];
			for (let data of dataArray) {
				if (data.color == quality && data.level == level) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获取最大升级级数
		 * @param quality 品质
		 */
		public static getMaxSJLevel(): number {
			let count = 200;
			return count;
		}

		/**
		 * 根据武将模板ID和突破等级获取突破消耗模板
		 * @param entryID 武将模板ID
		 * @param tpLevel 突破等级
		 */
		public static getWJTPCostTemp(entryID: number, tpLevel: number): any {
			let dataArray = Template.data['tb_wujiang_tupo_cost'];
			for (let data of dataArray) {
				if (data.wj_id == entryID && data.level == tpLevel) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获取突破最大等级
		 * @param entryID 武将ID
		 * @return 最大突破等级
		 */
		public static getMaxTPLevel(entryID: number): number {
			let maxTPLevel = 0;
			let dataArray = Template.data['tb_wujiang_tupo_cost'];
			for (let data of dataArray) {
				if (data.wj_id == entryID) {
					if (data.level > maxTPLevel) {
						maxTPLevel = data.level;
					}
				}
			}
			return maxTPLevel;
		}

		/**
		 * 根据武将模板ID和突破等级获取突破属性模板
		 * @param entryID 武将模板ID
		 * @param tpLevel 突破等级
		 */
		public static getWJTPTemp(entryID: number, tpLevel: number): any {
			let dataArray = Template.data['tb_wujiang_tupo_attr'];
			for (let data of dataArray) {
				if (data && data.wj_entry == entryID && data.level == tpLevel) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 根据武将模板ID获取突破详情
		 * @param entryID 武将ID
		 */
		public static getWJTPTempList(entryID: number): any[] {
			let list = [];
			let dataArray = Template.data['tb_wujiang_tupo_attr'];
			for (let data of dataArray) {
				if (data && data.wj_entry == entryID) {
					list.push(data);
				}
			}
			return list;
		}

		/**
		 * 根据武将ID获取缘分
		 * @param entryID 武将ID
		 */
		public static getWJYuanFenByID(entryID: number): any {
			let dataArray = Template.data['tb_wujiang_yuanfen'];
			for (let data of dataArray) {
				if (data.wj_entry == entryID) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获得装备强化模板
		 * @param quality 品质
		 * @param pos 位置
		 * @param level 强化等级
		 */
		public static getEquipStrengthenTemp(quality: number, pos: number, level: number): any {
			let dataArray = Template.data['tb_equip_streng'];
			for (let data of dataArray) {
				if (data.color == quality && data.pos == pos && data.level == level) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获得装备精炼模板
		 * @param quality 品质
		 * @param pos 位置
		 * @param level 精炼等级
		 */
		public static getEquipJinglianTemp(quality: number, pos: number, level: number): any {
			let dataArray = Template.data['tb_equip_jinglian'];
			for (let data of dataArray) {
				if (data.color == quality && data.pos == pos && data.level == level) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获得装备精炼技能模板
		 * @param quality 品质
		 * @param pos 位置
		 * @param level 精炼等级
		 */
		public static getEquipJinglianSpellTemp(quality: number, pos: number): any {
			let resultArray = [];
			let dataArray = Template.data['tb_equip_jinglian_spell'];
			for (let data of dataArray) {
				if (data.color == quality && data.pos == pos) {
					resultArray.push(data);
				}
			}
			return resultArray;
		}


		/**
		 * 获得宝物强化模板
		 * @param quality 品质
		 * @param pos 位置
		 * @param level 强化等级
		 */
		public static getBaoWuStrengthenTemp(quality: number, pos: number, level: number): any {
			let dataArray = Template.data['tb_baowu_streng'];
			for (let data of dataArray) {
				if (data.color == quality && data.pos == pos && data.level == level) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获得宝物精炼模板
		 * @param quality 品质
		 * @param pos 位置
		 * @param level 精炼等级
		 */
		public static getBaoWuJinglianTemp(quality: number, pos: number, level: number): any {
			let dataArray = Template.data['tb_baowu_jinglian'];
			for (let data of dataArray) {
				if (data.color == quality && data.pos == pos && data.level == level) {
					return data;
				}
			}
			return null;
		}

		/**
		 * 获得宝物精炼技能模板
		 * @param quality 品质
		 * @param pos 位置
		 * @param level 精炼等级
		 */
		public static getBaoWuJinglianSpellTemp(quality: number, pos: number): any {
			let resultArray = [];
			let dataArray = Template.data['tb_baowu_jinglian_spell'];
			for (let data of dataArray) {
				if (data.color == quality && data.pos == pos) {
					resultArray.push(data);
				}
			}
			return resultArray;
		}

		/**
		 * 获取套装属性
		 * @param suitType 
		 * @param count 
		 */
		public static getEquipSuitTemp(suitType: number, count: number): number[] {
			let levelArray = [2, 3, 4];
			let curLevel = 0;
			//获取档位
			for (let i = levelArray.length - 1; i >= 0; i--) {
				let level = levelArray[i];
				if (count >= level) {
					curLevel = level;
					break;
				}
			}
			//获取套装属性
			let dataArray = Template.data['tb_taozhuang'];
			for (let data of dataArray) {
				if (data.tz_id == suitType) {
					switch (curLevel) {
						case 2:
							return data.two_attr;//2件套
						case 3:
							return data.three_attr;//3件套
						case 4:
							return data.four_attr;//4件套
					}
				}
			}
			return null;
		}

		/**
		 * 获取装备强化大师模板
		 * @param minLevel 全身最小强化等级
		 */
		public static getEquipStrengthenMasterTemp(minLevel: number): any {
			let dataArray = Template.data['tb_equip_streng_master'];
			for (let i = dataArray.length - 1; i >= 0; i--) {
				let data = dataArray[i];
				logd(minLevel + "     " + data.need_min_lv)
				if (minLevel >= data.need_min_lv) 
					return data;
			}
			return null;
		}

		/**
		 * 获取装备精炼大师模板
		 * @param minLevel 全身最小精炼等级
		 */
		public static getEquipJingLianMasterTemp(minLevel: number): any {
			let dataArray = Template.data['tb_equip_jinglian_master'];
			for (let i = dataArray.length - 1; i >= 0; i--) {
				let data = dataArray[i];
				if (minLevel >= data.need_min_lv)
					return data;
			}
			return null;
		}


		/**
		 * 获取宝物强化大师模板
		 * @param minLevel 全身最小强化等级
		 */
		public static getBaoWuStrengthenMasterTemp(minLevel: number): any {
			let dataArray = Template.data['tb_baowu_streng_master'];
			for (let i = dataArray.length - 1; i >= 0; i--) {
				let data = dataArray[i];
				if (minLevel >= data.need_min_lv)
					return data;
			}
			return null;
		}

		/**
		 * 获取宝物精炼大师模板
		 * @param minLevel 全身最小精炼等级
		 */
		public static getBaoWuJingLianMasterTemp(minLevel: number): any {
			let dataArray = Template.data['tb_baowu_jinglian_master'];
			for (let i = dataArray.length - 1; i >= 0; i--) {
				let data = dataArray[i];
				if (minLevel >= data.need_min_lv)
					return data;
			}
			return null;
		}

	}
}