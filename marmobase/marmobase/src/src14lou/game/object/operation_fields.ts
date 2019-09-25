class Operation_Fields {
	//操作错误类型
	public static OPRATE_LOGIN:number = 1 //登录操作错误类型
	public static OPRATE_LOGIN_SUCCESS:number = 1 //成功
	public static OPRATE_LOGIN_SIGN_ERR:number = 2 //sign错误
	public static OPRATE_LOGIN_TIMEOUT:number = 3 //超时
	public static OPRATE_LOGIN_ACCOUNT_ERR:number = 4 //账号错误
	public static OPRATE_LOGIN_SEX_ERR:number = 5 //性别错误
	public static OPRATE_LOGIN_NAME_ERR:number = 6 //昵称错误
	public static OPRATE_LOGIN_NAME_FUCK_PINGBI:number = 7 //昵称有非法词
	public static OPRATE_LOGIN_NAME_EXIST:number = 8 //昵称已存在
	public static OPRATE_LOGIN_OTHER_ONLINE:number = 9 //其他在线中
	public static OPRATE_LOGIN_RECONNECTION:number = 10 //断线重连
	public static OPRATE_LOGIN_TELEPORT_FAIL:number = 11 //传送失败
	public static OPRATE_LOGIN_KICK_PLAYER:number = 12 //踢下线
	public static OPRATE_LOGIN_LOCK_IP:number = 13 //封IP
	public static OPRATE_LOGIN_LOCK_INFO:number = 14 //封账号
	public static OPRATE_LOGIN_NOTICE_OTHER_LOGIN1:number = 15 //提示他人自己登陆当前账号
	public static OPRATE_LOGIN_NOTICE_OTHER_LOGIN2:number = 16 //提示自己其他人登陆当前账号
	public static OPRATE_LOGIN_FORCE_RELOGIN:number = 17 //允许强制重新登陆
	//操作错误类型
	public static OPRATE_QUSET:number = 2 //任务操作错误类型
	public static OPRATE_QUSET_SUCCESS:number = 1 //成功
	public static OPRATE_QUSET_ALREADY_HAD_QUEST:number = 2 //已经有这个任务了
	public static OPRATE_QUSET_COMPLETED:number = 3 //已经完成过的
	public static OPRATE_QUSET_SLOT_FULL:number = 4 //任务槽满了
	public static OPRATE_QUSET_ACCOUNT_ERR:number = 5 //账号错误
	public static OPRATE_QUSET_TEMP_NIL:number = 6 //找不到任务模板
	public static OPRATE_QUSET_NEED_PREV:number = 7 //需要前置任务
	public static OPRATE_QUSET_STATUS_ERROR:number = 8 //任务状态不对
	public static OPRATE_QUSET_PARM_ERROR:number = 9 //参数错误
	public static OPRATE_QUSET_LEVEL_LESS:number = 10 //等级太低
	public static OPRATE_QUSET_HAS_DALIY:number = 11 //已经有了
	public static OPRATE_QUSET_TEN_STAR:number = 12 //已经十星了
	public static OPRATE_QUSET_MONEY_LESS:number = 13 //钱不够
	public static OPRATE_QUSET_NOT_DALIY:number = 14 //没有日常
	public static OPRATE_QUSET_PROGRESS_LESS:number = 15 //进度少了
	public static OPRATE_QUSET_TIMES_FULL:number = 16 //次数满了
	public static OPRATE_QUSET_TEN_STAR_SUCCESS:number = 17 //满星成功
	public static OPRATE_QUSET_ACCEPT_SUCCESS:number = 18 //接受日环任务成功
	public static OPRATE_QUSET_ADD_PROESS_SUCCESS:number = 19 //加任务进度成功
	public static OPRATE_QUSET_NO_PROESS_QUEST:number = 20 //不是可以加进度的任务
	//操作错误类型
	public static OPRATE_ITEM:number = 3 //物品操作错误类型
	public static OPRATE_ITEM_SUCCESS:number = 1 //成功
	public static OPRATE_ITEM_BAG_FULL:number = 2 //背包已满
	public static OPRATE_ITEM_BAG_NIL:number = 3 //包裹不存在
	public static OPRATE_ITEM_TEMPLATE_ERROR:number = 4 //找不到模板数据
	public static OPRATE_ITEM_COUNT_ERROR:number = 5 //操作数量错误
	public static OPRATE_ITEM_NOT_BUY:number = 6 //无法购买
	public static OPRATE_ITEM_MONEY_NOT_ENOUGH:number = 7 //金钱不足
	public static OPRATE_ITEM_BAG_TYPE_ERROR:number = 8 //背包类型不对
	public static OPRATE_ITEM_ITEM_NIL:number = 9 //物品不存在
	public static OPRATE_ITEM_NOT_SELL:number = 10 //无法出售
	public static OPRATE_ITEM_POS_ERR:number = 11 //位置错误
	public static OPRATE_ITEM_POPO_REWARD:number = 12 //奖励弹窗
	public static OPRATE_ITEM_WEAR_SUCCESS:number = 13 //穿戴成功
	public static OPRATE_ITEM_POPO_REWARD_NOT_CLOSE:number = 14 //奖励弹窗_不自动关闭
	public static OPRATE_ITEM_NOT_ENOUGH:number = 15 //材料不足，操作失败
	public static OPRATE_ITEM_SELL_SUCCESS:number = 16 //出售成功
	//操作错误类型
	public static OPRATE_MAIL:number = 4 //邮件操作操作错误类型
	public static OPRATE_MAIL_SUCCESS:number = 1 //成功
	public static OPRATE_MAIL_ATTACH_NOT_NULL:number = 2 //附件没空
	public static OPRATE_MAIL_BAG_POS_NOT_ENOUGH:number = 3 //包裹位置不够
	public static OPRATE_MAIL_INDEX_EEROR:number = 4 //包裹索引错误
	public static OPRATE_MAIL_TIME_OVER:number = 5 //到期了
	public static OPRATE_MAIL_NOT_BEGIN:number = 6 //没到时间
	//操作错误类型
	public static OPRATE_USE_ITEM:number = 5 //使用物品操作错误类型
	public static OPRATE_USE_ITEM_BAG_TYPE_ERROR:number = 1 //只能在主包裹使用物品
	public static OPRATE_USE_ITEM_EMPTY_POS:number = 2 //这个位置没有物品
	public static OPRATE_USE_ITEM_TEMP_NIL:number = 3 //找不到模板
	public static OPRATE_USE_ITEM_NOT_XIAOHAO:number = 4 //不是消耗品
	public static OPRATE_USE_ITEM_USE_FAIL:number = 5 //没有使用物品的函数
	public static OPRATE_USE_ITEM_EMPTY_POS_NOT_ENOUGH:number = 6 //空位不足
	public static OPRATE_USE_ITEM_CANT_BATCH_USE:number = 7 //不能批量使用的物品
	public static OPRATE_USE_ITEM_LEVEL_NOT_ENOUGH:number = 8 //等级不足
	//操作错误类型
	public static OPRATE_HECHENG:number = 6 //合成操作错误类型
	public static OPRATE_HECHENG_SUCCESS:number = 1 //成功
	public static OPRATE_HECHENG_ITEM_TEMP_NIL:number = 2 //物品模板找不到
	public static OPRATE_HECHENG_EMPTY_POS_NOT_ENOUGH:number = 3 //空位不足
	public static OPRATE_HECHENG_TEMP_NIL:number = 4 //找不到模板
	public static OPRATE_HECHENG_SUIPIAN_LESS:number = 5 //碎片不够
	public static OPRATE_HECHENG_NOT_SUIPIAN:number = 6 //这玩意就不是碎片
	//操作错误类型
	public static OPRATE_SOCIAL:number = 7 //社交操作错误类型
	//操作错误类型
	public static OPRATE_KUAFU:number = 8 //跨服相关操作错误类型
	public static OPRATE_KUAFU_1V1_RESULT:number = 1 //1V1胜负
	public static OPRATE_KUAFU_REG_CANEL_FAIL:number = 2 //取消失败
	public static OPRATE_KUAFU_REG_CANEL_SUCESS:number = 3 //取消成功
	public static OPRATE_KUAFU_REG_TIME_ERROR:number = 4 //不在活动时间内
	public static OPRATE_KUAFU_MAX_COUNT:number = 5 //参加次数已满
	public static OPRATE_KUAFU_LEVEL_LESS:number = 6 //等级不足
	//操作错误类型
	public static OPRATE_CHAT:number = 9 //聊天操作错误类型
	public static OPRATE_CHAT_ERROR_TYPE:number = 1 //发言类型不对
	public static OPRATE_CHAT_ERROR_LEVEL:number = 2 //等级不足
	public static OPRATE_CHAT_ERROR_GANG:number = 3 //没有帮派
	public static OPRATE_CHAT_ERROR_CONTENT:number = 4 //无发言内容
	public static OPRATE_CHAT_SHUTUP:number = 5 //禁言
	public static OPRATE_CHAT_COOLING:number = 6 //发言冷却中
	//操作错误类型
	public static OPRATE_ZHAOMU:number = 10 //招募操作错误类型
	public static OPRATE_ZHAOMU_POS_LESS:number = 1 //武将空位不够
	public static OPRATE_ZHAOMU_ZHAOMU_LOW_NOT_TEN:number = 2 //低级抽没有十连抽
	public static OPRATE_ZHAOMU_CAILIAO_LESS:number = 3 //招募材料不够
	//操作错误类型
	public static OPRATE_CLOSE:number = 11 //关闭客户端操作错误类型
	public static OPRATE_CLOSE_LOCK_INFO:number = 1 //封账号
	public static OPRATE_CLOSE_LOCK_IP:number = 2 //封IP
	public static OPRATE_CLOSE_KICK_PLAYER:number = 3 //踢下线
	public static OPRATE_CLOSE_SIGN_ERR:number = 4 //sign错误
	public static OPRATE_CLOSE_ACCOUNT_ERR:number = 5 //账号错误
	public static OPRATE_CLOSE_TO_SERVER_ERR:number = 6 //进入的服务器错误
	public static OPRATE_CLOSE_MERGE:number = 7 //本服已经被合服
	public static OPRATE_CLOSE_TIMEOUT:number = 8 //超时
	public static OPRATE_CLOSE_FORCE_RELOGIN:number = 9 //允许强制重新登陆
	public static OPRATE_CLOSE_OTHER_ONLINE:number = 10 //其他在线中
	public static OPRATE_CLOSE_JOIN_MAP_FAIL:number = 11 //进入地图失败
	public static OPRATE_CLOSE_TELEPORT_NOT_DATA:number = 12 //传送找不到玩家或者找不到地图
	public static OPRATE_CLOSE_RESET_PLAYER_DATA:number = 13 //玩家被回档
	//操作错误类型
	public static OPRATE_MERGE:number = 12 //合服操作错误类型
	public static OPRATE_MERGE_MERGING:number = 1 //合服中
	//操作错误类型
	public static OPRATE_GAME_UPDATE:number = 13 //游戏更新操作错误类型
	public static OPRATE_GAME_UPDATE_SUCCESS:number = 1 //更新成功，需要刷新
	//操作错误类型
	public static OPRATE_EQUIP:number = 14 //装备相关操作错误类型
	public static OPRATE_EQUIP_STRENG_SUCCESS:number = 1 //强化成功
	public static OPRATE_EQUIP_JINGLIAN_SUCCESS:number = 2 //精炼成功
	public static OPRATE_EQUIP_CAILIAO_NOT_ENOUGH:number = 3 //材料不足
	public static OPRATE_EQUIP_EQUIPMENT_SUCCESS:number = 4 //操作成功
	public static OPRATE_EQUIP_INDEX_NIL:number = 5 //没有该位置
	public static OPRATE_EQUIP_EQUIP_NIL:number = 6 //没有该装备
	public static OPRATE_EQUIP_TEMP_NIL:number = 7 //找不到模板
	public static OPRATE_EQUIP_PLAYLV_LESS:number = 8 //玩家等级不够
	public static OPRATE_EQUIP_LV_MAX:number = 9 //等级达到上限
	public static OPRATE_EQUIP_BAOWU_EXP_LESS:number = 10 //消耗宝物经验不足
	public static OPRATE_EQUIP_BAOWU_EXP_ADD:number = 11 //经验增加
	//操作错误类型
	public static OPRATE_WUJIANG:number = 15 //武将相关操作错误类型
	public static OPRATE_WUJIANG_BUZHEN_SUCCESS:number = 1 //布阵成功
	public static OPRATE_WUJIANG_IS_BUZHEN:number = 2 //该武将已经上阵
	public static OPRATE_WUJIANG_UPGRADE_SUCCESS:number = 3 //升级成功
	public static OPRATE_WUJIANG_TUOP_SUCCESS:number = 4 //突破成功
	//操作错误类型
	public static OPRATE_JJC:number = 16 //竞技场相关操作错误类型
	public static OPRATE_JJC_TEMP_NIL:number = 1 //找不到模板
	public static OPRATE_JJC_RANK_LESS:number = 2 //玩家排名不符合条件
	public static OPRATE_JJC_LIMIT_MAX:number = 3 //达到道具购买上限
	public static OPRATE_JJC_SHENGWANG_LESS:number = 4 //达到道具购买上限
	public static OPRATE_JJC_JINGLI_LESS:number = 5 //精力不够
	public static OPRATE_JJC_SUCCESS:number = 6 //挑战成功
	public static OPRATE_JJC_BAG_LESS:number = 7 //背包空间不足
	public static OPRATE_JJC_BUY_SUCCESS:number = 8 //购买成功
	public static OPRATE_JJC_LV_LESS:number = 9 //等级不足
	public static OPRATE_JJC_DATA_WRONG:number = 10 //数据异常
	public static OPRATE_JJC_TIME_LOCK:number = 11 //该排名玩家正在被挑战
	//操作错误类型
	public static OPRATE_FUBEN:number = 17 //副本操作错误类型
	public static OPRATE_FUBEN_SUCCESS:number = 1 //挑战成功
	public static OPRATE_FUBEN_SAODANG_SUCCESS:number = 2 //扫荡挑战成功
	public static OPRATE_FUBEN_FAIL:number = 3 //挑战失败
	public static OPRATE_FUBEN_RC_SUCCESS:number = 4 //日常副本挑战成功
	public static OPRATE_FUBEN_RC_SAODANG_SUCCESS:number = 5 //日常副本扫荡挑战成功
	public static OPRATE_FUBEN_RC_FAIL:number = 6 //日常副本挑战失败
	public static OPRATE_FUBEN_AWARE_SUCCESS:number = 7 //领取成功
	public static OPRATE_FUBEN_RESET_SUCCESS:number = 8 //重置成功
	//操作错误类型
	public static OPRATE_TUJIAN:number = 18 //图鉴操作错误类型
	public static OPRATE_TUJIAN_AWARE_SUCCESS:number = 1 //领取成功
	public static OPRATE_TUJIAN_HAS_AWARE_FAIL:number = 2 //已领取过奖励
	public static OPRATE_TUJIAN_NO_WUJIANG_FAIL:number = 3 //没有足够的武将
	//操作错误类型
	public static OPRATE_DUOBAO:number = 19 //夺宝操作错误类型
	public static OPRATE_DUOBAO_SUCCESS:number = 1 //挑战成功
	public static OPRATE_DUOBAO_FAIL:number = 2 //挑战失败
	//操作错误类型
	public static OPRATE_HUISHOU:number = 20 //回收操作错误类型
	public static OPRATE_HUISHOU_NOT_RESOLVE_MIAN:number = 1 //主将不能分解
	public static OPRATE_HUISHOU_NOT_RESOLVE_SHANGZHEN:number = 2 //上阵武将不能分解
	public static OPRATE_HUISHOU_NOT_RESOLVE_EQUIP:number = 3 //已装备不能分解
	public static OPRATE_HUISHOU_TEMP_NIL:number = 4 //找不到模板
	public static OPRATE_HUISHOU_WUJIANG_NIL:number = 5 //该位置没有武将
	public static OPRATE_HUISHOU_EQUIP_NIL:number = 6 //该位置没有装备
	public static OPRATE_HUISHOU_BAOWU_NIL:number = 7 //该位置没有宝物
	//操作错误类型
	public static OPRATE_PEIYANG:number = 21 //回收操作错误类型
	public static OPRATE_PEIYANG_SUCCESS:number = 1 //成功
	public static OPRATE_PEIYANG_PARMS_ERROR:number = 2 //参数错误
	public static OPRATE_PEIYANG_WUJIANG_NIL:number = 3 //该位置没有武将
	public static OPRATE_PEIYANG_TEMP_NIL:number = 4 //找不到模板
	public static OPRATE_PEIYANG_LEVEL_LESS:number = 5 //等级不够
	public static OPRATE_PEIYANG_ATTR_FULL:number = 6 //属性满了
	public static OPRATE_PEIYANG_CAILIAO_LESS:number = 7 //材料
	//操作错误类型
	public static OPRATE_PEIYANGAPPLY:number = 22 //培养操作错误类型
	public static OPRATE_PEIYANGAPPLY_SUCCESS:number = 1 //成功
	public static OPRATE_PEIYANGAPPLY_PARMS_ERROR:number = 2 //参数错误
	public static OPRATE_PEIYANGAPPLY_TEMP_NIL:number = 3 //找不到模板
	public static OPRATE_PEIYANGAPPLY_WUJIANG_NIL:number = 4 //该位置没有武将
	//操作错误类型
	public static OPRATE_GANG:number = 23 //家族操作错误类型
	public static OPRATE_GANG_LEVEL_ERROR:number = 1 //等级不足
	public static OPRATE_GANG_GOLD_NOT_ENOUGH:number = 2 //金钱不足
	public static OPRATE_GANG_CREATE_NAME_LEN_ERROR:number = 3 //名字长度
	public static OPRATE_GANG_CREATE_NAME_REPEAT:number = 4 //名字重复
	public static OPRATE_GANG_NAME_ERROR:number = 5 //名字内屏蔽词
	public static OPRATE_GANG_CREATE_SUCCESS:number = 6 //帮派创建成功
	public static OPRATE_GANG_HAS_GANG:number = 7 //已有帮派
	public static OPRATE_GANG_JOIN_CD:number = 8 //加入CD
	public static OPRATE_GANG_NIL:number = 9 //帮派不存在
	public static OPRATE_GANG_FORCE_ERROR:number = 10 //战斗力不足
	public static OPRATE_GANG_GANG_FULL:number = 11 //帮派已满
	public static OPRATE_GANG_EXIT_GANG_HUIZHANG:number = 12 //帮主·别瞎搞
	public static OPRATE_GANG_EXIT_SUCCESS:number = 13 //退出成功
	public static OPRATE_GANG_NOT_MASTER:number = 14 //没有权限
	public static OPRATE_GANG_NOTICE_TOO_LONG:number = 15 //公告太长
	public static OPRATE_GANG_NOTICE_ERROR:number = 16 //公告内容有屏蔽词
	public static OPRATE_GANG_EDIT_NOTICE_SUCCESS:number = 17 //编辑成功
	public static OPRATE_GANG_PARMS_ERROR:number = 18 //数据异常
	public static OPRATE_GANG_EDIT_ZHIWEI_SAME:number = 19 //职位相同
	public static OPRATE_GANG_EDIT_NOT_GANG_HUIZHANG:number = 20 //不是帮主
	public static OPRATE_GANG_NO_PLAYER:number = 21 //没有玩家
	public static OPRATE_GANG_EDIT_ZHIWEI_LOW:number = 22 //职位太低
	public static OPRATE_GANG_EDIT_ZHIWEI_FULL:number = 23 //职位已满
	public static OPRATE_GANG_EDIT_ZHI_WEI_SUCCESS:number = 24 //任命成功
	public static OPRATE_GANG_VIP_LEVEL:number = 25 //vip等级不足
	public static OPRATE_GANG_MONEY_LOW:number = 26 //货币不足
	public static OPRATE_GANG_DONATE_SUCCESS:number = 27 //捐献成功
	public static OPRATE_GANG_NOT_JUANXIAN:number = 28 //没有捐献
	public static OPRATE_GANG_IS_TO_DAY_JOIN:number = 29 //入帮当天不能操作
	public static OPRATE_GANG_GANG_LEVEL_ERROR:number = 30 //家族等级不足
	public static OPRATE_GANG_BUY_COUNT_LOW:number = 31 //购买次数不足
	public static OPRATE_GANG_GONGXIAN_LOW:number = 32 //贡献不足
	public static OPRATE_GANG_INDEX_ITEM_NIL:number = 33 //没有商品
	public static OPRATE_GANG_TEMP_NIL:number = 34 //未找到表数据
	public static OPRATE_GANG_JUNTUAN_DIE:number = 35 //军团已死亡
	public static OPRATE_GANG_TIAOZHAO_COUNT:number = 36 //挑战次数不足
	public static OPRATE_GANG_TIME_ERROR:number = 37 //不在活动时间内
	public static OPRATE_GANG_FUBEN_ERROR:number = 38 //副本错误
	public static OPRATE_GANG_TIMES_LOW:number = 39 //次数不足
	public static OPRATE_GANG_CHAPTER_ERROR:number = 40 //章节未通关
	public static OPRATE_GANG_NOT_BONUS:number = 41 //奖励已被瓜分完
	public static OPRATE_GANG_YILINGQU:number = 42 //已领取
}
