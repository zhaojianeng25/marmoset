/**
* 伙伴详情
*/
module game.modules.huoban {
	export class HuoBanDetailMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.HuoBanDetailUI;
		/**飘窗提示 */
		private DisappearMessageTipsMediator: game.modules.commonUI.DisappearMessageTipsMediator;
		/**模型*/
		public model: ModelsCreate;
		/**模型场景*/
		private scene2DPanel: TestRole2dPanel
		/*门派图片名字*/
		public menpaiImage: Array<string> = ["zs.png", "qs.png", "lr.png", "dly.png", "fs.png", "ms.png", "sm.png", "dz.png", "ss.png"];
		/**门派类型*/
		public menpainame: Array<string> = [];
		/**拥有的伙伴*/
		public havelist: Array<game.modules.huoban.models.HuoBanInfoVo>;
		/**未拥有的伙伴*/
		public nohave: Array<game.modules.huoban.models.HuoBanInfoVo>;
		/**出战的伙伴*/
		public isbattle: Array<game.modules.huoban.models.HuoBanInfoVo>;
		/**伙伴解锁*/
		public huobanjiesuo: HuoBanJieSuoMediator;
		/**当前第几个伙伴*/
		public currentnumber: number;
		/**消息提示*/
		private _tipsModule: game.modules.tips.tipsModule;
		/**当前选择的伙伴id*/
		public huobanid: number;
		/**当前伙伴的技能id列表*/
		public skillidlist: Array<number>		
		
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.HuoBanDetailUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.model = new ModelsCreate()
			this.scene2DPanel = new TestRole2dPanel()
			this._viewUI.bg3_img.addChild(this.scene2DPanel)
			this.scene2DPanel.ape.x = 100
			this.scene2DPanel.ape.y = 200
			for (var index = 11378; index <= 11386; index++) {
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[index]
				this.menpainame.push(chattext.msg)
			}
		}
		/**模型创建*/
		modelcreate(modelid: number): void {
			if (this.model.role3d) {//是否拥有模型
				this.scene2DPanel.removeSceneChar(this.model.role3d)
			}
			this.model.role3d = new YxChar3d();
			this.model.role3d.setRoleUrl(getRoleUrl(modelid + ""));
			this.model.role3d.set2dPos((this._viewUI.huobanbk_img.x + this._viewUI.bg3_img.width / 2 + this._viewUI.bg3_img.x) * this._viewUI.globalScaleX * 1.17, (this._viewUI.huobanbk_img.y + this._viewUI.bg3_img.height / 3 * 2 + this._viewUI.bg3_img.y) * this._viewUI.globalScaleY * 1.17);  //坐标
			this.model.role3d.scale = 1.5;
			this.model.role3d.rotationX = 0
			this.model.role3d.rotationY = 135
			this.scene2DPanel.addSceneChar(this.model.role3d)
		}
		/**查看的伙伴id 拥有的伙伴列表 未拥有的伙伴列表 出战的伙伴列表 当前选择的第几个伙伴 */
		public init(huobanid: number, havehuobanlist: Array<game.modules.huoban.models.HuoBanInfoVo>, nohavelist: Array<game.modules.huoban.models.HuoBanInfoVo>, isbattlelist: Array<game.modules.huoban.models.HuoBanInfoVo>, num: number): void {
			super.show();
			this.scene2DPanel.ape.x = this._viewUI.x * this._viewUI.globalScaleX
			this.scene2DPanel.ape.y = this._viewUI.y * this._viewUI.globalScaleY
			this.havelist = havehuobanlist;
			this.nohave = nohavelist;
			this.isbattle = isbattlelist;
			this.currentnumber = num;
			this.huobanid = huobanid;
			RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(huobanid);
			models.HuoBanProxy.getInstance().on(models.HUOBANDETAIL_EVENT, this, this.initdata);
			models.HuoBanProxy.getInstance().on(models.HUOBANJIESUO_EVENT, this, this.initdata);
			this._viewUI.left_btn.clickHandler = new Laya.Handler(this, this.selectlefthuoban);
			this._viewUI.right_btn.clickHandler = new Laya.Handler(this, this.selectrighthuoban);
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.jieSuo_btn.clickHandler = new Laya.Handler(this, this.jiesuo);
			this._viewUI.shangZhen_btn.clickHandler = new Laya.Handler(this, this.shangzhen)
		}
		/**初始化伙伴数据*/
		public initdata(): void {
			let free: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11104]
			let day: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11105]
			let hour: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[315]
			let shang: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11824]
			let xia: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11825]
			let wuli: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11826]
			let fagong: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11827]
			let huobaninfo: game.modules.huoban.models.HuoBanDetailVo = HuoBanModel.getInstance().huobandetail;
			this.huobanid = huobaninfo.huobanID
			let shape: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[huobaninfo.huobanID]
			this.modelcreate(parseInt(shape.shape))
			let detailinfo: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[huobaninfo.huobanID] as CHeroBaseInfoBaseVo;
			if (detailinfo.acttype == 1) {//1为物理伙伴 2为法术伙伴
				this._viewUI.attrtype_lab.text = wuli.msg;
			}
			else {
				this._viewUI.attrtype_lab.text = fagong.msg;
			}
			this._viewUI.life_lab.text = huobaninfo.datas[7] + "";
			this._viewUI.zhiliao_lab.text = huobaninfo.datas[6] + "";
			this._viewUI.attack_lab.text = huobaninfo.datas[1] + "";
			this._viewUI.defen_lab.text = huobaninfo.datas[8] + "";
			this._viewUI.control_lab.text = huobaninfo.datas[2] + "";
			this._viewUI.magicdefen_lab.text = huobaninfo.datas[0] + "";
			this._viewUI.speed_lab.text = huobaninfo.datas[4] + "";
			this._viewUI.kangkong_lab.text = huobaninfo.datas[9] + "";
			this._viewUI.menpai_img.skin = "common/ui/huoban/" + this.menpaiImage[detailinfo.school - 11];
			this._viewUI.menpainame_lab.text = this.menpainame[detailinfo.school - 11];
			this._viewUI.huobanname_lab.text = detailinfo.name;
			this._viewUI.huobanlv_lab.text = LoginModel.getInstance().roleDetail.level + "";
			//判断是否拥有
			//是否在出战列表中
			if (this.currentnumber < this.isbattle.length) {
				huobaninfo.infight = this.isbattle[this.currentnumber].infight;
			}
			//是否在已拥有的列表中
			else if (this.currentnumber < this.isbattle.length + this.havelist.length) {
				huobaninfo.infight = this.havelist[this.currentnumber - this.isbattle.length].infight;
			}
			else {
				huobaninfo.infight = this.nohave[this.currentnumber - this.isbattle.length - this.havelist.length].infight;
			}
			if (huobaninfo.weekfree == 1) {//本周免费
				this._viewUI.free_box.visible = true;
				this._viewUI.timelimit_lab.text = free.msg
			}
			//永久
			else if (huobaninfo.state == 0) {
				this._viewUI.free_box.visible = false;
			}
			else if (huobaninfo.state != 1) {//限时
				this._viewUI.free_box.visible = true;
				let time: number = huobaninfo.state;
				time = time / 3600;
				if (time > 24)
					this._viewUI.timelimit_lab.text = (time / 24).toFixed(0) + day.msg;
				else
					this._viewUI.timelimit_lab.text = (time).toFixed(0) + hour.msg;
			}
			if (huobaninfo.state == 1) {//永久的
				this._viewUI.jieSuo_btn.visible = false;
				this._viewUI.shangZhen_btn.visible = true;
				this._viewUI.free_box.visible = false
				if (huobaninfo.infight == 1) {//是否参战					
					this._viewUI.shangZhen_btn.label = xia.msg;
				}
				else {
					this._viewUI.shangZhen_btn.label = shang.msg;
				}
			}
			else if (huobaninfo.weekfree == 1 || huobaninfo.state > 1) {//免费的 限时的
				this._viewUI.jieSuo_btn.visible = true;
				this._viewUI.shangZhen_btn.visible = true;
				this._viewUI.free_box.visible = true
				if (huobaninfo.infight == 1) {//是否参战					
					this._viewUI.shangZhen_btn.label = xia.msg;
				}
				else {
					this._viewUI.shangZhen_btn.label = shang.msg;
				}
			}
			else {//未解锁
				this._viewUI.jieSuo_btn.visible = true;
				this._viewUI.shangZhen_btn.visible = false;
			}
			let skillid: Array<number> = detailinfo.skillid;
			this.skillidlist = skillid
			let first_skill: number = detailinfo.first_skill;
			var data: Array<any> = [];
			for (var index = 0; index < 10; index++) {
				if (index < skillid.length) {
					let skilldata: FriendSkillBaseVo = HuoBanModel.getInstance().friendSkillData[skillid[index]];
					if (first_skill == skillid[index]) {//精通技能
						data.push({ skillicon_img: "common/icon/skill/" + skilldata.imageID + ".png", jingtong_img: "common/ui/huoban/huoban_jingtong.png" });
					}
					else {
						data.push({ skillicon_img: "common/icon/skill/" + skilldata.imageID + ".png", jingtong_img: "" });
					}

				}
				else {
					data.push({ skillicon_img: "", jingtong_img: "" });
				}
			}
			this._viewUI.skill_list.array = data;
			this._viewUI.skill_list.repeatY = data.length
			this._viewUI.skill_list.renderHandler = new Laya.Handler(this, this.initskill)
		}
		/**初始化技能响应事件*/
		public initskill(cell: Box, index: number): void {
			let img: Laya.Image = cell.getChildByName("skillicon_img") as Laya.Image
			img.on(LEvent.MOUSE_DOWN, this, this.skilltips, [index])
		}
		/**技能提示*/
		public skilltips(index: number): void {
			if (index < this.skillidlist.length) {//是否有效技能栏
				var parame: Dictionary = new Dictionary();
				parame.set("itemId", this.skillidlist[index])
				this._tipsModule = new game.modules.tips.tipsModule(this._viewUI, this._app, TIPS_TYPE.HUOBANSKILL, parame);
			}
		}
		/**下一个伙伴*/
		public selectrighthuoban(): void {
			if (this.currentnumber + 1 >= this.havelist.length + this.nohave.length + this.isbattle.length) {//选择的伙伴是否到底
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.BEHIND_NO_PARTNER);
				this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
				this.DisappearMessageTipsMediator.onShow(prompt);
				return;
			}
			if (this.currentnumber + 1 < this.isbattle.length) {//是否是出战伙伴
				RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.isbattle[this.currentnumber + 1].huobanID);
			}
			else if (this.currentnumber + 1 < this.havelist.length + this.isbattle.length) {//是否是已拥有的伙伴
				RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.havelist[this.currentnumber + 1 - this.isbattle.length].huobanID);
			}
			else {
				RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.nohave[this.currentnumber + 1 - this.havelist.length - this.isbattle.length].huobanID);
			}
			this.currentnumber += 1;
		}
		/**上一个伙伴信息*/
		public selectlefthuoban(): void {
			if (this.currentnumber - 1 < 0) {//选择的伙伴是否到头
				let prompt = HudModel.getInstance().promptAssembleBack(PromptExplain.FRONT_NO_PARTNER);
				this.DisappearMessageTipsMediator = new DisappearMessageTipsMediator(this._app);
				this.DisappearMessageTipsMediator.onShow(prompt);
				return;
			}
			if (this.currentnumber - 1 < this.isbattle.length) {//是否是出战伙伴
				RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.isbattle[this.currentnumber - 1].huobanID);
			}
			else if (this.currentnumber - 1 < this.havelist.length + this.isbattle.length) {//是否是已拥有的伙伴
				RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.havelist[this.currentnumber - 1 - this.isbattle.length].huobanID);
			}
			else {
				RequesterProtocols._instance.c2s_CGetHuoban_DetailInfo(this.nohave[this.currentnumber - 1 - this.havelist.length - this.isbattle.length].huobanID);
			}
			this.currentnumber -= 1;
		}
		/**上阵*/
		public shangzhen(): void {
			let currentzr = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid]
			let shang: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11824]
			let huobanlist: Array<number> = [];
			let num: number = 0;
			let zrlength: number = 0;
			if (this._viewUI.shangZhen_btn.label == shang.msg) {//是否上阵
				if (currentzr) {//当前阵容是否有
					for (var index = 0; index < currentzr.huobanlist.length; index++) {//当前阵容人数
						huobanlist[index] = currentzr.huobanlist[index];
						zrlength += 1;
					}
					if (currentzr.huobanlist.length < 4) {//人数未满
						zrlength += 1;
						huobanlist[currentzr.huobanlist.length] = HuoBanModel.getInstance().huobandetail.huobanID;
						RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, huobanlist);
					}
				}
				else {
					huobanlist[0] = HuoBanModel.getInstance().huobandetail.huobanID;
					zrlength += 1;
					RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, huobanlist);
				}
			}
			else {
				for (var index = 0; index < currentzr.huobanlist.length; index++) {
					if (currentzr.huobanlist[index] != HuoBanModel.getInstance().huobandetail.huobanID) {//是否已上阵
						huobanlist[num] = currentzr.huobanlist[index];
						num += 1;
						zrlength += 1;
					}
				}
				RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, huobanlist);
			}
			models.HuoBanProxy.getInstance().event(models.SHANGZHENTISHI_EVENT, zrlength);
			this.hide();
		}
		/**解锁*/
		public jiesuo(): void {
			this.huobanjiesuo = new HuoBanJieSuoMediator(this._app);
			this.huobanjiesuo.init(this.huobanid);
			models.HuoBanProxy.getInstance().once(models.JIEMIANCHANGE_EVENT, this, this.show);
			super.hide();
		}
		public show(): void {
			console.log("界面切回");
			super.show();
		}
		public hide(): void {
			ModuleManager.show(ModuleNames.HUOBAN, this._app);
			models.HuoBanProxy.getInstance().off(models.JIEMIANCHANGE_EVENT, this, this.show);
			models.HuoBanProxy.getInstance().off(models.HUOBANDETAIL_EVENT, this, this.initdata);
			models.HuoBanProxy.getInstance().off(models.HUOBANJIESUO_EVENT, this, this.initdata);
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}