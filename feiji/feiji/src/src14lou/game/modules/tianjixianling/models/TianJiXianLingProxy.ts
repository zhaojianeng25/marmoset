module game.modules.tianjixianling.models {
    /** 得到天机仙令信息与任务的数据事件 */
    export const GET_TIANJIXIANLING_DATA:string = "getTianJiXianLing";
    /** 因天机仙令任务显示道具提交界面 */
    export const SHOW_ITEM_SUBMIT_JIEMIAN:string = "showItemSubmitJieMian";
    /** 因天机仙令任务上交宠物对象 */
    export const SUBMIT_PET:string = "submitPet";
    /** 成功开启天机仙令某个随机任务的探索模式 */
    export const OPEN_EXPLORE_MODE:string = "openExploreMode";
    /** 表示已经参加了天机仙令 */
    export const ALREADY_JOIN_TJXL:string = "alreadyJoinTJXL";
    /** 表示第一次参加天机仙令成功 */
    export const JOIN_TJXL_SUCCESS:string = "joinTJXLSuccess";

    /** 天机仙令proxy */
    export class TianJiXianLingProxy extends hanlder.ProxyBase {
        constructor() {
			super();
			TianJiXianLingProxy._instance = this;
			this.init();
		}
		private static _instance: TianJiXianLingProxy;
		public static getInstance(): TianJiXianLingProxy {
			if (!this._instance) {
				this._instance = new TianJiXianLingProxy();
			}
			return this._instance;
		}
        public init() {
			TianJiXianLingModel.getInstance();
			this.addNetworkListener();

            //加载暗夜马戏团（天机仙令）任务配置表
            Laya.loader.load("common/data/temp/circletask.canyemaxituanconf.bin", Handler.create(this, this.onloadedCAnYeMaXiTuanConfComplete), null, Loader.BUFFER);
            //加载寻找物品类分表
            Laya.loader.load("common/data/temp/circletask.ccirctaskitemfind.bin", Handler.create(this, this.onloadedCCircTaskItemFindComplete), null, Loader.BUFFER);
            //加载收集物品类分表
            Laya.loader.load("common/data/temp/circletask.ccirctaskitemcollect.bin", Handler.create(this, this.onloadedCCircTaskItemCollectComplete), null, Loader.BUFFER);
		}
        /**
         * 加载收集物品类分表
         */
        private onloadedCCircTaskItemCollectComplete():void{
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskitemcollect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TianJiXianLingModel.getInstance().collectItemConfig, game.data.template.CCircTaskItemCollectBaseVo, "id");
        }
        /**
         * 加载寻找物品类分表
         */
        private onloadedCCircTaskItemFindComplete():void{
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskitemfind.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TianJiXianLingModel.getInstance().findItemConfig, game.data.template.CCircTaskItemFindBaseVo, "id");
        }
        /**
         * 加载暗夜马戏团（天机仙令）任务配置表
         */
        private onloadedCAnYeMaXiTuanConfComplete():void{
            var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.canyemaxituanconf.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data, size, TianJiXianLingModel.getInstance().tjxlConfig, game.data.template.CAnYeMaXiTuanConfBaseVo, "id");
        }
        /** 消息协议监听 */
        private addNetworkListener():void{
            Network._instance.addHanlder(ProtocolsEnum.SRefreshAnYeData,this,this.onSRefreshAnYeData);
            Network._instance.addHanlder(ProtocolsEnum.SLengendAnYetask,this,this.onSLengendAnYetask);
        }
        /**
         * 天机仙令的探索开启返回
         */
        private onSLengendAnYetask(optcode: number, msg: hanlder.s2c_SLengendAnYetask):void{
            if(msg.result == 1){//结果1成功
                models.TianJiXianLingProxy.getInstance().event(models.OPEN_EXPLORE_MODE);                
            }
        }
        /**
         * 天机仙令信息与任务数据返回
         */
        private onSRefreshAnYeData(optcode: number, msg: hanlder.s2c_SRefreshAnYeData):void{
            //以下是判断，以防止某个任务完成干扰到其它任务
            let _anyetasks = msg.anyetasks;
            for(let i = 0; i < _anyetasks.length; i++){
                let _anYeTaskVo:models.AnYeTaskVo = _anyetasks[i];
                if(_anYeTaskVo.state == TaskState.DONE && _anYeTaskVo.kind == TaskType.Item){
                    let _dstitemid = _anYeTaskVo.dstitemid;
                    let _ownedTargetNum = game.modules.bag.models.BagModel._instance.chargeItemNum(_dstitemid);//获取该道具的拥有数量
                    if(_ownedTargetNum == 0){
                        _anyetasks[i].state = TaskState.UNDONE;
                    }
                }
            }
            if(msg.anyetasks.length != 0 && msg.anyetasks.length != 1){
                models.TianJiXianLingModel._instance.someRoundTasks = _anyetasks;
            }
            /** 临时信息数据 */
            let _tempInfoData = new TianJiXianLingDataVo();
            _tempInfoData.times = msg.times;
            _tempInfoData.renxins = msg.renxins;
            _tempInfoData.awardexp = msg.awardexp;
            _tempInfoData.awardsilver = msg.awardsilver;
            _tempInfoData.swardgold = msg.swardgold;
            _tempInfoData.jointime = msg.jointime;
            _tempInfoData.legendpos = msg.legendpos;
            models.TianJiXianLingModel._instance.tjxlInfoData = _tempInfoData;
            models.TianJiXianLingProxy.getInstance().event(models.GET_TIANJIXIANLING_DATA,[msg.anyetasks,_tempInfoData]);
            /** 处于探索的状态下的任务栏位 */
            var _legendpos = msg.legendpos;
            if (_legendpos >= 0 && _legendpos <= 7) {
                game.modules.task.models.TaskModel.getInstance().tjxltansuo = _legendpos;
                game.modules.task.models.TaskModel.getInstance().tjxlExploreMapId = models.TianJiXianLingModel._instance.getExploreTaskMapId(_legendpos);
                game.modules.task.models.TaskProxy.getInstance().event(game.modules.task.models.TAKSREFRESH);                
            }
            if (msg.anyetasks.length == 0) {//如果传过来的数据是空，说明要请求参加天机仙令
                models.TianJiXianLingProxy.getInstance().event(models.JOIN_TJXL_SUCCESS);
                task.models.TaskProxy.getInstance().event(game.modules.task.models.TAKSREFRESH);
            }            
        }
    }
}