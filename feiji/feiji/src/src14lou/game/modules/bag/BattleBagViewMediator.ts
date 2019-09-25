/**
* by LJM 
*/
 interface ListItem  {
        /**道具唯一ID */
        ID: number;
        /**造型ID */
        icon: number;
        /**道具数量 */
        number: number;
        /**位置 */
        position: number;
        /**颜色品质*/
        nquality: number;
        /**是否解锁 */
        isLock?: boolean;
        /** 服务器中的kry */
        key:  number;
        /** 战斗内使用者对象 */
        battleuser: number;
        /** 战斗内使用对象 */
        battleuse:number;
    }
    

    /** 战斗背包存放物品id最小值 */
     const BATTLE_MIN_ID = 111000;
    /** 战斗背包存放物品id最大值 */
     const BATTLE_MAX_ID = 111053;
module game.modules.bag{
	/** 战斗背包最大格子数 */
    export const BATTLE_BAG_MAX_NUM = 20;
    /**
     * 操作的角色类型
     */
    export const enum OperateRoleType 
    {
        None = -1, //没有操作
        Pet = 0,  //宠物
        Role = 1, //玩家
    }
    /** 战斗内使用者对象 */
    export const enum BattleUser
    {
        /** 不能使用 */
        CAN_NOT_USE = 0,
        /** 角色使用 */
        ROLE_USER = 1,
        /** 宠物 */
        PET_USER = 2,
        /** 角色和宠物都能使用 */
        PET_AND_ROLE_USER = 3,
    }

	export class BattleBagViewMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.BattleBagUI;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.BattleBagUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;	
            this.ani = new Laya.Animation();		
            this.registerEvent();
		}
		 /**战斗道具的List控件数据 */
        private _BattleGameItemListData = [];
		/**战斗道具的长度 */
        private _BattleGameItemListLength: number;
         /** 动画特效 */
        private ani:Laya.Animation;
        /** 上个出现道具位置 */
        private lastPos =  -1;
        /** 选中Index */
        private selectIndex: number = -1;
        /** 操作对象 */
        private _operater:number = -1;
        /** 战斗药品使用次数 */
        private drug_usetimes:Laya.Dictionary = new Laya.Dictionary;
        /** d道具-复合表 */
        private itemattr:{[key:number]:ItemAttrBaseVo} = BagModel.getInstance().itemAttrData as {}; //{ [key: number]: RoleFighteAIBaseVo } = {};
		 /**战斗背包界面的单例 */
        public static _instance: BattleBagViewMediator;
		public static getInstance(app: AppBase): BattleBagViewMediator {
            if (!this._instance) {
                this._instance = new BattleBagViewMediator(app);
            }
            return this._instance;
        }
        /** 事件注册 */
        private registerEvent():void
        {
            this._viewUI.close_btn.on(LEvent.CLICK,this,this.hide);
            this._viewUI.use_btn.on(LEvent.CLICK,this,this._onUseItem);
            this._viewUI.type_tab.selectHandler = new Handler(this, this.SelectItemTypeContent);
        }
		/** 初始化战斗背包的数据 
         * @param index 选中tab组件下标 0则为显示所有
        */
		private getBattleBag(tabIndex:number):void
		{
			 let bag: game.modules.bag.models.BagVo = BagModel.getInstance().getBagGameItemData(BagTypes.BAG);            
            if(!bag) return;
            this._BattleGameItemListData = [];
            this._BattleGameItemListLength = bag.items.length;
            this.lastPos = -1;
			let arr:Array<ListItem> = [];
            let posArray:Array<number> = [];
            let listItem: ListItem;
            // this._bagGameItemListPos =  new Laya.Dictionary();
            for (let index = 0; index < this._BattleGameItemListLength; index++) 
            {
                
                let id = bag.items[index].id;
                if(id < BATTLE_MIN_ID || id > BATTLE_MAX_ID) continue;
                // this._bagGameItemListPos.set(id, bag.items[index].key);
                let obj  = BagModel.getInstance().getItemAttrData(id);
                let drugType = BagModel.getInstance().FightDrugTypeData[id].typeid;
                if(drugType != 0)
                {
                    let show = this.judgeType(tabIndex,drugType);
                    if(!show) continue;
                }
                if (obj.battleuser != BattleUser.CAN_NOT_USE) 
                {
                        /** 如果操作对象是宠物的话则不能使用角色才能使用的物品 */
                        if(this._operater === OperateRoleType.Pet &&  obj.battleuser === BattleUser.ROLE_USER ) continue; //1主角2宠物3主角和宠物
                        let icon = obj.icon;
                        let battleuse = obj.battleuse;
                        let nquality = obj.nquality;
                        let number = bag.items[index].number;
                        let pos = bag.items[index].position;
                        let key = bag.items[index].key;
                        let battleuser = obj.battleuser;
                        let position = bag.items[index].position;
                        listItem = 
                        {
                            ID: id,
                            icon: icon,
                            number: number,
                            position: pos,
                            nquality: nquality,
                            isLock: false,
                            key: key,
                            battleuser: battleuser,
                            battleuse: battleuse,
                        };
                        arr.push(listItem);
                        this.lastPos++;
                        posArray.push(this.lastPos);
                }
			}
					 for(let index = 0; index < BATTLE_BAG_MAX_NUM; index++) 
                   {   
                        let tempIndex = posArray.indexOf(index)
                        // 找到
                        if ( tempIndex != -1) 
                        {
                            listItem = arr[tempIndex];
                        }else 
                        {
                            listItem = {
                                        ID: -1,
                                        icon: -1,
                                        number: -1,
                                        position: -1,
                                        nquality: -1,
                                        isLock: false,
                                        key: -1,
                                        battleuser: -1,
                                        battleuse: -1,
                                        };
                        }
                		this._BattleGameItemListData.push(listItem);
            		}
                
            
            this._viewUI.battleBag_list.array = this._BattleGameItemListData;
		}
        /** 判断类型
         * @param tanNum tab组件下标
         * @param type 战斗药品类型
         */
        private judgeType(tanNum:number,type:any):boolean
        {
            /** 全部的药品 */
            if(tanNum === 0 ) return true;
            else if(tanNum === type ) return true;
        }
		 /**
         * @describe  控制GameItem_list
         * @param 选中tab组件下标
         */
        private controlGameItemList(index:number = 0): void {
            let itemNumber: number = 1;
			this._viewUI.battleBag_list.repeatX = 4;
			this._viewUI.battleBag_list.repeatY = 5;
            this._viewUI.battleBag_list.spaceX = 20;
            this._viewUI.battleBag_list.spaceY = 16;
            this.getBattleBag(index);
            this.listScroll(this._viewUI.battleBag_list);
        }
		/**
         * @describe  List控件的滚动回弹效果
         * @param list  list控件
         */
        private listScroll(list: Laya.List): void {
            list.vScrollBarSkin = "";
            list.scrollBar.elasticBackTime = 200;
            list.scrollBar.elasticDistance = 50;
            list.selectEnable = true;
            list.renderHandler = new Handler(this,this.onRenderListItem);
        }
		/**
         * @describe 渲染List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onRenderListItem(cell: Laya.Box,index: number): void {
            if (index > this._BattleGameItemListLength) return;
            let itemData: ListItem = this._BattleGameItemListData[index];
            let gameItemBgImg: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            let gameItemImg: Laya.Image = cell.getChildByName("gameItem_Img") as Laya.Image;
            let gameItemNumberLabel: Laya.Label = cell.getChildByName("gameItemNumber_lab") as Laya.Label;
            if (itemData.ID != -1 ) 
            {
                gameItemNumberLabel.visible = true;
                let str: string = itemData.number > 1 ? itemData.number.toString(): "";
                gameItemBgImg.skin = BagSystemModule.getGameItemFrameColorResource(itemData.nquality);
                gameItemImg.skin = "common/icon/item/" + itemData.icon + ".png";
                gameItemNumberLabel.changeText(str);
                gameItemImg.off(LEvent.CLICK,this,this.onSelectListItem);
                gameItemImg.on(LEvent.CLICK,this,this.onSelectListItem,[index]);
                         // if(itemData.equipType != -1) gameItemImg.on(LEvent.DOUBLE_CLICK,this,this.opEquip,[OpEquip.PUTON,itemData.key,itemData.equipType]);
            }else
            {
                gameItemBgImg.skin ="common/ui/tongyong/kuang94.png";
                gameItemImg.skin = "";
                gameItemNumberLabel.visible = false;
            }
            
        }
		/**
         * @describe  选择到List中的单元格
         * @param cell  Laya.Box
         * @param index  number
         */
        private onSelectListItem(index: number): void {
            if ( index == -1) return;
            if( !this._viewUI.left_times_box.visible) this._viewUI.left_times_box.visible = true;
            let itemData: ListItem = this._BattleGameItemListData[index];
            let can_usetimes ;
            let itemtype = this.itemattr[itemData.ID].itemtypeid;
            //this.drug_usetimes.get(0) 为当前类型 为275 的物品的剩余使用次数
            if(itemtype == 275 && this.drug_usetimes.get(0)>0) can_usetimes = 20;
            //this.drug_usetimes.get(1) 为当前类型 290 或 291 的物品的剩余使用次数
            else if((itemtype == 290 || itemtype == 291 || itemtype == 323) && this.drug_usetimes.get(1)>0 ) can_usetimes = 10;
            else can_usetimes = 0;
            let times = this.drug_usetimes.get(itemData.ID);
            if(times == null)
			this._viewUI.shengyucishu.text = can_usetimes.toString();
            else if(can_usetimes == 0 )this._viewUI.shengyucishu.text = "0";
            else this._viewUI.shengyucishu.text = (can_usetimes-times).toString();
            if((can_usetimes-times) <= 0) this._viewUI.use_btn.disabled = true;
            else this._viewUI.use_btn.disabled = false;
            this.selectIndex = index;
            this._viewUI.battleBag_list.selectedIndex = -1;
             /** 播放选中特效 */
            this.PlayEffect(this._viewUI.battleBag_list,index);

        }
        /** 使用 */
        private _onUseItem():void
        {
            if(this.selectIndex == -1 || this._viewUI.use_btn.disabled) return;
            let listItem: ListItem =  this._BattleGameItemListData[this.selectIndex];
            let key = listItem.key;
            let battleuser = listItem.battleuser;
            let roleid =  LoginModel.getInstance().roleDetail.roleid;
            let obj  = BagModel.getInstance().getItemAttrData(listItem.ID);
            battle.NotifyMgr.notify(battle.NotifyType.BattleDrugInUse,[listItem.battleuse,listItem.key,obj.name]);
            this.hide();
        }
        	/** tab组件自按钮点击
		 * @param key tab组件下标
		 */
        private SelectItemTypeContent(index:number):void
        {
            this._viewUI.use_btn.disabled = true;
            this.controlGameItemList(index);
            if(this.ani) this.ani.clear();
        }
		private initUI():void
		{
			this._viewUI.use_btn.disabled = true;
            this._viewUI.left_times_box.visible = false;
            if(this.ani) this.ani.clear();
			
		}
         /** 播放特效 */
        private PlayEffect(list:Laya.List,index:number):void
        {
                let cell =  list.getCell(index);
                let selectItem :Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
                this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas",Laya.Handler.create(this,this.onCreateFrame));
                selectItem.addChild(this.ani);
                this.ani.scaleX = 0.9;
                this.ani.scaleY = 0.9;
        }
        /** 创建动画 */
        public onCreateFrame()
        {
            let effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong",9);
			Laya.Animation.createFrames(effecthPath,"xuanzhong");
			this.ani.play(0,true,"xuanzhong");
			this.ani.interval = 112;
		}
		public onshow(type:number,usetimes:Laya.Dictionary) 
		{
			super.show();
            this.drug_usetimes = usetimes;
            this._operater = type;
			this.controlGameItemList();
			/** 初始化事件 */		
			this.initUI();	
		}
		public hide()
		{
			super.hide()
		}
		public getView():Sprite {
			return this._viewUI;
		}
	}
}