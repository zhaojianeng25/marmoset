
module game.modules.huoban {
	/** 阵法提升 */
	export class ZhenFaTiShengMediator extends game.modules.UiMediator {
		private _viewUI: ui.common.ArrayUpUI;
		/**拥有的卷轴信息*/
		public ownjuanzhou: Array<game.modules.bag.models.ItemVo> = [];
		/**使用的卷轴数量*/
		public juanzhounumber: number;
		/**所有阵法信息*/
		public allzhenfa: Array<FormationbaseConfigBaseVo> = [];
		/**使用道具的id*/
		public usecount: Array<number> = [];
		/**增加的经验列表*/
		public alladdexp: Array<number> = [];
		/**当前选择的第几个阵法*/
		public currentaddid: number;
		/**阵法名字*/
		public currentzfname: string;
		/**阵法等级 */
		public zfLevel: number;
		/**阵法临时等级 */
		public zfLevel2: number = 0;
		constructor(app: AppBase) {
			super(app.uiRoot.general);
			this._viewUI = new ui.common.ArrayUpUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
			models.HuoBanProxy.getInstance().on(models.OPENZHENFA_EVENT, this, this.initjuanzhou);
		}
		/**初始化阵法*/
		public init(zhenfaid: number, zhenfaname: string): void {//阵法ID 阵法名字
			super.show();
			this.currentaddid = zhenfaid;
			this.currentzfname = zhenfaname;
			this.allzhenfa = HuoBanModel.getInstance().FormationbaseConfigData as Array<FormationbaseConfigBaseVo>;
			let zhenfa: FormationbaseConfigBaseVo = this.allzhenfa[zhenfaid];
			let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.allzhenfa[zhenfaid].id);
			let effect: Array<ZhenFaEffectBaseVo> = HuoBanModel.getInstance().ZhenFaEffectData as Array<ZhenFaEffectBaseVo>;
			this.zfLevel = zfinfo.level;
			this.zfLevel2 = zfinfo.level;
			if (zfinfo.level != 5) {//阵法不满级
				for (var index = (zhenfaid - 1) * 5 + 1; index <= zhenfaid * 5; index++) {
					if (effect[index].zhenfaid == zhenfaid && effect[index].zhenfaLv == zfinfo.level) {//预览使用道具阵法的等级变化
						this._viewUI.zhenfajingyan_lab.text = zfinfo.exp + "/" + effect[index + 1].needexp;
						break;
					}
				}
			} else {
				this._viewUI.zhenfajingyan_lab.text = "0/0";
			}
			this._viewUI.zhenfaicon_img.skin = "common/icon/item/" + zhenfa.icon + ".png";
			this._viewUI.zhenfaname_lab.text = zfinfo.level + "级" + zhenfaname;
			this._viewUI.close_btn.clickHandler = new Laya.Handler(this, this.hide);
			this._viewUI.tisheng_btn.skin = "common/ui/tongyong/dangehui.png"
			this._viewUI.tisheng_btn.mouseEnabled = false;
			this._viewUI.tisheng_btn.clickHandler = new Laya.Handler(this, this.tishengzhenfalv);
			this.initjuanzhou();
		}
		/**初始化卷轴信息*/
		public initjuanzhou(): void {
			this.juanzhounumber = 0;
			let bagvo: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];
			var data: Array<any> = [];
			this.ownjuanzhou = [];
			//将背包里卷轴的ID取出来
			for (var index = 0; index < bagvo.items.length; index++) {
				let item: game.modules.bag.models.ItemVo = bagvo.items[index];
				if (item.id >= 101300 && item.id <= 101310) {//阵法卷轴ID范围
					this.ownjuanzhou[this.juanzhounumber] = item;
					this.juanzhounumber += 1;
				}
			}
			for (var index = 0; index < this.ownjuanzhou.length; index++) {
				let zhenfa: FormationbaseConfigBaseVo = this.allzhenfa[this.ownjuanzhou[index].id - 101300];
				this.usecount[index] = 0;
				if (this.ownjuanzhou[index].number <= 0) continue;
				if (zhenfa.id == this.currentaddid) {//是否与当前升级当前相同，一样经验翻倍
					this.alladdexp[index] = 1200;
				}
				else {
					this.alladdexp[index] = 600;
				}
				data.push({ juanzhouicon_img: "common/icon/item/20059.png", juanzhoucount_lab: this.ownjuanzhou[index].number + "", juanzhouname_lab: zhenfa.name + "卷轴" });
			}
			this._viewUI.alljuanzhou_list.array = data;
			this._viewUI.alljuanzhou_list.vScrollBarSkin = "";
			this._viewUI.alljuanzhou_list.repeatY = 3;
			this._viewUI.alljuanzhou_list.renderHandler = new Laya.Handler(this, this.initrender);
		}
		/**初始化卷轴列表响应事件*/
		public initrender(cell: Box, index: number): void {
			var icon: Laya.Image = cell.getChildByName("juanzhouicon_img") as Laya.Image;
			var count_img: Laya.Image = cell.getChildByName("count_img") as Laya.Image;
			var reduce_img: Laya.Image = cell.getChildByName("reduce_img") as Laya.Image;
			var count_lab: Laya.Image = cell.getChildByName("count_lab") as Laya.Image;
			count_img.visible = false;
			reduce_img.visible = false;
			count_lab.visible = false;
			icon.on(Laya.Event.CLICK, this, this.addcount, [cell, index]);
			reduce_img.on(Laya.Event.CLICK, this, this.reducecount, [cell, index]);
		}
		/**增加数量*/
		public addcount(cell: Box, index: number) {
			if (this.zfLevel == 5 || this.zfLevel2 == 5) return;
			let bagvo: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];
			let item: game.modules.bag.models.ItemVo;
			for (var i: number = 0; i < bagvo.items.length; i++) {
				if (bagvo.items[i].id == this.ownjuanzhou[index].id) {
					item = bagvo.items[i];
					break;
				}
			}
			if (!item) return;
			var count_img: Laya.Image = cell.getChildByName("count_img") as Laya.Image;
			var reduce_img: Laya.Image = cell.getChildByName("reduce_img") as Laya.Image;
			var count_lab: Laya.Image = cell.getChildByName("count_lab") as Laya.Image;
			count_img.visible = true;
			reduce_img.visible = true;
			count_lab.visible = true;
			if (this.usecount[index] < item.number) {//是否超过已拥有数量
				this.usecount[index] += 1;
			}
			var text: Laya.Label = cell.getChildByName("count_lab") as Laya.Label;
			text.text = this.usecount[index] + "/" + item.number;
			this.addexp();
		}
		/**减少数量*/
		public reducecount(cell: Box, index: number): void {
			if (this.zfLevel2 == 5) this.zfLevel2 -= 1;
			let bagvo: game.modules.bag.models.BagVo = BagModel.getInstance().bagMap[1];
			let item: game.modules.bag.models.ItemVo;
			for (var i: number = 0; i < bagvo.items.length; i++) {
				if (bagvo.items[i].id == this.ownjuanzhou[index].id) {
					item = bagvo.items[i];
					break;
				}
			}
			if (!item) return;
			var count_img: Laya.Image = cell.getChildByName("count_img") as Laya.Image;
			var reduce_img: Laya.Image = cell.getChildByName("reduce_img") as Laya.Image;
			var count_lab: Laya.Image = cell.getChildByName("count_lab") as Laya.Image;
			this.usecount[index] -= 1;
			var text: Laya.Label = cell.getChildByName("count_lab") as Laya.Label;
			text.text = this.usecount[index] + "/" + item.number;
			if (this.usecount[index] == 0) {//使用的道具数量是否为零
				count_img.visible = false;
				reduce_img.visible = false;
				count_lab.visible = false;
			}
			this.addexp();
		}
		/**增加阵法经验*/
		public addexp(): void {
			let allexp: number = 0;
			for (var index = 0; index < this.usecount.length; index++) {
				allexp += this.usecount[index] * this.alladdexp[index];
			}
			let zfinfo: game.modules.huoban.models.FormBeanVo = LoginModel.getInstance().roleDetail.learnedFormsMap.get(this.allzhenfa[this.currentaddid].id);
			if (zfinfo.level != 5) {//阵法不满级 5为阵法最高等级 
				let effect: Array<ZhenFaEffectBaseVo> = HuoBanModel.getInstance().ZhenFaEffectData as Array<ZhenFaEffectBaseVo>;
				//第一个阵法在配置表中读取的范围为1-6 (this.currentaddid - 1) * 5为选择的第几个阵法 +阵法等级为当前阵法第几级的阵法效果
				//allexp 为当前点击的卷轴所增加的经验，zfinfo为当前阵法的等级和已拥有的经验
				if (this.zfLevel2 == 4 && allexp + zfinfo.exp > effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp) {
					this.zfLevel2 = 5;
					this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp;
					this._viewUI.zhenfaname_lab.text = zfinfo.level + 1 + "级" + this.currentzfname;
				}
				else if (this.zfLevel2 == 3 && allexp + zfinfo.exp > effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp) {
					this.zfLevel2 = 5;
					this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp;
					this._viewUI.zhenfaname_lab.text = zfinfo.level + 2 + "级" + this.currentzfname;
				}
				else if (this.zfLevel2 == 2 && allexp + zfinfo.exp > effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp) {
					this.zfLevel2 = 5;
					this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp;
					this._viewUI.zhenfaname_lab.text = zfinfo.level + 3 + "级" + this.currentzfname;
				}
				else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp) {
					this._viewUI.zhenfajingyan_lab.text = (allexp + zfinfo.exp) + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp;
					this._viewUI.zhenfaname_lab.text = zfinfo.level + "级" + this.currentzfname;
				}
				else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp) {
					this._viewUI.zhenfajingyan_lab.text = (zfinfo.exp + allexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp) + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp;
					this._viewUI.zhenfaname_lab.text = (zfinfo.level + 1) + "级" + this.currentzfname;
				}
				else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp) {
					this._viewUI.zhenfajingyan_lab.text = allexp + zfinfo.exp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp;
					this._viewUI.zhenfaname_lab.text = (zfinfo.level + 2) + "级" + this.currentzfname;
				}
				else if (allexp + zfinfo.exp < effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 5].needexp) {
					this._viewUI.zhenfajingyan_lab.text = allexp + zfinfo.exp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 2].needexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 3].needexp - effect[(this.currentaddid - 1) * 5 + zfinfo.level + 4].needexp + "/" + effect[(this.currentaddid - 1) * 5 + zfinfo.level + 5].needexp;
					this._viewUI.zhenfaname_lab.text = (zfinfo.level + 3) + "级" + this.currentzfname;
				}else {
					this.zfLevel2 = 5;
					this._viewUI.zhenfajingyan_lab.text = effect[(this.currentaddid - 1) * 5 + 6].needexp + "/" + effect[(this.currentaddid - 1) * 5 + 6].needexp;
				}
			}
			if (allexp == 0 || this.zfLevel == 5) {//经验为零
				this._viewUI.tisheng_btn.skin = "common/ui/tongyong/dangehui.png"
				this._viewUI.tisheng_btn.mouseEnabled = false;
			}
			else {
				this._viewUI.tisheng_btn.skin = "common/ui/tongyong/duiwuanniu.png"
				this._viewUI.tisheng_btn.mouseEnabled = true;
			}
		}
		/**提升阵法经验*/
		public tishengzhenfalv(): void {
			let useformbook: Array<game.modules.huoban.models.UseFormBookVo> = new Array<game.modules.huoban.models.UseFormBookVo>();
			let num: number = 0;
			for (var index = 0; index < this.usecount.length; index++) {
				let formbook: game.modules.huoban.models.UseFormBookVo = new game.modules.huoban.models.UseFormBookVo();
				if (this.usecount[index] != 0) {//该道具数量是否为0
					formbook.bookid = this.ownjuanzhou[index].id;
					formbook.num = this.usecount[index];
					useformbook.push(formbook);
				}
			}
			// models.HuoBanProxy.getInstance().once(models.OPENZHENFA_EVENT, this, this.init, [this.currentaddid, this.currentzfname]);
			RequesterProtocols._instance.c2s_CUseFormBook(this.currentaddid, useformbook);
		}
		public show(): void {
			super.show();
		}
		public hide(): void {
			super.hide();
		}
		public getView(): Sprite {
			return this._viewUI;
		}
	}
}