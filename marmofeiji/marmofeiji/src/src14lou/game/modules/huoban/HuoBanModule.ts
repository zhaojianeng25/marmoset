/**
* 伙伴界面
*/
import HuoBanModel = game.modules.huoban.models.HuoBanModel;
module game.modules.huoban {
	export class HuoBanModule extends game.modules.ModuleMediator {
		private _viewUI: ui.common.HuoBanZhuZhanUI;
		/**伙伴详情界面*/
		private _huobandetail: HuoBanDetailMediator;
		/**阵法光环界面*/
		private _zhenfaguanghuan: ZhenFaGuangHuanMediator;
		/*门派图片名字*/
		public menpaiImage: Array<string> = ["zs.png", "qs.png", "lr.png", "dly.png", "fs.png", "ms.png", "sm.png", "dz.png", "ss.png"];
		/**门派类型*/
		public menpainame: Array<string> = [];
		/** 已拥有的数量*/
		public ishavenum: number = 0;
		/**未拥有的数量*/
		public unlockednum: number = 0;
		/**出战的伙伴数量*/
		public isbattelenum: number = 0;
		/**已拥有的*/
		public usehuobanid: Array<game.modules.huoban.models.HuoBanInfoVo> = [];
		/** 未拥有的*/
		public unlockedid: Array<game.modules.huoban.models.HuoBanInfoVo> = [];
		/**上阵*/
		public isbattle: Array<game.modules.huoban.models.HuoBanInfoVo> = [];
		/**二次确认界面*/
		private remind: game.modules.commonUI.RemindViewMediator
		/**是否选择添加伙伴*/
		public isselectfight: number = 0;
		/**选择的类型*/
		public type: number = 0;
		/**当前选择添加伙伴的位置*/
		public currentselect: number = 0;
		/**是否第一次进入阵法界面*/
		public isinit: number = 0;
		/** 当前使用的阵法编号 */
		public zhenFaNum: number = 1;
		/** 选中动画特效 */
		private ani: Laya.Animation;

		constructor(app: AppBase) {
			super();
			this.uiLayer = app.uiRoot.general;
			this._viewUI = new ui.common.HuoBanZhuZhanUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			this._viewUI.l_list.visible = false;
			this.remind = new game.modules.commonUI.RemindViewMediator(this._viewUI, this._app)
			for (var index = 11378; index <= 11386; index++) {
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[index]
				this.menpainame.push(chattext.msg)
			}
			this.ani = new Laya.Animation();
		}
		/**
		 *  初始化所有数据
		 */
		public init(): void {
			if (this.ani) {
				this.ani.clear()
			}
			this.isselectfight = 0;
			this.type = 0;
			RequesterProtocols._instance.c2s_CGet_HuoBanList();
			models.HuoBanProxy.getInstance().on(models.HUOBANLIST_EVENT, this, this.enterhuoban);
			models.HuoBanProxy.getInstance().on(models.ZHENRONG_EVENT, this, this.zhenrongselect);
			models.HuoBanProxy.getInstance().on(models.HUOBANJIESUO_EVENT, this, this.enterhuoban);
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
			this._viewUI.all_btn.label = chattext.msg;
			this._viewUI.msgTips1_img.visible = false;
			this._viewUI.menPai_img.visible = false;
			this._viewUI.up_img.visible = false;
			this._viewUI.down_img.visible = true;
			this._viewUI.faShu1_btn.selected = false;
			this._viewUI.zhiLiao1_btn.selected = false;
			this._viewUI.fuZhu1_btn.selected = false;
			this._viewUI.kongZhi1_btn.selected = false;
			this._viewUI.wuLi1_btn.selected = false;
			this._viewUI.yunxiao_btn.selected = false;
			this._viewUI.huoyun_btn.selected = false;
			this._viewUI.cangyu_btn.selected = false;
			this._viewUI.feixue_btn.selected = false;
			this._viewUI.tianlei_btn.selected = false;
			this._viewUI.wuliang_btn.selected = false;
			this._viewUI.youming_btn.selected = false;
			this._viewUI.qixing_btn.selected = false;
			this._viewUI.danyang_btn.selected = false;
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.close);
			this._viewUI.zhenrongone_ck.clickHandler = new Laya.Handler(this, this.change1state);
			this._viewUI.zhenrongtwo_ck.clickHandler = new Laya.Handler(this, this.change2state);
			this._viewUI.zhenrongtree_ck.clickHandler = new Laya.Handler(this, this.change3state);
			this._viewUI.zr1select_btn.clickHandler = new Laya.Handler(this, this.zr1select);
			this._viewUI.zr2select_btn.clickHandler = new Laya.Handler(this, this.zr2select);
			this._viewUI.zr3select_btn.clickHandler = new Laya.Handler(this, this.zr3select);
			this._viewUI.wuLi1_btn.clickHandler = new Laya.Handler(this, this.wulihuoban);
			this._viewUI.faShu1_btn.clickHandler = new Laya.Handler(this, this.fashuhuoban);
			this._viewUI.zhiLiao1_btn.clickHandler = new Laya.Handler(this, this.zhilaohuoban);
			this._viewUI.fuZhu1_btn.clickHandler = new Laya.Handler(this, this.fuzhuhuoban);
			this._viewUI.kongZhi1_btn.clickHandler = new Laya.Handler(this, this.kongzhihuoban);
			this._viewUI.huoBan_btn.clickHandler = new Laya.Handler(this, this.selectshowway);
			this._viewUI.all_btn.clickHandler = new Laya.Handler(this, this.selectmenpai);
			this._viewUI.yunxiao_btn.clickHandler = new Laya.Handler(this, this.yunxiao);
			this._viewUI.huoyun_btn.clickHandler = new Laya.Handler(this, this.huoyun);
			this._viewUI.cangyu_btn.clickHandler = new Laya.Handler(this, this.cangyu);
			this._viewUI.feixue_btn.clickHandler = new Laya.Handler(this, this.feixue);
			this._viewUI.tianlei_btn.clickHandler = new Laya.Handler(this, this.tianlei);
			this._viewUI.wuliang_btn.clickHandler = new Laya.Handler(this, this.wuliang);
			this._viewUI.youming_btn.clickHandler = new Laya.Handler(this, this.youming);
			this._viewUI.qixing_btn.clickHandler = new Laya.Handler(this, this.qixing);
			this._viewUI.danyang_btn.clickHandler = new Laya.Handler(this, this.danyang);
			this._viewUI.zhenFa_btn.clickHandler = new Laya.Handler(this, this.zhenfaguanghuan);
			this._viewUI.m_list.renderHandler = new Laya.Handler(this, this.selecthuobaninfo);
			this._viewUI.l_list.renderHandler = new Laya.Handler(this, this.selectsmallinfo);
			this._viewUI.zhenrong_list.renderHandler = new Laya.Handler(this, this.selectoraddhuoban);
			models.HuoBanProxy.getInstance().on(models.SWITCHCHANGE_EVENT, this, this.switchchange);
			this._viewUI.m_list.vScrollBarSkin = "";
			this._viewUI.l_list.vScrollBarSkin = "";
		}
		/**cell 当前选择容器 index 当前选择  */
		public selectoraddhuoban(cell: Box, index: number): void {
			var selecticon: Laya.Image = cell.getChildByName("icon_img") as Laya.Image;
			selecticon.on(Laya.Event.CLICK, this, this.change, [cell, index]);
			var leave: Laya.Image = cell.getChildByName("leave_img") as Laya.Image;
			if(leave.skin == ""){
				leave.off(Laya.Event.CLICK, this, this.huobanleave);
			}
			else{
				leave.on(Laya.Event.CLICK, this, this.huobanleave, [cell, index]);
			}
			var change: Laya.Image = cell.getChildByName("change_img") as Laya.Image;
			change.on(Laya.Event.CLICK, this, this.changezhenrong, [cell, index]);
		}
		/**	 * 多行单列监听 cell index 	 */
		public selecthuobaninfo(cell: Box, index: number): void {
			var selecthuoban: Button = cell.getChildByName("select_btn") as Button;
			selecthuoban.on(Laya.Event.CLICK, this, this.getinfo, [cell, index]);
		}
		/**
		 * 多行多列监听*cell  * index  */
		public selectsmallinfo(cell: Box, index: number): void {
			var clickinfo: Laya.Image = cell.getChildByName("huobanicon_img") as Laya.Image;
			clickinfo.on(Laya.Event.CLICK, this, this.getinfo, [cell, index]);
		}
		/**	 * 伙伴脱离整容 * 当前选择的伙伴容器  *当前选择的伙伴位置		 */
		public huobanleave(cell: Box, index: number): void {//伙伴离开
			let huobanlist: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid];
			let newhuobanlist: Array<number> = [];
			let num: number = 0;
			for (var indexs = 0; indexs < huobanlist.huobanlist.length; indexs++) {
				if (index != indexs) {//新的伙伴列表ID
					newhuobanlist[num] = huobanlist.huobanlist[indexs];
					num++;
				}
			}
			this.tishiinfo(150112, this.isbattelenum - 1);
			RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, newhuobanlist);
			if (this.ani) {
				this.ani.clear();
			}
		}
		/**	阵容内伙伴位置对调		 */
		public changezhenrong(cell: Box, index: number): void {//更改阵容
			if (this.ani) {
				this.ani.clear();
			}
			console.log("更改阵容");
			if (index != this.currentselect) {//是否是当前选择阵容
				let currenid: number = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index];
				HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[index] = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[this.currentselect];
				HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist[this.currentselect] = currenid;
				RequesterProtocols._instance.c2s_CZhenrong_Member(HuoBanModel.getInstance().currentzrid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid].huobanlist);
			}
		}
		/** 创建动画 */
		public onCreateFrame() {
			let effecthPath = bagModel.getInstance().getEffectUrls("xuanzhong", 9);
			Laya.Animation.createFrames(effecthPath, "xuanzhong");
			this.ani.play(0, true, "xuanzhong");
			this.ani.interval = 112;
		}
		/** 选择添加的伙伴，并检查是否已在阵容内 */
		public change(cell: Box, index: number): void {
			let _selecticon: Laya.Image = cell.getChildByName("icon_img") as Laya.Image;
			if (_selecticon.skin != "") {
				this.ani.loadAtlas("common/res/atlas/ui/tuji.atlas", Laya.Handler.create(this, this.onCreateFrame));
				_selecticon.addChild(this.ani);
				this.ani.x = -13;
				this.ani.y = -13;
				this.ani.scaleX = 0.9;
				this.ani.scaleY = 0.9;
			}
			let currentid: number = 0;
			currentid = HuoBanModel.getInstance().currentzrid
			let zhenrong: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[currentid];
			let num: number = 0;
			if (zhenrong) {//阵容是否有
				for (var indexs = 0; indexs < zhenrong.huobanlist.length; indexs++) {
					if (num == index) {
						break;
					}
					num++;
				}
			}
			if (index == num) {//选择哪个伙伴
				if (this.isselectfight == 1 && this.currentselect == index) {//当前选择的伙伴是否出战
					this.isselectfight = 0;
					this.currentselect = -1;
					if (this.ani) {
						this.ani.clear();
					}
				}
				else {
					this.isselectfight = 1;
					this.currentselect = index;
				}
				if (this.type == 0)//0为显示全部伙伴
					this.inithuobanlist();
				else
					this.typehuoban(this.type);
			}
			//刷新阵容信息
			this.refreshzhenrong();
		}
		/**	 * 上阵伙伴是否符合条件		 */
		public getinfo(cell: Box, index: number): void {
			if(this.ani){
				this.ani.clear();
			}
			if (this.isselectfight == 1) {//添加伙伴
				if (index < this.isbattelenum) {//是否上阵
					this.tishiinfo(150114);
					return;
				}
				if (index >= this.isbattelenum + this.ishavenum) {//未解锁伙伴
					this.tishiinfo(150115);
					return;
				}
				this.addhuoban(this.usehuobanid[index - this.isbattelenum].huobanID);
			}
			else {//查看伙伴详情
				models.HuoBanProxy.getInstance().on(models.SHANGZHENTISHI_EVENT, this, this.tishi);
				if (index < this.isbattelenum) {//是否上阵
					this._huobandetail = new HuoBanDetailMediator(this._app);
					this._huobandetail.init(this.isbattle[index].huobanID, this.usehuobanid, this.unlockedid, this.isbattle, index);
				}
				else if (index < this.ishavenum + this.isbattelenum) {//已拥有的			
					this._huobandetail = new HuoBanDetailMediator(this._app);
					this._huobandetail.init(this.usehuobanid[index - this.isbattelenum].huobanID, this.usehuobanid, this.unlockedid, this.isbattle, index);
				}
				else {//未解锁的
					this._huobandetail = new HuoBanDetailMediator(this._app);
					this._huobandetail.init(this.unlockedid[index - this.ishavenum - this.isbattelenum].huobanID, this.usehuobanid, this.unlockedid, this.isbattle, index);
				}
				this.isinit = 1;
				ModuleManager.hide(ModuleNames.HUOBAN);
			}
		}
		/**增加伙伴*/
		public addhuoban(huobanid: number): void {
			let currentid: number = HuoBanModel.getInstance().currentzrid;
			let huobaninfo: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[currentid];
			let huobanidlist: Array<number> = [];
			let num: number = -1;//是否有相同的ID
			if (huobaninfo != null) {
				for (var index = 0; index < huobaninfo.huobanlist.length; index++) {
					huobanidlist[index] = huobaninfo.huobanlist[index];
					if (huobanidlist[index] == huobanid) {//上阵中是否有相同伙伴
						num = index;
					}
				}
			}
			huobanidlist[this.currentselect] = huobanid;
			if (num != -1 && this.currentselect < huobaninfo.huobanlist.length) {//阵容内互相换位置
				huobanidlist[num] = huobaninfo.huobanlist[this.currentselect];
			}
			if (huobanidlist.length == 4) {//阵容是否满了
				this.tishiinfo(150113, huobanidlist.length);
			}
			else {
				this.tishiinfo(150112, huobanidlist.length);
			}
			RequesterProtocols._instance.c2s_CZhenrong_Member(currentid, huobanidlist);
		}
		/**云霄*/
		public yunxiao(): void {
			if (this._viewUI.yunxiao_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.all_btn.label = this.menpainame[0];
				this.typehuoban(11);
				this.type = 11;
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.inithuobanlist();
				this.type = 0;
			}
			this.selectmenpai();
		}
		/**火云*/
		public huoyun(): void {
			if (this._viewUI.huoyun_btn.selected == true) {//显示门派伙伴
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this.typehuoban(12);
				this.type = 12;
				this._viewUI.all_btn.label = this.menpainame[1];
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**苍羽*/
		public cangyu(): void {
			if (this._viewUI.cangyu_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this.typehuoban(13);
				this.type = 13;
				this._viewUI.all_btn.label = this.menpainame[2];
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**飞雪*/
		public feixue(): void {
			if (this._viewUI.feixue_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this.typehuoban(14);
				this.type = 14;
				this._viewUI.all_btn.label = this.menpainame[3];
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**天雷*/
		public tianlei(): void {
			if (this._viewUI.tianlei_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this.typehuoban(15);
				this.type = 15;
				this._viewUI.all_btn.label = this.menpainame[4];
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**无量*/
		public wuliang(): void {
			if (this._viewUI.wuliang_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this.typehuoban(16);
				this.type = 16;
				this._viewUI.all_btn.label = this.menpainame[5];
			}
			else {//显示所有
				this.type = 0;
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**幽冥*/
		public youming(): void {
			if (this._viewUI.youming_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this.typehuoban(17);
				this.type = 17;
				this._viewUI.all_btn.label = this.menpainame[6];
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**七星*/
		public qixing(): void {
			if (this._viewUI.qixing_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.all_btn.label = this.menpainame[7];
				this.type = 18;
				this.typehuoban(18);
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**丹阳*/
		public danyang(): void {
			if (this._viewUI.danyang_btn.selected == true) {//显示门派伙伴
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.all_btn.label = this.menpainame[8];
				this.type = 19;
				this.typehuoban(19);
			}
			else {//显示所有
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 0;
				this.inithuobanlist();
			}
			this.selectmenpai();
		}
		/**物理*/
		public wulihuoban(): void {
			if (this._viewUI.wuLi1_btn.selected == true) {//伙伴类型
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this.type = 1;
				this.typehuoban(1);
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
			}
			else {
				this.type = 0;
				this.inithuobanlist();
			}
		}
		/**法术*/
		public fashuhuoban(): void {
			if (this._viewUI.faShu1_btn.selected == true) {//伙伴类型
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this.type = 2;
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.typehuoban(2);
			}
			else {
				this.type = 0;
				this.inithuobanlist();
			}
		}
		/**治疗*/
		public zhilaohuoban(): void {
			if (this._viewUI.zhiLiao1_btn.selected == true) {//伙伴类型
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this.type = 3;
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.typehuoban(3);
			}
			else {
				this.type = 3;
				this.inithuobanlist();
			}
		}
		/**辅助*/
		public fuzhuhuoban(): void {
			if (this._viewUI.fuZhu1_btn.selected == true) {//伙伴类型
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.kongZhi1_btn.selected = false;
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this.typehuoban(4);
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 4;
			}
			else {
				this.inithuobanlist();
				this.type = 4;
			}
		}
		/**控制*/
		public kongzhihuoban(): void {
			if (this._viewUI.kongZhi1_btn.selected == true) {//伙伴类型
				this._viewUI.faShu1_btn.selected = false;
				this._viewUI.zhiLiao1_btn.selected = false;
				this._viewUI.fuZhu1_btn.selected = false;
				this._viewUI.wuLi1_btn.selected = false;
				this._viewUI.huoyun_btn.selected = false;
				this._viewUI.cangyu_btn.selected = false;
				this._viewUI.feixue_btn.selected = false;
				this._viewUI.tianlei_btn.selected = false;
				this._viewUI.wuliang_btn.selected = false;
				this._viewUI.youming_btn.selected = false;
				this._viewUI.qixing_btn.selected = false;
				this._viewUI.yunxiao_btn.selected = false;
				this._viewUI.danyang_btn.selected = false;
				this.typehuoban(5);
				let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11387]
				this._viewUI.all_btn.label = chattext.msg;
				this.type = 5;
			}
			else {
				this.inithuobanlist();
				this.type = 0;
			}
		}
		/**门派*/
		public selectmenpai(): void {//显示门派的助战伙伴
			if (this._viewUI.up_img.visible == false) {//是否显示门派列表
				this._viewUI.up_img.visible = true;
				this._viewUI.down_img.visible = false;
				this._viewUI.menPai_img.visible = true;
			}
			else {
				this._viewUI.up_img.visible = false;
				this._viewUI.down_img.visible = true;
				this._viewUI.menPai_img.visible = false;
			}
		}
		/**图标大小*/
		public selectshowway(): void {//显示小图标还是大图标
			if (this._viewUI.bigicon_img.visible == true) {//显示小图标还是大图标
				this._viewUI.bigicon_img.visible = false;
				this._viewUI.smallicon_img.visible = true;
				this._viewUI.m_list.visible = false;
				this._viewUI.l_list.visible = true;
			}
			else {
				this._viewUI.bigicon_img.visible = true;
				this._viewUI.smallicon_img.visible = false;
				this._viewUI.m_list.visible = true;
				this._viewUI.l_list.visible = false;
			}
		}
		/**阵容1查看*/
		public zr1select(): void {
			this.zhenFaNum = 1;
			console.log("阵容1");
			this.isselectfight = 0
			if (this._viewUI.zr1select_btn.selected == false) {//当前阵容未被选择
				this.zhenrongmenber(0, HuoBanModel.getInstance().zrhuobanlist[0]);
				for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
					HuoBanModel.getInstance().huobaninfo[index].infight = 0;
				}
				if (HuoBanModel.getInstance().zrhuobanlist[0]) {//是否有人
					for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[0].huobanlist.length; index++) {
						HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[0].huobanlist[index] - 40000].infight = 1;
					}
				}
				HuoBanModel.getInstance().currentzrid = 0;
				if (HuoBanModel.getInstance().zrhuobanlist[0]) {//是否有人
					HuoBanModel.getInstance().currentzf[0] = HuoBanModel.getInstance().zrhuobanlist[0].zhenfa
				}
				if (this.type == 0) {//0显示全部
					this.inithuobanlist();
				}
				else {
					this.typehuoban(this.type);
				}
			}
			this._viewUI.zr1select_btn.selected = true;
			this._viewUI.zr2select_btn.selected = false;
			this._viewUI.zr3select_btn.selected = false;
		}
		/**阵容2查看*/
		public zr2select(): void {
			this.zhenFaNum = 2;
			console.log("阵容2");
			this.isselectfight = 0
			if (this._viewUI.zr2select_btn.selected == false) {//当前阵容未被选择
				this.zhenrongmenber(1, HuoBanModel.getInstance().zrhuobanlist[1]);
				for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
					HuoBanModel.getInstance().huobaninfo[index].infight = 0;
				}
				if (HuoBanModel.getInstance().zrhuobanlist[1]) {//是否有人
					for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[1].huobanlist.length; index++) {
						HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[1].huobanlist[index] - 40000].infight = 1;
					}
				}
				HuoBanModel.getInstance().currentzrid = 1;
				if (HuoBanModel.getInstance().zrhuobanlist[1]) {//是否有人
					HuoBanModel.getInstance().currentzf[1] = HuoBanModel.getInstance().zrhuobanlist[1].zhenfa
				}
				if (this.type == 0) {//0显示全部
					this.inithuobanlist();
				}
				else {
					this.typehuoban(this.type);
				}
			}
			this._viewUI.zr1select_btn.selected = false;
			this._viewUI.zr2select_btn.selected = true;
			this._viewUI.zr3select_btn.selected = false;
		}
		/**阵容3查看*/
		public zr3select(): void {
			this.zhenFaNum = 3;
			console.log("阵容3");
			this.isselectfight = 0
			if (this._viewUI.zr3select_btn.selected == false) {//当前阵容未被选择
				this.zhenrongmenber(2, HuoBanModel.getInstance().zrhuobanlist[2]);
				for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
					HuoBanModel.getInstance().huobaninfo[index].infight = 0;
				}
				if (HuoBanModel.getInstance().zrhuobanlist[2]) {//是否有人
					for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[2].huobanlist.length; index++) {
						HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[2].huobanlist[index] - 40000].infight = 1;
					}
				}
				HuoBanModel.getInstance().currentzrid = 2;
				if (HuoBanModel.getInstance().zrhuobanlist[2]) {//是否有人
					HuoBanModel.getInstance().currentzf[2] = HuoBanModel.getInstance().zrhuobanlist[2].zhenfa
				}
				if (this.type == 0) {//0显示全部
					this.inithuobanlist();
				}
				else {
					this.typehuoban(this.type);
				}
			}
			this._viewUI.zr1select_btn.selected = false;
			this._viewUI.zr2select_btn.selected = false;
			this._viewUI.zr3select_btn.selected = true;
		}
		/**选择阵容1 */
		public change1state(): void {
			if (this._viewUI.zhenrongone_ck.selected) {//是否选择该阵容
				console.log("选中1");
				this._viewUI.zhenrongone_ck.mouseEnabled = false;
				this._viewUI.zhenrongtwo_ck.mouseEnabled = true;
				this._viewUI.zhenrongtree_ck.mouseEnabled = true;
				this._viewUI.zhenrongtwo_ck.selected = false;
				this._viewUI.zhenrongtree_ck.selected = false;
				RequesterProtocols._instance.c2s_CSwitch_Zhenrong(0);
			}
		}
		/**选择阵容2*/
		public change2state(): void {
			if (this._viewUI.zhenrongtwo_ck.selected) {//是否选择该阵容
				console.log("选中2");
				this._viewUI.zhenrongone_ck.mouseEnabled = true;
				this._viewUI.zhenrongtwo_ck.mouseEnabled = false;
				this._viewUI.zhenrongtree_ck.mouseEnabled = true;
				this._viewUI.zhenrongone_ck.selected = false;
				this._viewUI.zhenrongtree_ck.selected = false;
				RequesterProtocols._instance.c2s_CSwitch_Zhenrong(1);
			}
		}
		/**选择阵容3*/
		public change3state(): void {
			if (this._viewUI.zhenrongtree_ck.selected) {//是否选择该阵容
				console.log("选中3");
				this._viewUI.zhenrongone_ck.mouseEnabled = true;
				this._viewUI.zhenrongtwo_ck.mouseEnabled = true;
				this._viewUI.zhenrongtree_ck.mouseEnabled = false;
				this._viewUI.zhenrongone_ck.selected = false;
				this._viewUI.zhenrongtwo_ck.selected = false;
				RequesterProtocols._instance.c2s_CSwitch_Zhenrong(2);
			}
		}
		/**初始化阵容信息*/
		public enterhuoban(): void {
			if (HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid]) {//当前阵容是否有人
				for (var index = 0; index < HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid].huobanlist.length; index++) {
					HuoBanModel.getInstance().huobaninfo[HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid].huobanlist[index] - 40000].infight = 1;
				}
			}
			this.inithuobanlist();
		}
		/**初始化所有数据*/
		public inithuobanlist(): void {
			var data: Array<any> = [];
			var data1: Array<any> = [];
			this.ishavenum = 0;
			this.unlockednum = 0;
			this.isbattelenum = 0;
			this.usehuobanid = [];
			this.unlockedid = [];
			this.isbattle = [];
			for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
				let huobaninfo: game.modules.huoban.models.HuoBanInfoVo = HuoBanModel.getInstance().huobaninfo[index] as game.modules.huoban.models.HuoBanInfoVo;
				if (huobaninfo.infight == 1) {//是否出战
					this.isbattle[this.isbattelenum] = huobaninfo;
					this.isbattelenum += 1;
				}
				else if (huobaninfo.state != 0 || huobaninfo.weekfree != 0) {//是否拥有
					this.usehuobanid[this.ishavenum] = huobaninfo;
					this.ishavenum += 1;
				}
				else {
					this.unlockedid[this.unlockednum] = huobaninfo;
					this.unlockednum += 1;
				}
			}
			/**上阵*/
			let free: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11104]
			let day: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11105]
			let hour: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[315]
			for (var num = 0; num < this.isbattelenum; num++) {
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[this.isbattle[num].huobanID] as CHeroBaseInfoBaseVo;
				if (this.isbattle[num].state == 1) {//永久免费
					data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "", timelimit_lab: " " });
					data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: "", isselect_img: "", ishave_img: "" });
				}
				else if (this.isbattle[num].weekfree == 1) {//周免
					data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
					data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
				}
				else {//限时
					if (this.isbattle[num].state - 10 > 0) {//是否免费
						let time: number = (this.isbattle[num].state - 10) / 3600;
						if (time > 24) {//时间是否超过一天
							data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
							data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
						}
						else {
							data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
							data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
						}
					}
				}
			}
			/**拥有*/
			for (var num = 0; num < this.ishavenum; num++) {
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[this.usehuobanid[num].huobanID] as CHeroBaseInfoBaseVo;
				if (this.usehuobanid[num].state == 1) {//永久免费					
					if (this.isselectfight == 1) {//是否出战
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " ", select_img: "common/ui/huoban/huoban_UP.png" });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
					}
					else {
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " ", select_img: "" });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "" });
					}
				}
				else if (this.usehuobanid[num].weekfree == 1) {//周免			
					if (this.isselectfight == 1) {//是否出战
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg, select_img: "common/ui/huoban/huoban_UP.png" });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
					}
					else {
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg, select_img: "" });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
					}
				}
				else {
					if (this.usehuobanid[num].state - 10 > 0) {
						let time: number = (this.usehuobanid[num].state - 10) / 3600;
						if (this.isselectfight == 1) {//是否出战
							if (time > 24) {//时间是否超过一天
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
							}
							else {
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
							}
						}
						else {
							if (time > 24) {//时间是否超过一天
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
							}
							else {
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
							}
						}
					}
				}
			}
			for (var num = 0; num < this.unlockednum; num++) {
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[this.unlockedid[num].huobanID] as CHeroBaseInfoBaseVo;
				data.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "common/ui/huoban/huoban_suo.png", isfree_img: "", timelimit_lab: "" });
				data1.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "common/ui/huoban/huoban_suo.png" });
			}
			this._viewUI.m_list.array = data;
			this._viewUI.l_list.array = data1;
		}
		/**根据类型显示内容*/
		public typehuoban(type: number): void {
			var data: Array<any> = [];
			var data1: Array<any> = [];
			this.ishavenum = 0;
			this.unlockednum = 0;
			this.isbattelenum = 0;
			this.isbattle = [];
			this.usehuobanid = [];
			this.unlockedid = [];
			let free: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11104]
			let day: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[11105]
			let hour: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[315]
			for (var index = 0; index < HuoBanModel.getInstance().huobaninfo.length; index++) {
				let huobaninfo: game.modules.huoban.models.HuoBanInfoVo = HuoBanModel.getInstance().huobaninfo[index] as game.modules.huoban.models.HuoBanInfoVo;
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[huobaninfo.huobanID] as CHeroBaseInfoBaseVo;
				if (huobanbase.type == type || huobanbase.school == type) {//类型是否对应
					if (huobaninfo.infight == 1) {//是否出战
						this.isbattle[this.isbattelenum] = huobaninfo;
						this.isbattelenum += 1;
					}
					else if (huobaninfo.state != 0 || huobaninfo.weekfree != 0) {//是否拥有
						this.usehuobanid[this.ishavenum] = huobaninfo;
						this.ishavenum += 1;
					}
					else {
						this.unlockedid[this.unlockednum] = huobaninfo;
						this.unlockednum += 1;
					}
				}
			}
			for (var index = 0; index < this.isbattelenum; index++) {
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[this.isbattle[index].huobanID] as CHeroBaseInfoBaseVo;
				if (this.isbattle[index].state == 1) {//永久免费
					data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "", timelimit_lab: " " });
					data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: "", isselect_img: "", ishave_img: "" });
				}
				else if (this.isbattle[index].weekfree == 1) {//周免
					data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
					data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
				}
				else {
					if (this.isbattle[index].state - 10 > 0) {//是否永久
						let time: number = (this.isbattle[index].state - 10) / 3600;
						if (time > 24) {//是否超过一天
							data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
							data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
						}
						else {
							data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
							data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "common/ui/huoban/huoban_zhan.png", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
						}
					}
				}
			}
			for (var num = 0; num < this.ishavenum; num++) {
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[this.usehuobanid[num].huobanID] as CHeroBaseInfoBaseVo;
				if (this.usehuobanid[num].state == 1) {//永久免费
					if (this.isselectfight == 1) {//是否出战
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " " });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
					}
					else {
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "", timelimit_lab: " " });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "" });
					}
				}
				else if (this.usehuobanid[num].weekfree == 1) {//周免
					if (this.isselectfight == 1) {//是否出战
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
					}
					else {
						data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: free.msg });
						data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: free.msg, isselect_img: "", ishave_img: "" });
					}
				}
				else {
					if (this.usehuobanid[num].state - 10 > 0) {//是否永久
						let time: number = (this.usehuobanid[num].state - 10) / 3600;
						if (this.isselectfight == 1) {//是否出战
							if (time > 24) {//是否超过一天
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
							}
							else {
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "common/ui/huoban/huoban_UP.png", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "common/ui/huoban/huoban_UP.png", ishave_img: "" });
							}
						}
						else {
							if (time > 24) {//是否超过一天
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: (time / 24).toFixed(0) + day.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: (time / 24).toFixed(0) + day.msg, isselect_img: "", ishave_img: "" });
							}
							else {
								data.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "common/ui/huoban/huoban_zhan.png", issuo_img: "", isfree_img: "common/ui/tongyong/common_check2.png", timelimit_lab: time.toFixed(0) + hour.msg });
								data1.push({ huobanicon_img: "common/icon/avatarpartner/" + huobanbase.headid + ".png", isbattle_img: "", isfree_lab: time.toFixed(0) + hour.msg, isselect_img: "", ishave_img: "" });
							}
						}
					}
				}
			}
			for (var num = 0; num < this.unlockednum; num++) {
				let huobanbase: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[this.unlockedid[num].huobanID] as CHeroBaseInfoBaseVo;
				data.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", zhuZhanName_lab: huobanbase.name, zhuZhanZhiYe_lab: this.menpainame[huobanbase.school - 11], lv_lab: game.modules.mainhud.models.HudModel.getInstance().levelNum, menpai_img: "common/ui/huoban/" + this.menpaiImage[huobanbase.school - 11], select_img: "", iszhan_img: "", issuo_img: "common/ui/huoban/huoban_suo.png", isfree_img: "", timelimit_lab: "" });
				data1.push({ huobanicon_img: "common/icon/grayavatarpartner/" + (huobanbase.headid + 10000) + ".png", isbattle_img: "", isfree_lab: "", isselect_img: "", ishave_img: "common/ui/huoban/huoban_suo.png" });
			}
			this._viewUI.m_list.array = data;
			this._viewUI.l_list.array = data1;
			this._viewUI.m_list.renderHandler = new Laya.Handler(this, this.selecthuobaninfo);
			this._viewUI.l_list.renderHandler = new Laya.Handler(this, this.selectsmallinfo);
		}
		/**阵容选择*/
		public zhenrongselect(): void {
			this.isselectfight = 0;
			switch (HuoBanModel.getInstance().zhenrongid) {//0为阵容1 1为阵容2 2为阵容3
				case 0:
					this._viewUI.zhenrongone_ck.selected = true;
					this._viewUI.zhenrongtwo_ck.selected = false;
					this._viewUI.zhenrongtree_ck.selected = false;
					this._viewUI.zr1select_btn.selected = true;
					this._viewUI.zr2select_btn.selected = false;
					this._viewUI.zr3select_btn.selected = false;
					break;
				case 1:
					this._viewUI.zhenrongone_ck.selected = false;
					this._viewUI.zhenrongtwo_ck.selected = true;
					this._viewUI.zhenrongtree_ck.selected = false;
					this._viewUI.zr1select_btn.selected = false;
					this._viewUI.zr2select_btn.selected = true;
					this._viewUI.zr3select_btn.selected = false;
					break;
				case 2:
					this._viewUI.zhenrongone_ck.selected = false;
					this._viewUI.zhenrongtwo_ck.selected = false;
					this._viewUI.zhenrongtree_ck.selected = true;
					this._viewUI.zr1select_btn.selected = false;
					this._viewUI.zr2select_btn.selected = false;
					this._viewUI.zr3select_btn.selected = true;
					break;
				default:
					break;
			}
			switch (HuoBanModel.getInstance().currentzrid) {//0为阵容1 1为阵容2 2为阵容3
				case 0:
					this._viewUI.zr1select_btn.selected = true;
					this._viewUI.zr2select_btn.selected = false;
					this._viewUI.zr3select_btn.selected = false;
					break;
				case 1:
					this._viewUI.zr1select_btn.selected = false;
					this._viewUI.zr2select_btn.selected = true;
					this._viewUI.zr3select_btn.selected = false;
					break;
				case 2:
					this._viewUI.zr1select_btn.selected = false;
					this._viewUI.zr2select_btn.selected = false;
					this._viewUI.zr3select_btn.selected = true;
					break;
				default:
					break;
			}
			if (HuoBanModel.getInstance().reason == 3 || HuoBanModel.getInstance().reason == 5) {//更新的原因 3 5查看阵容
				this.zhenrongmenber(HuoBanModel.getInstance().currentzrid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid]);
			}
			else {
				this.zhenrongmenber(HuoBanModel.getInstance().zhenrongid, HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().zhenrongid]);
			}
			if (this.type == 0) {//0显示全部
				this.inithuobanlist();
			}
			else {
				this.typehuoban(this.type);
			}
		}
		/**刷新阵容信息*/
		public zhenrongmenber(currentselect: number, allzhenrong: game.modules.huoban.models.ZhenrongInfoVo): void {
			var data: Array<any> = [];
			let num: number = 0;
			let wuzhenfa: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1731]
			let lv: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			if (allzhenrong != null) {//阵容是否有人
				console.log("阵容有人");
				for (var index = 0; index < allzhenrong.huobanlist.length; index++) {
					let huobanid: number = allzhenrong.huobanlist[index];
					let huobanicon: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[huobanid];
					data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
				}
				if (allzhenrong.zhenfa == 0) {//是否有阵法
					this._viewUI.zhenFa_btn.label = wuzhenfa.msg;
				}
				else {
					let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(allzhenrong.zhenfa);
					let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
					this._viewUI.zhenFa_btn.label = zfinfo.level + lv.msg + allzhenfa[allzhenrong.zhenfa].name;
				}
			}
			else {
				//是否有阵法
				if (HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid] == 0 || HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid] == -1) {
					this._viewUI.zhenFa_btn.label = wuzhenfa.msg;
				}
				else {
					let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid]);
					let allzhenfa: Array<FormationbaseConfigBaseVo> = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
					this._viewUI.zhenFa_btn.label = zfinfo.level + lv.msg + allzhenfa[HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzrid]].name;
				}
			}
			for (var index = num; index < 4; index++) {
				if (index == num) {//是否有添加按钮
					data.push({ leave_img: "", icon_img: "common/ui/tongyong/huoban_jiahao.png", change_img: "" });
				}
				else {
					data.push({ leave_img: "", icon_img: "", change_img: "" });
				}
			}
			this._viewUI.zhenrong_list.array = data;
		}
		/**刷新阵容*/
		public refreshzhenrong(): void {
			let currentid: number = 0;
			currentid = HuoBanModel.getInstance().currentzrid
			let currentzhenrong: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[currentid]
			var data: Array<any> = [];
			let num: number = 0;
			if (currentzhenrong) {//阵容是否有人
				for (var index = 0; index < currentzhenrong.huobanlist.length; index++) {
					let huobanid: number = currentzhenrong.huobanlist[index];
					let huobanicon: CHeroBaseInfoBaseVo = HuoBanModel.getInstance().cheroBaseInfoData[huobanid];
					if (this.currentselect + 1 <= currentzhenrong.huobanlist.length) {
						if (this.isselectfight == 1) {//是否出战
							if (this.currentselect == index) {//当前选择是否出战
								data.push({ leave_img: "common/ui/tongyong/renwu_jianhao1.png", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });								
							}
							else {
								data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "common/ui/huoban/huoban_jiaohuan.png" });
							}
						}
						else {
							data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
						}
					}
					else {
						data.push({ leave_img: "", icon_img: "common/icon/avatarpartner/" + huobanicon.headid + ".png", change_img: "" });
					}
					num++;
				}
			}
			for (var index = num; index < 4; index++) {
				if (index == num) {//是否可添加
					data.push({ leave_img: "", icon_img: "common/ui/tongyong/huoban_jiahao.png", change_img: "" });
				}
				else {
					data.push({ leave_img: "", icon_img: "", change_img: "" });
				}
			}
			this._viewUI.zhenrong_list.array = data;
		}
		/**提示信息*/
		public tishiinfo(tishiid: number, num?: number): void {
			// var data = ChatModel.getInstance().chatMessageTips[tishiid];
			// var msg = ChatModel.getInstance().chatMessageTips[tishiid]["msg"];
			// this._viewUI.msgTips_lab.text = data.msg;
			// this._viewUI.msgTips1_img.visible = true;
			// Laya.Tween.to(this._viewUI.msgTips1_img, { y: 450 }, 1000, null, Laya.Handler.create(this, function () {
			// 	this._viewUI.msgTips1_img.visible = false; this._viewUI.msgTips1_img.x = 180; this._viewUI.msgTips1_img.y = 638;
			// }), null, false);
			var msg;
			if (num) {
				var param: Array<number> = [];
				if (tishiid == 150113) {
					param = [this.zhenFaNum, 4];
				} else {
					param = [this.zhenFaNum, num, 4 - num];
				}
				msg = game.modules.mainhud.models.HudModel.getInstance().promptAssembleBack(tishiid, param);
			} else {
				msg = ChatModel.getInstance().chatMessageTips[tishiid]["msg"];
			}
			var _DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
			_DisappearMessageTipsMediator.onShow(msg);
		}
		/**信息提示*/
		public tishi(e: any): void {
			let num: number = e;
			if (num == 4) {//阵容满了
				this.tishiinfo(150113, num);
			}
			else {
				this.tishiinfo(150112, num);
			}
		}
		/** 阵法光环		 */
		public zhenfaguanghuan(): void {
			if (LoginModel.getInstance().roleDetail.learnedFormsMap.keys.length == 0) {//是否学习过阵法
				let text: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[1556]
				let chattext: CMessageTipBaseVo = game.modules.chat.models.ChatModel.getInstance().chatMessageTips[160042];
				this.remind.onhtmlShow(chattext.msg, text.msg)
				this.remind.once(commonUI.RIGHT_BUTTON_EVENT, this, this.joinzhenfa);
				this.remind.once(commonUI.LEFT_BUTTON_EVENT, this, this.cancel)
			}
			else {
				this.joinzhenfa()
			}
		}
		/**该阵容有阵法直接跳到阵法光环界面*/
		public joinzhenfa(): void {
			ModuleManager.hide(ModuleNames.HUOBAN);
			this.isinit = 1;
			game.modules.createrole.models.LoginModel.getInstance().CommonPage = ModuleNames.HUOBAN
			console.log(game.modules.createrole.models.LoginModel.getInstance().CommonPage)
			this._zhenfaguanghuan = new ZhenFaGuangHuanMediator(this._app);
			this._zhenfaguanghuan.show();
			this.remind.off(commonUI.LEFT_BUTTON_EVENT, this, this.cancel)
		}
		/**不跳到阵法光环界面*/
		public cancel(): void {
			this.remind.off(commonUI.RIGHT_BUTTON_EVENT, this, this.joinzhenfa);
		}
		/**更换阵法  */
		public switchchange(): void {
			let chattext: CStringResBaseVo = game.modules.tips.models.TipsModel._instance.cstringResConfigData[3]
			if (HuoBanModel.getInstance().zrhuobanlist.length != 0) {//是否有阵容
				let zr: game.modules.huoban.models.ZhenrongInfoVo = HuoBanModel.getInstance().zrhuobanlist[HuoBanModel.getInstance().currentzrid]
				let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(zr.zhenfa);
				let zhenfa: FormationbaseConfigBaseVo = HuoBanModel.getInstance().FormationbaseConfigData[zr.zhenfa]
				this._viewUI.zhenFa_btn.label = zfinfo.level + chattext.msg + zhenfa.name
			}
			else {
				let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]);
				let zhenfa: FormationbaseConfigBaseVo = HuoBanModel.getInstance().FormationbaseConfigData[HuoBanModel.getInstance().currentzf[HuoBanModel.getInstance().currentzr]]
				this._viewUI.zhenFa_btn.label = zfinfo.level + chattext.msg + zhenfa.name
			}
		}
		protected onShow(event: Object): void {
			if (this.isinit == 0) {
				this.init();
			}
			super.onShow(event);
			if (HuoBanModel.getInstance().zhenfaui == 1) {//是否在阵法学习界面
				HuoBanModel.getInstance().zhenfaui = 0
				this.joinzhenfa()
			}
			mainhud.models.HudProxy.getInstance().event(mainhud.models.OPEN_EVENT);
		}
		/**关闭界面*/
		public close(): void {
			mainhud.models.HudProxy.getInstance().event(mainhud.models.CLOSEVIEW_EVENT);
			this.isinit = 0;
			this.hide();
			if (LoginModel.getInstance().CommonPage != "") {//是否从其他界面跳转过来
				ModuleManager.show(LoginModel.getInstance().CommonPage, this._app);
				LoginModel.getInstance().CommonPage = "";
			}
		}
		public hide(): void {
			super.hide();
			if (this.ani) {
				this.ani.clear()
			}
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}