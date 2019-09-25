/** 传说的状态（探索状态） */
enum LegendState {
    /** 不可传说 */
    NoLegend = 0,
    /** 可传说 */
    CanLegend = 1,
    /** 已传说 */
    Legend = 2,
    /** 成功 */
    LegendSuccess = 3,
    /** 失败 */
    LegendFailure = 4
};
/** 任务类型 */
enum TaskType {
    /** 道具相关（寻物、珍宝、鉴宝等等） */
    Item = 4,
    /** 寻宠 */
    Pet = 5,
    /** 挑战 */
    NPC = 9
};
/** 任务状态 */
enum TaskState {
    /** 已成功，(已提交) */
    SUCCESS = 1,
    /** 已失败 */
    FAIL = 2,
    /** 已完成 */
    DONE = 3,
    /** 未完成 */
    UNDONE = 4,
    /** 已放弃 */
    ABANDONED = 5,
    /** 回收 */
    RECYCLE = 6,
    /** 副本中放弃 */
    INSTANCE_ABANDONED = 7
};
/** 上交对象类型 */
enum SubmitType {
    /** 物品 */
    ITEM = 1,
    /** 宠物 */
    PET = 2,
    /** 金钱 */
    MONEY = 3,
    /** 公会银箱 */
    FACTION_MONEY_BOX = 4,
    /** 银箱 */
    FAMILY_MONEY_BOX = 5,
    /** 副本玩法内的提交物品 */
    INSTANCE_ZONE_ITEM = 13,
    /** 公会副本玩法内的提交物品 */
    GUILD_ZONE_ITEM = 22
}
module game.modules.tianjixianling.models {
    /** 天机仙令model */
    export class TianJiXianLingModel {
        /** 存放天机仙令随机任务配置数据 */
        public tjxlConfig: Object = {};
        /** 寻找物品类配置表数据 */
        public findItemConfig: Object = {};
        /** 收集物品类配置表数据 */
        public collectItemConfig: Object = {};
        /** 存放天机仙令某轮的任务数据 */
        public someRoundTasks: Array<any> = [];
        /** 天机仙令信息数据 */
        public tjxlInfoData = new TianJiXianLingDataVo();
        /** 完成任务的角色id */
        public completedTaskRoleId:any;
        /** 任务栏位 */
        public taskPos:number;


        public static _instance: TianJiXianLingModel;
        public static getInstance(): TianJiXianLingModel {
            if (!this._instance) {
                this._instance = new TianJiXianLingModel();
            }
            return this._instance;
        }
        public static clearModelData(): void {
            tianjixianling.models.TianJiXianLingModel._instance.someRoundTasks = [];
            tianjixianling.models.TianJiXianLingModel._instance.tjxlInfoData = new TianJiXianLingDataVo();
            tianjixianling.models.TianJiXianLingModel._instance.completedTaskRoleId = 0;
            tianjixianling.models.TianJiXianLingModel._instance.taskPos = -1;
        }
        /**
         * 获取探索任务所要跳转地图的id
         * @param index 处于探索状态的任务索引
         */
        public getExploreTaskMapId(index: number): number {
            /** 玩家等级 */
            var _roleLevel = HudModel._instance.levelNum;
            /** 临时地图id */
            var _tempMapId: number;
            /** 任务id */
            var _taskId: number = this.someRoundTasks[index]["id"];
            /** 任务类型下标 */
            var _group = this.tjxlConfig[_taskId]["group"];
            /** 寻找物品类配置表数据key */
            var _dataKeys = Object.keys(this.findItemConfig);
            for (let i = 0; i < _dataKeys.length; i++) {
                if (this.findItemConfig[_dataKeys[i]]["ctgroup"] == _group) {//如果寻找物品类分表中寻找物品组与天机仙令任务配置表中的任务类型下标值相等
                    if (this.findItemConfig[_dataKeys[i]]["levelmin"] <= _roleLevel && _roleLevel <= this.findItemConfig[_dataKeys[i]]["levelmax"]) {//并且当前玩家的等级符合要求
                        var _mapid: string = this.collectItemConfig[_dataKeys[i]]["mapid"];
                        _mapid = _mapid.replace("@100", "");
                        _tempMapId = Number(_mapid);
                    }
                }
            }
            return _tempMapId;
        }
        /**
         * 提交目标（道具、装备、宠物等）
         * @param itemid 目标id
         * @param taskid 天机仙令任务id
         * @param useapp 
         * @param useUI 
         */
        public submitTarget(itemid: any, taskid: any, useapp: any, useUI: any): void {
            /** 任务类型 */
            var tasktype = this.tjxlConfig[taskid]["tasktype"];
            if (tasktype == TaskType.Item) {
                /** 道具上交界面 */
                var _taskItemChooseMediator = new game.modules.task.TaskItemChooseMediator(useapp);
                _taskItemChooseMediator.init(itemid, useUI);
            }
            else if (tasktype == TaskType.Pet) {
                /** 宠物上交界面 */
                var _taskPetChooseMediator = new game.modules.task.TaskPetChooseMediator(useapp);
                _taskPetChooseMediator.init(taskid, 0, SubmitType.PET,itemid);//第二参数为零，是在天机仙令上交宠物不需要NPC
            }
        }
        /**
         * 判断玩家拥有宠物的数量
         * @param petId 宠物id
         */
        public checkOwnPetNum(petId: number): number {
            /** 临时计数 */
            var _tempCount: number = 0;
            /** 拥有的所有的宠物 */
            var _pets = game.modules.pet.models.PetModel._instance.pets;
            var _petsKeys = _pets.keys;
            /** 当前所选中的出战宠物索引 */
            let _petIndex = game.modules.createrole.models.LoginModel.getInstance().roleDetail.petIndex;
            for (let i = 0; i < _petsKeys.length; i++) {//遍历循环
                let _petId = _pets.get(_petsKeys[i])["id"];
                if (_petId == petId && _petsKeys[i] != _petIndex) {//如果有并且不是出战的宠物
                    _tempCount++;//计数加一
                }
            }
            return _tempCount;
        }
        /**
         * 得到商店类型
         * @param id  物品id（物品包括在酒馆、药品商店、兵器铺所出售的）
         */
        public getShopType(id): number {
            /** 道具复合表 */
            var _itemAttrData = bag.models.BagModel._instance.itemAttrData;
            /** 售卖道具相应商店类型 */
            var _shopType = _itemAttrData[id]["nshoptype"];
            /** 售卖道具相应NPC的id */
            var _itemNPCid = _itemAttrData[id]["npcid2"];
            /** NPC买卖物品表 */
            var _cNPCSaleDic: Object = RoleInfoModel.getInstance().CNpcSaleBinDic;
            /** 临时商店类型 */
            var tempShopType: number;
            for (let i = 0; i < Object.keys(_cNPCSaleDic).length; i++) {
                if (_cNPCSaleDic[Object.keys(_cNPCSaleDic)[i]]["npcId"] == _itemNPCid) {//如果NPC的id对应上
                    tempShopType = _cNPCSaleDic[Object.keys(_cNPCSaleDic)[i]]["id"];//则重新赋值上商店ID
                }
            }
            if (_shopType == SellType.SALE_STORE) {//如果是售卖枚举类型中的拍卖，
                tempShopType = shopType.SALE_STORE;//商店类型重新赋值为商店枚举类型中的拍卖行
            }
            return tempShopType;
        }
    }
}