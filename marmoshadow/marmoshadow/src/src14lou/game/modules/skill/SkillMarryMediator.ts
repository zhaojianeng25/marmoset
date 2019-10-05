/**
* 结婚技能类
*/
module game.modules.skill{
	export class SkillMarryMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.SkillMarryUI;
		/**j技能显示表 */
		private skillObj:Object;
		/**结婚技能 */
		private skillArr:Array<any>;
		/**结婚技能图片 */
		private skillImgArr:Array<any>;
		/**选中列表项下标 */
		private selectNum:number=0;
		constructor(uiLayer: Sprite){
			super(uiLayer);
			this._viewUI = new ui.common.SkillMarryUI();
			this._viewUI.mouseThrough = true;
			this.isCenter = false;
			this.skillArr = new Array<any>();
			this.skillImgArr = new Array<any>();
			this.skillObj = models.SkillModel.getInstance().CSchoolSkillitemBinDic;
			this.init();
		}
		public init():void{
			for(var i:number=SkillEnum.MARRY_START;i<SkillEnum.MARRY_END;i++){
				this.skillArr.push(this.skillObj[i]);
				this.skillImgArr.push({img:"common/icon/skill/"+this.skillObj[i]["normalIcon"]+".png"});
			}			
		}
		/**初始化结婚技能列表 */
		public getListData():void{
			this._viewUI.skill_list.vScrollBarSkin = "";
			this._viewUI.skill_list.scrollBar.elasticBackTime = 200;
            this._viewUI.skill_list.scrollBar.elasticDistance = 50;
			this._viewUI.skill_list.array = this.skillArr;
			this._viewUI.skill_list.repeatY = this.skillArr.length;
			this._viewUI.skill_list.renderHandler = new Handler(this,this.onRender);
			this._viewUI.skill_list.selectHandler = new Handler(this,this.onSelect);
			this._viewUI.skill_list.selectedIndex = 0;
		}
		/**渲染结婚技能列表 */
		public onRender(cell:Laya.Box,index:number):void{
			if(index > this.skillArr.length)return;
			var nameLab:Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
			var tubiaoImg:Laya.Image = cell.getChildByName("icon_img") as Laya.Image;
			var levelLab:Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("level_lab") as Laya.Label;
           	nameLab.text = this.skillArr[index]["skillname"];
			tubiaoImg.skin = this.skillImgArr[index].img;
			if(this.skillArr[index]["frienddegree"] !=0)
				levelLab.text = this.skillArr[index]["frienddegree"] + models.SkillModel.chineseStr.haoyoudu_unlock;
			else 
				levelLab.text ="";
		}
		/**处理结婚技能列表点击 */
		public onSelect(index:number):void{
			this.selectNum = index;
			var nameLab:Laya.Label = this._viewUI.skill_list.getCell(index).getChildByName("name_lab") as Laya.Label;
			this._viewUI.skillName_lab.text = nameLab.text;
			this._viewUI.miaoshu_lab.text = this.skillArr[index]["sType"];
			this._viewUI.tiaojian_lab.text = this.skillArr[index]["leveldescribezero"];
			this._viewUI.xiaoguo_lab.text = this.skillArr[index]["skilldescribe"];
		}
		public show():void {
			super.show();
			this.getListData();
		}
		public hide():void {
			super.hide();
		}

		public swap():void{
			super.swap();
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
	}
}