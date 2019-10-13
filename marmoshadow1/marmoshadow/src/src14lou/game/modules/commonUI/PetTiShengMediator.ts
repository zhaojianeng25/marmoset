
module game.modules.commonUI {
	/** 神兽提升 */
	export class PetTiShengMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.PetTiShengUI;
		/** 存放人物身上持有的神兽数据(key:神兽对应的宠物key， value:神兽的数据) */
		private shenshouDic: Laya.Dictionary;
		/** 神兽列表被选中的索引 */
		private shenshouSelectedIndex: number = -1;
		/** 被选中的底图 */
		private shenshouSelectedImg;
		/** 宠物数据配置表 */
		private _petAttrData: Object;
		/** 造型配置表 */
		private _shapeCpnfig: Object;
		/** 神兽提升配置表 */
		private _shenshouIncConfig: Object;
		/** 存放神兽提升所需等级的字典(key:神兽对应的宠物key， value:(key:所提升的次数，value:提升所需的等级)) */
		private needLevelDic: Laya.Dictionary;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.PetTiShengUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;


			this._viewUI.itemicon_img.skin = "common/icon/item/20073.png";
			this._viewUI.itemname_lab.text = BagModel.getInstance().itemAttrData[101422]["name"];
			this._viewUI.need_lab.text = "20";//写死的，不知道从哪个配置表取数据

			this.shenshouDic = new Laya.Dictionary();
			this.needLevelDic = new Laya.Dictionary();
			this._petAttrData = PetModel.getInstance().petCPetAttrData;//宠物数据表
			this._shapeCpnfig = createrole.models.LoginModel.getInstance().cnpcShapeInfo;//造型配置表
			this._shenshouIncConfig = PetModel.getInstance().petCPetShenShouIncdata;//神兽提升配置表
		}
		public show() {
			super.show();
			this.registEvent();
			this.init(0);//此处填个0是写死默认选中神兽列表的第一位
		}
		/** 初始化 */
		private init(index: number): void {
			if(!index && this.shenshouSelectedIndex != -1){
				index = this.shenshouSelectedIndex;
			}
			else{
				index = 0;
			}
			//身上的神兽初始化
			this.shenshouDic = PetModel.getInstance().getShenshouDatas();
			if(this.shenshouDic.keys.length == 0){//身上的神兽没有，弹出tips飘窗
				let _tipsMsg = ChatModel.getInstance().chatMessageTips[162105]["msg"];
				chat.models.ChatProxy.getInstance().event(chat.models.SHOW_DISSAPEAR_MSG_TIPS, _tipsMsg);
				this.hide();
				return;
			}
			//列表初始化
			this.lstInit();
			this.petLstSelect(index);
			this._viewUI.pet_list.scrollTo(index);
		}
		/** 神兽列表初始化 */
		private lstInit(): void {
			this._viewUI.pet_list.vScrollBarSkin = "";
			this._viewUI.pet_list.scrollBar.elasticBackTime = 100;
			this._viewUI.pet_list.scrollBar.elasticDistance = 100;
			this._viewUI.pet_list.array = this.shenshouDic.keys;
			this._viewUI.pet_list.renderHandler = new Laya.Handler(this, this.petLstRender);
			this._viewUI.pet_list.selectHandler = new Laya.Handler(this, this.petLstSelect);
		}
		/** 神兽列表点击 */
		private petLstSelect(index: number): void {
			if (index == -1) return;
			let diTu_img: Laya.Image = this._viewUI.pet_list.getCell(index).getChildByName("diTu_img") as Laya.Image;
			diTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
			if (this.shenshouSelectedImg) {
				this.shenshouSelectedImg.skin = "common/ui/tongyong/common_list_3textbg.png";
			}
			this.shenshouSelectedIndex = index;
			this.shenshouSelectedImg = diTu_img;
			//神兽数值初始化
			this.shenshouInfoInit(index);
		}
		/** 神兽部分信息的数值初始化 */
		private shenshouInfoInit(index: number): void {
			let _shenshouKey = this.shenshouDic.keys[index];
			let _shenshouInfo: pet.models.PetInfoVo = this.shenshouDic.get(_shenshouKey);
			if (_shenshouInfo.shenshouinccount == 3) {
				this._viewUI.addgongji_lab.text = "+ 0";
				this._viewUI.addfangyu_lab.text = "+ 0";
				this._viewUI.addtili_lab.text = "+ 0";
				this._viewUI.addfashu_lab.text = "+ 0";
				this._viewUI.addspeed_lab.text = "+ 0";
				this._viewUI.addchengzhang_lab.text = "+ 0";
			}
			this._viewUI.yitisheng_lab.text = _shenshouInfo.shenshouinccount.toString();
			this._viewUI.shengyu_lab.text = (3 - _shenshouInfo.shenshouinccount).toString();//神兽固定能提升3次
			this._viewUI.oldgongji_lab.text = _shenshouInfo.attackapt.toString();
			this._viewUI.oldfangyu_lab.text = _shenshouInfo.defendapt.toString();
			this._viewUI.oldtili_lab.text = _shenshouInfo.phyforceapt.toString();
			this._viewUI.oldfashu_lab.text = _shenshouInfo.magicapt.toString();
			this._viewUI.oldspeed_lab.text = _shenshouInfo.speedapt.toString();
			this._viewUI.oldchengzhang_lab.text = (_shenshouInfo.growrate / 1000).toString();
			let needLevels = new Laya.Dictionary();
			let _incKeys = Object.keys(this._shenshouIncConfig);
			for (let i = 0; i < _incKeys.length; i++) {
				let _inc: PetCShenShouIncBaseVo = this._shenshouIncConfig[_incKeys[i]];
				if (_inc.petid == _shenshouInfo.id) {
					needLevels.set(_inc.inccount, _inc.inclv);
					if ((_inc.inccount - 1) == _shenshouInfo.shenshouinccount) {
						this._viewUI.addgongji_lab.text = "+" + _inc.atkinc.toString();
						this._viewUI.addfangyu_lab.text = "+" + _inc.definc.toString();
						this._viewUI.addtili_lab.text = "+" + _inc.hpinc.toString();
						this._viewUI.addfashu_lab.text = "+" + _inc.mpinc.toString();
						this._viewUI.addspeed_lab.text = "+" + _inc.spdinc.toString();
						this._viewUI.addchengzhang_lab.text = "+" + (_inc.attinc / 1000).toString();
					}
				}
			}
			let _inclv1 = needLevels.get(1);
			let _inclv2 = needLevels.get(2);
			let _inclv3 = needLevels.get(3);
			this._viewUI.tips_lab.text = "该神兽可在" + _inclv1 + "/" + _inclv2 + "/" + _inclv3 + "级提升";
			this.needLevelDic.set(_shenshouKey, needLevels);
			let _haveYaoHunYu = BagModel.getInstance().chargeItemNum(101422);//获取人物身上持有的妖魂玉的数量
			this._viewUI.have_lab.text = _haveYaoHunYu.toString();
		}
		/** 神兽列表渲染 */
		private petLstRender(cell: Box, index: number): void {
			if (index == -1) return;
			let diTu_img: Laya.Image = cell.getChildByName("diTu_img") as Laya.Image;
			diTu_img.skin = "common/ui/tongyong/common_list_3textbg.png";
			if (this.shenshouSelectedIndex == index) {
				diTu_img.skin = "common/ui/tongyong/common_list_3textbg2.png";
			}
			let peticon_img: Laya.Image = cell.getChildByName("peticon_img") as Laya.Image;
			let petQuality_img: Laya.Image = cell.getChildByName("petQuality_img") as Laya.Image;
			let zhenPin_img: Laya.Image = cell.getChildByName("zhenPin_img") as Laya.Image;
			zhenPin_img.visible = true;//神兽必定为珍品，直接写死显示珍品角标
			let _shenshouKey = this.shenshouDic.keys[index];
			let _shenshouInfo: pet.models.PetInfoVo = this.shenshouDic.get(_shenshouKey);
			let _shenshouid = _shenshouInfo.id;
			let _shapeid = this._petAttrData[_shenshouid]["modelid"];
			let _shenshouiconid = this._shapeCpnfig[_shapeid]["littleheadID"];
			peticon_img.skin = "common/icon/avatarpet/" + _shenshouiconid + ".png";
			petQuality_img.skin = bag.BagSystemModule.getGameItemFrameColorResource(this._petAttrData[_shenshouid]["quality"]);
			let petname_lab: Laya.Label = cell.getChildByName("petname_lab") as Laya.Label;
			let petlv_lab: Laya.Label = cell.getChildByName("petlv_lab") as Laya.Label;
			let skillcount_lab: Laya.Label = cell.getChildByName("skillcount_lab") as Laya.Label;
			petname_lab.text = _shenshouInfo.name;
			petlv_lab.text = _shenshouInfo.level + "级";
			skillcount_lab.text = _shenshouInfo.skills.length.toString();
		}
		/** 注册事件 */
		private registEvent(): void {
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.tisheng_btn.on(LEvent.MOUSE_DOWN, this, this.tisheng);
			pet.models.PetProxy.getInstance().on(pet.models.SHENSHOU_INC_SUCCESS, this, this.init);
		}
		/** 神宠提升操作 */
		private tisheng(): void {
			//判断所要提升的宠物等级是否足够
			let _shenshouKey = this.shenshouDic.keys[this.shenshouSelectedIndex];
			let _shenshouInfo: pet.models.PetInfoVo = this.shenshouDic.get(_shenshouKey);
			let _needLevel: number = this.needLevelDic.get(_shenshouKey).get(_shenshouInfo.shenshouinccount + 1);
			if (_shenshouInfo.level < _needLevel) {
				let _str1: string = ChatModel.getInstance().chatMessageTips["162107"]["msg"];
				_str1 = _str1.replace("$parameter1$", _needLevel.toString());
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _str1);
				return;
			}
			//判断提升所需的道具是否足够
			let _haveNum = Number(this._viewUI.have_lab.text);
			let _needNum = Number(this._viewUI.need_lab.text);
			if (_haveNum < _needNum) {//身上所持有道具不足
				let _str2: string = ChatModel.getInstance().chatMessageTips["162094"]["msg"];
				_str2 = _str2.replace("$parameter1$", this._viewUI.itemname_lab.text);
				game.modules.chat.models.ChatProxy.getInstance().event(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS, _str2);
				return;
			}
			RequesterProtocols._instance.c2s_shen_shouyangcheng(_shenshouKey);
		}
		/** 移除事件 */
		private removeEvent(): void {
			this._viewUI.close_btn.off(LEvent.MOUSE_DOWN, this, this.hide);
			this._viewUI.tisheng_btn.off(LEvent.MOUSE_DOWN, this, this.tisheng);
			pet.models.PetProxy.getInstance().off(pet.models.SHENSHOU_INC_SUCCESS, this, this.init);
		}
		public hide() {
			super.hide();
			this.removeEvent();
			this.shenshouSelectedImg = undefined;
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}