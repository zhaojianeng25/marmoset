module game.object {
////////////////////////全局定义///////////////////////////////////
export class GlobalDef{
    public static TYPE_GLOBAL:string = "global" //世界对象guid前缀
    public static TYPE_JJC:string = "jjc" //竞技场对象guid前缀
    public static TYPE_GANG:string = "gang" //帮派对象guid前缀
    public static TYPE_PLAYER:string = "playerdata" //玩家对象guid前缀
    public static TYPE_PLATDATA:string = "platdata" //平台数据对象guid前缀
    public static TYPE_QUEST:string = "quest" //任务对象guid前缀
    public static TYPE_ITEM:string = "item" //物品对象guid前缀
    public static TYPE_MAIL:string = "mail" //邮件对象guid前缀
    public static TYPE_SOCIAL:string = "social" //社交对象guid前缀
    public static TYPE_CLIENTDATA:string = "clientdata" //远程存储对象guid前缀
    public static TYPE_MAP:string = "m" //地图对象guid前缀
    public static TYPE_UNIT:string = "u" //unit对象guid前缀
    public static TYPE_LOOTS:string = "l" //loots对象guid前缀
    public static TYPE_TANSFER_PLAYER:string = "createplayer" //传送创建包玩家对象guid前缀
    public static TYPE_PLAYER_ATTR:string = "playerattr" //玩家属性更新包对象guid前缀
    public static TYPE_PLAYER_QUERY:string = "queryplayer" //玩家信息查询
    public static TYPE_POST_INFO:string = "globalpostinfo" //定时推送功能
    public static TYPE_WUJIANG:string = "wujiang" //武将对象GUID前缀
    public static TYPE_EQUIP:string = "equip" //装备对象GUID前缀
    public static TYPE_PLAYGANG:string = "playgang" //玩家家族对象GUID前缀
    public static SERVER_TYPE_GAME:number = 1 //游戏服
    public static SERVER_TYPE_BATTLE:number = 2 //战斗服
    public static SERVER_TYPE_ALL:number = 100 //任意服，不能写在配置文件里
    
    public static CHAT_TYPE_WORLD:number = 0 //世界聊天
    public static CHAT_TYPE_GANG:number = 1 //行会聊天
    public static CHAT_TYPE_NEAR:number = 2 //附近聊天
    public static CHAT_TYPE_SYSTEM:number = 3 //系统信息
    public static CHAT_TYPE_NOTICE:number = 4 //通知信息
    public static CHAT_TYPE_MARQUEE:number = 5 //跑马灯信息
    public static CHAT_TYPE_POPUP:number = 6 //弹窗信息
    public static CHAT_TYPE_LOCAL:number = 7 //本服聊天
    public static CHAT_TYPE_HONGBAO:number = 8 //红包信息
    public static CHAT_TYPE_DANMU:number = 9 //弹幕
    public static CHAT_TYPE_SONGHUA:number = 10 //送花
    public static CHAT_TYPE_ALL:number = 11 //全部

    public static INSTANCE_TYPE_NONE:number = 0 //不是副本
    public static INSTANCE_TYPE_ACTIVITY:number = 1 //活动副本
    public static INSTANCE_TYPE_SINGLE:number = 2 //单人副本
    public static INSTANCE_TYPE_GANG:number = 3 //帮派副本
    public static KUAFU_TYPE_1V1:number = 1 //跨服1v1
    public static KUAFU_TYPE_WODI:number = 2 //跨服卧底
    public static KUAFU_TYPE_XIANGUO:number = 3 //跨服仙果
    public static KUAFU_TYPE_BOSS:number = 4 //跨服boss
    public static RANK_TYPE_FORCE:number = 0 //战力榜
    public static RANK_TYPE_STAR:number = 1 //星星榜
    public static MAX_RANK_TYPE:number = 2 //最大排行榜
    public static WUJIANG_OBJECT_COUNT:number = 5 //武将对象个数
    public static OBJECT_MAX_WUJIANG_COUNT:number = 200 //单BINLOG最大武将
    public static MAX_WUJIANG_INT_ATTR_INDEX:number = 50 //每个武将最大占用数字下标
}


////////////////////////////////////////////////////////////////
//GlobalPostInfo def
////////////////////////////////////////////////////////////////
export class GlobalPostInfoField extends core.obj.GuidObject{
// define
	public static MAX_POST_COUNT:number = 1000 //最大推送数量

// int field
	public static GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TYPE:number = 0 //类型
	public static GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TIME:number = 1 //推送时间

// string field
	public static GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_GUID:number = 0 //玩家guid
	public static GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_INFO:number = 1 //要推送的信息


	public GetGlobalPostInfoType(index:number):number{
       return this.GetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TYPE+index*2);
    }
	public SetGlobalPostInfoType(index:number,val:number):void{
       this.SetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TYPE+index*2, val);
    }


	public GetGlobalPostInfoTime(index:number):number{
       return this.GetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TIME+index*2);
    }
	public SetGlobalPostInfoTime(index:number,val:number):void{
       this.SetUInt32(GlobalPostInfoField.GLOBALPOSTINFO_INT_GLOBAL_POST_INFO_TIME+index*2, val);
    }


//////////////////////////////////////str function

	public GetGlobalPostInfoGuid(index:number):string{
       return this.GetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_GUID+index*2);
    }
	public SetGlobalPostInfoGuid(index:number,val:string):void{
       this.SetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_GUID+index*2, val);
    }


	public GetGlobalPostInfoInfo(index:number):string{
       return this.GetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_INFO+index*2);
    }
	public SetGlobalPostInfoInfo(index:number,val:string):void{
       this.SetStr(GlobalPostInfoField.GLOBALPOSTINFO_STR_GLOBAL_POST_INFO_INFO+index*2, val);
    }


}////////////////////////////////////////////////////////////////
//GangOther def
////////////////////////////////////////////////////////////////
export class GangOtherField extends core.obj.GuidObject{
// define
	public static MAX_GANG_SPELL_TYPE:number = 9 //技能类型

// int field
	public static GANGOTHER_INT_FB_CREATURE:number = 0 //军团六个怪的血量万分比
	public static GANGOTHER_INT_FB_BYTE:number = 3 //0当前解锁章节 1当前解锁军团 2历史最高章节 3重置方式
	public static GANGOTHER_INT_FB_BYTE2:number = 4 //0今日开始章节 给玩家记领奖用
	public static GANGOTHER_INT_BZ_U16:number = 5 //关卡信息=（章节-1）*4+关卡 最多二十个关卡
	public static GANGOTHER_INT_BZ_COUNT1:number = 6 //宝藏奖励数量1
	public static GANGOTHER_INT_BZ_COUNT2:number = 7 //宝藏奖励数量2
	public static GANGOTHER_INT_BZ_ZHANWEI:number = 8 //宝藏奖励占位
	public static GANGOTHER_INT_XS_ITEM_IDX:number = 65 //限时商店商品索引
	public static GANGOTHER_INT_XS_ITEM_COUNT:number = 68 //商品份数
	public static GANGOTHER_INT_SPELL_LV:number = 71 //帮派技能等级

// string field


	public GetFbCreature(offset:number):number{
       return this.GetUInt16(GangOtherField.GANGOTHER_INT_FB_CREATURE+Math.floor(offset/2), offset%2);
    }
	public SetFbCreature(offset:number,val:number):void{
       this.SetUInt16(GangOtherField.GANGOTHER_INT_FB_CREATURE+Math.floor(offset/2), offset%2, val);
    }


	public GetFbByte(offset:number):number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, offset);
    }
	public SetFbByte(offset:number,val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE, offset, val);
    }



	//当前攻打章节
	public GetCurChapter():number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,0);
    }
	public SetCurChapter(val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,0, val);
    }


	//当前攻打关卡
	public GetCurGuan():number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,1);
    }
	public SetCurGuan(val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,1, val);
    }


	//历史最高章节
	public GetMaxChapter():number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,2);
    }
	public SetMaxChapter(val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,2, val);
    }


	//0最高1最高少一章
	public GetFbResetType():number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,3);
    }
	public SetFbResetType(val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE,3, val);
    }

	public GetFbByte2(offset:number):number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2, offset);
    }
	public SetFbByte2(offset:number,val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2, offset, val);
    }



	//今日开始章节
	public GetTodayChapterBegin():number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2,0);
    }
	public SetTodayChapterBegin(val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_FB_BYTE2,0, val);
    }

	public GetBzU16(index:number):number{
       return this.GetUInt32(GangOtherField.GANGOTHER_INT_BZ_U16+index*3);
    }
	public SetBzU16(index:number,val:number):void{
       this.SetUInt32(GangOtherField.GANGOTHER_INT_BZ_U16+index*3, val);
    }


	public GetBzCount1(offset:number):number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT1, offset);
    }
	public SetBzCount1(offset:number,val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT1, offset, val);
    }


	public GetBzCount2(offset:number):number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT2, offset);
    }
	public SetBzCount2(offset:number,val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_BZ_COUNT2, offset, val);
    }


	public GetBzZhanwei(offset:number):number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_BZ_ZHANWEI+Math.floor(offset/4), offset%4);
    }
	public SetBzZhanwei(offset:number,val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_BZ_ZHANWEI+Math.floor(offset/4), offset%4, val);
    }


	public GetXsItemIdx(offset:number):number{
       return this.GetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_IDX+Math.floor(offset/2), offset%2);
    }
	public SetXsItemIdx(offset:number,val:number):void{
       this.SetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_IDX+Math.floor(offset/2), offset%2, val);
    }


	public GetXsItemCount(offset:number):number{
       return this.GetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_COUNT+Math.floor(offset/2), offset%2);
    }
	public SetXsItemCount(offset:number,val:number):void{
       this.SetUInt16(GangOtherField.GANGOTHER_INT_XS_ITEM_COUNT+Math.floor(offset/2), offset%2, val);
    }


	public GetSpellLv(offset:number):number{
       return this.GetByte(GangOtherField.GANGOTHER_INT_SPELL_LV+Math.floor(offset/4), offset%4);
    }
	public SetSpellLv(offset:number,val:number):void{
       this.SetByte(GangOtherField.GANGOTHER_INT_SPELL_LV+Math.floor(offset/4), offset%4, val);
    }


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//GlobalObject def
////////////////////////////////////////////////////////////////
export class GlobalObjectField extends core.obj.GuidObject{
// define

// int field
	public static GLOBALOBJECT_INT_GANG_ID:number = 0 //帮派ID自增字段
	public static GLOBALOBJECT_INT_RESET_TIME:number = 1 //重置的时间

// string field


	public GetGangId():number{
       return this.GetUInt32(GlobalObjectField.GLOBALOBJECT_INT_GANG_ID);
    }
	public SetGangId(val:number):void{
       this.SetUInt32(GlobalObjectField.GLOBALOBJECT_INT_GANG_ID, val);
    }


	public GetResetTime(index:number):number{
       return this.GetUInt32(GlobalObjectField.GLOBALOBJECT_INT_RESET_TIME+index);
    }
	public SetResetTime(index:number,val:number):void{
       this.SetUInt32(GlobalObjectField.GLOBALOBJECT_INT_RESET_TIME+index, val);
    }


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//PlayerAttr def
////////////////////////////////////////////////////////////////
export class PlayerAttrField extends core.obj.GuidObject{
// define

// int field

// string field


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//Unit def
////////////////////////////////////////////////////////////////
export class UnitField extends core.obj.GuidObject{
// define
	public static ATTR_HP:number = 1 //生命
	public static ATTR_MP:number = 2 //魔法
	public static ATTR_ATK:number = 3 //攻击
	public static ATTR_DEF:number = 4 //防御
	public static MAX_ATTR:number = 5 //最大属性值
	public static MAX_BUFF:number = 12 //最大buff数量
	public static TYPE_ID_PLAYER:number = 0 //玩家
	public static TYPE_ID_CREATURE:number = 1 //生物
	public static TYPE_ID_GAMEOBJ:number = 2 //游戏对象
	public static TYPE_ID_LOOTS:number = 3 //战利品对象
	public static ATTACK_MODE_HEPING:number = 0 //和平
	public static ATTACK_MODE_HANGHUI:number = 1 //行会
	public static ATTACK_MODE_ALL:number = 2 //全体
	public static MAX_ATTACK_MODE:number = 3 //最大攻击模式类型
	public static LIVE_STATUS_OK:number = 0 //活着
	public static LIVE_STATU_DIE:number = 1 //死了
	public static HIT_NOMAL:number = 1 //普通
	public static HIT_CRIT:number = 2 //暴击
	public static HIT_MISS:number = 3 //闪避
	public static HIT_ZHILIAO:number = 4 //治疗
	public static UNIT_BIT_GUAJIBAOHU:number = 0 //是否挂机保护
	public static UNIT_BIT_IS_LIMIT_CAST:number = 1 //是否限制施法
	public static UNIT_BIT_IS_LIMIT_MOVE:number = 2 //是否限制移动
	public static UNIT_BIT_IS_SPELL_CASTING:number = 3 //施法中
	public static UNIT_BIT_IS_PKING:number = 4 //pk状态

// int field
	public static UNIT_INT_POS_X:number = 0 //X坐标
	public static UNIT_INT_POS_Y:number = 1 //Y坐标
	public static UNIT_INT_TARGET_POS:number = 2 //目标点
	public static UNIT_INT_BYTE0:number = 3 //0.移动状态 1.朝向 2.速度 3.生存状态
	public static UNIT_INT_BYTE1:number = 4 //0.精灵类型ID 1.坐骑模板 2.攻击模式 3.性别
	public static UNIT_INT_MAX_HP:number = 5 //最大血量
	public static UNIT_INT_HP:number = 6 //当前血量
	public static UNIT_INT_ENTRY:number = 7 //生物模板ID
	public static UNIT_INT_NPC_BYTE:number = 8 //0.NPC标志 1.预留 2.预留 3.预留
	public static UNIT_INT_SHOW_WEAPON:number = 9 //武器显示
	public static UNIT_INT_SHOW_COAT:number = 10 //衣服显示
	public static UNIT_INT_FORCE:number = 11 //战斗力	
	public static UNIT_INT_BUFF_ID:number = 12 //BUFFID16位
	public static UNIT_INT_BUFF_TM:number = 18 //BUFF持续时间32位
	public static UNIT_INT_BUFF_DATA:number = 30 //BUFF预留值32位
	public static UNIT_INT_BUFF_LV:number = 42 //BUFF等级16位
	public static UNIT_INT_BUFF_GIVER:number = 48 //BUFF释放者OID~跨图不能带走~~
	public static UNIT_INT_GO_FLAGS:number = 60 //游戏对象的一些标识位
	public static UNIT_INT_GO_DATA:number = 61 //动态数据字段,目前保留为4个int
	public static UNIT_INT_LEVEL:number = 65 //等级
	public static UNIT_INT_MASTER_OID:number = 66 //主人的ID
	public static UNIT_INT_FLAG:number = 67 //bit位

// string field
	public static UNIT_STR_NAME:number = 0 //玩家名字
	public static UNIT_STR_INSTANCE_I_D:number = 1 //地图实例ID
	public static UNIT_STR_MASTER_NAME:number = 2 //主人名字
	public static UNIT_STR_GANG_GUID:number = 3 //帮派GUID
	public static UNIT_STR_GANG_NAME:number = 4 //帮派名字


	public GetPosX():number{
       return this.GetFloat(UnitField.UNIT_INT_POS_X);
    }
	public SetPosX(val:number):void{
       this.SetFloat(UnitField.UNIT_INT_POS_X, val);
    }


	public GetPosY():number{
       return this.GetFloat(UnitField.UNIT_INT_POS_Y);
    }
	public SetPosY(val:number):void{
       this.SetFloat(UnitField.UNIT_INT_POS_Y, val);
    }


	public GetTargetPos(offset:number):number{
       return this.GetUInt16(UnitField.UNIT_INT_TARGET_POS, offset);
    }
	public SetTargetPos(offset:number,val:number):void{
       this.SetUInt16(UnitField.UNIT_INT_TARGET_POS, offset, val);
    }



	//目标X轴
	public GetTargetPosX():number{
       return this.GetUInt16(UnitField.UNIT_INT_TARGET_POS,0);
    }
	public SetTargetPosX(val:number):void{
       this.SetUInt16(UnitField.UNIT_INT_TARGET_POS,0, val);
    }


	//目标Y轴
	public GetTargetPosY():number{
       return this.GetUInt16(UnitField.UNIT_INT_TARGET_POS,1);
    }
	public SetTargetPosY(val:number):void{
       this.SetUInt16(UnitField.UNIT_INT_TARGET_POS,1, val);
    }

	public GetByte0(offset:number):number{
       return this.GetByte(UnitField.UNIT_INT_BYTE0, offset);
    }
	public SetByte0(offset:number,val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE0, offset, val);
    }



	//移动状态
	public GetMoveStatus():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE0,0);
    }
	public SetMoveStatus(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE0,0, val);
    }


	//朝向
	public GetToward():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE0,1);
    }
	public SetToward(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE0,1, val);
    }


	//速度
	public GetSpeed():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE0,2);
    }
	public SetSpeed(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE0,2, val);
    }


	//生存状态
	public GetLiveStatus():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE0,3);
    }
	public SetLiveStatus(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE0,3, val);
    }

	public GetByte1(offset:number):number{
       return this.GetByte(UnitField.UNIT_INT_BYTE1, offset);
    }
	public SetByte1(offset:number,val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE1, offset, val);
    }



	//精灵类型ID
	public GetTypeId():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE1,0);
    }
	public SetTypeId(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE1,0, val);
    }


	//坐骑模板
	public GetMount():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE1,1);
    }
	public SetMount(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE1,1, val);
    }


	//攻击模式
	public GetAttackMode():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE1,2);
    }
	public SetAttackMode(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE1,2, val);
    }


	//性别
	public GetSex():number{
       return this.GetByte(UnitField.UNIT_INT_BYTE1,3);
    }
	public SetSex(val:number):void{
       this.SetByte(UnitField.UNIT_INT_BYTE1,3, val);
    }

	public GetMaxHp():number{
       return this.GetUInt32(UnitField.UNIT_INT_MAX_HP);
    }
	public SetMaxHp(val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_MAX_HP, val);
    }


	public GetHp():number{
       return this.GetUInt32(UnitField.UNIT_INT_HP);
    }
	public SetHp(val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_HP, val);
    }


	public GetEntry():number{
       return this.GetUInt32(UnitField.UNIT_INT_ENTRY);
    }
	public SetEntry(val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_ENTRY, val);
    }


	public GetNpcByte(offset:number):number{
       return this.GetByte(UnitField.UNIT_INT_NPC_BYTE, offset);
    }
	public SetNpcByte(offset:number,val:number):void{
       this.SetByte(UnitField.UNIT_INT_NPC_BYTE, offset, val);
    }



	//NPC标志0-怪物，1-NPC，2-游戏对象
	public GetNpcFlag():number{
       return this.GetByte(UnitField.UNIT_INT_NPC_BYTE,0);
    }
	public SetNpcFlag(val:number):void{
       this.SetByte(UnitField.UNIT_INT_NPC_BYTE,0, val);
    }

	public GetShowWeapon():number{
       return this.GetUInt32(UnitField.UNIT_INT_SHOW_WEAPON);
    }
	public SetShowWeapon(val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_SHOW_WEAPON, val);
    }


	public GetShowCoat():number{
       return this.GetUInt32(UnitField.UNIT_INT_SHOW_COAT);
    }
	public SetShowCoat(val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_SHOW_COAT, val);
    }


	public GetForce():number{
       return this.GetUInt32(UnitField.UNIT_INT_FORCE);
    }
	public SetForce(val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_FORCE, val);
    }


	public GetBuffId(offset:number):number{
       return this.GetInt16(UnitField.UNIT_INT_BUFF_ID+Math.floor(offset/2), offset%2);
    }
	public SetBuffId(offset:number,val:number):void{
       this.SetInt16(UnitField.UNIT_INT_BUFF_ID+Math.floor(offset/2), offset%2, val);
    }


	public GetBuffTm(index:number):number{
       return this.GetUInt32(UnitField.UNIT_INT_BUFF_TM+index);
    }
	public SetBuffTm(index:number,val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_BUFF_TM+index, val);
    }


	public GetBuffData(index:number):number{
       return this.GetUInt32(UnitField.UNIT_INT_BUFF_DATA+index);
    }
	public SetBuffData(index:number,val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_BUFF_DATA+index, val);
    }


	public GetBuffLv(offset:number):number{
       return this.GetInt16(UnitField.UNIT_INT_BUFF_LV+Math.floor(offset/2), offset%2);
    }
	public SetBuffLv(offset:number,val:number):void{
       this.SetInt16(UnitField.UNIT_INT_BUFF_LV+Math.floor(offset/2), offset%2, val);
    }


	public GetBuffGiver(index:number):number{
       return this.GetUInt32(UnitField.UNIT_INT_BUFF_GIVER+index);
    }
	public SetBuffGiver(index:number,val:number):void{
       this.SetUInt32(UnitField.UNIT_INT_BUFF_GIVER+index, val);
    }


	public GetGoFlags(offset:number):boolean{
       return this.GetBit(UnitField.UNIT_INT_GO_FLAGS, offset);
    }
	public SetGoFlags(offset:number,val:boolean):void{
       this.SetBit(UnitField.UNIT_INT_GO_FLAGS, offset, val);
    }


	public GetGoData(index:number):number{
       return this.GetInt32(UnitField.UNIT_INT_GO_DATA+index);
    }
	public SetGoData(index:number,val:number):void{
       this.SetInt32(UnitField.UNIT_INT_GO_DATA+index, val);
    }


	public GetLevel():number{
       return this.GetInt32(UnitField.UNIT_INT_LEVEL);
    }
	public SetLevel(val:number):void{
       this.SetInt32(UnitField.UNIT_INT_LEVEL, val);
    }


	public GetMasterOid():number{
       return this.GetInt32(UnitField.UNIT_INT_MASTER_OID);
    }
	public SetMasterOid(val:number):void{
       this.SetInt32(UnitField.UNIT_INT_MASTER_OID, val);
    }


	public GetFlag(offset:number):boolean{
       return this.GetBit(UnitField.UNIT_INT_FLAG, offset);
    }
	public SetFlag(offset:number,val:boolean):void{
       this.SetBit(UnitField.UNIT_INT_FLAG, offset, val);
    }


//////////////////////////////////////str function

	public GetName():string{
       return this.GetStr(UnitField.UNIT_STR_NAME);
    }
	public SetName(val:string):void{
       this.SetStr(UnitField.UNIT_STR_NAME, val);
    }


	public GetInstanceID():string{
       return this.GetStr(UnitField.UNIT_STR_INSTANCE_I_D);
    }
	public SetInstanceID(val:string):void{
       this.SetStr(UnitField.UNIT_STR_INSTANCE_I_D, val);
    }


	public GetMasterName():string{
       return this.GetStr(UnitField.UNIT_STR_MASTER_NAME);
    }
	public SetMasterName(val:string):void{
       this.SetStr(UnitField.UNIT_STR_MASTER_NAME, val);
    }


	public GetGangGuid():string{
       return this.GetStr(UnitField.UNIT_STR_GANG_GUID);
    }
	public SetGangGuid(val:string):void{
       this.SetStr(UnitField.UNIT_STR_GANG_GUID, val);
    }


	public GetGangName():string{
       return this.GetStr(UnitField.UNIT_STR_GANG_NAME);
    }
	public SetGangName(val:string):void{
       this.SetStr(UnitField.UNIT_STR_GANG_NAME, val);
    }


}////////////////////////////////////////////////////////////////
//Item def
////////////////////////////////////////////////////////////////
export class ItemField extends core.obj.GuidObject{
// define
	public static BAG_TYPE_PACK:number = 0 //道具背包
	public static BAG_TYPE_BOX:number = 1 //宝箱背包
	public static BAG_TYPE_EQUIP_CHIP:number = 2 //装备碎片背包
	public static BAG_TYPE_WJ_CHIP:number = 3 //武将碎片
	public static MAX_BAG_TYPE:number = 4 //背包最大枚举
	public static MAX_BAG_SIZE_0:number = 1000 //最大装备容量
	public static MAX_BAG_SIZE_1:number = 1200 //最大宝箱容量
	public static MAX_BAG_SIZE_2:number = 1500 //最大装备碎片容量
	public static MAX_BAG_SIZE_3:number = 1800 //最大武将碎片容量
	public static ITEM_TYPE_BOX:number = 0 //宝箱
	public static ITEM_TYPE_ITEM:number = 1 //普通道具
	public static ITEM_TYPE_EQUIP_CHIP:number = 2 //装备碎片
	public static ITEM_TYPE_BAOWU_CHIP:number = 3 //宝物碎片
	public static ITEM_TYPE_WJ_CHIP:number = 4 //武将碎片
	public static ITEM_TYPE_EQUIP:number = 5 //装备
	public static ITEM_TYPE_BAOWU:number = 6 //宝物
	public static ITEM_TYPE_WJ:number = 7 //武将
	public static ITEM_TYPE_CHOSSE_BOX:number = 8 //四选一箱子
	public static MAX_ITEM_INT:number = 5 //物品binlog的int最大部分
	public static ITEM_OPT_SELL:number = 1 //出售
	public static ITEM_OPT_DUMP:number = 2 //丢弃
	public static ITEM_OPT_USE:number = 3 //使用

// int field
	public static ITEM_INT_ITEM_ENTRY:number = 0 //物品ID
	public static ITEM_INT_FAIL_TIME:number = 1 //失效时间
	public static ITEM_INT_FLAG:number = 2 //物品bit位
	public static ITEM_INT_ITEM_BYTE:number = 3 //物品byte位
	public static ITEM_INT_TTEM_INT16:number = 4 //物品int16位

// string field


	public GetItemEntry(index:number):number{
       return this.GetUInt32(ItemField.ITEM_INT_ITEM_ENTRY+index*5);
    }
	public SetItemEntry(index:number,val:number):void{
       this.SetUInt32(ItemField.ITEM_INT_ITEM_ENTRY+index*5, val);
    }


	public GetFailTime(index:number):number{
       return this.GetUInt32(ItemField.ITEM_INT_FAIL_TIME+index*5);
    }
	public SetFailTime(index:number,val:number):void{
       this.SetUInt32(ItemField.ITEM_INT_FAIL_TIME+index*5, val);
    }


	public GetFlag(offset:number):boolean{
       return this.GetBit(ItemField.ITEM_INT_FLAG, offset);
    }
	public SetFlag(offset:number,val:boolean):void{
       this.SetBit(ItemField.ITEM_INT_FLAG, offset, val);
    }


	public GetItemByte(offset:number):number{
       return this.GetByte(ItemField.ITEM_INT_ITEM_BYTE, offset);
    }
	public SetItemByte(offset:number,val:number):void{
       this.SetByte(ItemField.ITEM_INT_ITEM_BYTE, offset, val);
    }


	public GetTtemInt16(offset:number):number{
       return this.GetUInt16(ItemField.ITEM_INT_TTEM_INT16, offset);
    }
	public SetTtemInt16(offset:number,val:number):void{
       this.SetUInt16(ItemField.ITEM_INT_TTEM_INT16, offset, val);
    }



	//叠加数
	public GetCount(index:number):number{
       return this.GetUInt16(ItemField.ITEM_INT_TTEM_INT16+index*5,0);
    }
	public SetCount(index:number,val:number):void{
       this.SetUInt16(ItemField.ITEM_INT_TTEM_INT16+index*5,0, val);
    }

//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//GlobalConfig def
////////////////////////////////////////////////////////////////
export class GlobalConfigField extends core.obj.GuidObject{
// define

// int field
	public static GLOBALCONFIG_INT_OPEN_TIME:number = 0 //开服时间
	public static GLOBALCONFIG_INT_MERGE_TIME:number = 1 //合服时间
	public static GLOBALCONFIG_INT_SYNC_LOG_TIME:number = 2 //日志同步时间
	public static GLOBALCONFIG_INT_MERGE_END_TIME:number = 3 //合服结束时间

// string field
	public static GLOBALCONFIG_STR_MERGE_TO_SERVER_NAME:number = 0 //合并到哪个服
	public static GLOBALCONFIG_STR_YU_LIU:number = 1 //预留的一堆下标，往这里插入下标的时候，注意修改占位
	public static GLOBALCONFIG_STR_SERVER_NAME:number = 100 //第一个是主服的服务器名，后面的都是合并过来的服务器


	public GetOpenTime():number{
       return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_OPEN_TIME);
    }
	public SetOpenTime(val:number):void{
       this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_OPEN_TIME, val);
    }


	public GetMergeTime():number{
       return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_TIME);
    }
	public SetMergeTime(val:number):void{
       this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_TIME, val);
    }


	public GetSyncLogTime():number{
       return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_SYNC_LOG_TIME);
    }
	public SetSyncLogTime(val:number):void{
       this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_SYNC_LOG_TIME, val);
    }


	public GetMergeEndTime():number{
       return this.GetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_END_TIME);
    }
	public SetMergeEndTime(val:number):void{
       this.SetUInt32(GlobalConfigField.GLOBALCONFIG_INT_MERGE_END_TIME, val);
    }


//////////////////////////////////////str function

	public GetMergeToServerName():string{
       return this.GetStr(GlobalConfigField.GLOBALCONFIG_STR_MERGE_TO_SERVER_NAME);
    }
	public SetMergeToServerName(val:string):void{
       this.SetStr(GlobalConfigField.GLOBALCONFIG_STR_MERGE_TO_SERVER_NAME, val);
    }


	public Get___YuLiu(index:number):string{
       return this.GetStr(GlobalConfigField.GLOBALCONFIG_STR_YU_LIU+index);
    }
	public Set___YuLiu(index:number,val:string):void{
       this.SetStr(GlobalConfigField.GLOBALCONFIG_STR_YU_LIU+index, val);
    }


	public GetServerName(index:number):string{
       return this.GetStr(GlobalConfigField.GLOBALCONFIG_STR_SERVER_NAME+index);
    }
	public SetServerName(index:number,val:string):void{
       this.SetStr(GlobalConfigField.GLOBALCONFIG_STR_SERVER_NAME+index, val);
    }


}////////////////////////////////////////////////////////////////
//Quest def
////////////////////////////////////////////////////////////////
export class QuestField extends core.obj.GuidObject{
// define
	public static QUEST_STATUS_NONE:number = 0 //未完成
	public static QUEST_STATUS_COMPLETE:number = 1 //待完成
	public static MAX_QUEST_SLOT:number = 12 //任务槽大小

// int field
	public static QUEST_INT_QUEST_ID:number = 0 //任务ID
	public static QUEST_INT_QUEST_STATUS:number = 12 //状态
	public static QUEST_INT_PROGRESS:number = 15 //任务进度
	public static QUEST_INT_COMPLETE:number = 21 //任务完成标志

// string field


	public GetQuestId(index:number):number{
       return this.GetUInt32(QuestField.QUEST_INT_QUEST_ID+index);
    }
	public SetQuestId(index:number,val:number):void{
       this.SetUInt32(QuestField.QUEST_INT_QUEST_ID+index, val);
    }


	public GetQuestStatus(offset:number):number{
       return this.GetByte(QuestField.QUEST_INT_QUEST_STATUS+Math.floor(offset/4), offset%4);
    }
	public SetQuestStatus(offset:number,val:number):void{
       this.SetByte(QuestField.QUEST_INT_QUEST_STATUS+Math.floor(offset/4), offset%4, val);
    }


	public GetProgress(offset:number):number{
       return this.GetInt16(QuestField.QUEST_INT_PROGRESS+Math.floor(offset/2), offset%2);
    }
	public SetProgress(offset:number,val:number):void{
       this.SetInt16(QuestField.QUEST_INT_PROGRESS+Math.floor(offset/2), offset%2, val);
    }


	public GetComplete(offset:number):boolean{
       return this.GetBit(QuestField.QUEST_INT_COMPLETE, offset);
    }
	public SetComplete(offset:number,val:boolean):void{
       this.SetBit(QuestField.QUEST_INT_COMPLETE, offset, val);
    }


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//ItemBonus def
////////////////////////////////////////////////////////////////
export class ItemBonusField extends core.obj.GuidObject{
// define

// int field
	public static ITEMBONUS_INT_ITEM_ENTRY:number = 0 //物品ID
	public static ITEMBONUS_INT_COUNT:number = 1 //数量
	public static ITEMBONUS_INT_ITEM_TYPE:number = 2 //获取类型

// string field


	public GetItemEntry():number{
       return this.GetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_ENTRY);
    }
	public SetItemEntry(val:number):void{
       this.SetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_ENTRY, val);
    }


	public GetCount():number{
       return this.GetUInt32(ItemBonusField.ITEMBONUS_INT_COUNT);
    }
	public SetCount(val:number):void{
       this.SetUInt32(ItemBonusField.ITEMBONUS_INT_COUNT, val);
    }


	public GetItemType():number{
       return this.GetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_TYPE);
    }
	public SetItemType(val:number):void{
       this.SetUInt32(ItemBonusField.ITEMBONUS_INT_ITEM_TYPE, val);
    }


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//Map def
////////////////////////////////////////////////////////////////
export class MapField extends core.obj.GuidObject{
// define

// int field
	public static MAP_INT_MAP_I_D:number = 0 //地图模板ID
	public static MAP_INT_MAP_BYTE:number = 1 //0.地图状态
	public static MAP_INT_MAP_INT_DATA:number = 2 //我说它是啥就是啥

// string field
	public static MAP_STR_INSTANCE_I_D:number = 0 //地图实例ID
	public static MAP_STR_TELEPORT_PAR:number = 1 //地图传送参数
	public static MAP_STR_MAP_STR_DATA:number = 2 //我说它是啥就是啥


	public GetMapID():number{
       return this.GetUInt32(MapField.MAP_INT_MAP_I_D);
    }
	public SetMapID(val:number):void{
       this.SetUInt32(MapField.MAP_INT_MAP_I_D, val);
    }


	public GetMapByte(offset:number):number{
       return this.GetByte(MapField.MAP_INT_MAP_BYTE, offset);
    }
	public SetMapByte(offset:number,val:number):void{
       this.SetByte(MapField.MAP_INT_MAP_BYTE, offset, val);
    }



	//地图状态
	public GetMapState():number{
       return this.GetByte(MapField.MAP_INT_MAP_BYTE,0);
    }
	public SetMapState(val:number):void{
       this.SetByte(MapField.MAP_INT_MAP_BYTE,0, val);
    }

	public GetMapIntData(index:number):number{
       return this.GetUInt32(MapField.MAP_INT_MAP_INT_DATA+index);
    }
	public SetMapIntData(index:number,val:number):void{
       this.SetUInt32(MapField.MAP_INT_MAP_INT_DATA+index, val);
    }


//////////////////////////////////////str function

	public GetInstanceID():string{
       return this.GetStr(MapField.MAP_STR_INSTANCE_I_D);
    }
	public SetInstanceID(val:string):void{
       this.SetStr(MapField.MAP_STR_INSTANCE_I_D, val);
    }


	public GetTeleportPar():string{
       return this.GetStr(MapField.MAP_STR_TELEPORT_PAR);
    }
	public SetTeleportPar(val:string):void{
       this.SetStr(MapField.MAP_STR_TELEPORT_PAR, val);
    }


	public GetMapStrData(index:number):string{
       return this.GetStr(MapField.MAP_STR_MAP_STR_DATA+index);
    }
	public SetMapStrData(index:number,val:string):void{
       this.SetStr(MapField.MAP_STR_MAP_STR_DATA+index, val);
    }


}////////////////////////////////////////////////////////////////
//QueryPlayer def
////////////////////////////////////////////////////////////////
export class QueryPlayerField extends core.obj.GuidObject{
// define

// int field
	public static QUERYPLAYER_INT_EQUIP:number = 0 //装备模板

// string field
	public static QUERYPLAYER_STR_NAME:number = 0 //名字


	public GetEquip(index:number):number{
       return this.GetUInt32(QueryPlayerField.QUERYPLAYER_INT_EQUIP+index);
    }
	public SetEquip(index:number,val:number):void{
       this.SetUInt32(QueryPlayerField.QUERYPLAYER_INT_EQUIP+index, val);
    }


//////////////////////////////////////str function

	public GetName():string{
       return this.GetStr(QueryPlayerField.QUERYPLAYER_STR_NAME);
    }
	public SetName(val:string):void{
       this.SetStr(QueryPlayerField.QUERYPLAYER_STR_NAME, val);
    }


}////////////////////////////////////////////////////////////////
//CreatePlayer def
////////////////////////////////////////////////////////////////
export class CreatePlayerField extends core.obj.GuidObject{
// define

// int field

// string field


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//QueryBigDtFight def
////////////////////////////////////////////////////////////////
export class QueryBigDtFightField extends core.obj.GuidObject{
// define

// int field
	public static QUERYBIGDTFIGHT_INT_FORCE:number = 0 //战斗力
	public static QUERYBIGDTFIGHT_INT_SHOW_COAT:number = 1 //衣服
	public static QUERYBIGDTFIGHT_INT_SHOW_WEAPON:number = 2 //武器
	public static QUERYBIGDTFIGHT_INT_WINGS_LEVEL:number = 3 //翅膀

// string field
	public static QUERYBIGDTFIGHT_STR_NAME:number = 0 //名字


	public GetForce():number{
       return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_FORCE);
    }
	public SetForce(val:number):void{
       this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_FORCE, val);
    }


	public GetShowCoat():number{
       return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_COAT);
    }
	public SetShowCoat(val:number):void{
       this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_COAT, val);
    }


	public GetShowWeapon():number{
       return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_WEAPON);
    }
	public SetShowWeapon(val:number):void{
       this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_SHOW_WEAPON, val);
    }


	public GetWingsLevel():number{
       return this.GetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_WINGS_LEVEL);
    }
	public SetWingsLevel(val:number):void{
       this.SetUInt32(QueryBigDtFightField.QUERYBIGDTFIGHT_INT_WINGS_LEVEL, val);
    }


//////////////////////////////////////str function

	public GetName():string{
       return this.GetStr(QueryBigDtFightField.QUERYBIGDTFIGHT_STR_NAME);
    }
	public SetName(val:string):void{
       this.SetStr(QueryBigDtFightField.QUERYBIGDTFIGHT_STR_NAME, val);
    }


}////////////////////////////////////////////////////////////////
//QueryBigDt def
////////////////////////////////////////////////////////////////
export class QueryBigDtField extends core.obj.GuidObject{
// define

// int field
	public static QUERYBIGDT_INT_FORCE:number = 0 //战斗力

// string field
	public static QUERYBIGDT_STR_NAME:number = 0 //名字


	public GetForce():number{
       return this.GetUInt32(QueryBigDtField.QUERYBIGDT_INT_FORCE);
    }
	public SetForce(val:number):void{
       this.SetUInt32(QueryBigDtField.QUERYBIGDT_INT_FORCE, val);
    }


//////////////////////////////////////str function

	public GetName():string{
       return this.GetStr(QueryBigDtField.QUERYBIGDT_STR_NAME);
    }
	public SetName(val:string):void{
       this.SetStr(QueryBigDtField.QUERYBIGDT_STR_NAME, val);
    }


}////////////////////////////////////////////////////////////////
//PlayerData def
////////////////////////////////////////////////////////////////
export class PlayerDataField extends core.obj.GuidObject{
// define
	public static MAX_SPELL:number = 30 //最大技能槽数量
	public static MAX_SPELL_WEAR:number = 3 //最大可以技能
	public static SEX_MAN:number = 1 //男
	public static SEX_WOMAN:number = 2 //女
	public static SEX_GAY:number = 3 //无
	public static MONEY_TYPE_GOLD:number = 0 //元宝
	public static MONEY_TYPE_SILVER:number = 1 //银两
	public static PLAYER_MAX_LEVEL:number = 120 //玩家最大等级
	public static ONLINE_STATUS_OFFLINE:number = 0 //离线状态
	public static ONLINE_STATUS_ONLINE:number = 1 //在线状态
	public static ONLINE_STATUS_PLUGIN:number = 2 //离线挂机状态
	public static JJC_CUR_RANK:number = 1 //竞技场当前排名
	public static JJC_BEST_RANK:number = 2 //竞技场历史最佳排名
	public static GOLD_ENTRY:number = 6 //元宝的模板id
	public static SILVER_ENTRY:number = 7 //银子的模板id

// int field
	public static PLAYERDATA_INT_REG_TIME:number = 0 //玩家创建时间
	public static PLAYERDATA_INT_LAST_LOGIN_TIME:number = 1 //最后一次登录时间
	public static PLAYERDATA_INT_ONLINE_TIME:number = 2 //在线时长，分钟
	public static PLAYERDATA_INT_FIRST_RECHARGE_TIME:number = 3 //首充时间
	public static PLAYERDATA_INT_FIRST_RECHARGE_MONEY:number = 4 //首充金额
	public static PLAYERDATA_INT_BYTE0:number = 5 //0头像ID 1头像框ID 2性别
	public static PLAYERDATA_INT_BYTE1:number = 6 // 
	public static PLAYERDATA_INT_BYTE2:number = 7 //0.vip等级 1. LowZhaomuTimes2.HighZhaomuTimes 3.十次必出统计
	public static PLAYERDATA_INT_P_U160:number = 8 //0.体力
	public static PLAYERDATA_INT_FORCE:number = 9 //总战力？先放着不确定要不要
	public static PLAYERDATA_INT_MONEY_GOLD:number = 10 //元宝
	public static PLAYERDATA_INT_MONEY_SILVER:number = 11 //银两
	public static PLAYERDATA_INT_ZERO_RESET_TIME:number = 12 //12点重置时间
	public static PLAYERDATA_INT_GM_RECHARGE_ID:number = 13 //@充值用的自增id
	public static PLAYERDATA_INT_LAST_RECHARGE_TIME:number = 14 //最后一次充值时间
	public static PLAYERDATA_INT_LAST_CONSUME_TIME:number = 15 //最后一次消费时间
	public static PLAYERDATA_INT_IS_FCM:number = 16 //是否防沉迷
	public static PLAYERDATA_INT_FCM_ONLINE_TIME:number = 17 //防沉迷在线时长，分钟
	public static PLAYERDATA_INT_SHUT_UP_END_TIME:number = 18 //禁言截止时间
	public static PLAYERDATA_INT_LAST_ADD_POWER:number = 19 //最后加体力的时间
	public static PLAYERDATA_INT_LAST_ADD_JINGLI:number = 20 //最后加体力的时间
	public static PLAYERDATA_INT_SHENG_WANG:number = 21 //声望
	public static PLAYERDATA_INT_ZHAN_GONG:number = 22 //战功
	public static PLAYERDATA_INT_SHEN_HUN:number = 23 //神魂
	public static PLAYERDATA_INT_JIANG_HUN:number = 24 //将魂
	public static PLAYERDATA_INT_WEI_MING:number = 25 //威名
	public static PLAYERDATA_INT_ZHENG_TAO_LING:number = 26 //征讨令
	public static PLAYERDATA_INT_ZHEN_WEI:number = 27 //六个上阵的武将index
	public static PLAYERDATA_INT_YUAN_JUN:number = 30 //八个援军武将index
	public static PLAYERDATA_INT_TU_J_IAN_BONUS:number = 34 //图鉴奖励
	public static PLAYERDATA_INT_CUR_FU_BEN_ID:number = 38 //玩家当前副本通关id
	public static PLAYERDATA_INT_TOTAL_STARS:number = 39 //玩家副本星星数
	public static PLAYERDATA_INT_ZX_FU_BEN_TIMES:number = 40 //挑战次数
	public static PLAYERDATA_INT_ZX_FU_BEN_STARS:number = 540 //星星数
	public static PLAYERDATA_INT_ZX_FU_BEN_RESET_TIMES:number = 1040 //重置次数
	public static PLAYERDATA_INT_RC_FU_BEN_TIMES:number = 1540 //挑战次数
	public static PLAYERDATA_INT_RC_FU_BEN_DIFFICULTY:number = 1545 //通关难度
	public static PLAYERDATA_INT_RC_FU_BEN_RESET_TIMES:number = 1550 //重置次数
	public static PLAYERDATA_INT_BOSS_AWARD:number = 1555 //小boss奖励
	public static PLAYERDATA_INT_CHAPTER_AWARD:number = 1618 //章节奖励
	public static PLAYERDATA_INT_JJC_RANK:number = 1637 //0.竞技场当前排名 1.竞技场历史最佳排名
	public static PLAYERDATA_INT_JJC_STORE:number = 1638 //竞技场道具购买次数
	public static PLAYERDATA_INT_JJC_TIMES_LOG:number = 1663 //挑战时间
	public static PLAYERDATA_INT_JJC_RANK_LOG:number = 1683 //排名影响
	public static PLAYERDATA_INT_JJC_RESULT_LOG:number = 1693 //挑战结果
	public static PLAYERDATA_INT_JJC_TARGET_LOG:number = 1698 //挑战|被战
	public static PLAYERDATA_INT_JJC_LOG_FLAG:number = 1703 //挑战记录游标
	public static PLAYERDATA_INT_P_U161:number = 1704 //0.暗雷战斗场数 1.击败关卡boss数量
	public static PLAYERDATA_INT_P_U162:number = 1705 //0.今日击败野外boss数量 1.已经领取奖励的关卡id
	public static PLAYERDATA_INT_HUD_DARK_TIME:number = 1706 //最后一次暗雷战斗时间
	public static PLAYERDATA_INT_OFF_LINE_TIME:number = 1707 //离线时间戳
	public static PLAYERDATA_INT_P_U163:number = 1708 //0.通关小关卡id 1.可领取奖励的地图id

// string field
	public static PLAYERDATA_STR_NAME:number = 0 //玩家名字
	public static PLAYERDATA_STR_CREATE_I_P:number = 1 //玩家创建角色IP
	public static PLAYERDATA_STR_RECHARGE_ID:number = 2 //已充值ID
	public static PLAYERDATA_STR_JJC_NAME_LOG:number = 12 //挑战对手玩家名称


	public GetRegTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_REG_TIME);
    }
	public SetRegTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_REG_TIME, val);
    }


	public GetLastLoginTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_LOGIN_TIME);
    }
	public SetLastLoginTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_LOGIN_TIME, val);
    }


	public GetOnlineTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_ONLINE_TIME);
    }
	public SetOnlineTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_ONLINE_TIME, val);
    }


	public GetFirstRechargeTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_TIME);
    }
	public SetFirstRechargeTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_TIME, val);
    }


	public GetFirstRechargeMoney():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_MONEY);
    }
	public SetFirstRechargeMoney(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_FIRST_RECHARGE_MONEY, val);
    }


	public GetByte0(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, offset);
    }
	public SetByte0(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0, offset, val);
    }



	//0头像ID
	public GetHead():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0,0);
    }
	public SetHead(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0,0, val);
    }


	//1头像框ID
	public GetHeadFrame():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0,1);
    }
	public SetHeadFrame(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0,1, val);
    }


	//性别0男1女
	public GetSex():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE0,2);
    }
	public SetSex(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE0,2, val);
    }

	public GetByte1(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE1, offset);
    }
	public SetByte1(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE1, offset, val);
    }


	public GetByte2(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, offset);
    }
	public SetByte2(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2, offset, val);
    }



	//vip等级
	public GetVipLevel():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,0);
    }
	public SetVipLevel(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,0, val);
    }


	//低级免费招募次数
	public GetLowZhaomuTimes():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,1);
    }
	public SetLowZhaomuTimes(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,1, val);
    }


	//高级免费招募次数
	public GetHighZhaomuTimes():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,2);
    }
	public SetHighZhaomuTimes(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,2, val);
    }


	//十次必出当前次数
	public GetTenZhaomuTimes():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,3);
    }
	public SetTenZhaomuTimes(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_BYTE2,3, val);
    }

	public GetPU160(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_P_U160, offset);
    }
	public SetPU160(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_P_U160, offset, val);
    }



	//体力
	public GetPower():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_P_U160,0);
    }
	public SetPower(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_P_U160,0, val);
    }


	//精力
	public GetJingli():number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_P_U160,1);
    }
	public SetJingli(val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_P_U160,1, val);
    }

	public GetForce():number{
       return this.GetInt32(PlayerDataField.PLAYERDATA_INT_FORCE);
    }
	public SetForce(val:number):void{
       this.SetInt32(PlayerDataField.PLAYERDATA_INT_FORCE, val);
    }


	public GetMoneyGold():number{
       return this.GetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_GOLD);
    }
	public SetMoneyGold(val:number):void{
       this.SetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_GOLD, val);
    }


	public GetMoneySilver ():number{
       return this.GetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_SILVER);
    }
	public SetMoneySilver (val:number):void{
       this.SetInt32(PlayerDataField.PLAYERDATA_INT_MONEY_SILVER, val);
    }


	public GetZeroResetTime():number{
       return this.GetInt32(PlayerDataField.PLAYERDATA_INT_ZERO_RESET_TIME);
    }
	public SetZeroResetTime(val:number):void{
       this.SetInt32(PlayerDataField.PLAYERDATA_INT_ZERO_RESET_TIME, val);
    }


	public GetGmRechargeId():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_GM_RECHARGE_ID);
    }
	public SetGmRechargeId(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_GM_RECHARGE_ID, val);
    }


	public GetLastRechargeTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_RECHARGE_TIME);
    }
	public SetLastRechargeTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_RECHARGE_TIME, val);
    }


	public GetLastConsumeTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_CONSUME_TIME);
    }
	public SetLastConsumeTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_CONSUME_TIME, val);
    }


	public GetIsFcm():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_IS_FCM);
    }
	public SetIsFcm(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_IS_FCM, val);
    }


	public GetFcmOnlineTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_FCM_ONLINE_TIME);
    }
	public SetFcmOnlineTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_FCM_ONLINE_TIME, val);
    }


	public GetShutUpEndTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_SHUT_UP_END_TIME);
    }
	public SetShutUpEndTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_SHUT_UP_END_TIME, val);
    }


	public GetLastAddPower():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_POWER);
    }
	public SetLastAddPower(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_POWER, val);
    }


	public GetLastAddJingli():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_JINGLI);
    }
	public SetLastAddJingli(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_LAST_ADD_JINGLI, val);
    }


	public GetShengWang():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_SHENG_WANG);
    }
	public SetShengWang(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_SHENG_WANG, val);
    }


	public GetZhanGong():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_ZHAN_GONG);
    }
	public SetZhanGong(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_ZHAN_GONG, val);
    }


	public GetShenHun():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_SHEN_HUN);
    }
	public SetShenHun(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_SHEN_HUN, val);
    }


	public GetJiangHun():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_JIANG_HUN);
    }
	public SetJiangHun(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_JIANG_HUN, val);
    }


	public GetWeiMing():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_WEI_MING);
    }
	public SetWeiMing(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_WEI_MING, val);
    }


	public GetZhengTaoLing():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_ZHENG_TAO_LING);
    }
	public SetZhengTaoLing(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_ZHENG_TAO_LING, val);
    }


	public GetZhenWei(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_ZHEN_WEI+Math.floor(offset/2), offset%2);
    }
	public SetZhenWei(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_ZHEN_WEI+Math.floor(offset/2), offset%2, val);
    }


	public GetYuanJun(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_YUAN_JUN+Math.floor(offset/2), offset%2);
    }
	public SetYuanJun(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_YUAN_JUN+Math.floor(offset/2), offset%2, val);
    }


	public GetTuJIanBonus(offset:number):boolean{
       return this.GetBit(PlayerDataField.PLAYERDATA_INT_TU_J_IAN_BONUS, offset);
    }
	public SetTuJIanBonus(offset:number,val:boolean):void{
       this.SetBit(PlayerDataField.PLAYERDATA_INT_TU_J_IAN_BONUS, offset, val);
    }


	public GetCurFuBenId():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_CUR_FU_BEN_ID);
    }
	public SetCurFuBenId(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_CUR_FU_BEN_ID, val);
    }


	public GetTotalStars():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_TOTAL_STARS);
    }
	public SetTotalStars(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_TOTAL_STARS, val);
    }


	public GetZxFuBenTimes(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_TIMES+Math.floor(offset/4), offset%4);
    }
	public SetZxFuBenTimes(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_TIMES+Math.floor(offset/4), offset%4, val);
    }


	public GetZxFuBenStars(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_STARS+Math.floor(offset/4), offset%4);
    }
	public SetZxFuBenStars(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_STARS+Math.floor(offset/4), offset%4, val);
    }


	public GetZxFuBenResetTimes(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_RESET_TIMES+Math.floor(offset/4), offset%4);
    }
	public SetZxFuBenResetTimes(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_ZX_FU_BEN_RESET_TIMES+Math.floor(offset/4), offset%4, val);
    }


	public GetRcFuBenTimes(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_TIMES+Math.floor(offset/4), offset%4);
    }
	public SetRcFuBenTimes(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_TIMES+Math.floor(offset/4), offset%4, val);
    }


	public GetRcFuBenDifficulty(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_DIFFICULTY+Math.floor(offset/4), offset%4);
    }
	public SetRcFuBenDifficulty(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_DIFFICULTY+Math.floor(offset/4), offset%4, val);
    }


	public GetRcFuBenResetTimes(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_RESET_TIMES+Math.floor(offset/4), offset%4);
    }
	public SetRcFuBenResetTimes(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_RC_FU_BEN_RESET_TIMES+Math.floor(offset/4), offset%4, val);
    }


	public GetBossAward(offset:number):boolean{
       return this.GetBit(PlayerDataField.PLAYERDATA_INT_BOSS_AWARD, offset);
    }
	public SetBossAward(offset:number,val:boolean):void{
       this.SetBit(PlayerDataField.PLAYERDATA_INT_BOSS_AWARD, offset, val);
    }


	public GetChapterAward(offset:number):boolean{
       return this.GetBit(PlayerDataField.PLAYERDATA_INT_CHAPTER_AWARD, offset);
    }
	public SetChapterAward(offset:number,val:boolean):void{
       this.SetBit(PlayerDataField.PLAYERDATA_INT_CHAPTER_AWARD, offset, val);
    }


	public GetJjcRank(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, offset);
    }
	public SetJjcRank(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK, offset, val);
    }



	//竞技场当前排名
	public GetJjcCurRank():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK,0);
    }
	public SetJjcCurRank(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK,0, val);
    }


	//竞技场历史最佳排名
	public GetJjcBestRank():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK,1);
    }
	public SetJjcBestRank(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK,1, val);
    }

	public GetJjcStore(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_JJC_STORE+Math.floor(offset/4), offset%4);
    }
	public SetJjcStore(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_JJC_STORE+Math.floor(offset/4), offset%4, val);
    }


	public GetJjcTimesLog(index:number):number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_TIMES_LOG+index);
    }
	public SetJjcTimesLog(index:number,val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_TIMES_LOG+index, val);
    }


	public GetJjcRankLog(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK_LOG+Math.floor(offset/2), offset%2);
    }
	public SetJjcRankLog(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_JJC_RANK_LOG+Math.floor(offset/2), offset%2, val);
    }


	public GetJjcResultLog(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_JJC_RESULT_LOG+Math.floor(offset/4), offset%4);
    }
	public SetJjcResultLog(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_JJC_RESULT_LOG+Math.floor(offset/4), offset%4, val);
    }


	public GetJjcTargetLog(offset:number):number{
       return this.GetByte(PlayerDataField.PLAYERDATA_INT_JJC_TARGET_LOG+Math.floor(offset/4), offset%4);
    }
	public SetJjcTargetLog(offset:number,val:number):void{
       this.SetByte(PlayerDataField.PLAYERDATA_INT_JJC_TARGET_LOG+Math.floor(offset/4), offset%4, val);
    }


	public GetJjcLogFlag():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_LOG_FLAG);
    }
	public SetJjcLogFlag(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_JJC_LOG_FLAG, val);
    }


	public GetPU161(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, offset);
    }
	public SetPU161(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161, offset, val);
    }



	//暗雷战斗场数
	public GetHudDarkCount():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161,0);
    }
	public SetHudDarkCount(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161,0, val);
    }


	//击败关卡boss数量
	public GetHudBossCount():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161,1);
    }
	public SetHudBossCount(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U161,1, val);
    }

	public GetPU162(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, offset);
    }
	public SetPU162(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162, offset, val);
    }



	//今日击败野外boss数量
	public GetHudSBossCount():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162,0);
    }
	public SetHudSBossCount(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162,0, val);
    }


	//可领取奖励的小关卡id
	public GetHudPartBonusId():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162,1);
    }
	public SetHudPartBonusId(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U162,1, val);
    }

	public GetHudDarkTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_HUD_DARK_TIME);
    }
	public SetHudDarkTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_HUD_DARK_TIME, val);
    }


	public GetOffLineTime():number{
       return this.GetUInt32(PlayerDataField.PLAYERDATA_INT_OFF_LINE_TIME);
    }
	public SetOffLineTime(val:number):void{
       this.SetUInt32(PlayerDataField.PLAYERDATA_INT_OFF_LINE_TIME, val);
    }


	public GetPU163(offset:number):number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, offset);
    }
	public SetPU163(offset:number,val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163, offset, val);
    }



	//通关小关卡id
	public GetHudPartId():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163,0);
    }
	public SetHudPartId(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163,0, val);
    }


	//可领取奖励的地图id
	public GetHudMapBonusId():number{
       return this.GetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163,1);
    }
	public SetHudMapBonusId(val:number):void{
       this.SetUInt16(PlayerDataField.PLAYERDATA_INT_P_U163,1, val);
    }

//////////////////////////////////////str function

	public GetName():string{
       return this.GetStr(PlayerDataField.PLAYERDATA_STR_NAME);
    }
	public SetName(val:string):void{
       this.SetStr(PlayerDataField.PLAYERDATA_STR_NAME, val);
    }


	public GetCreateIP():string{
       return this.GetStr(PlayerDataField.PLAYERDATA_STR_CREATE_I_P);
    }
	public SetCreateIP(val:string):void{
       this.SetStr(PlayerDataField.PLAYERDATA_STR_CREATE_I_P, val);
    }


	public GetRechargeId(index:number):string{
       return this.GetStr(PlayerDataField.PLAYERDATA_STR_RECHARGE_ID+index);
    }
	public SetRechargeId(index:number,val:string):void{
       this.SetStr(PlayerDataField.PLAYERDATA_STR_RECHARGE_ID+index, val);
    }


	public GetJjcNameLog(index:number):string{
       return this.GetStr(PlayerDataField.PLAYERDATA_STR_JJC_NAME_LOG+index);
    }
	public SetJjcNameLog(index:number,val:string):void{
       this.SetStr(PlayerDataField.PLAYERDATA_STR_JJC_NAME_LOG+index, val);
    }


}////////////////////////////////////////////////////////////////
//PlatData def
////////////////////////////////////////////////////////////////
export class PlatDataField extends core.obj.GuidObject{
// define

// int field

// string field
	public static PLATDATA_STR_PLAT_DATA:number = 0 //平台数据


//////////////////////////////////////str function

	public GetPlatData():string{
       return this.GetStr(PlatDataField.PLATDATA_STR_PLAT_DATA);
    }
	public SetPlatData(val:string):void{
       this.SetStr(PlatDataField.PLATDATA_STR_PLAT_DATA, val);
    }


}////////////////////////////////////////////////////////////////
//Mail def
////////////////////////////////////////////////////////////////
export class MailField extends core.obj.GuidObject{
// define
	public static MAIL_STATE_NEW:number = 0 //新邮件
	public static MAIL_STATE_OPEN:number = 1 //已读邮件
	public static MAIL_STATE_NULL:number = 2 //已读空邮件
	public static MAX_MAIL:number = 100 //最大邮件数量

// int field
	public static MAIL_INT_MAX_MAIL_ID:number = 0 //最大邮件ID
	public static MAIL_INT_MAIL_BYTE:number = 1 //0邮件状态
	public static MAIL_INT_MAIL_EXP:number = 2 //经验
	public static MAIL_INT_MAIL_COPPER:number = 3 //铜钱
	public static MAIL_INT_MAIL_GOLD_BIND:number = 4 //绑元
	public static MAIL_INT_MAIL_GOLD:number = 5 //元宝
	public static MAIL_INT_MAIL_BEGIN_TIME:number = 6 //邮件开始时间
	public static MAIL_INT_MAIL_END_TIME:number = 7 //邮件结束时间
	public static MAIL_INT_ATTACH_ENTRY1:number = 8 //附件ID
	public static MAIL_INT_ATTACH_BYTE1:number = 9 //0是否绑定1数量
	public static MAIL_INT_ATTACH_ENTRY2:number = 10 //附件ID
	public static MAIL_INT_ATTACH_BYTE2:number = 11 //0是否绑定1数量
	public static MAIL_INT_ATTACH_ENTRY3:number = 12 //附件ID
	public static MAIL_INT_ATTACH_BYTE3:number = 13 //0是否绑定1数量
	public static MAIL_INT_ATTACH_ENTRY4:number = 14 //附件ID
	public static MAIL_INT_ATTACH_BYTE4:number = 15 //0是否绑定1数量
	public static MAIL_INT_ATTACH_ENTRY5:number = 16 //附件ID
	public static MAIL_INT_ATTACH_BYTE5:number = 17 //0是否绑定1数量
	public static MAIL_INT_ATTACH_ENTRY6:number = 18 //附件ID
	public static MAIL_INT_ATTACH_BYTE6:number = 19 //0是否绑定1数量

// string field
	public static MAIL_STR_SENDER:number = 0 //邮件标题
	public static MAIL_STR_TITLE:number = 1 //邮件标题
	public static MAIL_STR_DETAIL:number = 2 //邮件内容


	public GetMaxMailId():number{
       return this.GetUInt32(MailField.MAIL_INT_MAX_MAIL_ID);
    }
	public SetMaxMailId(val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAX_MAIL_ID, val);
    }


	public GetMailByte(offset:number):number{
       return this.GetByte(MailField.MAIL_INT_MAIL_BYTE, offset);
    }
	public SetMailByte(offset:number,val:number):void{
       this.SetByte(MailField.MAIL_INT_MAIL_BYTE, offset, val);
    }



	//邮件状态
	public GetMailState(index:number):number{
       return this.GetByte(MailField.MAIL_INT_MAIL_BYTE+index*19,0);
    }
	public SetMailState(index:number,val:number):void{
       this.SetByte(MailField.MAIL_INT_MAIL_BYTE+index*19,0, val);
    }

	public GetMailExp(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_MAIL_EXP+index*19);
    }
	public SetMailExp(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAIL_EXP+index*19, val);
    }


	public GetMailCopper(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_MAIL_COPPER+index*19);
    }
	public SetMailCopper(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAIL_COPPER+index*19, val);
    }


	public GetMailGoldBind(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_MAIL_GOLD_BIND+index*19);
    }
	public SetMailGoldBind(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAIL_GOLD_BIND+index*19, val);
    }


	public GetMailGold(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_MAIL_GOLD+index*19);
    }
	public SetMailGold(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAIL_GOLD+index*19, val);
    }


	public GetMailBeginTime(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_MAIL_BEGIN_TIME+index*19);
    }
	public SetMailBeginTime(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAIL_BEGIN_TIME+index*19, val);
    }


	public GetMailEndTime(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_MAIL_END_TIME+index*19);
    }
	public SetMailEndTime(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_MAIL_END_TIME+index*19, val);
    }


	public GetAttachEntry1(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY1+index*19);
    }
	public SetAttachEntry1(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY1+index*19, val);
    }


	public GetAttachByte1(offset:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE1, offset);
    }
	public SetAttachByte1(offset:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE1, offset, val);
    }



	//绑定状态
	public GetAttachBind1(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE1+index*19,0);
    }
	public SetAttachBind1(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE1+index*19,0, val);
    }


	//附件数量
	public GetAttachCount1(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE1+index*19,1);
    }
	public SetAttachCount1(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE1+index*19,1, val);
    }

	public GetAttachEntry2(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY2+index*19);
    }
	public SetAttachEntry2(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY2+index*19, val);
    }


	public GetAttachByte2(offset:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE2, offset);
    }
	public SetAttachByte2(offset:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE2, offset, val);
    }



	//绑定状态
	public GetAttachBind2(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE2+index*19,0);
    }
	public SetAttachBind2(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE2+index*19,0, val);
    }


	//附件数量
	public GetAttachCount2(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE2+index*19,1);
    }
	public SetAttachCount2(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE2+index*19,1, val);
    }

	public GetAttachEntry3(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY3+index*19);
    }
	public SetAttachEntry3(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY3+index*19, val);
    }


	public GetAttachByte3(offset:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE3, offset);
    }
	public SetAttachByte3(offset:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE3, offset, val);
    }



	//绑定状态
	public GetAttachBind3(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE3+index*19,0);
    }
	public SetAttachBind3(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE3+index*19,0, val);
    }


	//附件数量
	public GetAttachCount3(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE3+index*19,1);
    }
	public SetAttachCount3(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE3+index*19,1, val);
    }

	public GetAttachEntry4(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY4+index*19);
    }
	public SetAttachEntry4(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY4+index*19, val);
    }


	public GetAttachByte4(offset:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE4, offset);
    }
	public SetAttachByte4(offset:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE4, offset, val);
    }



	//绑定状态
	public GetAttachBind4(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE4+index*19,0);
    }
	public SetAttachBind4(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE4+index*19,0, val);
    }


	//附件数量
	public GetAttachCount4(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE4+index*19,1);
    }
	public SetAttachCount4(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE4+index*19,1, val);
    }

	public GetAttachEntry5(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY5+index*19);
    }
	public SetAttachEntry5(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY5+index*19, val);
    }


	public GetAttachByte5(offset:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE5, offset);
    }
	public SetAttachByte5(offset:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE5, offset, val);
    }



	//绑定状态
	public GetAttachBind5(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE5+index*19,0);
    }
	public SetAttachBind5(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE5+index*19,0, val);
    }


	//附件数量
	public GetAttachCount5(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE5+index*19,1);
    }
	public SetAttachCount5(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE5+index*19,1, val);
    }

	public GetAttachEntry6(index:number):number{
       return this.GetUInt32(MailField.MAIL_INT_ATTACH_ENTRY6+index*19);
    }
	public SetAttachEntry6(index:number,val:number):void{
       this.SetUInt32(MailField.MAIL_INT_ATTACH_ENTRY6+index*19, val);
    }


	public GetAttachByte6(offset:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE6, offset);
    }
	public SetAttachByte6(offset:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE6, offset, val);
    }



	//绑定状态
	public GetAttachBind6(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE6+index*19,0);
    }
	public SetAttachBind6(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE6+index*19,0, val);
    }


	//附件数量
	public GetAttachCount6(index:number):number{
       return this.GetUInt16(MailField.MAIL_INT_ATTACH_BYTE6+index*19,1);
    }
	public SetAttachCount6(index:number,val:number):void{
       this.SetUInt16(MailField.MAIL_INT_ATTACH_BYTE6+index*19,1, val);
    }

//////////////////////////////////////str function

	public GetSender(index:number):string{
       return this.GetStr(MailField.MAIL_STR_SENDER+index*3);
    }
	public SetSender(index:number,val:string):void{
       this.SetStr(MailField.MAIL_STR_SENDER+index*3, val);
    }


	public GetTitle(index:number):string{
       return this.GetStr(MailField.MAIL_STR_TITLE+index*3);
    }
	public SetTitle(index:number,val:string):void{
       this.SetStr(MailField.MAIL_STR_TITLE+index*3, val);
    }


	public GetDetail(index:number):string{
       return this.GetStr(MailField.MAIL_STR_DETAIL+index*3);
    }
	public SetDetail(index:number,val:string):void{
       this.SetStr(MailField.MAIL_STR_DETAIL+index*3, val);
    }


}////////////////////////////////////////////////////////////////
//Equip def
////////////////////////////////////////////////////////////////
export class EquipField extends core.obj.GuidObject{
// define
	public static EQUIP_POS_WEAPON:number = 0 //武器
	public static EQUIP_POS_TOUKUI:number = 1 //头盔
	public static EQUIP_POS_YAODAI:number = 2 //腰带
	public static EQUIP_POS_COAT:number = 3 //衣服
	public static EQUIP_POS_BAOWU_GONG:number = 4 //攻击宝物
	public static EQUIP_POS_BAOWU_FANG:number = 5 //防御宝物
	public static MAX_EQUIP:number = 6 //装备位置
	public static EQUIP_BAG_TYPE_WEAR:number = 0 //装备装备
	public static EQUIP_BAG_TYPE_PACK:number = 1 //装备背包
	public static MAX_EQUIP_BAG_TYPE:number = 2 //装备背包最大枚举
	public static MAX_EQUIP_BAG_SIZE_0:number = 100 //装备格装备
	public static MAX_EQUIP_BAG_SIZE_1:number = 1000 //背包装备
	public static MAX_EQUIP_POS:number = 10 //一个武将位的最大装备数
	public static MAX_EQUIP_INT:number = 10 //物品binlog的int最大部分
	public static EQUIPMENT_OPT_WEAR:number = 1 //穿戴
	public static EQUIPMENT_OPT_DUMP:number = 2 //卸下

// int field
	public static EQUIP_INT_EQUIP_ENTRY:number = 0 //装备模板ID
	public static EQUIP_INT_EQUIP_FAIL_TIME:number = 1 //失效时间
	public static EQUIP_INT_EQUIP_FLAG:number = 2 //装备bit位
	public static EQUIP_INT_EQUIP_BYTE:number = 3 //装备byte位
	public static EQUIP_INT_EQUIP_UINT16:number = 4 //装备int16位
	public static EQUIP_INT_EQUIP_STRONG_EXP:number = 5 //强化经验
	public static EQUIP_INT_EQUIP_JINGLIAN_EXP:number = 6 //精炼经验

// string field


	public GetEquipEntry(index:number):number{
       return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_ENTRY+index*10);
    }
	public SetEquipEntry(index:number,val:number):void{
       this.SetUInt32(EquipField.EQUIP_INT_EQUIP_ENTRY+index*10, val);
    }


	public GetEquipFailTime(index:number):number{
       return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_FAIL_TIME+index*10);
    }
	public SetEquipFailTime(index:number,val:number):void{
       this.SetUInt32(EquipField.EQUIP_INT_EQUIP_FAIL_TIME+index*10, val);
    }


	public GetEquipFlag(offset:number):boolean{
       return this.GetBit(EquipField.EQUIP_INT_EQUIP_FLAG, offset);
    }
	public SetEquipFlag(offset:number,val:boolean):void{
       this.SetBit(EquipField.EQUIP_INT_EQUIP_FLAG, offset, val);
    }


	public GetEquipByte(offset:number):number{
       return this.GetByte(EquipField.EQUIP_INT_EQUIP_BYTE, offset);
    }
	public SetEquipByte(offset:number,val:number):void{
       this.SetByte(EquipField.EQUIP_INT_EQUIP_BYTE, offset, val);
    }


	public GetEquipUint16(offset:number):number{
       return this.GetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16, offset);
    }
	public SetEquipUint16(offset:number,val:number):void{
       this.SetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16, offset, val);
    }



	//强化等级
	public GetEquipStrongLv(index:number):number{
       return this.GetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16+index*10,0);
    }
	public SetEquipStrongLv(index:number,val:number):void{
       this.SetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16+index*10,0, val);
    }


	//精炼等级
	public GetEquipJinglianLv(index:number):number{
       return this.GetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16+index*10,1);
    }
	public SetEquipJinglianLv(index:number,val:number):void{
       this.SetUInt16(EquipField.EQUIP_INT_EQUIP_UINT16+index*10,1, val);
    }

	public GetEquipStrongExp(index:number):number{
       return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_STRONG_EXP+index*10);
    }
	public SetEquipStrongExp(index:number,val:number):void{
       this.SetUInt32(EquipField.EQUIP_INT_EQUIP_STRONG_EXP+index*10, val);
    }


	public GetEquipJinglianExp(index:number):number{
       return this.GetUInt32(EquipField.EQUIP_INT_EQUIP_JINGLIAN_EXP+index*10);
    }
	public SetEquipJinglianExp(index:number,val:number):void{
       this.SetUInt32(EquipField.EQUIP_INT_EQUIP_JINGLIAN_EXP+index*10, val);
    }


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//Jjc def
////////////////////////////////////////////////////////////////
export class JjcField extends core.obj.GuidObject{
// define
	public static MAX_SHOW_RANK:number = 5000 //最大显示排名
	public static MAX_TRUE_RANK:number = 500 //最大真实排名

// int field
	public static JJC_INT_JJC_FORCE:number = 0 //战斗力
	public static JJC_INT_JJC_HEAD:number = 500 //竞技场头像
	public static JJC_INT_JJC_LV:number = 625 //竞技场等级

// string field
	public static JJC_STR_JJC_GUID:number = 0 //竞技场guid
	public static JJC_STR_JJC_NAME:number = 500 //竞技场名字
	public static JJC_STR_JJC_FIGHT_STR:number = 1000 //战斗串


	public GetJjcForce(index:number):number{
       return this.GetUInt32(JjcField.JJC_INT_JJC_FORCE+index);
    }
	public SetJjcForce(index:number,val:number):void{
       this.SetUInt32(JjcField.JJC_INT_JJC_FORCE+index, val);
    }


	public GetJjcHead(offset:number):number{
       return this.GetByte(JjcField.JJC_INT_JJC_HEAD+Math.floor(offset/4), offset%4);
    }
	public SetJjcHead(offset:number,val:number):void{
       this.SetByte(JjcField.JJC_INT_JJC_HEAD+Math.floor(offset/4), offset%4, val);
    }


	public GetJjcLv(offset:number):number{
       return this.GetUInt16(JjcField.JJC_INT_JJC_LV+Math.floor(offset/2), offset%2);
    }
	public SetJjcLv(offset:number,val:number):void{
       this.SetUInt16(JjcField.JJC_INT_JJC_LV+Math.floor(offset/2), offset%2, val);
    }


//////////////////////////////////////str function

	public GetJjcGuid(index:number):string{
       return this.GetStr(JjcField.JJC_STR_JJC_GUID+index);
    }
	public SetJjcGuid(index:number,val:string):void{
       this.SetStr(JjcField.JJC_STR_JJC_GUID+index, val);
    }


	public GetJjcName(index:number):string{
       return this.GetStr(JjcField.JJC_STR_JJC_NAME+index);
    }
	public SetJjcName(index:number,val:string):void{
       this.SetStr(JjcField.JJC_STR_JJC_NAME+index, val);
    }


	public GetJjcFightStr(index:number):string{
       return this.GetStr(JjcField.JJC_STR_JJC_FIGHT_STR+index);
    }
	public SetJjcFightStr(index:number,val:string):void{
       this.SetStr(JjcField.JJC_STR_JJC_FIGHT_STR+index, val);
    }


}////////////////////////////////////////////////////////////////
//GangMain def
////////////////////////////////////////////////////////////////
export class GangMainField extends core.obj.GuidObject{
// define
	public static GANG_MEMBER:number = 0 //成员
	public static GANG_FUHUIZHANG:number = 1 //副会长
	public static GANG_HUIZHANG:number = 2 //会长
	public static DYNAMIC_JOIN:number = 0 //加入
	public static DYNAMIC_EXIT:number = 1 //退出
	public static LOW_JUAN_TYPE:number = 1 //普通捐献
	public static HIGH_JUAN_TYPE:number = 2 //高级捐选
	public static SUPER_JUAN_TYPE:number = 3 //顶级捐献
	public static GANG_LOG_TYPE_JOIN:number = 1 //加入帮派
	public static GANG_LOG_TYPE_QUIT:number = 2 //退出帮派
	public static GANG_LOG_TYPE_ZHIWEI:number = 3 //职位更变
	public static GANG_LOG_TYPE_JUANXIAN:number = 4 //帮派捐献

// int field
	public static GANGMAIN_INT_GANG_BYTE:number = 0 // 0等级 1当前人数 2动态信息游标
	public static GANGMAIN_INT_CREATE_TIME:number = 1 //创建时间
	public static GANGMAIN_INT_EXP:number = 2 //帮派经验
	public static GANGMAIN_INT_NEED_FORCE:number = 3 //入帮战力门槛
	public static GANGMAIN_INT_FORCE:number = 5 //帮派总战力
	public static GANGMAIN_INT_JX_JINDU:number = 7 //捐献进度
	public static GANGMAIN_INT_RESET_TIME:number = 8 //重置时间
	public static GANGMAIN_INT_MEMBER_BYTE:number = 9 //0在线 1职务 2 头像 3VIP等级
	public static GANGMAIN_INT_MEMBER_DEVOTE:number = 10 //最大贡献
	public static GANGMAIN_INT_MEMBER_LEVEL:number = 11 //等级
	public static GANGMAIN_INT_MEMBER_TODAY_JX:number = 12 //今日捐献
	public static GANGMAIN_INT_MEMBER_TOTAL_JX:number = 13 //累计捐献
	public static GANGMAIN_INT_MEMBER_FORCE:number = 14 //成员战斗力
	public static GANGMAIN_INT_MEMBER_JOIN_TIME:number = 15 //入帮时间
	public static GANGMAIN_INT_ZHAN_WEI:number = 16 //成员信息占位

// string field
	public static GANGMAIN_STR_NAME:number = 0 //帮派名称
	public static GANGMAIN_STR_MASTER_NAME:number = 1 //帮主名称
	public static GANGMAIN_STR_MASTER_GUID:number = 2 //帮主GUID
	public static GANGMAIN_STR_NOTICE:number = 3 //帮派公告
	public static GANGMAIN_STR_DYNAMIC_INFO:number = 4 //帮派动态信息
	public static GANGMAIN_STR_MEMBER_NAME:number = 24 //成员名称
	public static GANGMAIN_STR_MEMBER_GUID:number = 25 //成员GUID
	public static GANGMAIN_STR_STR_ZHAN_WEI:number = 26 //str成员信息占位


	public GetGangByte(offset:number):number{
       return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, offset);
    }
	public SetGangByte(offset:number,val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE, offset, val);
    }



	//帮派等级
	public GetLevel():number{
       return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE,0);
    }
	public SetLevel(val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE,0, val);
    }


	//帮派当前人数
	public GetMembersCount():number{
       return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE,1);
    }
	public SetMembersCount(val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE,1, val);
    }


	//动态信息游标
	public GetDynamicInfoIndex():number{
       return this.GetByte(GangMainField.GANGMAIN_INT_GANG_BYTE,2);
    }
	public SetDynamicInfoIndex(val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_GANG_BYTE,2, val);
    }

	public GetCreateTime():number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_CREATE_TIME);
    }
	public SetCreateTime(val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_CREATE_TIME, val);
    }


	public GetExp():number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_EXP);
    }
	public SetExp(val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_EXP, val);
    }


	public GetNeedForce():number{
       return this.GetDouble(GangMainField.GANGMAIN_INT_NEED_FORCE);
    }
	public SetNeedForce(val:number):void{
       this.SetDouble(GangMainField.GANGMAIN_INT_NEED_FORCE, val);
    }


	public GetForce():number{
       return this.GetDouble(GangMainField.GANGMAIN_INT_FORCE);
    }
	public SetForce(val:number):void{
       this.SetDouble(GangMainField.GANGMAIN_INT_FORCE, val);
    }


	public GetJxJindu():number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_JX_JINDU);
    }
	public SetJxJindu(val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_JX_JINDU, val);
    }


	public GetResetTime():number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_RESET_TIME);
    }
	public SetResetTime(val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_RESET_TIME, val);
    }


	public GetMemberByte(offset:number):number{
       return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE, offset);
    }
	public SetMemberByte(offset:number,val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE, offset, val);
    }



	//在线情况
	public GetMemberOnline(index:number):number{
       return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,0);
    }
	public SetMemberOnline(index:number,val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,0, val);
    }


	//职位
	public GetMemberZhiWei(index:number):number{
       return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,1);
    }
	public SetMemberZhiWei(index:number,val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,1, val);
    }


	//头像
	public GetMemberHead(index:number):number{
       return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,2);
    }
	public SetMemberHead(index:number,val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,2, val);
    }


	//vip等级
	public GetMemberVip(index:number):number{
       return this.GetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,2);
    }
	public SetMemberVip(index:number,val:number):void{
       this.SetByte(GangMainField.GANGMAIN_INT_MEMBER_BYTE+index*7,2, val);
    }

	public GetMemberDevote(index:number):number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_DEVOTE+index*7);
    }
	public SetMemberDevote(index:number,val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_DEVOTE+index*7, val);
    }


	public GetMemberLevel(index:number):number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_LEVEL+index*7);
    }
	public SetMemberLevel(index:number,val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_LEVEL+index*7, val);
    }


	public GetMemberTodayJx(index:number):number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TODAY_JX+index*7);
    }
	public SetMemberTodayJx(index:number,val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TODAY_JX+index*7, val);
    }


	public GetMemberTotalJx(index:number):number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TOTAL_JX+index*7);
    }
	public SetMemberTotalJx(index:number,val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_TOTAL_JX+index*7, val);
    }


	public GetMemberForce():number{
       return this.GetDouble(GangMainField.GANGMAIN_INT_MEMBER_FORCE);
    }
	public SetMemberForce(val:number):void{
       this.SetDouble(GangMainField.GANGMAIN_INT_MEMBER_FORCE, val);
    }


	public GetMemberJoinTime(index:number):number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_MEMBER_JOIN_TIME+index*7);
    }
	public SetMemberJoinTime(index:number,val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_MEMBER_JOIN_TIME+index*7, val);
    }


	public GetZhanWei(index:number):number{
       return this.GetUInt32(GangMainField.GANGMAIN_INT_ZHAN_WEI+index);
    }
	public SetZhanWei(index:number,val:number):void{
       this.SetUInt32(GangMainField.GANGMAIN_INT_ZHAN_WEI+index, val);
    }


//////////////////////////////////////str function

	public GetName():string{
       return this.GetStr(GangMainField.GANGMAIN_STR_NAME);
    }
	public SetName(val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_NAME, val);
    }


	public GetMasterName():string{
       return this.GetStr(GangMainField.GANGMAIN_STR_MASTER_NAME);
    }
	public SetMasterName(val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_MASTER_NAME, val);
    }


	public GetMasterGuid():string{
       return this.GetStr(GangMainField.GANGMAIN_STR_MASTER_GUID);
    }
	public SetMasterGuid(val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_MASTER_GUID, val);
    }


	public GetNotice():string{
       return this.GetStr(GangMainField.GANGMAIN_STR_NOTICE);
    }
	public SetNotice(val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_NOTICE, val);
    }


	public GetDynamicInfo(index:number):string{
       return this.GetStr(GangMainField.GANGMAIN_STR_DYNAMIC_INFO+index);
    }
	public SetDynamicInfo(index:number,val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_DYNAMIC_INFO+index, val);
    }


	public GetMemberName(index:number):string{
       return this.GetStr(GangMainField.GANGMAIN_STR_MEMBER_NAME+index*2);
    }
	public SetMemberName(index:number,val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_MEMBER_NAME+index*2, val);
    }


	public GetMemberGuid(index:number):string{
       return this.GetStr(GangMainField.GANGMAIN_STR_MEMBER_GUID+index*2);
    }
	public SetMemberGuid(index:number,val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_MEMBER_GUID+index*2, val);
    }


	public GetStrZhanWei(index:number):string{
       return this.GetStr(GangMainField.GANGMAIN_STR_STR_ZHAN_WEI+index);
    }
	public SetStrZhanWei(index:number,val:string):void{
       this.SetStr(GangMainField.GANGMAIN_STR_STR_ZHAN_WEI+index, val);
    }


}////////////////////////////////////////////////////////////////
//WuJiang def
////////////////////////////////////////////////////////////////
export class WuJiangField extends core.obj.GuidObject{
// define
	public static HP:number = 1 //血量
	public static ATK:number = 2 //物理攻击
	public static MAGIC_ATTACK:number = 3 //魔法攻击
	public static DEF:number = 4 //物理防御
	public static MAGIC_DEF:number = 5 //魔法防御
	public static CRIT:number = 6 //暴击	
	public static CRIT_DEF:number = 7 //抗暴击
	public static HIT:number = 8 //命中
	public static EVA:number = 9 //闪避
	public static DAMGE_BONUS:number = 10 //伤害加成
	public static DAMGE_REDUCE :number = 11 //免伤
	public static FACTION_DAMGE_BONUS:number = 12 //阵营伤害加成
	public static FACTION_DAMGE_REDUCE :number = 13 //阵营免伤
	public static PVP_DAMGE_BONUS:number = 14 //PVP伤害加成
	public static PVP_DAMGE_REDUCE :number = 15 //PVP免伤
	public static MIE_WEI:number = 16 //灭魏
	public static KANG_WEI :number = 17 //抗魏
	public static MIE_SHU:number = 18 //灭蜀
	public static KANG_SHU :number = 19 //抗蜀
	public static MIE_WU:number = 20 //灭吴
	public static KANG_WU:number = 21 //抗吴
	public static MIE_QUN:number = 22 //灭群
	public static KANG_QUN :number = 23 //抗群
	public static ZHAOMU_LOW:number = 0 //普通招募
	public static ZHAOMU_HIGH:number = 1 //高级招募
	public static MAX_ZHEN_WEI:number = 6 //最大阵位
	public static MAX_YUAN_JUN:number = 8 //最大援军

// int field
	public static WUJIANG_INT_BYTE0:number = 0 //0主将标志1突破等级
	public static WUJIANG_INT_WJ_ENTRY:number = 1 //武将模板ID
	public static WUJIANG_INT_W_U160:number = 2 //0.武将等级 1.天命等级
	public static WUJIANG_INT_EXP:number = 3 //当前经验
	public static WUJIANG_INT_W_U161:number = 4 //0.培养丹使用数量 
	public static WUJIANG_INT_W_U162:number = 5 //0.觉醒等级 1.觉醒星级
	public static WUJIANG_INT_ATK_PEIYANG:number = 6 //攻击培养值
	public static WUJIANG_INT_HP_PEIYANG:number = 7 //生命培养值
	public static WUJIANG_INT_DEF_PEIYANG:number = 8 //防御培养值
	public static WUJIANG_INT_MAGIC_DEF_PEIYANG:number = 9 //法防培养值
	public static WUJIANG_INT_W_U163:number = 10 //当前攻击培养值 当前生命培养值
	public static WUJIANG_INT_W_U164:number = 11 //当前防御培养值 当前法防培养值

// string field


	public GetByte0(offset:number):number{
       return this.GetByte(WuJiangField.WUJIANG_INT_BYTE0, offset);
    }
	public SetByte0(offset:number,val:number):void{
       this.SetByte(WuJiangField.WUJIANG_INT_BYTE0, offset, val);
    }



	//是不是主武将0不是1是
	public GetIsMainWujiang(index:number):number{
       return this.GetByte(WuJiangField.WUJIANG_INT_BYTE0+index*50,0);
    }
	public SetIsMainWujiang(index:number,val:number):void{
       this.SetByte(WuJiangField.WUJIANG_INT_BYTE0+index*50,0, val);
    }


	//突破等级
	public GetTupoLevel(index:number):number{
       return this.GetByte(WuJiangField.WUJIANG_INT_BYTE0+index*50,1);
    }
	public SetTupoLevel(index:number,val:number):void{
       this.SetByte(WuJiangField.WUJIANG_INT_BYTE0+index*50,1, val);
    }

	public GetWjEntry(index:number):number{
       return this.GetUInt32(WuJiangField.WUJIANG_INT_WJ_ENTRY+index*50);
    }
	public SetWjEntry(index:number,val:number):void{
       this.SetUInt32(WuJiangField.WUJIANG_INT_WJ_ENTRY+index*50, val);
    }


	public GetWU160(offset:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U160, offset);
    }
	public SetWU160(offset:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U160, offset, val);
    }



	//武将等级
	public GetWjLevel(index:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U160+index*50,0);
    }
	public SetWjLevel(index:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U160+index*50,0, val);
    }


	//天命等级
	public GetTmLevel(index:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U160+index*50,1);
    }
	public SetTmLevel(index:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U160+index*50,1, val);
    }

	public GetExp(index:number):number{
       return this.GetUInt32(WuJiangField.WUJIANG_INT_EXP+index*50);
    }
	public SetExp(index:number,val:number):void{
       this.SetUInt32(WuJiangField.WUJIANG_INT_EXP+index*50, val);
    }


	public GetWU161(offset:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U161, offset);
    }
	public SetWU161(offset:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U161, offset, val);
    }



	//培养丹使用数量
	public GetCultureCount(index:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U161+index*50,0);
    }
	public SetCultureCount(index:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U161+index*50,0, val);
    }

	public GetWU162(offset:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U162, offset);
    }
	public SetWU162(offset:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U162, offset, val);
    }



	//觉醒等级
	public GetJxLevel(index:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U162+index*50,0);
    }
	public SetJxLevel(index:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U162+index*50,0, val);
    }


	//觉醒星级
	public GetJxStar(index:number):number{
       return this.GetUInt16(WuJiangField.WUJIANG_INT_W_U162+index*50,1);
    }
	public SetJxStar(index:number,val:number):void{
       this.SetUInt16(WuJiangField.WUJIANG_INT_W_U162+index*50,1, val);
    }

	public GetAtkPeiyang(index:number):number{
       return this.GetUInt32(WuJiangField.WUJIANG_INT_ATK_PEIYANG+index*50);
    }
	public SetAtkPeiyang(index:number,val:number):void{
       this.SetUInt32(WuJiangField.WUJIANG_INT_ATK_PEIYANG+index*50, val);
    }


	public GetHpPeiyang(index:number):number{
       return this.GetUInt32(WuJiangField.WUJIANG_INT_HP_PEIYANG+index*50);
    }
	public SetHpPeiyang(index:number,val:number):void{
       this.SetUInt32(WuJiangField.WUJIANG_INT_HP_PEIYANG+index*50, val);
    }


	public GetDefPeiyang(index:number):number{
       return this.GetUInt32(WuJiangField.WUJIANG_INT_DEF_PEIYANG+index*50);
    }
	public SetDefPeiyang(index:number,val:number):void{
       this.SetUInt32(WuJiangField.WUJIANG_INT_DEF_PEIYANG+index*50, val);
    }


	public GetMagicDefPeiyang(index:number):number{
       return this.GetUInt32(WuJiangField.WUJIANG_INT_MAGIC_DEF_PEIYANG+index*50);
    }
	public SetMagicDefPeiyang(index:number,val:number):void{
       this.SetUInt32(WuJiangField.WUJIANG_INT_MAGIC_DEF_PEIYANG+index*50, val);
    }


	public GetWU163(offset:number):number{
       return this.GetInt16(WuJiangField.WUJIANG_INT_W_U163, offset);
    }
	public SetWU163(offset:number,val:number):void{
       this.SetInt16(WuJiangField.WUJIANG_INT_W_U163, offset, val);
    }



	//觉醒等级
	public GetCurAtkPeiyang(index:number):number{
       return this.GetInt16(WuJiangField.WUJIANG_INT_W_U163+index*50,0);
    }
	public SetCurAtkPeiyang(index:number,val:number):void{
       this.SetInt16(WuJiangField.WUJIANG_INT_W_U163+index*50,0, val);
    }


	//觉醒星级
	public GetCurHpPeiyang(index:number):number{
       return this.GetInt16(WuJiangField.WUJIANG_INT_W_U163+index*50,1);
    }
	public SetCurHpPeiyang(index:number,val:number):void{
       this.SetInt16(WuJiangField.WUJIANG_INT_W_U163+index*50,1, val);
    }

	public GetWU164(offset:number):number{
       return this.GetInt16(WuJiangField.WUJIANG_INT_W_U164, offset);
    }
	public SetWU164(offset:number,val:number):void{
       this.SetInt16(WuJiangField.WUJIANG_INT_W_U164, offset, val);
    }



	//觉醒等级
	public GetCurDefPeiyang(index:number):number{
       return this.GetInt16(WuJiangField.WUJIANG_INT_W_U164+index*50,0);
    }
	public SetCurDefPeiyang(index:number,val:number):void{
       this.SetInt16(WuJiangField.WUJIANG_INT_W_U164+index*50,0, val);
    }


	//觉醒星级
	public GetCurMagicDefPeiyang(index:number):number{
       return this.GetInt16(WuJiangField.WUJIANG_INT_W_U164+index*50,1);
    }
	public SetCurMagicDefPeiyang(index:number,val:number):void{
       this.SetInt16(WuJiangField.WUJIANG_INT_W_U164+index*50,1, val);
    }

//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//Social def
////////////////////////////////////////////////////////////////
export class SocialField extends core.obj.GuidObject{
// define
	public static MAX_ENEMY:number = 100 //最大仇人数量
	public static MAX_FRIEND:number = 100 //最大好友数量

// int field
	public static SOCIAL_INT_ENEMY_VAL:number = 0 //仇恨值
	public static SOCIAL_INT_ENEMY_HEAD:number = 100 //仇人头像
	public static SOCIAL_INT_ENEMY_LEVEL:number = 125 //仇人等级
	public static SOCIAL_INT_ENEMY_FORCE:number = 225 //仇人战斗力
	public static SOCIAL_INT_ENEMY_STATE:number = 325 //仇人战斗力
	public static SOCIAL_INT_FRIEND_HEAD:number = 425 //好友头像
	public static SOCIAL_INT_FRIEND_LEVEL:number = 450 //好友等级
	public static SOCIAL_INT_FRIEND_STATE:number = 550 //好友状态
	public static SOCIAL_INT_FRIEND_FORCE:number = 575 //好友战斗力

// string field
	public static SOCIAL_STR_ENEMY_NAME:number = 0 //仇人名字
	public static SOCIAL_STR_ENEMY_GUID:number = 100 //仇人guid
	public static SOCIAL_STR_FRIEND_NAME:number = 200 //好友名字
	public static SOCIAL_STR_FRIEND_GUID:number = 300 //好友guid


	public GetEnemyVal(index:number):number{
       return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_VAL+index);
    }
	public SetEnemyVal(index:number,val:number):void{
       this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_VAL+index, val);
    }


	public GetEnemyHead(offset:number):number{
       return this.GetByte(SocialField.SOCIAL_INT_ENEMY_HEAD+Math.floor(offset/4), offset%4);
    }
	public SetEnemyHead(offset:number,val:number):void{
       this.SetByte(SocialField.SOCIAL_INT_ENEMY_HEAD+Math.floor(offset/4), offset%4, val);
    }


	public GetEnemyLevel(index:number):number{
       return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_LEVEL+index);
    }
	public SetEnemyLevel(index:number,val:number):void{
       this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_LEVEL+index, val);
    }


	public GetEnemyForce(index:number):number{
       return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_FORCE+index);
    }
	public SetEnemyForce(index:number,val:number):void{
       this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_FORCE+index, val);
    }


	public GetEnemyState(index:number):number{
       return this.GetUInt32(SocialField.SOCIAL_INT_ENEMY_STATE+index);
    }
	public SetEnemyState(index:number,val:number):void{
       this.SetUInt32(SocialField.SOCIAL_INT_ENEMY_STATE+index, val);
    }


	public GetFriendHead(offset:number):number{
       return this.GetByte(SocialField.SOCIAL_INT_FRIEND_HEAD+Math.floor(offset/4), offset%4);
    }
	public SetFriendHead(offset:number,val:number):void{
       this.SetByte(SocialField.SOCIAL_INT_FRIEND_HEAD+Math.floor(offset/4), offset%4, val);
    }


	public GetFriendLevel(index:number):number{
       return this.GetUInt32(SocialField.SOCIAL_INT_FRIEND_LEVEL+index);
    }
	public SetFriendLevel(index:number,val:number):void{
       this.SetUInt32(SocialField.SOCIAL_INT_FRIEND_LEVEL+index, val);
    }


	public GetFriendState(offset:number):number{
       return this.GetByte(SocialField.SOCIAL_INT_FRIEND_STATE+Math.floor(offset/4), offset%4);
    }
	public SetFriendState(offset:number,val:number):void{
       this.SetByte(SocialField.SOCIAL_INT_FRIEND_STATE+Math.floor(offset/4), offset%4, val);
    }


	public GetFriendForce(index:number):number{
       return this.GetUInt32(SocialField.SOCIAL_INT_FRIEND_FORCE+index);
    }
	public SetFriendForce(index:number,val:number):void{
       this.SetUInt32(SocialField.SOCIAL_INT_FRIEND_FORCE+index, val);
    }


//////////////////////////////////////str function

	public GetEnemyName(index:number):string{
       return this.GetStr(SocialField.SOCIAL_STR_ENEMY_NAME+index);
    }
	public SetEnemyName(index:number,val:string):void{
       this.SetStr(SocialField.SOCIAL_STR_ENEMY_NAME+index, val);
    }


	public GetEnemyGuid(index:number):string{
       return this.GetStr(SocialField.SOCIAL_STR_ENEMY_GUID+index);
    }
	public SetEnemyGuid(index:number,val:string):void{
       this.SetStr(SocialField.SOCIAL_STR_ENEMY_GUID+index, val);
    }


	public GetFriendName(index:number):string{
       return this.GetStr(SocialField.SOCIAL_STR_FRIEND_NAME+index);
    }
	public SetFriendName(index:number,val:string):void{
       this.SetStr(SocialField.SOCIAL_STR_FRIEND_NAME+index, val);
    }


	public GetFriendGuid(index:number):string{
       return this.GetStr(SocialField.SOCIAL_STR_FRIEND_GUID+index);
    }
	public SetFriendGuid(index:number,val:string):void{
       this.SetStr(SocialField.SOCIAL_STR_FRIEND_GUID+index, val);
    }


}////////////////////////////////////////////////////////////////
//Loots def
////////////////////////////////////////////////////////////////
export class LootsField extends core.obj.GuidObject{
// define
	public static LOOT_FIELD_BEGIN:number = 4 //个体开始的下标
	public static LOOT_ENTRY:number = 0 //模板
	public static LOOT_COUNT:number = 1 //数量
	public static LOOT_OWNER:number = 2 //所有者
	public static MAX_LOOT_FIELD:number = 3 //个体下标数量
	public static LOOT_WIDTH:number = 2 //单个战利品宽度
	public static LOOTS_WIDTH:number = 10 //掉落对象宽度

// int field

// string field


//////////////////////////////////////str function

}////////////////////////////////////////////////////////////////
//PlayGang def
////////////////////////////////////////////////////////////////
export class PlayGangField extends core.obj.GuidObject{
// define

// int field
	public static PLAYGANG_INT_GANG_GONG_XIAN:number = 0 //帮派贡献
	public static PLAYGANG_INT_GANG_SPELL_LV:number = 1 //帮派技能等级
	public static PLAYGANG_INT_JL_MALL:number = 4 //奖励商品终身限购标志
	public static PLAYGANG_INT_XS_MALL:number = 5 //限时商品购买数量
	public static PLAYGANG_INT_DJ_MALL_COUNT:number = 7 //道具商店购买数量
	public static PLAYGANG_INT_FB_BYTE:number = 11 //0今日副本次数 1今日购买次数
	public static PLAYGANG_INT_FB_CHAPTER_BONUS:number = 12 //副本通关奖励领取标志
	public static PLAYGANG_INT_JIN_DU_BONUS:number = 16 //今日进度领取
	public static PLAYGANG_INT_FB_BZ_BONUS:number = 17 //今日宝藏领取标志 开始章节在帮派
	public static PLAYGANG_INT_GANG_EXIT_TIME:number = 25 //退出帮派时间

// string field
	public static PLAYGANG_STR_GANG_I_D:number = 0 //帮派GUID


	public GetGangGongXian():number{
       return this.GetUInt32(PlayGangField.PLAYGANG_INT_GANG_GONG_XIAN);
    }
	public SetGangGongXian(val:number):void{
       this.SetUInt32(PlayGangField.PLAYGANG_INT_GANG_GONG_XIAN, val);
    }


	public GetGangSpellLv(offset:number):number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_GANG_SPELL_LV+Math.floor(offset/4), offset%4);
    }
	public SetGangSpellLv(offset:number,val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_GANG_SPELL_LV+Math.floor(offset/4), offset%4, val);
    }


	public GetJlMall(offset:number):boolean{
       return this.GetBit(PlayGangField.PLAYGANG_INT_JL_MALL, offset);
    }
	public SetJlMall(offset:number,val:boolean):void{
       this.SetBit(PlayGangField.PLAYGANG_INT_JL_MALL, offset, val);
    }


	public GetXsMall(offset:number):number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_XS_MALL+Math.floor(offset/4), offset%4);
    }
	public SetXsMall(offset:number,val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_XS_MALL+Math.floor(offset/4), offset%4, val);
    }


	public GetDjMallCount(offset:number):number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_DJ_MALL_COUNT+Math.floor(offset/4), offset%4);
    }
	public SetDjMallCount(offset:number,val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_DJ_MALL_COUNT+Math.floor(offset/4), offset%4, val);
    }


	public GetFbByte(offset:number):number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, offset);
    }
	public SetFbByte(offset:number,val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE, offset, val);
    }



	//0今日副本次数
	public GetFbTimes():number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE,0);
    }
	public SetFbTimes(val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE,0, val);
    }


	//1今日购买次数
	public GetFbBuyTimes():number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE,1);
    }
	public SetFbBuyTimes(val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE,1, val);
    }


	//2今日捐献次数
	public GetJuanXianTimes():number{
       return this.GetByte(PlayGangField.PLAYGANG_INT_FB_BYTE,2);
    }
	public SetJuanXianTimes(val:number):void{
       this.SetByte(PlayGangField.PLAYGANG_INT_FB_BYTE,2, val);
    }

	public GetFbChapterBonus(offset:number):boolean{
       return this.GetBit(PlayGangField.PLAYGANG_INT_FB_CHAPTER_BONUS, offset);
    }
	public SetFbChapterBonus(offset:number,val:boolean):void{
       this.SetBit(PlayGangField.PLAYGANG_INT_FB_CHAPTER_BONUS, offset, val);
    }


	public GetJinDuBonus(offset:number):boolean{
       return this.GetBit(PlayGangField.PLAYGANG_INT_JIN_DU_BONUS, offset);
    }
	public SetJinDuBonus(offset:number,val:boolean):void{
       this.SetBit(PlayGangField.PLAYGANG_INT_JIN_DU_BONUS, offset, val);
    }


	public GetFbBzBonus(offset:number):boolean{
       return this.GetBit(PlayGangField.PLAYGANG_INT_FB_BZ_BONUS, offset);
    }
	public SetFbBzBonus(offset:number,val:boolean):void{
       this.SetBit(PlayGangField.PLAYGANG_INT_FB_BZ_BONUS, offset, val);
    }


	public GetGangExitTime():number{
       return this.GetUInt32(PlayGangField.PLAYGANG_INT_GANG_EXIT_TIME);
    }
	public SetGangExitTime(val:number):void{
       this.SetUInt32(PlayGangField.PLAYGANG_INT_GANG_EXIT_TIME, val);
    }


//////////////////////////////////////str function

	public GetGangID():string{
       return this.GetStr(PlayGangField.PLAYGANG_STR_GANG_I_D);
    }
	public SetGangID(val:string):void{
       this.SetStr(PlayGangField.PLAYGANG_STR_GANG_I_D, val);
    }


}}