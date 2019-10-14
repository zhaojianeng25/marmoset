//////////////////////////////////////////////////////////////////////////////
//////////////////////////以下代码为自动生成，请勿手工改动////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
/**
* 模板数据
*/
module game.data{
	export class Template{
		private static _data:Object;

		constructor(){}

		static setData(v:Object){
			Template._data = v;
		}

		static get data():Object{
			return Template._data;
		}

		/**根据id获取某条数据*/
		static getSingeTempDataById(arr:Array<Object>, value:number):Object{
			if(!arr || value <= 0) return null;
			var len:number = arr.length;
			for(var i:number = 0; i < len; i++){
				var obj:Object = arr[i];
				if(!obj) continue;
				if(obj["id"] == value){
					return obj;
				}
			}
			return null;
		}


		/**
		 * tb_buffs根据对应id取数据
		 *	id:int	编号
		 *	name:string	名字
		 *	desc:string	技能描述
		 *	type:int	效果类型
		 *	values:array	效果数值
		 *	round:int	持续回合数
		 *	max_count:int	最高叠加次数
		 *	skin_type:int	特效类型
		 *	skin:string	技能特效
		 *	icon:string	技能图标
		*/
		static getBuffsTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_buffs"],value);
		}

		/**
		 * tb_creature根据对应id取数据
		 *	id:int	编号
		 *	name:string	名字
		 *	avatar:string	武将资源名称
		 *	avatar_high:int	形象高度
		 *	type:int	生物类型
		 *	skills:array	所有技能
		 *	passive:array	被动技能
		*/
		static getCreatureTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_creature"],value);
		}

		/**
		 * tb_map根据对应id取数据
		 *	id:int	编号
		 *	name:string	名字
		 *	map_type:int	地图类型
		 *	instance_type:int	副本类型
		*/
		static getMapTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_map"],value);
		}

		/**
		 * tb_skills根据对应id取数据
		 *	id:int	编号
		 *	name:string	名字
		 *	desc:string	技能描述
		 *	type:int	类型
		 *	is_far:int	是否远程技能
		 *	select:int	目标选择类型
		 *	target:int	目标类别
		 *	hurts:array	技能伤害
		 *	buff_target:array	技能效果
		 *	buff_self:array	触发buff
		 *	cost:int	消耗行动力
		 *	cool:int	冷却回合
		 *	skin_type:int	特效类型
		 *	skin:string	技能特效
		 *	icon:string	技能图标
		 *	follow:array	后续表现技能
		 *	time_beaten:int	受击时间
		*/
		static getSkillsTempById(value:number):Object{
			return Template.getSingeTempDataById(Template.data["tb_skills"],value);
		}

	}
}