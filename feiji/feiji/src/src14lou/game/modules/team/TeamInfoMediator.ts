
module game.modules.team{

    export class TeamInfoMediator extends game.modules.UiMediator
    {
        public _viewUI:ui.common.component.TeamInfoUI;
        /** 门派信息 */
        private schoolInfo;
        /** 队伍信息 */
        public teaminfo : Array<any>;
        constructor(app: AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.component.TeamInfoUI();
			this._viewUI.mouseThrough = true;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this._app = app;
            this.isCenter = true;
            this.schoolInfo =  LoginModel.getInstance().schoolInfo;
		
		}
        /** 显示界面
         * @param teaminfo TeamMemberSimpleVo类型的数组
         */
        public onshow(teaminfo:Array<game.modules.team.models.TeamMemberSimpleVo>): void 
        {
            if(teaminfo.length == 0) return;
            this.show();
            this.teaminfo = teaminfo;
            /** 填充的数据长度 */
            let fullLen =  5 - this.teaminfo.length;
            for (var index = 1; index <= fullLen; index++) 
            {
                this.teaminfo.push(null);
                
            }
            this.getTeamData(this._viewUI.teaminfo_list);
            
        }
        /** 获取队伍数据
         * @param list Laya.list
         */
        private getTeamData(list:Laya.List):void
        {
            list.hScrollBarSkin = "";
            list.repeatX = this.teaminfo.length;    
            list.repeatY = 1;
            list.spaceX = 55;
            list.spaceY = 26;
            list.array = this.teaminfo;
            list.renderHandler = new Laya.Handler(this,this.onRenderTeamIfo);
        }
        /** 渲染队伍数据 */
        private onRenderTeamIfo(cell:Box,index:number)
        {
            let roleBg_img: Laya.Image = cell.getChildByName("gameItemBg_img") as Laya.Image;
            let role_img: Laya.Image = cell.getChildByName("ownGameItem_img") as Laya.Image;
            let naem_lab: Laya.Label = cell.getChildByName("name_lab") as Laya.Label;
            let zhiye_lab: Laya.Label = cell.getChildByName("zhiye_lab") as Laya.Label;
            let level_lab: Laya.Label = cell.getChildByName("level_lab") as Laya.Label;
            let data = this.teaminfo[index];
            if(data != null)
            {/** 有数据 */
                let shape = data.shape;
                roleBg_img.skin = "common/ui/tongyong/baikuang.png";
                role_img.skin = "icon/avatarrole/" + (30000 + shape) + ".png";
                naem_lab.text = data.rolename;
                let school = data.school;
                zhiye_lab.text = this.schoolInfo[school].name;
                level_lab.text =  data.level ;
            }else
            {/** 空数据 */
                role_img.skin = "";
                naem_lab.text = "";
                zhiye_lab.text = "";
                level_lab.text = "";
                roleBg_img.skin = "common/ui/tongtong/kuang94.png";

            }
        }
        public show():void
        {
            super.show();
            this.registerEvent();
        }
        /** 事件注册 */
        private registerEvent():void
        {
            this._viewUI.mask_img.on(LEvent.MOUSE_DOWN,this,this.hide);
        }

        public hide():void 
		{
			if(LoginModel.getInstance().CommonPage != "")
			{
				ModuleManager.show(LoginModel.getInstance().CommonPage,this._app);
				LoginModel.getInstance().CommonPage = "";
			}
			super.hide();
		}
		
		public getView():Sprite 
        {
			return this._viewUI;
		}
		protected onShow(event:Object):void 
		{
			this.show();
		}

    }
}