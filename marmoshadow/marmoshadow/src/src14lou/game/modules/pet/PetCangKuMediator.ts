
module game.modules.pet {
	/** 宠物仓库 */
	export class PetCangKuMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetCangKuUI;
		/** 仓库列表数据 */
		private cangKuListData: Array<any> = [];
		/** 仓库1列表数据 */
		private depot1ListData: Array<any>;
		/** 仓库2列表数据 */
		private depot2ListData: Array<any>;
		/** 仓库3列表数据 */
		private depot3ListData: Array<any>;
		/** 仓库4列表数据 */
		private depot4ListData: Array<any>;
		/** 存放各个仓库列表数据的数组（数组下标0：仓库1， 1：仓库2， 2:仓库3， 3：仓库4） */
		private depotListData: Array<any>;
		/** 角色当前持有的宠物列表数据 */
		private havePetListData: Array<any> = [];
		/** 上一次选中仓库列表索引 */
		private lastCKSelectIndex: number;
		/** 上一次选中持有宠物列表索引 */
		private lastHavePetLstSelectIndex: number;
		/** 宠物配置表 */
		private petConfig: Object;
		/** 宠物仓库扩充配置表 */
		private petCPetDepotPriceData: Object;
		/** 存放在宠物仓库的宠物信息数据 */
		private depotPetsInfoData: Array<any>;
		/** 持有宠物的宠物信息数据 */
		private havePetsInfoData: Array<any>;
		/** 仓库npckey */
		private npckey: number;
		/** 指向是哪个按钮被选中（取出/寄存） */
		private selectedBtn: Laya.Button;
		/** 一共开启了几个宠物栏位 */
		private totalOpenDepotNum: number;
		/** 存放渲染宠物仓库列表所需的数据 */
		private renderPetCKNeedData = [];
		/** 当前开启了几个仓库 */
		private currOpenDepotNum: number;
		/** 当前处于第几个仓库 */
		private currAtDepotNum: number;
		/** 记录上次被选中的按钮 */
		private lastPitchBtn: Laya.Button;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetCangKuUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;

			this.petConfig = models.PetModel.getInstance().petCPetAttrData;
			this.petCPetDepotPriceData = models.PetModel.getInstance().petCPetDepotPriceData;
		}
		/** UI的初始化 */
		private initUI(): void {
			this.lastCKSelectIndex = -1;
			this.lastHavePetLstSelectIndex = -1;
			//仓库列表初始化
			this.cangkuListInit();
			//持有宠物列表初始化
			this.havePetLstInit();
		}
		/** 持有宠物列表初始化 */
		private havePetLstInit(): void {
			this.listInit(this._viewUI.xpet_list, this.havePetListData);
			this._viewUI.xpet_list.renderHandler = new Laya.Handler(this, this.onRenderXPetLst);
		}
		/** 渲染持有宠物列表 */
		private onRenderXPetLst(cell: Box, index: number): void {
			if (index < 0 || index >= this.havePetListData.length) return;
			let xpet_btn: Laya.Button = cell.getChildByName("xpet_btn") as Laya.Button;
			xpet_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			xpet_btn.on(LEvent.CLICK, this, this.onSelectXPetLst, [index]);
			xpet_btn.on(LEvent.DOUBLE_CLICK, this, this.depotMovePet, [this._viewUI.jicun_btn]);	//双击监听
			let xpetkuang_img: Laya.Image = cell.getChildByName("xpetkuang_img") as Laya.Image;
			xpetkuang_img.skin = this.havePetListData[index].xpetkuang_img;
			let xpeticon_btn: Laya.Button = cell.getChildByName("xpeticon_btn") as Laya.Button;
			xpeticon_btn.skin = this.havePetListData[index].xpeticon_btn_skin;
			xpeticon_btn.on(LEvent.CLICK, this, this.showPetDetail, [this.havePetsInfoData[index]]);
			let xpetlv_lab: Laya.Label = cell.getChildByName("xpetlv_lab") as Laya.Label;
			xpetlv_lab.text = this.havePetListData[index].xpetlv_lab;
			let xpetname_lab: Laya.Label = cell.getChildByName("xpetname_lab") as Laya.Label;
			xpetname_lab.text = this.havePetListData[index].xpetname_lab;
			let xpinfen_lab: Laya.Label = cell.getChildByName("xpinfen_lab") as Laya.Label;
			xpinfen_lab.text = this.havePetListData[index].xpinfen_lab;
			let xskillcount_lab: Laya.Label = cell.getChildByName("xskillcount_lab") as Laya.Label;
			xskillcount_lab.text = this.havePetListData[index].xskillcount_lab;
			let xpetType_img: Laya.Image = cell.getChildByName("xpetType_img") as Laya.Image;
			xpetType_img.skin = this.havePetListData[index].xpetType_img;
			let isZhenPin_img: Laya.Image = cell.getChildByName("isZhenPin_img") as Laya.Image;
			if (this.havePetListData[index].isZhenPin) {
				isZhenPin_img.visible = true;
			}
			else {
				isZhenPin_img.visible = false;
			}
			let ischuzhan_img: Laya.Image = cell.getChildByName("ischuzhan_img") as Laya.Image;
			if (this.havePetListData[index].isChuZhan) {
				ischuzhan_img.visible = true;
			}
			else {
				ischuzhan_img.visible = false;
			}
		}
		/** 点击选择持有宠物列表 */
		private onSelectXPetLst(index: number): void {
			if (this.lastHavePetLstSelectIndex != -1) {
				this.lastPitchBtn.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			let xpet_btn: Laya.Button = this._viewUI.xpet_list.getCell(index).getChildByName("xpet_btn") as Laya.Button;
			xpet_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			this.lastPitchBtn = xpet_btn;
			this.lastHavePetLstSelectIndex = index;
		}
		/** 仓库列表初始化 */
		private cangkuListInit(arrData?: Array<any>): void {
			this.currAtDepotNum = Number(this._viewUI.currDepotNum_lab.text);
			if (!arrData && this.currAtDepotNum) {
				arrData = [];
				arrData = this.getCurrDepotData(arrData, this.currAtDepotNum);//此处是为了调整还能接着显示当前所处于的仓库数据
			}
			this.renderPetCKNeedData = arrData;
			this.listInit(this._viewUI.ck_list, arrData);
			this._viewUI.ck_list.renderHandler = new Laya.Handler(this, this.onRenderCKLst);
		}
		/** 点击选择仓库列表 */
		private onSelectCKLst(index: number): void {
			if (this.lastCKSelectIndex != -1) {
				let _pet_btn: Laya.Button = this._viewUI.ck_list.getCell(this.lastCKSelectIndex).getChildByName("pet_btn") as Laya.Button;
				_pet_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			let pet_btn: Laya.Button = this._viewUI.ck_list.getCell(index).getChildByName("pet_btn") as Laya.Button;
			pet_btn.skin = "common/ui/tongyong/common_list_3textbg2.png";
			this.lastCKSelectIndex = index;
		}
		/** 渲染仓库列表 */
		private onRenderCKLst(cell: Box, index: number): void {
			let pet_btn: Laya.Button = cell.getChildByName("pet_btn") as Laya.Button;
			pet_btn.skin = "common/ui/tongyong/common_list_3textbg.png";
			pet_btn.on(LEvent.CLICK, this, this.onSelectCKLst, [index]);
			pet_btn.on(LEvent.DOUBLE_CLICK, this, this.depotMovePet, [this._viewUI.quchu_btn]);		//双击监听
			let suo_img: Laya.Image = cell.getChildByName("suo_img") as Laya.Image;
			let petDiTu_img: Laya.Image = cell.getChildByName("petDiTu_img") as Laya.Image;
			let petkuang_img: Laya.Image = cell.getChildByName("petkuang_img") as Laya.Image;
			let petType_img: Laya.Image = cell.getChildByName("petType_img") as Laya.Image;
			let isZhenPin_img: Laya.Image = cell.getChildByName("isZhenPin_img") as Laya.Image;
			let petname_lab: Laya.Label = cell.getChildByName("petname_lab") as Laya.Label;
			let lab1_lab: Laya.Label = cell.getChildByName("lab1_lab") as Laya.Label;
			let pingfen_lab: Laya.Label = cell.getChildByName("pingfen_lab") as Laya.Label;
			let lab2_lab: Laya.Label = cell.getChildByName("lab2_lab") as Laya.Label;
			let skillcount_lab: Laya.Label = cell.getChildByName("skillcount_lab") as Laya.Label;
			let petlv_lab: Laya.Label = cell.getChildByName("petlv_lab") as Laya.Label;
			let peticon_btn: Laya.Button = cell.getChildByName("peticon_btn") as Laya.Button;
			if (this.renderPetCKNeedData[index] == null) {
				suo_img.visible = true;
				suo_img.on(LEvent.CLICK, this, this.onShowConfirm);
				petDiTu_img.visible = false;
				petkuang_img.visible = false;
				petType_img.visible = false;
				isZhenPin_img.visible = false;
				petname_lab.visible = false;
				lab1_lab.visible = false;
				pingfen_lab.visible = false;
				lab2_lab.visible = false;
				skillcount_lab.visible = false;
				petlv_lab.visible = false;
				peticon_btn.visible = false;
			}
			else if (this.renderPetCKNeedData[index] == 0) {
				suo_img.visible = false;
				petDiTu_img.visible = true;
				petkuang_img.visible = false;
				petType_img.visible = false;
				isZhenPin_img.visible = false;
				petname_lab.visible = false;
				lab1_lab.visible = false;
				pingfen_lab.visible = false;
				lab2_lab.visible = false;
				skillcount_lab.visible = false;
				petlv_lab.visible = false;
				peticon_btn.visible = false;
			}
			else {
				suo_img.visible = false;
				petDiTu_img.visible = false;
				petkuang_img.visible = true;
				petType_img.visible = true;
				isZhenPin_img.visible = true;
				petname_lab.visible = true;
				lab1_lab.visible = true;
				pingfen_lab.visible = true;
				lab2_lab.visible = true;
				skillcount_lab.visible = true;
				petlv_lab.visible = true;
				peticon_btn.visible = true;
				petkuang_img.skin = this.cangKuListData[index].petkuang_img;
				petType_img.skin = this.cangKuListData[index].petType_img;
				if (this.cangKuListData[index].isZhenPin) {
					isZhenPin_img.visible = true;
				}
				else {
					isZhenPin_img.visible = false;
				}
				petname_lab.text = this.renderPetCKNeedData[index].petname_lab;
				pingfen_lab.text = this.renderPetCKNeedData[index].pingfen_lab;
				skillcount_lab.text = this.renderPetCKNeedData[index].skillcount_lab;
				petlv_lab.text = this.renderPetCKNeedData[index].petlv_lab;
				peticon_btn.skin = this.renderPetCKNeedData[index].peticon_btn_skin;
				peticon_btn.on(LEvent.CLICK, this, this.showPetDetail, [this.depotPetsInfoData[index + (this.currAtDepotNum - 1) * 4]]);
			}
		}
		/** 显示确认框是否开启新的宠物栏位 */
		private onShowConfirm(): void {
			//扩充新的宠物仓库栏位所需银币
			let needYinBi = this.petCPetDepotPriceData[this.cangKuListData.length - 1]["nextneedmoney"];
			//存确认框提示内容的字典
			let _tipsDic = new Laya.Dictionary();
			_tipsDic.set("contentId", 160027);
			_tipsDic.set("parame", [needYinBi]);
			tips.models.TipsProxy.getInstance().once(tips.models.TIPS_ON_OK, this, this.addpetlan);
			let _tipsModule = new tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.CLIENT_TIPS_MESSAGE, _tipsDic);
		}
		/** 显示宠物详情
		 * @param petinfo 被查看宠物的详细信息
		 */
		private showPetDetail(petinfo: any): void {
			let petDetail = new PetXiangQingMediator(this._app);
			petDetail.init(petinfo);
		}
		/** 列表初始化
		 * @param lst 所要初始化的列表
		 * @param lstArrData 所要初始化的列表里填充的数据
		 */
		private listInit(lst: Laya.List, lstArrData: any): void {
			lst.repeatX = 1;
			lst.repeatY = 3;
			lst.vScrollBarSkin = "";
			lst.scrollBar.elasticBackTime = 100;
			lst.scrollBar.elasticDistance = 100;
			lst.array = lstArrData;
		}
		/** 事件注册监听 */
		private registerEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.quchu_btn.on(LEvent.MOUSE_DOWN, this, this.depotMovePet, [this._viewUI.quchu_btn]);
			this._viewUI.jicun_btn.on(LEvent.MOUSE_DOWN, this, this.depotMovePet, [this._viewUI.jicun_btn]);
			this._viewUI.depotSelect_btn.on(LEvent.MOUSE_DOWN, this, this.onDepotSelect);
			this._viewUI.up_btn.on(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot, [this._viewUI.up_btn]);
			this._viewUI.down_btn.on(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot, [this._viewUI.down_btn]);

			models.PetProxy.getInstance().on(models.GET_PET_DEPOT_DATA, this, this.onPetDepotData);
			models.PetProxy.getInstance().on(models.DEPOT_ADD_PET, this, this.onDepotAddPetData);
			models.PetProxy.getInstance().on(models.DEPOT_REMOVE_PET, this, this.onDepotRemovePetData);
			models.PetProxy.getInstance().on(models.ADD_EVENT, this, this.onRoleAddPetData);
			models.PetProxy.getInstance().on(models.NewPetDepotMaxNum, this, this.onSRefreshPetColumnCapacity);
		}
		/** 玩家角色身上增加了宠物 */
		private onRoleAddPetData(): void {
			this.init();
		}
		/** 刷新宠物栏的最大容量
		 * @param capacity 宠物栏的最大容量
		 */
		private onSRefreshPetColumnCapacity(capacity: number): void {
			this.onPetDepotData(this.depotPetsInfoData, capacity, true);
			this.cangkuListInit(this.depotListData[Number(this._viewUI.currDepotNum_lab.text) - 1]);
		}
		/** 宠物仓库被取出了宠物
		 * @param petkey 被取出的宠物对应的key
		 * @describe 除了要处理仓库列表里的数据，还要处理持有宠物列表数据
		 */
		private onDepotRemovePetData(petkey): void {
			for (let i = 0; i < this.depotPetsInfoData.length; i++) {
				let _petInfoData: models.PetInfoVo = this.depotPetsInfoData[i];
				if (_petInfoData.key == petkey) {
					this.havePetsInfoData.push(_petInfoData);
					this.depotPetsInfoData.splice(i, 1);
					let msg: string = chat.models.ChatModel.getInstance().chatMessageTips[160023]["msg"];
					let petName = _petInfoData.name;
					msg = msg.replace("$parameter1$", petName);
					this.showDisTips(msg);
					this.onPetDepotData(this.depotPetsInfoData, this.totalOpenDepotNum, true);
					this.cangkuListInit();
					return;
				}
			}
		}
		/** 宠物仓库放入了宠物
		 * @param petData 所增加宠物的信息数据
		 */
		private onDepotAddPetData(petData: any): void {
			let msg: string = chat.models.ChatModel.getInstance().chatMessageTips[160022]["msg"];
			let petName = petData.name;
			msg = msg.replace("$parameter1$", petName);
			this.showDisTips(msg);
			this.depotPetsInfoData.push(petData);
			this.onPetDepotData(this.depotPetsInfoData, this.totalOpenDepotNum, true);
			this.init();
		}
		/** 点击按钮一个个显示宠物仓库
		 * @param btn 点击是哪个按钮
		 * @describ up_btn 显示上一个仓库；down_btn 显示下一个仓库
		 */
		private clickBtnShowDepot(btn: Laya.Button): void {
			//获得当前仓库是第几个仓库
			let tempNum = Number(this._viewUI.currDepotNum_lab.text);
			//用作判断是否变化
			let pageIsUpdata: boolean = false;
			switch (btn) {
				case this._viewUI.down_btn:
					if (this._viewUI.currDepotNum_lab.text < this._viewUI.totalDepotNum_lab.text) {
						tempNum++;
						this._viewUI.currDepotNum_lab.text = tempNum.toString();
						pageIsUpdata = true;
					}
					break;
				case this._viewUI.up_btn:
					if (tempNum > 1) {
						tempNum--;
						this._viewUI.currDepotNum_lab.text = tempNum.toString();
						pageIsUpdata = true;
					}
					break;
			}
			if (pageIsUpdata) {
				this.cangkuListInit(this.depotListData[tempNum - 1]);//tempNum指向的就是当前第几个仓库，需要在其值上-1来代表数组的索引
			}
		}
		/** 移除事件 */
		private removeEvent(): void {
			this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.quchu_btn.off(LEvent.MOUSE_DOWN, this, this.depotMovePet);
			this._viewUI.jicun_btn.off(LEvent.MOUSE_DOWN, this, this.depotMovePet);
			this._viewUI.depotSelect_btn.off(LEvent.MOUSE_DOWN, this, this.onDepotSelect);
			this._viewUI.up_btn.off(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot);
			this._viewUI.down_btn.off(LEvent.MOUSE_DOWN, this, this.clickBtnShowDepot);

			models.PetProxy.getInstance().off(models.GET_PET_DEPOT_DATA, this, this.onPetDepotData);
			models.PetProxy.getInstance().off(models.DEPOT_ADD_PET, this, this.onDepotAddPetData);
			models.PetProxy.getInstance().off(models.DEPOT_REMOVE_PET, this, this.onDepotRemovePetData);
			models.PetProxy.getInstance().off(models.ADD_EVENT, this, this.onRoleAddPetData);
			models.PetProxy.getInstance().off(models.NewPetDepotMaxNum, this, this.onSRefreshPetColumnCapacity);
		}
		/** 显示/隐藏宠物仓库选择的UI */
		private onDepotSelect(): void {
			if (this._viewUI.up_img.visible) {
				this._viewUI.up_img.visible = false;
				this._viewUI.down_img.visible = true;
				this._viewUI.childDepotBg_img.visible = false;
				this._viewUI.childDepot_lst.visible = false;
			}
			else {
				this._viewUI.up_img.visible = true;
				this._viewUI.down_img.visible = false;
				this._viewUI.childDepotBg_img.visible = true;
				this._viewUI.childDepot_lst.visible = true;
			}
		}
		/** 更新宠物仓库数据
		 * @param pets 宠物仓库里存储的宠物数据
		 * @param colunmSize 仓库的开启宠物栏位个数
		 * @param isUpdata 用来判断是在宠物仓库界面打开时，更新了数据
		 */
		private onPetDepotData(pets: Array<any>, colunmSize: number, isUpdata?) {
			this.totalOpenDepotNum = colunmSize;
			this.cangKuListData = [];
			this.depotPetsInfoData = [];
			this.depotPetsInfoData = pets;
			if (pets.length != 0) {
				for (let i = 0; i < pets.length; i++) {
					//宠物仓库里某一只宠物的基本数据
					let depotPetData: models.PetInfoVo = pets[i];
					//存放在宠物仓库里宠物的id
					let depotPetId = depotPetData.id;
					//存放在宠物仓库里宠物的品质边框图
					let depotPetQualityFrameImg = models.PetModel.getInstance().getPetQualityFrameImg(depotPetId);
					//存放在宠物仓库里宠物的名字
					let depotPetName = depotPetData.name;
					//存放在宠物仓库里宠物的评分
					let depotPetScore = depotPetData.petscore;
					//存放在宠物仓库里宠物的技能数
					let depotPetSkillsNum = depotPetData.skills.length;
					//存放在宠物仓库里宠物的种类图
					let depotPetKindImg = models.PetModel.getInstance().getPetKindImg(depotPetData.kind);
					//存放在宠物仓库里宠物的小头像图
					let depotPetAvatarImg = models.PetModel.getInstance().getPetAvatarImg(depotPetId);
					//存放在宠物仓库里宠物是否珍品
					let depotPetIsZhenPin = models.PetModel.getInstance().isZhenPin(depotPetId);
					//存放在宠物仓库里宠物的等级
					let depotPetLevel = depotPetData.level;
					//存放在宠物仓库里宠物的key
					let petkey = depotPetData.key;
					this.cangKuListData.push(
						{
							petkuang_img: depotPetQualityFrameImg,
							petname_lab: depotPetName,
							pingfen_lab: depotPetScore.toString(),
							skillcount_lab: depotPetSkillsNum.toString(),
							petType_img: depotPetKindImg,
							peticon_btn_skin: depotPetAvatarImg,
							isZhenPin: depotPetIsZhenPin,
							petlv_lab: depotPetLevel.toString(),
							petkey: petkey
						}
					);
				}
				for (let i = 0; i < colunmSize; i++) {
					if (this.cangKuListData[i] == undefined && this.cangKuListData[i] == null) {
						this.cangKuListData[i] = 0;//放入0，暂时代表开启了但没存放宠物
					}
				}
			}
			else {
				for (let i = 0; i < colunmSize; i++) {
					this.cangKuListData.push(0);//放入0，暂时代表开启了但没存放宠物
				}
			}
			if (colunmSize % 4 != 0) {
				this.cangKuListData.push(null);//放入null，暂时代表未开启栏位
			}
			this.countDepotNum(colunmSize);
			if (isUpdata && isUpdata == true) {
				return;
			}
			this.show();
		}
		/** 计算开启了几个宠物仓库,并初始化仓库选择按钮列表
		 * @param colunmSize 仓库的开启宠物栏位个数
		 * @describe 一共有4个宠物仓库，一个宠物仓库能有4个宠物栏位
		 */
		private countDepotNum(colunmSize: number): void {
			//向上取整获得开了几个仓库
			let depotNum = Math.ceil(colunmSize / 4);
			this.depot1ListData = [];
			this.depot2ListData = [];
			this.depot3ListData = [];
			this.depot4ListData = [];
			this.depotListData = [];
			if (this.cangKuListData.length % 4 == 0 && (this.cangKuListData.length + 1) <= 16 && this.cangKuListData[this.cangKuListData.length - 1] != null) {//如果宠物栏位够凑齐数个宠物仓库，并且没有开启最大限制（16个，这个数值写死的，目前只有服务器那边配表，客户端并没有）的宠物栏位，就要
				depotNum++;//多开放一个仓库
				this.cangKuListData.push(null);//多放入null，暂时代表未开启栏位
			}
			this._viewUI.totalDepotNum_lab.text = depotNum.toString();
			switch (depotNum) {
				case 1://开启了一个仓库					
					this.depot1ListData = this.cangKuListData;
					break;
				case 2://开启了两个仓库
					this.depot1ListData = this.split_array(this.cangKuListData, 0, 3);
					this.depot2ListData = this.split_array(this.cangKuListData, 4, this.cangKuListData.length - 1);
					break;
				case 3://开启了三个仓库
					this.depot1ListData = this.split_array(this.cangKuListData, 0, 3);
					this.depot2ListData = this.split_array(this.cangKuListData, 4, 7);
					this.depot3ListData = this.split_array(this.cangKuListData, 8, this.cangKuListData.length - 1);
					break;
				case 4://开启了四个仓库
					this.depot1ListData = this.split_array(this.cangKuListData, 0, 3);
					this.depot2ListData = this.split_array(this.cangKuListData, 4, 7);
					this.depot3ListData = this.split_array(this.cangKuListData, 8, 11);
					this.depot4ListData = this.split_array(this.cangKuListData, 12, this.cangKuListData.length - 1);
					break;
			}
			this.currOpenDepotNum = depotNum;
			this.depotListData = [this.depot1ListData, this.depot2ListData, this.depot3ListData, this.depot4ListData];
			let depotNumArr = [];
			for (let i = 0; i < depotNum; i++) {
				depotNumArr.push(i);
			}
			this._viewUI.childDepot_lst.repeatX = 2;
			this._viewUI.childDepot_lst.repeatY = Math.ceil(depotNumArr.length / 2);
			this._viewUI.childDepot_lst.height = Math.ceil(depotNumArr.length / 2) / 2 * 104;
			this._viewUI.childDepotBg_img.height = Math.ceil(depotNumArr.length / 2) / 2 * 106;
			this._viewUI.childDepot_lst.vScrollBarSkin = "";
			this._viewUI.childDepot_lst.array = depotNumArr;
			this._viewUI.childDepot_lst.renderHandler = new Handler(this, this.onRenderChildDepotBtnLst);
		}
		/** 拆分数组
		 * @param arr 被拆分的数组
		 * @param start 被拆分数组中所需数据对应的起始下标
		 * @param end 被拆分数组中所需数据对应的末尾下标
		 */
		private split_array(arr: Array<any>, start: number, end: number) {
			let a_len = arr.length;
			let result = [];
			for (let i = start; i < end + 1; i++) {
				result.push(arr[i]);
			}
			return result;
		}
		/** 渲染仓库按钮列表 */
		private onRenderChildDepotBtnLst(cell: Box, index: number): void {
			let childDepot_btn: Laya.Button = cell.getChildByName("childDepot_btn") as Laya.Button;
			childDepot_btn.label = "仓库" + (index + 1);
			childDepot_btn.on(LEvent.CLICK, this, this.showChildDepot, [index]);
		}
		/** 显示各个仓库（一共4个仓库）
		 * @param index 第几个仓库的索引
		 */
		private showChildDepot(index: number): void {
			this.cangkuListInit(this.depotListData[index]);
			this._viewUI.currDepotNum_lab.text = (index + 1).toString();
			this.onDepotSelect();
		}
		/** 给其它地方显示该界面 */
		public onShow(columnid: number, npckey: number): void {
			this.registerEvent();
			this.npckey = npckey;
			this.CGetPetcolumnInfo(columnid, npckey);
		}
		public show(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
			super.show();
			this.init();
		}
		/** 客户端请求宠物仓库信息 */
		public CGetPetcolumnInfo(columnid: number, npckey: number): void {
			RequesterProtocols._instance.c2s_get_petcolumninfo(columnid, npckey);
		}
		/** 初始化数据 */
		private init(): void {
			this.havePetDataInit();
			this.initUI();
		}
		/** 持有宠物数据初始化 */
		private havePetDataInit(): void {
			let havePets;
			havePets = models.PetModel.getInstance().pets;
			this.havePetsInfoData = [];
			this.havePetListData = [];
			if (havePets.keys.length != 0) {
				//宠物基本数据
				let petInfoData: models.PetInfoVo;
				for (let i = 0; i < havePets.keys.length; i++) {
					//获得持有宠物中某一只的基本数据
					petInfoData = havePets.get(havePets.keys[i]);
					this.havePetsInfoData.push(petInfoData);
					//持有宠物的id
					let petId = petInfoData.id;
					//持有宠物的名字
					let petName = petInfoData.name;
					//持有宠物的等级
					let petLevel = petInfoData.level;
					//持有宠物的头像图
					let petAvatarImg = models.PetModel.getInstance().getPetAvatarImg(petId);
					//持有宠物的品质边框图
					let petQualityFrameImg = models.PetModel.getInstance().getPetQualityFrameImg(petId);
					//持有宠物的评分
					let petscore = petInfoData.petscore;
					//持有宠物所拥有的技能数
					let petSkillsNum = petInfoData.skills.length;
					//持有宠物的类型图
					let petKindImg = models.PetModel.getInstance().getPetKindImg(petInfoData.kind);
					//持有宠物是否珍品
					let petIsZhenPin = models.PetModel.getInstance().isZhenPin(petId);
					//持有宠物是否出战
					let petIsChuZhan = false;
					if (havePets.keys[i] == LoginModel.getInstance().roleDetail.petIndex) {
						petIsChuZhan = true;
					}
					this.havePetListData.push(
						{
							xpetname_lab: petName,
							xpetlv_lab: petLevel.toString(),
							xpeticon_btn_skin: petAvatarImg,
							xpetkuang_img: petQualityFrameImg,
							xpinfen_lab: petscore.toString(),
							xskillcount_lab: petSkillsNum.toString(),
							xpetType_img: petKindImg,
							isZhenPin: petIsZhenPin,
							isChuZhan: petIsChuZhan
						}
					);
				}
			}
			else {
				this.havePetListData = [];
			}
		}
		public hide(): void {
			super.hide();
			this.removeEvent();
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		/**告诉服务器给仓库增加栏位
		 * @describe 需要判断身上剩余的银币是否足够开启新的宠物仓库栏位后，再向服务器发消息
		*/
		public addpetlan(): void {
			//角色当前所拥有的银币
			let yinBiNum = HudModel.getInstance().sliverNum;
			//扩充新的宠物仓库栏位所需银币
			let needYinBi = this.petCPetDepotPriceData[this.cangKuListData.length - 1]["nextneedmoney"];
			if (yinBiNum < needYinBi) {//如果不足，需要弹出银币补足界面
				/** 需要兑换的银币 */
				let duihuanMoney = needYinBi - HudModel.getInstance().sliverNum;
				/** 兑换所需的仙晶 */
				let _needFuShi: number;
				if ((Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum) <= 0) {
					_needFuShi = Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI);
				}
				else {
					_needFuShi = (Math.ceil(duihuanMoney / RoleEnum.YUANBAO_YINBI) - HudModel.getInstance().fuShiNum);
				}
				/** 兑换所需的金币 */
				let _needGold: number;
				if ((Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - BagModel.getInstance().globalIcon) <= 0) {
					_needGold = Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI);
				}
				else {
					_needGold = (Math.ceil(duihuanMoney / RoleEnum.JINBI_YINBI) - BagModel.getInstance().globalIcon);
				}
				let yinBiBuZuView = new commonUI.JinBiBuZuViewMediator(this._viewUI, this._app);
				yinBiBuZuView.onShow(false, duihuanMoney.toString(), _needFuShi.toString(), _needGold.toString());
				yinBiBuZuView.once(commonUI.USE_SILVER_EXCHANGE_EVENT, this, this.getSliverFromYuanBao, [_needFuShi]);
				yinBiBuZuView.once(commonUI.USE_YUANBAO_EXCHANGE_EVENT, this, this.getGoldFromYuanBao, [_needFuShi]);
				yinBiBuZuView.once(commonUI.USE_GOLD_EXCHANGE_EVENT, this, this.onCPetDepotColumnAddCapacity);
			}
			else {
				this.onCPetDepotColumnAddCapacity();
			}
		}
		/** 发起请求 */
		private onCPetDepotColumnAddCapacity(): void {
			RequesterProtocols._instance.c2s_pet_depotcolumnaddcapacity();
		}
		/** 通过元宝(又称仙晶或符石)兑换金币 */
		private getGoldFromYuanBao(yuanbao: number): void {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				_TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				_TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, this.addpetlan);
				RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_GoldCoin, yuanbao);
			}
		}
		/** 通过元宝(又称仙晶或符石)兑换银币 */
		private getSliverFromYuanBao(yuanbao: number): void {
			var fuShiNum = HudModel.getInstance().fuShiNum;
			if (fuShiNum < yuanbao) {
				var _TipsMessageMediator = new game.modules.tips.TipsMessageMediator(this._viewUI, this._app);
				_TipsMessageMediator.show();
				var param: Dictionary = new Dictionary();
				param.set("contentId", RoleEnum.XIANJIN_TIP);
				_TipsMessageMediator.showContent(param);
				game.modules.tips.models.TipsProxy.getInstance().once(game.modules.tips.models.TIPS_ON_OK, this, this.goRecharge);
			} else {
				bag.models.BagProxy.getInstance().once(bag.models.REFRESH_CURRENCY_EVENT, this, this.onCPetDepotColumnAddCapacity);
				RequesterProtocols._instance.c2s_exchange_currency(MoneyTypes.MoneyType_HearthStone, MoneyTypes.MoneyType_SilverCoin, yuanbao);
			}
		}
		/** 商城充值 */
		public goRecharge() {
			ModuleManager.jumpPage(ModuleNames.SHOP, shopMediatorType.CHONGZHI, this._app);
			game.modules.shop.models.ShopProxy._instance.event(game.modules.shop.models.Go_Charge);   //前往充值界面。关闭当前界
		}
		/**
		 * 获取某个仓库的数据
		 */
		private getCurrDepotData(arrData: Array<any>, num: number): any {
			switch (num) {
				case 1:
					arrData = this.depot1ListData;
					break;
				case 2:
					arrData = this.depot2ListData;
					break;
				case 3:
					arrData = this.depot3ListData;
					break;
				case 4:
					arrData = this.depot4ListData;
					break;
			}
			return arrData;
		}
		/** 检查当前对象仓库的宠物是否达到上限 */
		private checkCurrPetDepotIsFull(btn: Laya.Button): boolean {
			let flag: boolean = true;
			switch (btn) {
				case this._viewUI.quchu_btn://取出宠物
					//服务器有做判断，客户端无需提供相应的操作
					break;
				case this._viewUI.jicun_btn://寄存宠物
					//当前处于宠物仓库的第几个仓库
					let _currAtDepotNum = Number(this._viewUI.currDepotNum_lab.text);
					let _currDepotData = [];
					_currDepotData = this.getCurrDepotData(_currDepotData, _currAtDepotNum);
					for (let i = 0; i < _currDepotData.length; i++) {
						if (_currDepotData[i] == 0) {//只要开启的宠物栏位还有有空位
							flag = false;
							break;
						}
					}
					break;
			}
			return flag;
		}
		/** 在宠物仓库取出/寄存宠物
		 * @param btn 点击的按钮
		 * @describe quchu_btn 取出宠物；jicun_btn 寄存宠物
		 */
		public depotMovePet(btn: Laya.Button): void {
			//源宠物栏
			let srccolumnid: number;
			//目的宠物栏
			let dstcolumnid: number;
			//存或取的宠物key
			let petkey: number;
			switch (btn) {
				case this._viewUI.quchu_btn://取出宠物
					srccolumnid = PetColumnTypes.DEPOT;
					dstcolumnid = PetColumnTypes.PET;
					//当前第几个仓库
					let currDepotNum = Number(this._viewUI.currDepotNum_lab.text);
					//当前宠物仓库中被选中的宠物信息数据
					let depotPetInfoData = this.depotListData[currDepotNum - 1][this.lastCKSelectIndex];
					if (!depotPetInfoData) break;
					petkey = depotPetInfoData.petkey;
					break;
				case this._viewUI.jicun_btn://寄存宠物	
					let flag = this.checkCurrPetDepotIsFull(btn);
					if (flag) {
						let _tipsMsg = ChatModel.getInstance().chatMessageTips[160034]["msg"];
						this.showDisTips(_tipsMsg);
						return;
					}
					srccolumnid = PetColumnTypes.PET;
					dstcolumnid = PetColumnTypes.DEPOT;
					//当前持有宠物中被选中的宠物信息数据
					let havePetInfoData: models.PetInfoVo = this.havePetsInfoData[this.lastHavePetLstSelectIndex];
					if (!havePetInfoData) break;
					petkey = havePetInfoData.key;
					break;
			}
			if (!petkey) {
				let _chatMessageTips = chat.models.ChatModel.getInstance().chatMessageTips;
				let msg;
				switch (btn) {
					case this._viewUI.quchu_btn://取出宠物
						msg = _chatMessageTips[160025]["msg"];
						break;
					case this._viewUI.jicun_btn://寄存宠物
						msg = _chatMessageTips[160032]["msg"];
						break;
				}
				this.showDisTips(msg);
				this.initUI();
				return;
			}
			this.selectedBtn = btn;
			models.PetProxy.getInstance().once(models.GET_PetError, this, this.showPetErrorTips);
			RequesterProtocols._instance.c2s_move_petcolumn(srccolumnid, petkey, dstcolumnid, this.npckey);
		}
		/** 显示提示飘窗 */
		private showDisTips(msg): void {
			let distips = new commonUI.DisappearMessageTipsMediator(this._app);
			distips.onShow(msg);
		}
		/** 显示在宠物仓库进行宠物相关操作的出错提示信息
		 * @param peterror 出错的编号
		 */
		private showPetErrorTips(peterror: number): void {
			let _chatMessageTips = chat.models.ChatModel.getInstance().chatMessageTips;
			let msg;
			switch (peterror) {
				case PetError.FightPetCantMoveErr:
					msg = _chatMessageTips[160021]["msg"];
					break;
				case PetError.HasEquip:
					msg = _chatMessageTips[191055]["msg"];
					break;
				case PetError.KeyNotFound:
					break;
				case PetError.PetcolumnFull:
					switch (this.selectedBtn) {
						case this._viewUI.quchu_btn://取出宠物
							msg = _chatMessageTips[160108]["msg"];
							break;
						case this._viewUI.jicun_btn://寄存宠物
							msg = _chatMessageTips[160028]["msg"];
							break;
					}
					break;
				case PetError.ShowPetCantMoveErr:
					break;
				case PetError.UnkownError:
					break;
				case PetError.WrongDstCol:
					break;
			}
			this.showDisTips(msg);
			this.initUI();
		}
	}
}