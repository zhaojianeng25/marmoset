/**
* name 
*/
module game.scene{
	export class AvatarData{
		/***********************************************************************************/		
		/*镜像表*/
		public static IMAGE_TABLE:Array<any>;
		public static getImageData(direct:number):Array<any>{
			return AvatarData.IMAGE_TABLE[direct];
		}

		/******************************************************************************* */
		//性别
		public static SEX_NONE:number = 0; 	//预留
		public static SEX_MAN:number = 1; 	//男
		public static SEX_WOMAN:number = 2; //女
		public static SEX_GAY:number = 3; 	//无

		//职业
		public static OCC_NONE:number = 0; 	//预留
		public static OCC_FIRE_MAN:number = 1; //战士
		public static OCC_EGG_MAN:number = 2; //法师
		public static OCC_DOG_MAN:number = 3; //道士

		//数据结构[occ<<4 + (sex&0x0F)]
		private static RACE_TABLE:Array<number> = new Array<number>();

		/**
		 * 获得角色
		 */
		public static getRace(occ:number, sex:number):number{
			var key:number = (occ << 4) + (sex & 0x0F);
			return AvatarData.RACE_TABLE[key];
		}
		private static setRace(occ:number, sex:number, value:number):void{
			var key:number = (occ << 4) + (sex & 0x0F);
			AvatarData.RACE_TABLE[key] = value;
		}
		
		/***********************************************************************************/
		
		/***********************************************************************************/
		//动作状态
		/***********************************************************************************/

		    //  [1] : AvatarData.STATE_STAND,
            // [5] : AvatarData.STATE_RUNNING,//"run",
            // [7] : AvatarData.STATE_BEATEN,//"attacked",
            // [8] : AvatarData.STATE_ATTACKGO,//"attack",
            // [9] : AvatarData.STATE_ATTACKGO2,//"magic",
            // [11] : AvatarData.STATE_DEFENSE,//"defend",
            // [14] : AvatarData.STATE_DIED,//"death",

		public static STATE_STAND		:number = 0x1;		//站立
		public static STATE_WALK		:number = 0x2;		//走动
		public static STATE_RUNNING		:number = 0x3;		//跑动
		public static STATE_LEISURE		:number = 0x4;		//休闲
		public static STATE_GECAO		:number = 0x5;		//打坐
		public static STATE_BEATEN		:number = 0x6;		//受击被打
		public static STATE_DIING		:number = 0x7;		//死亡中
		public static STATE_DIING1		:number = 0x8;		//死亡中
		public static STATE_DIED		:number = 0x9;		//已死亡
		public static STATE_JUMP		:number = 0xA;		//跳开始
		public static STATE_RETREAT		:number = 0xB;		//后撤
		public static STATE_DEFENSE		:number = 0xC;		//防御
		public static STATE_ENTER		:number = 0xD;		//入场
		public static STATE_SPRINT		:number = 0xE;		//冲刺
		public static STATE_ATTACKGO	:number = 0xF;		//物理攻击
		public static STATE_ATTACKGO2	:number = 0x10;		//物理攻击2
		public static STATE_ATTACKGO3	:number = 0x11;		//物理攻击3

		public static STATE_ATTCKREADY	:number = 0x12;		//物理攻击准备
		public static STATE_MACSAVING	:number = 0x13;		//魔法攻击蓄力
		public static STATE_MACGO		:number = 0x14;		//魔法攻击发出
		public static STATE_CRITICALHIT	:number = 0x15;		//暴击发出
		public static STATE_GECAO_2		:number = 0x16;		//(割草测试-非移动)
		public static MAX_STATE			:number = 0x17;		//动作长度
				
		/**
		 * 由于为了节省素材资源，采用5方向，其中3个方向可以用左边的水平翻转来完成，故：方向只有5个。 
		 */		
		public static MAX_DIRECT			:number = 5;	//方向数量		
		public static ACTION_STAND			:number = 0x0;	//站立 
		public static ACTION_RUNNING		:number = 0x1;	//跑动
		public static ACTION_JUMPPING		:number = 0x2;	//跳
		public static ACTION_ATTACKREADY	:number = 0x3;	//攻击准备
		public static ACTION_ATTACKGO		:number = 0x3;	//攻击 
		public static ACTION_ATTACKGO2		:number = 0x4;	//攻击2 
		public static ACTION_ATTACKGO3		:number = 0x5;	//攻击3 (现在整成防御动作)
		public static ACTION_BEATEN			:number = 0x7; 	//被打
		public static ACTION_STAND_RIDE		:number = 0x8;	//站立—骑马
		public static ACTION_RUNNING_RIDE	:number = 0x9;	//跑动-骑马
		public static ACTION_JUMPPING_RIDE	:number = 0xA;	//跳-骑马
		public static ACTION_ATTACKREADY_RIDE:number = 0xB;	//攻击准备-骑马
		public static ACTION_ATTACKGO_RIDE	:number = 0xC;	//攻击-骑马
		public static ACTION_ATTACKGO2_RIDE	:number = 0xD;	//攻击2-骑马
		public static ACTION_ATTACKGO3_RIDE	:number = 0xE;	//攻击3-骑马
		public static ACTION_BEATEN_RIDE	:number = 0xF;	//被打-骑马
		public static ACTION_DIING			:number = 0x10;	//死亡中
		public static ACTION_WALK			:number = 0x11;	//步行
		public static ACTION_LEISURE		:number = 0x12;	//休闲
		public static ACTION_SIT			:number = 0x13;	//打坐
		public static ACTION_GATHER			:number = 0x14;	//采集
		public static MAX_ACTION			:number = 0x15;	//动作长度
		
		/////////////////////// 关于资源分包的问题 ////////////////////////////////
		public static  RES_PACKET:Array<number> = new Array<number>(AvatarData.MAX_ACTION);
		public static  MAX_RES_PACKET:number = 5;
		//1、索引文件——body.idx		
		//2、非坐骑移动状态文件『站立、跑动、跳、休闲』-> 0
		//3、非坐骑战斗状态文件『攻击准备、攻击、攻击2、攻击3、被打』-> 1
		//4、坐骑移动状态文件  『坐骑站立，坐骑跑动，坐骑跳』-> 2
		//5、坐骑战斗状态文件  『坐骑攻击准备，坐骑攻击、坐骑攻击2、坐骑攻击3、坐骑被打』 -> 3
		//6、特殊动作状态文件	  『死亡中、步行、打坐、采集』(NPC刚好没有死亡动作，普通角色刚好没有休闲动作)	-> 4
		public static  RES_PACKET_FIGHT:number = 1;		
		public static  RES_PACKET_MOVE:number = 0;		
		
		/**
		 * 通过动作状态得到动作素材 
		 * @param actionStatus 动作状态，请参见SharedDef里的枚举Action_STATE_X
		 * @return 
		 * 
		 */	
		public static ConvertAction(actionStatus:number, isRiding:Boolean = false):number{
			return isRiding? AvatarData.RIDING_ACTION[actionStatus] : AvatarData.SINGLE_ACTION[actionStatus];
		}

		/**
		 * 通过动作状态得到层级排序 
		 * @param actionStatus 动作状态，请参见SharedDef里的枚举Action_STATE_X
		 * @return 
		 * 
		 */	
		public static ConvertActionSort(actionStatus:number, isRiding:Boolean = false):number{
			return isRiding? AvatarData.RIDING_ACTION_SORT[actionStatus] : AvatarData.SINGLE_ACTION[actionStatus];
		}
		
		
		///////////////////////////// 针数针率表 ////////////////////////////
		/*
			名称：角色5 动作21 参数
			位：  111   11111  111
			最大：7     31     7
			偏移：<<8   <<3     +
			与操：&0x07 &0x1F  &0x07
			2,047长度
		*/
		
		public static  FRAMEINFO_COUNT		:number = 0;		//帧长
		public static  FRAMEINFO_RATE		:number = 1;		//帧速
		public static  FRAMEINFO_LOOP		:number = 2;		//是否循环播放
		public static  FRAMEINFO_MOVESPEED	:number = 3;		//原始动画对应的原始移动速度
		public static  FRAMEINFO_RESERVE1	:number = 4;		//预留参数1
		public static  FRAMEINFO_RESERVE2	:number = 5;		//预留参数2
		public static  FRAMEINFO_EXITS		:number = 6;		//是否存在
		private static  MAX_FRAMEINFO		:number = 7;		//属性长度
		private static  _frameInfo:Array<number> = new Array<number>(2047);
		
		/**
		 * 获得帧信息的起始地址 
		 * @param race 角色id
		 * @param action 动作id
		 * @return 
		 * 
		 */	
		public static GetFrameInfoPos(race:number, action:number):number
		{
			return (race << 8) + (action << 3);
		}
		
		/**
		 * 获取帧数据
		 * @param pos 地址
		 * @return 
		 * 
		 */
		public static GetFrameInfo(pos:number):number
		{
			return AvatarData._frameInfo[pos];
		}
		
		
		public static  RES_PACKET_RIDE_MOVE:number = 2;
		public static  RES_PACKET_RIDE_FIGHT:number = 3;
		public static  RES_PACKET_OTHER:number = 4;
		private static  SINGLE_ACTION:Array<number> = new Array<number>(AvatarData.MAX_STATE);
		/*骑马状态下的动作表*/
		private static  RIDING_ACTION:Array<number> = new Array<number>(AvatarData.MAX_STATE);
		/*骑马状态下的层级排序表*/
		private static  RIDING_ACTION_SORT:Array<number> = new Array<number>(AvatarData.MAX_STATE);
		
		//////////////////////////// 排序相关 //////////////////////////////////////////
		//////////////////////////// 排序相关 //////////////////////////////////////////
		public static  IDX_RIDE			:number = 0;//坐骑
		public static  IDX_MAINHAND		:number = 1;//主手手掌
		public static  IDX_VICEHAND		:number = 2;//副手手掌
		public static  IDX_HAIR			:number = 3;//发型
		public static  IDX_MAINARMS		:number = 4;//主手武器
		public static  IDX_VICEARMS		:number = 5;//副手武器
		public static  IDX_CLOTHES		:number = 6;//衣服	
		public static  IDX_CLOAK		:number = 7;//披风
		public static  IDX_RIDEHAIR		:number = 8;//坐骑头
		public static  IDX_WINGS		:number = 9;//翅膀
		public static  IDX_UNKNOW		:number = 10;//预留
		public static  MAX_ITEMS		:number = 11;
		
		/*支持的最大帧数*/
		public static  MAX_FRAME		:number = 10;
		
		/*
		名称     	英文   	   编号
		坐骑		ride		0
		主手手掌 	mainHand  	1
		副手手掌 	viceHand  	2
		发型	 	hair    	3
		主手武器 	mainArms    4
		副手武器 	viceArms    5
		衣服	 	clothes     6
		披风	 	cloak       7
		
		排序表 = 排序总表[角色][动作][朝向][帧索引] 
		排序表结构 - 举例
		Array<uint>[0] = IDX_RIDE;
		Array<uint>[1] = IDX_CLOTHES;
		Array<uint>[2] = IDX_VICEARMS;
		....
		
		名称：角色5 动作21 方向5 帧数10 装备9
		位：  111   11111  111   1111   1111
		最大：7     31     7     15	    15
		偏移：<<16  <<11   <<8   <<4    +
		与操：&0x07 &0x1F  &0x07 &0x0F  0x0F
		524287长度
		*/
		/*排序一维信息表*/
		private static  _sorts:Array<number> = new Array<number>(524287);
		
		/**
		 * 获得排序起始位置 
		 * @param race 角色
		 * @param action 动作
		 * @param direct 方向
		 * @param frameIndex 帧索引位置
		 * @return 
		 * 
		 */	
		public static getSortStartPos(race:number, action:number, direct:number, frameIndex:number):number{
			return (race << 16) 
			+ (action << 11)
			+ (direct << 8)
			+ (frameIndex << 4);
		}
		
		/**
		 * 获得 
		 * @param pos
		 * @return 
		 * 
		 */		
		public static Get(pos:number):number{
			return AvatarData._sorts[pos];
		}
		
		/**
		 * 设置排序 
		 * @param race 角色
		 * @param action 动作
		 * @param direct 方向
		 * @param frameIndex 帧索引位置
		 * @param sortIndex 排序索引位置
		 * @param itemValue 装备值
		 * 
		 */		
		public static setSort(race:number, action:number, direct:number, frameIndex:number, sortIndex:number, itemValue:number):void{
			//先获得一维数组的位置
			var pos:number = AvatarData.getSortStartPos(race, action, direct, frameIndex) + sortIndex;
			AvatarData._sorts[pos] = itemValue;
		}
		
		public static init(data:ByteArray):void
		{
			this.IMAGE_TABLE = new Array<any>(Direct.MAX_DIRECT);
			//////////////////////// 镜像数据 ///////////////////////////////
			AvatarData.IMAGE_TABLE[Direct.UP] 				= [Direct.UP,			false];
			AvatarData.IMAGE_TABLE[Direct.UPPER_RIGHT] 		= [Direct.UPPER_RIGHT,	false];
			AvatarData.IMAGE_TABLE[Direct.RIGHT] 			= [Direct.RIGHT,		false];
			AvatarData.IMAGE_TABLE[Direct.BOTTOM_RIGHT]		= [Direct.BOTTOM_RIGHT,	false];
			AvatarData.IMAGE_TABLE[Direct.BOTTOM] 			= [Direct.BOTTOM,		false];
			//镜像
			AvatarData.IMAGE_TABLE[Direct.UPPER_LEFT] 		= [Direct.UPPER_RIGHT,	true];
			AvatarData.IMAGE_TABLE[Direct.LEFT] 			= [Direct.RIGHT,		true];
			AvatarData.IMAGE_TABLE[Direct.BOTTOM_LEFT] 		= [Direct.BOTTOM_RIGHT,	true];

			AvatarData.RES_PACKET[AvatarData.ACTION_STAND] 	= AvatarData.RES_PACKET_MOVE;
			AvatarData.RES_PACKET[AvatarData.ACTION_RUNNING] 	= AvatarData.RES_PACKET_MOVE;
			AvatarData.RES_PACKET[AvatarData.ACTION_JUMPPING] = AvatarData.RES_PACKET_MOVE;
			AvatarData.RES_PACKET[AvatarData.ACTION_LEISURE] 	= AvatarData.RES_PACKET_MOVE;
			
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKREADY] 	= AvatarData.RES_PACKET_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO] 	= AvatarData.RES_PACKET_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO2] 	= AvatarData.RES_PACKET_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO3] 	= AvatarData.RES_PACKET_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_BEATEN] 		= AvatarData.RES_PACKET_FIGHT;
			
			AvatarData.RES_PACKET[AvatarData.ACTION_STAND_RIDE] 		= AvatarData.RES_PACKET_RIDE_MOVE;
			AvatarData.RES_PACKET[AvatarData.ACTION_RUNNING_RIDE] 	= AvatarData.RES_PACKET_RIDE_MOVE;
			AvatarData.RES_PACKET[AvatarData.ACTION_JUMPPING_RIDE] 	= AvatarData.RES_PACKET_RIDE_MOVE;
			

			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKREADY_RIDE] = AvatarData.RES_PACKET_RIDE_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO_RIDE] 	= AvatarData.RES_PACKET_RIDE_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO2_RIDE] 	= AvatarData.RES_PACKET_RIDE_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_ATTACKGO3_RIDE] 	= AvatarData.RES_PACKET_RIDE_FIGHT;
			AvatarData.RES_PACKET[AvatarData.ACTION_BEATEN_RIDE] 		= AvatarData.RES_PACKET_RIDE_FIGHT;
			
			AvatarData.RES_PACKET[AvatarData.ACTION_DIING] 	= AvatarData.RES_PACKET_OTHER;
			AvatarData.RES_PACKET[AvatarData.ACTION_WALK] 	= AvatarData.RES_PACKET_OTHER;
			AvatarData.RES_PACKET[AvatarData.ACTION_SIT] 		= AvatarData.RES_PACKET_OTHER;
			AvatarData.RES_PACKET[AvatarData.ACTION_GATHER] 	= AvatarData.RES_PACKET_OTHER;


			////////////////////////////////// 角色定义 //////////////////////////////////////////////
			AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_NONE,	 0);	//战士未定义性别
			AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_MAN,		 1);	//战士男
			AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_WOMAN,	 2);	//战士女
			AvatarData.setRace(AvatarData.OCC_FIRE_MAN, AvatarData.SEX_GAY,		 0);	//战士无

			AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_NONE,		 0);	//法师未定义性别
			AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_MAN,		 3);	//法师男
			AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_WOMAN,	 4);	//法师女
			AvatarData.setRace(AvatarData.OCC_EGG_MAN, AvatarData.SEX_GAY,		 0);	//法师无

			AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_NONE,		 0);	//道士无未定义性别
			AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_MAN,		 5);	//道士男
			AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_WOMAN,	 6);	//道士女
			AvatarData.setRace(AvatarData.OCC_DOG_MAN, AvatarData.SEX_GAY,		 0);	//道士无

			///////////////////////////////////////////////////////////////////////////////////////////
			/*普通状态下的动作表*/
			AvatarData.SINGLE_ACTION[AvatarData.STATE_STAND]		= AvatarData.ACTION_STAND;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_RUNNING]		= AvatarData.ACTION_RUNNING;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_JUMP]		= AvatarData.ACTION_JUMPPING;	
			AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTACKGO]	= AvatarData.ACTION_ATTACKGO;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTCKREADY] 	= AvatarData.ACTION_ATTACKREADY;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_MACSAVING]	= AvatarData.ACTION_ATTACKREADY;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_MACGO]		= AvatarData.ACTION_ATTACKGO;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_CRITICALHIT]	= AvatarData.ACTION_ATTACKGO;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_DEFENSE]		= AvatarData.ACTION_ATTACKGO3;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_DIING]		= AvatarData.ACTION_DIING;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_DIED]		= AvatarData.ACTION_DIING;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_BEATEN]		= AvatarData.ACTION_BEATEN;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_WALK]		= AvatarData.ACTION_WALK;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_LEISURE]		= AvatarData.ACTION_LEISURE;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_GECAO]		= AvatarData.ACTION_ATTACKGO;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_GECAO_2]		= AvatarData.ACTION_ATTACKGO;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTACKGO2]	= AvatarData.ACTION_ATTACKGO2;
			AvatarData.SINGLE_ACTION[AvatarData.STATE_ATTACKGO3]	= AvatarData.ACTION_ATTACKGO3;

			/*骑马状态下的动作表*/
			AvatarData.RIDING_ACTION[AvatarData.STATE_STAND]		= AvatarData.ACTION_STAND_RIDE;
			AvatarData.RIDING_ACTION[AvatarData.STATE_RUNNING]		= AvatarData.ACTION_STAND_RIDE;
			AvatarData.RIDING_ACTION[AvatarData.STATE_JUMP]		= AvatarData.ACTION_JUMPPING;
			AvatarData.RIDING_ACTION[AvatarData.STATE_ATTACKGO]	= AvatarData.ACTION_ATTACKGO;
			AvatarData.RIDING_ACTION[AvatarData.STATE_ATTCKREADY] 	= AvatarData.ACTION_ATTACKREADY;
			AvatarData.RIDING_ACTION[AvatarData.STATE_MACSAVING]	= AvatarData.ACTION_ATTACKREADY;
			AvatarData.RIDING_ACTION[AvatarData.STATE_MACGO]		= AvatarData.ACTION_ATTACKGO;
			AvatarData.RIDING_ACTION[AvatarData.STATE_CRITICALHIT]	= AvatarData.ACTION_ATTACKGO;
			AvatarData.RIDING_ACTION[AvatarData.STATE_DEFENSE]		= AvatarData.ACTION_ATTACKGO3;
			AvatarData.RIDING_ACTION[AvatarData.STATE_DIING]		= AvatarData.ACTION_DIING;
			AvatarData.RIDING_ACTION[AvatarData.STATE_DIED]		= AvatarData.ACTION_DIING;
			AvatarData.RIDING_ACTION[AvatarData.STATE_BEATEN]		= AvatarData.ACTION_BEATEN;
			AvatarData.RIDING_ACTION[AvatarData.STATE_WALK]		= AvatarData.ACTION_WALK;
			AvatarData.RIDING_ACTION[AvatarData.STATE_LEISURE]		= AvatarData.ACTION_LEISURE;
			AvatarData.RIDING_ACTION[AvatarData.STATE_GECAO]		= AvatarData.ACTION_ATTACKGO3;
			AvatarData.RIDING_ACTION[AvatarData.STATE_GECAO_2]		= AvatarData.ACTION_ATTACKGO2;

			/*骑马态下的层级排序表*/
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_STAND]		= AvatarData.ACTION_STAND_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_RUNNING]		= AvatarData.ACTION_RUNNING_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_JUMP]		= AvatarData.ACTION_JUMPPING;	
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_ATTACKGO]	= AvatarData.ACTION_ATTACKGO_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_ATTCKREADY] 	= AvatarData.ACTION_ATTACKGO_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_MACSAVING]	= AvatarData.ACTION_ATTACKREADY;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_MACGO]		= AvatarData.ACTION_ATTACKGO_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_CRITICALHIT]	= AvatarData.ACTION_ATTACKGO_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_DEFENSE]		= AvatarData.ACTION_ATTACKGO3;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_DIING]		= AvatarData.ACTION_DIING;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_DIED]		= AvatarData.ACTION_DIING;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_BEATEN]		= AvatarData.ACTION_BEATEN_RIDE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_WALK]		= AvatarData.ACTION_WALK;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_LEISURE]		= AvatarData.ACTION_LEISURE;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_GECAO]		= AvatarData.ACTION_ATTACKGO3;
			AvatarData.RIDING_ACTION_SORT[AvatarData.STATE_GECAO_2]		= AvatarData.ACTION_ATTACKGO2;

			if(!data) return;
			/*解压*/
			//data.inflate();
			
			/*上次读取的针数*/
			var prev_f:number
			/*角色id,动作id,方向id,针id*/
			var r_id:number, a_id:number, d_id:number, f_id:number, p_id:number;
			/*角色个数,动作个数,方向个数,针数, 贴图数*/
			var r_len:number, a_len:number, d_len:number, f_len:number, p_len:number;
			r_len = data.readShort();			
			
			var i:number, j:number, k:number, l:number, m:number;
			for(i = 0; i < r_len; i ++)
			{
				//todo:小张这边的角色id没有按照SharedDef的来，要改掉
				r_id = data.readShort() + 1;//角色
				a_len = data.readShort();//动作长度
				
				for(j = 0; j < a_len; j ++)
				{
					a_id = data.readShort();//动作
					
					/*读取针数针率*/
					var fiPos:number = AvatarData.GetFrameInfoPos(r_id, a_id);
					AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_EXITS] = 1;			   //定义是否存在
					AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_COUNT] = data.readShort();//总帧数
					AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_RATE] 	= data.readShort();//帧率
					AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_LOOP] 	= data.readShort();//循环
					AvatarData._frameInfo[fiPos + AvatarData.FRAMEINFO_MOVESPEED] 	= data.readShort();//像素
					
					d_len = data.readShort();//方向长度
					for(k = 0; k < d_len; k ++)
					{
						d_id = data.readShort();//方向
						d_id = Direct.GetDirect2(d_id);//转下方向
						f_len = data.readShort();//帧长度
						
						/*重置前一针*/
						prev_f = 0;
						for(l = 0; l < f_len; l ++)
						{
							f_id = data.readShort();//帧
							p_len = data.readShort();//装备长度
														
							/*补针*/
							if(p_len == 0){//不是关键帧
								AvatarData.fillNeedle(r_id, a_id, d_id, prev_f, f_id);
							}else{
								//按顺序设置装备值
								for(m = 0; m < p_len; m ++){
									p_id = data.readShort();//装备
									if(p_id == 11) p_id = 9;//工具翅膀的枚举 要换成9 暂时处理  工具要改 todo by小张
									AvatarData.setSort(r_id, a_id, d_id, f_id, m, p_id);
								}
								
								//接下去继续循环，补上-1
								for (; m < AvatarData.MAX_ITEMS; m++){
									AvatarData.setSort(r_id, a_id, d_id, f_id, m, -1);
									break;
								}
								
								prev_f = f_id;
							}
							
							//主手、副手变形
							data.readUTF();
							data.readUTF();
							
							//主手变形
//							_table[r_id][a_id][d_id][f_id].matrixMain = stringToMatrix(data.readUTF());
							//副手
//							_table[r_id][a_id][d_id][f_id].matrixVice = stringToMatrix(data.readUTF());
						}
					}
				}
			}
			data.clear();
		}
		
		/*补针*/
		private static fillNeedle(race:number, action:number, direct:number, prev_f:number, cur_f:number):void
		{
			//上一帧的位置
			var prevPos:number = AvatarData.getSortStartPos(race, action, direct, prev_f);
			//当前帧的位置
			var curPos:number = AvatarData.getSortStartPos(race, action, direct, cur_f);
			//从上一帧的所有排序拷贝到当前帧里
			for (var i:number = 0; i < AvatarData.MAX_ITEMS; i++) {
				AvatarData._sorts[curPos + i] = AvatarData._sorts[prevPos + i];
			}
			
		}
		
		/**
		 * 将变形字符串值转换成matrix 
		 * @param value
		 * @return 
		 * 
		 */
		private static stringToMatrix(value:String):Matrix
		{
			//把括号去掉
			value = value.replace("(","").replace(")","");
			//把abcdtxty去掉
			value = value.replace("a=","").replace("b=","").replace("c=","").replace("d=","").replace("tx=","").replace("ty=","");
			var arr:Array<any> = value.split(',');
			
			return new Matrix(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5]);
		}

		/**
		 * 根据攻击类型 选择攻击动作
		 * @param atype 
		 */
		public static getAttackActionByType(atype:number):number{
			if(atype == 2){
				return AvatarData.STATE_ATTACKGO2;
			}
			else if(atype == 3){
				return AvatarData.STATE_ATTACKGO3;
			}

			return AvatarData.STATE_ATTACKGO;
		}
	}
}