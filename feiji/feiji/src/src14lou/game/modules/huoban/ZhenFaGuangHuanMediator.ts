
module game.modules.huoban {
	/** 阵法光环 */
	export class ZhenFaGuangHuanMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.ZhenFaGuangHuangUI;
		/**阵法提升界面*/
		private _zhenfatisheng: ZhenFaTiShengMediator;
		/**门派图片*/
		public menpaiImage: Array<string> = ["zs.png", "qs.png", "lr.png", "dly.png", "fs.png", "ms.png", "sm.png", "dz.png", "ss.png"];
		/**阵容位置图片*/
		public shunxu: Array<string> = ["red1.png", "red2.png", "red3.png", "red4.png", "red5.png"];
		/**拥有的阵法编号*/
		public ownzhenfa: Array<number> = [];
		/**拥有的阵法数量*/
		public ownnumber: number;
		/**未拥有的阵法编号*/
		public nohavezf: Array<number> = [];
		/**未拥有的*/
		public nohavenumber: number;
		/**拥有的卷轴*/
		public ownjuanzhou: Array<number> = [];
		/**阵法卷轴ID*/
		public juanzhounumber: number;
		/**上次选中的伙伴*/
		public lastbox: Box;
		/**选择的阵法id*/
		public selectzfid: number = -1;
		/**当前选择的阵法*/
		public currentselect: number = 0;
		/**要更改的位置*/
		public changeweizhi: number = -1;
		/**选中的伙伴*/
		public selectbox: Box;
		/**上次选择的伙伴*/
		public lastselect: number;
		/**效果*/
		public effect: Array<string> = [];
		/**当前选择的阵法等级*/
		public currentlevel: number;
		/**关闭后显示的界面;*/
		public nextInterface: number = 0;
		/**消息提示*/
		private tips: game.modules.commonUI.DisappearMessageTipsMediator;
		/**二次确认*/
		private remind: game.modules.commonUI.RemindViewMediator;
		/**特效*/
		private roleani: Laya.Animation;

		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ZhenFaGuangHuangUI();
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this.tips = new game.modules.commonUI.DisappearMessageTipsMediator(this._app)
			this.remind = new game.modules.commonUI.RemindViewMediator(this._viewUI, this._app)
			this.roleani = new Animation()
		}
		/**初始化数据*/
		public initdata(): void {
			if (this.roleani) {//是否有特效
				this.roleani.clear()
			}
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.close);
			this.ownjuanzhou = [];
			this.nohavezf = [];
			this.ownzhenfa = [];
			this.nohavenumber = 0;
			this.ownnumber = 0;
			this.juanzhounumber = 0;
			this.initzhenfa();
		}
		/**初始化阵容 */
		public initzhenronglist(): void {
			var data: Array<any> = [];
			var index: number = 0;
			this.ownnumber = 0;
			this.nohavenumber = 0;
			this.juanzhounumber = 0;
			this.lastselect = 0;
			this.selectbox = null;
			let zhenronginfo: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
			//判断是否有队伍
			//玩家角色进入阵容
			let roledetail: game.modules.createrole.models.RoleDetailVo = LoginModel.getInstance().roleDetail;
			let cnpcShapeData: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[roledetail.shape];
			let effect: Array<string> = this.effect[0].split("<br>");
			if (effect.length == 1) {//是否有两种阵法效果
				data.push({ kuang_img: "common/ui/tongyong/baikuang.png", roleicon_img: "common/icon/avatarrole/" + cnpcShapeData.littleheadID + ".png", num_img: "common/ui/guanghuan/red1.png", wanjianame_lab: roledetail.rolename, menpai_img: "common/ui/huoban/" + this.menpaiImage[roledetail.school - 11], buff_img: "common/ui/tongyong/shop_up.png", debuff_img: "" });
			}
			else {
				data.push({ kuang_img: "common/ui/tongyong/baikuang.png", roleicon_img: "common/icon/avatarrole/" + cnpcShapeData.littleheadID + ".png", num_img: "common/ui/guanghuan/red1.png", wanjianame_lab: roledetail.rolename, menpai_img: "common/ui/huoban/" + this.menpaiImage[roledetail.school - 11], buff_img: "common/ui/tongyong/shop_up.png", debuff_img: "common/ui/tongyong/shop_down.png" });
			}
			//伙伴进入阵容
			if (zhenronginfo) {//是否有阵容
				for (index = 0; index < zhenronginfo.huobanlist.length; index++) {
					let huobanbaseinfo: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[zhenronginfo.huobanlist[index]];
					let effects: Array<string> = []
					effects = this.effect[index + 1].split("<br>");
					if (effects.length == 1) {//是否有两种阵法效果
						data.push({ kuang_img: "common/ui/tongyong/baikuang.png", roleicon_img: "common/icon/avatarpartner/" + huobanbaseinfo.headid + ".png", num_img: "common/ui/guanghuan/" + this.shunxu[index + 1], menpai_img: "", wanjianame_lab: huobanbaseinfo.name, buff_img: "common/ui/tongyong/shop_up.png", debuff_img: "" });
					}
					else {
						data.push({ kuang_img: "common/ui/tongyong/baikuang.png", roleicon_img: "common/icon/avatarpartner/" + huobanbaseinfo.headid + ".png", num_img: "common/ui/guanghuan/" + this.shunxu[index + 1], menpai_img: "", wanjianame_lab: huobanbaseinfo.name, buff_img: "common/ui/tongyong/shop_up.png", debuff_img: "common/ui/tongyong/shop_down.png" });
					}
				}
			}
			for (var number = index + 1; number < 5; number++) {
				let effects: Array<string> = []
				effects = this.effect[number].split("<br>");
				if (effects.length == 1) {//是否有两种阵法效果
					data.push({ kuang_img: "common/ui/tongyong/kuang94.png", roleicon_img: "", num_img: "common/ui/guanghuan/" + this.shunxu[number], menpai_img: "", wanjianame_lab: "", debuffnum_lab: effects[0], buffnum_lab: "", buff_img: "common/ui/tongyong/shop_up.png", debuff_img: "" });
				}
				else {
					data.push({ kuang_img: "common/ui/tongyong/kuang94.png", roleicon_img: "", num_img: "common/ui/guanghuan/" + this.shunxu[number], menpai_img: "", wanjianame_lab: "", debuffnum_lab: effects[0], buffnum_lab: effects[1], buff_img: "common/ui/tongyong/shop_up.png", debuff_img: "common/ui/tongyong/shop_down.png" });
				}
			}
			this._viewUI.zhenrong_list.array = data;
			this._viewUI.zhenrong_list.renderHandler = new Laya.Handler(this, this.render);
			this._viewUI.zhenrong_list.repeatY = data.length;
			this._viewUI.tisheng_btn.clickHandler = new Laya.Handler(this, this.studyzhenfa);
			this._viewUI.openzhenfa_btn.clickHandler = new Laya.Handler(this, this.switchchangezhenfa);
			models.HuoBanProxy.getInstance().on(models.OPENZHENFA_EVENT, this, this.refreszhenfa);
			this._viewUI.icon1_img.on(Laya.Event.CLICK, this, this.changezhenrong, [1]);
			this._viewUI.icon2_img.on(Laya.Event.CLICK, this, this.changezhenrong, [2]);
			this._viewUI.icon3_img.on(Laya.Event.CLICK, this, this.changezhenrong, [3]);
			this._viewUI.icon4_img.on(Laya.Event.CLICK, this, this.changezhenrong, [4]);
			this._viewUI.icon5_img.on(Laya.Event.CLICK, this, this.changezhenrong, [5]);
			this._viewUI.icon11_img.on(Laya.Event.CLICK, this, this.changezhenrong, [11]);
			this._viewUI.icon12_img.on(Laya.Event.CLICK, this, this.changezhenrong, [12]);
			this._viewUI.icon13_img.on(Laya.Event.CLICK, this, this.changezhenrong, [13]);
			this._viewUI.icon14_img.on(Laya.Event.CLICK, this, this.changezhenrong, [14]);
			this._viewUI.nexteffect_btn.on(Laya.Event.CLICK, this, this.nexteffect);
			this._viewUI.lasteffect_btn.on(Laya.Event.CLICK, this, this.lastffect);
		}
		/**阵容列表响应事件*/
		public render(cell: Box, index: number): void {
			var btn: Button = cell.getChildByName("selectmenber_btn") as Button;
			btn.on(Laya.Event.CLICK, this, this.selectchange, [cell, index]);
			var buffnum_html: Laya.HTMLDivElement = cell.getChildByName("buffnum_html") as Laya.HTMLDivElement
			var debuffnum_html: Laya.HTMLDivElement = cell.getChildByName("debuffnum_html") as Laya.HTMLDivElement
			let effect: Array<string> = []
			effect = this.effect[index].split("<br>");
			if (effect.length == 1) {//是否有两种阵法效果
				buffnum_html.innerHTML = effect[0]
				debuffnum_html.innerHTML = ""
			}
			else {
				buffnum_html.innerHTML = effect[0]
				debuffnum_html.innerHTML = effect[1]
			}
		}
		/**查看阵法*/
		public selectchange(cell: Box, index: number): void {
			let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
			let currentzwid: Array<number> = allzhenfa[this.selectzfid].formation;
			if (this.lastselect == -1 || this.selectbox == null) {//是否点击伙伴更换位置
				if (this.selectbox) {
					var btn: Button = this.selectbox.getChildByName("selectmenber_btn") as Button;
					btn.selected = false;
				}
				this.selectbox = cell;
				var btn: Button = cell.getChildByName("selectmenber_btn") as Button;
				btn.selected = true;
				this.lastselect = index;
				return;
			}
			if (this.selectbox != cell) {//两次选择不同
				var lastbtn: Button = this.selectbox.getChildByName("selectmenber_btn") as Button;
				lastbtn.selected = false;
				var btn: Button = cell.getChildByName("selectmenber_btn") as Button;
				btn.selected = true;
				this.selectbox = cell;
			}
			if (index == 0 || this.lastselect == 0) {//选择队长不可更换
				this.lastselect = -1;
				return;
			}
			this.changehuoban(cell, index);
		}
		/**效果改变 */
		public nexteffect(): void {
			let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.selectzfid);
			if (this.currentlevel + 1 <= 5) {
				if (zfinfo) {//是否有阵容
					if (this.currentlevel + 1 == zfinfo.level) {//阵容等级变化
						this.ZhenFaEffectData(this.currentlevel + 1, 1);
					}
					else {
						this.ZhenFaEffectData(this.currentlevel + 1, 0);
					}
				}
				else {
					this.ZhenFaEffectData(this.currentlevel + 1, 0);
				}
				this.currentlevel += 1;
				this.initzhenronglist();
			}
		}
		/**上个阵容效果*/
		public lastffect(): void {
			let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.selectzfid);
			if (this.currentlevel - 1 >= 1) {
				if (zfinfo) {//是否有阵容
					if (this.currentlevel - 1 == zfinfo.level) {//阵容等级变化
						this.ZhenFaEffectData(this.currentlevel - 1, 1);
					}
					else {
						this.ZhenFaEffectData(this.currentlevel - 1, 0);
					}
				}
				else {
					this.ZhenFaEffectData(this.currentlevel - 1, 0);
				}
				this.currentlevel -= 1;
				this.initzhenronglist();
			}
		}
		/** 伙伴阵容更改		 */
		public changehuoban(cell: Box, index: number): void {
			let zhenrong: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
			if (zhenrong && zhenrong.huobanlist.length != 0) {//是否有阵容
				let currentzrid: number = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[this.lastselect - 1];
				if (HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index - 1] == null || currentzrid == null) {//阵容不为空
					this.lastselect = -1;
					return;
				}
				HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[this.lastselect - 1] = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index - 1];
				HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index - 1] = currentzrid;
				models.HuoBanProxy.getInstance().once(models.ZHENRONG_EVENT, this, this.initdata);
				this.lastselect = -1;
				var btn: Button = cell.getChildByName("selectmenber_btn") as Button;
				btn.selected = false;
				this.selectbox = null;
				RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist);
			}
		}
		/**阵法效果 */
		public ZhenFaEffectData(level: number, islearn: number): void {
			let curreneffect: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11144]
			let lveffect: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11145]
			if (islearn == 1) {//是否学习阵法
				this._viewUI.effectname_lab.text = curreneffect.msg;
			}
			else {
				this._viewUI.effectname_lab.text = level + lveffect.msg;
			}
			let allzhenfaeffect: ZhenFaEffectBaseVo = HuoBanModel.getInstance().ZhenFaEffectData[(this.selectzfid - 1) * 5 + level + 1];
			let effect: Array<string> = allzhenfaeffect.descirbe;
			for (var index = 0; index < effect.length; index++) {
				this.effect[index] = effect[index];
			}
		}
		/**显示所有阵法 */
		public initzhenfa(): void {
			let lv: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			let nostudy: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11141]
			let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
			var data: Array<any> = [];
			//区分已学阵法和未学阵法
			//将已学和未学的阵法分别加入list当中
			let bagvo: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];
			//将背包里卷轴的ID取出来
			for (var index = 0; index < bagvo.items.length; index++) {
				let item: game.modules.bag.models.ItemVo = bagvo.items[index];
				if (item.id >= 101301 && item.id <= 101310) {//阵法道具ID范围
					this.ownjuanzhou[this.juanzhounumber] = item.id;
					this.juanzhounumber += 1;
				}
			}
			for (var index = 1; index < 11; index++) {
				if (LoginModel.getInstance().roleDetail.learnedFormsMap.get(index)) {//有阵法
					this.ownzhenfa[this.ownnumber] = index;
					this.ownnumber += 1;
				}
				else {
					this.nohavezf[this.nohavenumber] = index;
					this.nohavenumber += 1;
				}
			}
			for (var index = 0; index < this.ownzhenfa.length; index++) {
				let zhenfa: FormationbaseConfigBaseVo = allzhenfa[this.ownzhenfa[index]];
				let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.ownzhenfa[index]);
				let ishave = 0;
				for (var num = 0; num < this.ownjuanzhou.length; num++) {
					if (this.ownjuanzhou[num] == zhenfa.bookid) {//是否拥有该阵法道具
						ishave = 1; break;
					}
				}
				if (ishave == 1) {//拥有阵法					
					data.push({ zhenfaname_lab: allzhenfa[this.ownzhenfa[index]].name, study_img: "common/ui/tongyong/shop_up.png", zhenfalv_lab: zfinfo.level + lv.msg, jiaobiao_img: "", zhenfaicon_img: "common/icon/item/" + zhenfa.icon + ".png" });
				}
				else {
					data.push({ zhenfaname_lab: allzhenfa[this.ownzhenfa[index]].name, study_img: "", zhenfalv_lab: zfinfo.level + lv.msg, jiaobiao_img: "", zhenfaicon_img: "common/icon/item/" + zhenfa.icon + ".png" });
				}
			}
			for (var index = 0; index < this.nohavezf.length; index++) {
				let zhenfa: FormationbaseConfigBaseVo = allzhenfa[this.nohavezf[index]];
				let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.nohavezf[index]);
				let ishave = 0;
				for (var num = 0; num < this.ownjuanzhou.length; num++) {
					if (this.ownjuanzhou[num] == zhenfa.bookid) {//是否拥有该阵法道具
						ishave = 1; break;
					}
				}
				if (ishave == 1) {//拥有阵法
					data.push({ zhenfaname_lab: allzhenfa[this.nohavezf[index]].name, study_img: "common/ui/tongyong/shop_up.png", zhenfalv_lab: nostudy.msg, jiaobiao_img: "", zhenfaicon_img: "common/icon/item/" + zhenfa.icon + ".png" });
				}
				else {
					data.push({ zhenfaname_lab: allzhenfa[this.nohavezf[index]].name, study_img: "", zhenfalv_lab: nostudy.msg, jiaobiao_img: "", zhenfaicon_img: "common/icon/item/" + zhenfa.icon + ".png" });
				}
			}
			this._viewUI.changezhenfa_list.array = data;
			this._viewUI.changezhenfa_list.vScrollBarSkin = "";
			this._viewUI.changezhenfa_list.repeatY = data.length;
			this._viewUI.changezhenfa_list.selectedIndex = this.currentselect;
			this._viewUI.changezhenfa_list.renderHandler = new Laya.Handler(this, this.changeselect);
		}
		/**更换阵法响应事件*/
		public changeselect(cell: Box, index: number): void {
			var btn: Button = cell.getChildByName("zhenfaselect_btn") as Button;
			if (this._viewUI.changezhenfa_list.selectedIndex == index) {
				btn.selected = true;
				this.lastbox = cell;
				this.currentselect = index;
				if (index < this.ownzhenfa.length) {//已学阵法
					this.initzhenfarestrain(this.ownzhenfa[index]);
				}
				else {
					this.initzhenfarestrain(this.nohavezf[index - this.ownzhenfa.length]);
				}
				this.switchchange();
			}
			btn.on(Laya.Event.CLICK, this, this.changezhenfa, [cell, index]);
		}
		/**更换阵法*/
		public changezhenfa(cell: Box, index: number): void {
			if (this.lastbox != cell) {//是否多次选择阵法
				var btn: Button = cell.getChildByName("zhenfaselect_btn") as Button;
				btn.selected = true;
				this.currentselect = index;
				var lastbtn: Button = this.lastbox.getChildByName("zhenfaselect_btn") as Button;
				lastbtn.selected = false;
				this.lastbox = cell;
				if (index < this.ownzhenfa.length) {//已学
					this.initzhenfarestrain(this.ownzhenfa[index]);
				}
				else {
					this.initzhenfarestrain(this.nohavezf[index - this.ownzhenfa.length]);
				}
				this.switchchange();
				this.changeweizhi = -1;
				this.roleani.clear()
			}
		}
		/**阵法克制内容 */
		public initzhenfarestrain(restrain: number): void {
			let lv: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			let tisheng: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11150]
			let study: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11151]
			let zhenfarestrain: FormationRestrainBaseVo = HuoBanModel.getInstance().FormationRestrainData[restrain];
			let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
			this.selectzfid = restrain;
			//将阵法编号拆分
			let num1: Array<string> = zhenfarestrain.restrain1.split(",");
			this._viewUI.kezhizhenfa_lab.text = "";
			for (var index = 0; index < num1.length; index++) {
				this._viewUI.kezhizhenfa_lab.text += allzhenfa[num1[index]].name + " ";
			}
			let num2: Array<string> = zhenfarestrain.restrain2.split(",");
			this._viewUI.qiangkezhenfa_lab.text = "";
			for (var index = 0; index < num2.length; index++) {
				this._viewUI.qiangkezhenfa_lab.text += allzhenfa[num2[index]].name + " ";
			}
			let num3: Array<string> = zhenfarestrain.beRestrained1.split(",");
			this._viewUI.beikezhenfa_lab.text = "";
			for (var index = 0; index < num3.length; index++) {
				this._viewUI.beikezhenfa_lab.text += allzhenfa[num3[index]].name + " ";
			}
			let num4: Array<string> = zhenfarestrain.beRestrained2.split(",");
			this._viewUI.beiqiangkezhenfa_lab.text = "";
			for (var index = 0; index < num4.length; index++) {
				this._viewUI.beiqiangkezhenfa_lab.text += allzhenfa[num4[index]].name + " ";
			}
			let ishave: number = 0;
			for (var index = 0; index < this.ownzhenfa.length; index++) {
				if (this.ownzhenfa[index] == restrain) {//是否拥有该阵法
					ishave = 1; break;
				}
			}
			if (ishave == 1) {//是否拥有该阵法
				this._viewUI.tisheng_btn.label = tisheng.msg;
				let s: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(restrain);
				this.currentlevel = s.level;
				this.ZhenFaEffectData(s.level, 1);
				this._viewUI.guanghuangname_lab.text = s.level + lv.msg + allzhenfa[restrain].name;
			}
			else {
				this._viewUI.tisheng_btn.label = study.msg;
				this._viewUI.guanghuangname_lab.text = allzhenfa[restrain].name;
				this.currentlevel = 1;
				this.ZhenFaEffectData(1, 0);
			}
			let effect: Array<ZhenFaEffectBaseVo> = HuoBanModel.getInstance().ZhenFaEffectData as Array<ZhenFaEffectBaseVo>;
			let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(restrain);
			if (zfinfo) {//是否有阵容
				this._viewUI.jingyan_lab.text = zfinfo.exp + "/" + effect[(restrain - 1) * 5 + zfinfo.level + 2].needexp;
				this._viewUI.jingyan_img.visible = true;
				this._viewUI.jingyan_lab.visible = true;
			}
			else {
				this._viewUI.jingyan_img.visible = false;
				this._viewUI.jingyan_lab.visible = false;
			}
			this.initrolesit(restrain);
			this.initzhenronglist();
		}
		/**学习阵法 */
		public studyzhenfa(): void {
			let study: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11151]
			let useformbook: Array<game.modules.huoban.models.UseFormBookVo> = new Array<game.modules.huoban.models.UseFormBookVo>();
			let zhenfa: FormationbaseConfigBaseVo = HuoBanModel.getInstance().FormationbaseConfigData[this.selectzfid];
			if (this._viewUI.tisheng_btn.label == study.msg) {//是否学习
				//判断背包是否有该道具，有就学习，没有就跳提示框
				let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1]
				let ishave: number = 0
				for (var index = 0; index < bag.items.length; index++) {
					let items: game.modules.bag.models.ItemVo = bag.items[index]
					if (items.id == zhenfa.bookid) {
						ishave = 1;
						break;
					}
				}
				if (ishave == 1) {//拥有该阵法道具
					let formbook: game.modules.huoban.models.UseFormBookVo = new game.modules.huoban.models.UseFormBookVo();
					formbook.bookid = zhenfa.bookid;
					formbook.num = 1;
					useformbook[0] = formbook;
					RequesterProtocols._instance.c2s_CUseFormBook(this.selectzfid, useformbook);
				}
				else {//显示提示框
					HuoBanModel.getInstance().zhenfaui = 1
					let text: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[480]
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150177];
					this.remind.onhtmlShow(chattext.msg, text.msg)
					this.remind.once(commonUI.RIGHT_BUTTON_EVENT, this, this.shanghui, [zhenfa.bookid]);
					this.remind.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancel)
				}
			}
			else {//提升阵法等级
				let bag: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1]
				let ishave: number = 0
				for (var index = 0; index < bag.items.length; index++) {
					let items: game.modules.bag.models.ItemVo = bag.items[index]
					if (items.id >= 101300 && items.id <= 101310) {//阵法道具ID范围
						ishave = 1;
						break;
					}
				}
				if (ishave == 1) {//拥有该阵法道具
					this._zhenfatisheng = new ZhenFaTiShengMediator(this._app);
					this._zhenfatisheng.init(this.selectzfid, zhenfa.name);
				}
				else {//显示提示框
					HuoBanModel.getInstance().zhenfaui = 1
					let text: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[480]
					let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[160055];
					this.remind.onhtmlShow(chattext.msg, text.msg)
					this.remind.once(commonUI.RIGHT_BUTTON_EVENT, this, this.shanghui, [zhenfa.bookid]);
					this.remind.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancel)
				}
			}
		}
		/**商城购买*/
		public shanghui(zhenfaid: number): void {
			ShopModel.getInstance().itemId = zhenfaid;
			ModuleManager.show(ModuleNames.SHOP, this._app);
			if (HuoBanModel.getInstance().is_frome_ZFGH_to_SH) LoginModel.getInstance().CommonPage = ModuleNames.HUOBAN;
			this.remind.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancel);
			super.hide()
		}
		/**不跳转界面*/
		public cancel(): void {
			HuoBanModel.getInstance().zhenfaui = 0
			this.remind.off(commonUI.RIGHT_BUTTON_EVENT, this, this.shanghui);
		}
		/**开启阵法 */
		public switchchangezhenfa(): void {
			let tisheng: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11150]
			if (this._viewUI.tisheng_btn.label == tisheng.msg) {//提升阵法
				models.HuoBanProxy.getInstance().once(models.SWITCHCHANGE_EVENT, this, this.switchchange);
				RequesterProtocols._instance.c2s_CSwitch_Zhenfa(HuoBanModel.getInstance().currentzrid, this.selectzfid);
			}
			else {//提示				
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150178];
				this.tips.onShow(chattext.msg)
			}
		}
		/**更换阵法*/
		public switchchange(): void {
			let kaiqi: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11597]
			let weikaiqi: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11598]
			let zhenronginfo: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
			if (zhenronginfo) {//是否有阵容
				if (zhenronginfo.zhenfa == this.selectzfid) {//更换阵法
					this._viewUI.openzhenfa_btn.label = weikaiqi.msg;
					this._viewUI.openzhenfa_btn.mouseEnabled = false;
					this._viewUI.openzhenfa_btn.skin = "common/ui/tongyong/common_buttonhui52.png";
				}
				else {
					this._viewUI.openzhenfa_btn.label = kaiqi.msg;
					this._viewUI.openzhenfa_btn.mouseEnabled = true;
					this._viewUI.openzhenfa_btn.skin = "common/ui/tongyong/common_buttonlan67.png";
				}
			}
			else {
				if (HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid] == this.selectzfid) {//更换阵法
					this._viewUI.openzhenfa_btn.label = weikaiqi.msg;
					this._viewUI.openzhenfa_btn.mouseEnabled = false;
					this._viewUI.openzhenfa_btn.skin = "common/ui/tongyong/common_buttonhui52.png";
				}
				else {
					this._viewUI.openzhenfa_btn.label = kaiqi.msg;
					this._viewUI.openzhenfa_btn.mouseEnabled = true;
					this._viewUI.openzhenfa_btn.skin = "common/ui/tongyong/common_buttonlan67.png";
				}
			}
		}
		/**人物站位		 */
		public initrolesit(currentzfid: number): void {//当前选择的阵法ID
			let zhenronginfo: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
			let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
			let allsit: Array<number> = allzhenfa[currentzfid].formation;
			let zhanweilist: Array<number> = [1, 2, 3, 4, 5, 11, 12, 13, 14];
			for (var index = 0; index < zhanweilist.length; index++) {
				let isuse: number = 0;
				for (var num = 0; num < 5; num++) {
					if (allsit[num] == zhanweilist[index]) {//该位置是否可站
						isuse = 1;
						break;
					}
				}
				this.initzhanwei(zhanweilist[index], isuse);
			}
			let roledetail: game.modules.createrole.models.RoleDetailVo = LoginModel.getInstance().roleDetail;
			let cnpcShapeData: CNpcShapeBaseVo = LoginModel.getInstance().cnpcShapeInfo[roledetail.shape];
			this.selectsit(allsit[0], 1, cnpcShapeData.littleheadID, 1, roledetail.school);
			if (zhenronginfo) {//是否有伙伴
				for (var index = 0; index < zhenronginfo.huobanlist.length; index++) {
					let huobanbaseinfo: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[zhenronginfo.huobanlist[index]];
					this.selectsit(allsit[index + 1], 0, huobanbaseinfo.headid, index + 2);
				}
			}
		}
		/**选择伙伴或者角色*/
		public selectsit(sitid: number, rolerohuoban: number, iconid: number, weizhiid: number, menpaiid?: number): void {//icon 为1代表角色 icon 0代表伙伴	
			switch (sitid) {//sitid代表该角色所占的位置
				case 1:
					this._viewUI.zhanwei1_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi1_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon1_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon1_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai1_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon1_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 2:
					this._viewUI.zhanwei2_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi2_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon2_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon2_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai2_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon2_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 3:
					this._viewUI.zhanwei3_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi3_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon3_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon3_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai3_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon3_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 4:
					this._viewUI.zhanwei4_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi4_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon4_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon4_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai4_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon4_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 5:
					this._viewUI.zhanwei5_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi5_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon5_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon5_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai5_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon5_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 11:
					this._viewUI.zhanwei11_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi11_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon11_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon11_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai11_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon11_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 12:
					this._viewUI.zhanwei12_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi12_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon12_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon12_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai12_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon12_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 13:
					this._viewUI.zhanwei13_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi13_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon13_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon13_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai13_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon13_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				case 14:
					this._viewUI.zhanwei14_img.skin = "common/ui/tongyong/baikuang.png"
					this._viewUI.weizhi14_img.skin = "common/ui/guanghuan/" + weizhiid + ".png";
					this._viewUI.icon14_img.mouseEnabled = true;
					if (rolerohuoban == 1) {//伙伴或者角色
						this._viewUI.icon14_img.skin = "common/icon/avatarrole/" + iconid + ".png"
						this._viewUI.menpai14_img.skin = "common/ui/huoban/" + this.menpaiImage[menpaiid - 11];
					}
					else {
						this._viewUI.icon14_img.skin = "common/icon/avatarpartner/" + iconid + ".png"
					}
					break;
				default:
					break;
			}
		}
		/**初始化可用占位		 */
		public initzhanwei(useid: number, isuse: number): void {
			switch (useid) {//根据阵法初始化可用占位
				case 1:
					this._viewUI.icon1_img.skin = "";
					this._viewUI.menpai1_img.skin = "";
					this._viewUI.weizhi1_img.skin = "";
					this._viewUI.icon1_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei1_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei1_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 2:
					this._viewUI.icon2_img.skin = "";
					this._viewUI.menpai2_img.skin = "";
					this._viewUI.weizhi2_img.skin = "";
					this._viewUI.icon2_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei2_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei2_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 3:
					this._viewUI.icon3_img.skin = "";
					this._viewUI.menpai3_img.skin = "";
					this._viewUI.weizhi3_img.skin = "";
					this._viewUI.icon3_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei3_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei3_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 4:
					this._viewUI.icon4_img.skin = "";
					this._viewUI.menpai4_img.skin = "";
					this._viewUI.weizhi4_img.skin = "";
					this._viewUI.icon4_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei4_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei4_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 5:
					this._viewUI.icon5_img.skin = "";
					this._viewUI.menpai5_img.skin = "";
					this._viewUI.weizhi5_img.skin = "";
					this._viewUI.icon5_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei5_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei5_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 11:
					this._viewUI.icon11_img.skin = "";
					this._viewUI.menpai11_img.skin = "";
					this._viewUI.weizhi11_img.skin = "";
					this._viewUI.icon11_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei11_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei11_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 12:
					this._viewUI.icon12_img.skin = "";
					this._viewUI.menpai12_img.skin = "";
					this._viewUI.weizhi12_img.skin = "";
					this._viewUI.icon12_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei12_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei12_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 13:
					this._viewUI.icon13_img.skin = "";
					this._viewUI.menpai13_img.skin = "";
					this._viewUI.weizhi13_img.skin = "";
					this._viewUI.icon13_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei13_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei13_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				case 14:
					this._viewUI.icon14_img.skin = "";
					this._viewUI.menpai14_img.skin = "";
					this._viewUI.weizhi14_img.skin = "";
					this._viewUI.icon14_img.mouseEnabled = false;
					if (isuse) {//是否可用
						this._viewUI.zhanwei14_img.skin = "common/ui/tongyong/kuang94.png";
					}
					else {
						this._viewUI.zhanwei14_img.skin = "common/ui/tongyong/common_check2.png";
					}
					break;
				default:
					break;
			}
		}
		/**改变阵容 */
		public changezhenrong(weizhi: number): void {
			let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
			let currentzwid: Array<number> = allzhenfa[this.selectzfid].formation;
			if (currentzwid[0] == weizhi) {//队长位置
				this.changeweizhi = -1;
				this.roleani.clear()
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[150176];
				this.tips.onShow(chattext.msg)
				return;
			}
			if (this.changeweizhi == -1) {//是否第一次选择
				this.changeweizhi = weizhi;
				this.ani()
				return;
			}
			if (this.changeweizhi != weizhi) {//两次选择的位置是否相同
				//当前选择的位置，要改变的位置
				let selectweizhi: number;
				let changewz: number;
				for (var index = 0; index < currentzwid.length; index++) {
					if (currentzwid[index] == this.changeweizhi) {//更换位置
						selectweizhi = index - 1;
						continue;
					}
					if (currentzwid[index] == weizhi) {//更换位置
						changewz = index - 1;
						continue;
					}
				}
				let currentzrid: number = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[selectweizhi];
				HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[selectweizhi] = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[changewz];
				HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[changewz] = currentzrid;
				models.HuoBanProxy.getInstance().once(models.ZHENRONG_EVENT, this, this.initdata);
				this.changeweizhi = -1;
				RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist);
			}
		}
		/**学习阵法后刷新数据 */
		public refreszhenfa(): void {
			this.initdata();
		}
		public show(parame?: number): void {
			if (parame) {//关闭后显示的界面
				this.nextInterface = parame;
			} else {
				this.nextInterface == 0;
			}
			this.initdata();
			super.show();
		}
		public hide(): void {
			super.hide();
		}
		/**关闭界面 */
		public close(): void {
			var _CommonPage = LoginModel.getInstance().CommonPage;
			var _flag = HuoBanModel.getInstance().is_frome_ZFGH_to_SH;
			if (LoginModel.getInstance().CommonPage != "") {
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			else if (_flag) {
				ModuleManager.show(ModuleNames.HUOBAN, this._app);
				HuoBanModel.getInstance().is_frome_ZFGH_to_SH = false;
			}
			this.hide()
		}
		public getView(): Sprite {
			return this._viewUI;
		}
		/**特效*/
		public ani() {
			this.roleani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onload))
		}
		/**加载阵法位置*/
		public onload() {
			this._viewUI.addChild(this.roleani)
			Laya.Animation.createFrames(this.anUrls("xuanzhong", 9), "dongzuo")
			this.roleani.scaleX = 0.55
			this.roleani.scaleY = 0.55
			switch (this.changeweizhi) {//加载特效显示的位置
				case 1:
					this.roleani.x = this._viewUI.zhanwei1_img.x
					this.roleani.y = this._viewUI.zhanwei1_img.y
					break;
				case 2:
					this.roleani.x = this._viewUI.zhanwei2_img.x
					this.roleani.y = this._viewUI.zhanwei2_img.y
					break;
				case 3:
					this.roleani.x = this._viewUI.zhanwei3_img.x
					this.roleani.y = this._viewUI.zhanwei3_img.y
					break;
				case 4:
					this.roleani.x = this._viewUI.zhanwei4_img.x
					this.roleani.y = this._viewUI.zhanwei4_img.y
					break;
				case 5:
					this.roleani.x = this._viewUI.zhanwei5_img.x
					this.roleani.y = this._viewUI.zhanwei5_img.y
					break;
				case 11:
					this.roleani.x = this._viewUI.zhanwei11_img.x
					this.roleani.y = this._viewUI.zhanwei11_img.y
					break;
				case 12:
					this.roleani.x = this._viewUI.zhanwei12_img.x
					this.roleani.y = this._viewUI.zhanwei12_img.y
					break;
				case 13:
					this.roleani.x = this._viewUI.zhanwei13_img.x
					this.roleani.y = this._viewUI.zhanwei13_img.y
					break;
				case 14:
					this.roleani.x = this._viewUI.zhanwei14_img.x
					this.roleani.y = this._viewUI.zhanwei14_img.y
					break;
				default:
					break;
			}
			this.roleani.play(0, true, "dongzuo")
			this.roleani.interval = 112
		}
		/**特效路径*/
		public anUrls(aniName: string, length: number): any {
			var urls: any = []
			for (var index = 1; index <= length; index++) {
				urls.push("common/ui/tuji/" + aniName + index + ".png")
			}
			return urls
		}
	}
}