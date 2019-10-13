/**
 * 角色id
 */
enum RoleType {
	/** 人男 */
	RENNAN = 1,
	/** 人女 */
	RENNV = 2,
	/** 仙男 */
	XIANNAN = 3,
	/** 仙女 */
	XIANNV = 4,
	/** 魔男 */
	MONAN = 5,
	/** 魔女 */
	MONV = 6
};
/**
 * 角色性别
 */
enum RoleSex {
	/** 男 */
	MAN = 1,
	/** 女 */
	WOMAN = 2
};
/**
 * 创建角色判断类型
 */
enum CreateErrCode {
	/** 成功 */
	CREATE_OK = 1,
	/** 失败 */
	CREATE_ERROR = 2,
	/** 名称不合法 */
	CREATE_INVALID = 3,
	/** 重名 */
	CREATE_DUPLICATED = 4,
	/** 创建的新角色数量过多 */
	CREATE_OVERCOUNT = 5,
	/** 角色名过长 */
	CREATE_OVERLEN = 6,
	/** 角色名过短 */
	CREATE_SHORTLEN = 7,
	/** GM禁止 */
	CREATE_CREATE_GM_FORBID = 8
};
/**
 * 大区类型
 */
enum ServerAarea {
	/** 推荐区 */
	RECOMMEND = 1,
	/** 普通区 */
	ORDINARY = 2,
	/** 最近登录的区 */
	RECENT = 3
};
/**
 * 服务器状态
 */
enum ServerState {
	/** 繁忙 */
	BUSY = 1,
	/** 良好 */
	GOOD = 2,
	/** 极佳 */
	EXCELLENT = 3,
	/** 维护 */
	MAINTAIN = 4
}
/** 
 * 连接服务器状态
 */
enum LinkState {
	/** 连接上 */
	OPEN = 0,
	/** 关闭了连接 */
	CLOSE = 2,
	/** 连接出错了 */
	ERROR = 3
}

/**
* name 
*/
module game.modules.createrole.models {
	export class LoginModel {
		//public userId:string;
		/** 存放当前登陆的账号 */
		public userLoginAccount: string;
		/** 存放当前登陆的所要用到的密码 */
		public userLoginPassword: string;
		/**  */
		public roleInfo: RoleInfoVo;
		/** 存放角色的详细信息 */
		public roleDetail: RoleDetailVo;
		/** 存放各种职业信息数据 */
		public schoolInfo: Object = {};
		/** 存放各种NPC的模型信息数据 */
		public cnpcShapeInfo: Object = {};
		/** 存放角色创建所需要的数据 */
		public createRoleConfigBinDic: Object = {};
		/** 服务器：刷新所有等级 */
		public SSendInbornsData: Laya.Dictionary;
		/** 存放某个页面，多用于几个页面之间的切换 */
		public CommonPage: string = "";
		/** 服务器给的随机角色名字 */
		public sGiveName: string;
		/** 服务器界面的配置 */
		public ServerConfig: Object = {};
		/** 当前玩家所选择的服务器 */
		public currServer: ServerVo = new ServerVo();
		/** 人物3d模型 */
		public role3dModel: any;
		/** 存放UI，给人物模型坐标的设置做参照物 */
		public referUI: any;
		/** 用于判断登陆界面是否改变过 */
		public isAccountChanged: boolean = false;
		/** 用于判断当前是重连的登陆请求还是正常的登陆请求 */
		public isBreakLink: boolean = false;
		/** 中转页面 */
		public transferInterface: string = "";
		/** 登陆后判断主界面加载进度条是否结束 */
		public isMainInit: boolean = false;
		/** 拍卖行成功上架七天是否显示 时间*/
		public isAuctionTime: string = "";
		/** 连接服务端的状态 */
		public linkServerState:number = LinkState.CLOSE;

		constructor() {
			LoginModel._instance = this;
			//LoginProxy.getInstance().;
			//LoginProxy._instance
			this.SSendInbornsData = new Laya.Dictionary();
		}
		private static _instance: LoginModel;
		public static getInstance(): LoginModel {
			if (!this._instance) {
				this._instance = new LoginModel();
			}
			return this._instance;
		}
		public static clearModelData(): void {
			createrole.models.LoginModel._instance.userLoginAccount = "";
			createrole.models.LoginModel._instance.userLoginPassword = "";
			createrole.models.LoginModel._instance.roleInfo = new models.RoleInfoVo();
			createrole.models.LoginModel._instance.roleDetail = new models.RoleDetailVo();
			createrole.models.LoginModel._instance.SSendInbornsData = new Laya.Dictionary();
			createrole.models.LoginModel._instance.CommonPage = "";
			createrole.models.LoginModel._instance.sGiveName = "";
			createrole.models.LoginModel._instance.currServer = new models.ServerVo();
			createrole.models.LoginModel._instance.isAccountChanged = false;
			createrole.models.LoginModel._instance.isBreakLink = false;
			createrole.models.LoginModel._instance.transferInterface = "";
			createrole.models.LoginModel._instance.isMainInit = false;
			createrole.models.LoginModel._instance.isAuctionTime = "";
			createrole.models.LoginModel._instance.linkServerState = LinkState.CLOSE;
		}
		/** 获取动作时间 */
		static getActionTime(roleType:number,action:string):number
		{
			switch (roleType) {
				case RoleType.RENNAN: //人男
					if(action == "jump_01") return (42/30*1000);
					else if(action == "jump_02" ) return (46/30*1000);
					else if(action == "rest_01" ) return (169/30*1000);
					else if(action == "rest_02" ) return (125/30*1000);
					else if(action == "rest_03" ) return (127/30*1000);
					else if(action == "stand" ) return (40/30*1000);
					else if(action == "stand_02" ) return (40/30*1000);
					break;
				case RoleType.RENNV:  //人女
					if(action == "jump_01") return (45/30*1000);
					else if(action == "jump_02" ) return (35/30*1000);
					else if(action == "rest_01" ) return (106/30*1000);
					else if(action == "rest_02" ) return (130/30*1000);
					else if(action == "rest_03" ) return (130/30*1000);
					else if(action == "stand" ) return (40/30*1000);
					else if(action == "stand_02" ) return (40/30*1000);
					break;
				case RoleType.XIANNAN:
					if(action == "jump_01") return (46/30*1000);
					else if(action == "jump_02" ) return (35/30*1000);
					else if(action == "rest_01" ) return (114/30*1000);
					else if(action == "rest_02" ) return (170/30*1000);
					else if(action == "rest_03" ) return (114/30*1000);
					else if(action == "stand" ) return (40/30*1000);
					else if(action == "stand_02" ) return (40/30*1000);
					break;
				case RoleType.XIANNV:
					if(action == "jump_01") return (50/30*1000);
					else if(action == "jump_02" ) return (40/30*1000);
					else if(action == "rest_01" ) return (162/30*1000);
					else if(action == "rest_02" ) return (141/30*1000);
					else if(action == "rest_03" ) return (144/30*1000);
					else if(action == "stand" ) return (40/30*1000);
					else if(action == "stand_02" ) return (40/30*1000);
					break;
				case RoleType.MONAN:
					if(action == "jump_01") return (30/30*1000);
					else if(action == "jump_02" ) return (26/30*1000);
					else if(action == "rest_01" ) return (125/30*1000);
					else if(action == "rest_02" ) return (149/30*1000);
					else if(action == "rest_03" ) return (166/30*1000);
					else if(action == "stand" ) return (40/30*1000);
					else if(action == "stand_02" ) return (40/30*1000);
					break;
				case RoleType.MONV:
					if(action == "jump_01") return (32/30*1000);
					else if(action == "jump_02" ) return (34/30*1000);
					else if(action == "rest_01" ) return (133/30*1000);
					else if(action == "rest_02" ) return (136/30*1000);
					else if(action == "rest_03" ) return (130/30*1000);
					else if(action == "stand" ) return (40/30*1000);
					else if(action == "stand_02" ) return (40/30*1000);
					break;
			
				default:
					break;
			}
		}

		/** 获取职业武器 */
		static getweapon(roleType:number,weapon:string):number
		{
			switch (roleType) {
				case RoleType.RENNAN:
					if(weapon == "weapon_dao" ) return 5001008;//5001001 5001010
					else if( weapon == "weapon_qian") return 5008010;//5008001  5008010
					else if( weapon == "weapon_bi") return 5000003;//5000001 5000010
					break;
				case RoleType.RENNV:
					if(weapon == "weapon_jian" ) return 5005010;//5005001 5005010
					else if( weapon == "weapon_qin") return 5004005;//5003001 5004010
					else if( weapon == "weapon_kuilei") return 5003010;
					break;
				case RoleType.XIANNAN:
					if(weapon == "weapon_fu" ) return 5006006;//5006001 5006010
					else if( weapon == "weapon_bi") return 5000007;
					else if( weapon == "weapon_qian") return 5008010;
					break;
				case RoleType.XIANNV:
					if(weapon == "weapon_shanzi" ) return 5007006;//5007001 5007010
					else if( weapon == "weapon_qin") return 5004009;//
					else if( weapon == "weapon_fazhan") return 5002002;
					break;
				case RoleType.MONAN:
					if(weapon == "weapon_jian" ) return 5005007;
					else if( weapon == "weapon_fu") return 5006005;
					else if( weapon == "weapon_kuilei") return 5003010;
					break;
				case RoleType.MONV:
					if(weapon == "weapon_fazhan" ) return 5002010;
					else if( weapon == "weapon_shanzi") return 5007010;
					else if( weapon == "weapon_dao") return 5001010;
					break;
			
				default:
					break;
			}
		}
		/** 获取职业武器名称孔 */
		static getweaponName(roleType:number):Array<string>
		{
			
			switch (roleType) {
				// case RoleType.RENNAN:
				// return ["weapon_dao","weapon_qian","weapon_bi"]
				// case RoleType.RENNV:
				// return ["weapon_jian","weapon_qin","weapon_kuilei"]
				// case RoleType.XIANNAN:
				// return ["weapon_qian","weapon_bi","weapon_fu"]
				// case RoleType.XIANNV:
				// return ["weapon_shanzi","weapon_fazhan","weapon_qin"]
				// case RoleType.MONAN:
				// return ["weapon_kuilei","weapon_jian","weapon_fu"]
				// case RoleType.MONV:
				// return ["weapon_fazhan","weapon_shanzi","weapon_qin"]
				case RoleType.RENNAN:
				return ["weapon_dao","weapon_qian","weapon_bi"]
				case RoleType.RENNV:
				return ["weapon_jian","weapon_kuilei","weapon_qin"]
				case RoleType.XIANNAN:
				return ["weapon_bi","weapon_fu","weapon_qian"]
				case RoleType.XIANNV:
				return ["weapon_fazhan","weapon_qin","weapon_shanzi"]
				case RoleType.MONAN:
				return ["weapon_jian","weapon_kuilei","weapon_fu"]
				case RoleType.MONV:
				return ["weapon_dao","weapon_fazhan","weapon_shanzi"]
				default:
					return [];
			}
		}
		/** 根据职业和性别获取不同的武器 */
		static getweaponBySchool(school:number,sex:number):string
		{
			switch (school) {
				case zhiye.yunxiao:
					if( sex == RoleSex.MAN ) return "weapon_dao";
					else if( sex == RoleSex.WOMAN) return "weapon_jian"
				case zhiye.dahuang:
					if( sex == RoleSex.MAN ) return "weapon_qian";
					else if( sex == RoleSex.WOMAN) return "weapon_qin"
				case zhiye.cangyu:
					if( sex == RoleSex.MAN ) return "weapon_qian";
					else if( sex == RoleSex.WOMAN ) return "weapon_shanzi";
				case zhiye.feixue:
					if( sex == RoleSex.MAN ) return "weapon_bi";
					else if( sex == RoleSex.WOMAN ) return "weapon_fazhan";
				case zhiye.tianlei:
					if( sex == RoleSex.MAN ) return "weapon_kuilei";
					else if( sex == RoleSex.WOMAN ) return "weapon_fazhan";
				case zhiye.wuliang:
					if( sex == RoleSex.MAN ) return "weapon_jian";
					else if( sex == RoleSex.WOMAN ) return "weapon_shanzi";
				case zhiye.xuanming:
					if( sex == RoleSex.MAN ) return "weapon_bi";
					else if( sex == RoleSex.WOMAN ) return "weapon_kuilei";
				case zhiye.qixing:
					if( sex == RoleSex.MAN ) return "weapon_fu";
					else if( sex == RoleSex.WOMAN ) return "weapon_qin";
				case zhiye.danyang:
					if( sex == RoleSex.MAN ) return "weapon_fu";
					else if( sex == RoleSex.WOMAN ) return "weapon_qin";
				default:
					return "";
			}
		}
	}
}