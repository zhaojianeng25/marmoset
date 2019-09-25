
module game.modules.roleinfo{
	export class RoleChenweiMediator extends game.modules.UiMediator{
		private _viewUI:ui.common.RoleChenweiUI;
		/**人物初始属性*/
		private myData:createrole.models.RoleDetailVo;
		/**人物称谓表 */
		private RoleTitleObj:Object;
		/**称谓名数组 */
		private chengweiNameArr:Array<any>;
		/**称谓id数组 */
		private chengweiIdArr:Array<number>;
		/**当前选中列表项下标 */
		private selectNum:number;
		constructor(app:AppBase){
			super(app.uiRoot.general);
			this._viewUI = new ui.common.RoleChenweiUI();
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
			this.isCenter = true;
			this._app = app;
			this.initialize();
			this.registerEvent();
		}
			/**初始化 */
		public initialize():void{
			this.chengweiNameArr = new Array<any>();
			this.chengweiIdArr = new Array<number>();
			this.myData = createrole.models.LoginModel.getInstance().roleDetail;
			this.RoleTitleObj = game.modules.roleinfo.models.RoleInfoModel.getInstance().CRoleTitleBinDic;
		}
		/**注册点击监听 */
		public registerEvent():void{
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this, this.hide);
			this._viewUI.yincang_btn.on(LEvent.MOUSE_DOWN,this, this.clickYincang);
			this._viewUI.queding_btn.on(LEvent.MOUSE_DOWN,this, this.clickQueding);
		}
		public show():void {
			super.show();
			this.init();
		}
		/**初始化 */
		public init():void{
			this.chengweiIdArr.length = 0;
			this.chengweiNameArr.length = 0;
			//判断是否有称谓，显示不同内容
			if(this.myData.titles.keys.length>0){
				this._viewUI.moren_box.visible = false;
				this._viewUI.chengwei_box.visible = true;
				for(var i:number =0;i<this.myData.titles.keys.length;i++){
					this.chengweiIdArr.push(this.myData.titles.values[i].titleid);
				}
				for(var i:number=0;i<this.chengweiIdArr.length;i++){
					this.chengweiNameArr.push(this.RoleTitleObj[this.chengweiIdArr[i]].titlename);
				}
				this.getListData();
			}else{
				this._viewUI.moren_box.visible = true;
				this._viewUI.chengwei_box.visible = false;
			}
		}
		/**初始化称谓列表 */
		public getListData():void{
			this._viewUI.chengwei_list.vScrollBarSkin = "";
			this._viewUI.chengwei_list.scrollBar.elasticBackTime = 200;
            this._viewUI.chengwei_list.scrollBar.elasticDistance = 50;
			this._viewUI.chengwei_list.array = this.chengweiNameArr;
			this._viewUI.chengwei_list.repeatY = this.chengweiNameArr.length;
			this._viewUI.chengwei_list.renderHandler = new Handler(this,this.onRender);
			this._viewUI.chengwei_list.selectHandler = new Handler(this,this.onSelect);
			this._viewUI.chengwei_list.selectedIndex = -1;
		}
		/**渲染称谓列表 */
		public onRender(cell:Laya.Box,index:number):void{
			var chengweiBtn:Laya.Button = cell.getChildByName("chengwei_btn") as Laya.Button;
            chengweiBtn.label = this.chengweiNameArr[index];
			//选中按钮变色
			if(index!=this.selectNum){
				chengweiBtn.skin = "common/ui/tongyong/btn1.png";
			}
		}
		/**处理称谓列表点击 */
		public onSelect(index:number):void{
			if(index!=-1){
				this.selectNum = index;
				var chengweiBtn:Laya.Button = this._viewUI.chengwei_list.getCell(index).getChildByName("chengwei_btn") as Laya.Button;
				//点击更换按钮图片
				chengweiBtn.skin = "common/ui/tongyong/btn2.png";
				this._viewUI.yincang_btn.skin =  "common/ui/tongyong/btn1.png";
				this._viewUI.chengweiName_tet.text = this.RoleTitleObj[this.chengweiIdArr[index]].description;//称谓描述
				this._viewUI.fangshi_tet.text = this.RoleTitleObj[this.chengweiIdArr[index]].gettype;//获得方式
				//获取称谓到期时间
				var time = this.getTime(this.RoleTitleObj[this.chengweiIdArr[index]].availtime);
				//如果时间为0，是永久称谓，否则为限时称谓
				if(time == 0){
					this._viewUI.time_tet.text = tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.PERMANENT_TITLE].msg;//称谓时限
					this._viewUI.limitTime_tet.visible = false;
				}else{
					this._viewUI.time_tet.text = time;//称谓时限
					this._viewUI.limitTime_tet.visible = true;
				}
				this._viewUI.chengwei_list.selectedIndex = -1;
			}
	

		}
		/**隐藏按钮点击事件 */
		public clickYincang():void{
			this.selectNum = -1;
			//将没选中列表按钮皮肤替换
			for(var i:number =0;i<this.chengweiNameArr.length;i++){
				if(i!=this.selectNum){
					var chengweiBtn:Laya.Button = this._viewUI.chengwei_list.getCell(i).getChildByName("chengwei_btn") as Laya.Button;
					chengweiBtn.skin = "common/ui/tongyong/btn1.png";
				}
			}	
			this._viewUI.yincang_btn.skin =  "common/ui/tongyong/btn2.png";
			this._viewUI.chengweiName_tet.text = tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.HIDE_TITLE].msg;//称谓描述
			this._viewUI.fangshi_tet.text = tips.models.TipsModel.getInstance().cstringResConfigData[RoleEnum.TITLE_DESCRIBE].msg;//获得方式
			this._viewUI.time_tet.text = "";
			this._viewUI.limitTime_tet.visible = false;
			
		}
		/**确定按钮点击事件 */
		public clickQueding():void{
			//根据列表选择下标发送协议，-1，代表卸下称谓，其他下标为佩戴称谓不同称谓
			if(this.selectNum == -1){
				RequesterProtocols._instance.c2s_COffTitle();//客户端请求卸下称谓
				LoginModel.getInstance().roleDetail.title  = -1;
			}else{
				RequesterProtocols._instance.c2s_COnTitle(this.chengweiIdArr[this.selectNum]);//客户端请求佩戴称谓（根据下标去称谓数组中找到对应称谓id）
				LoginModel.getInstance().roleDetail.title  = this.chengweiIdArr[this.selectNum];
			}
			this.hide();
		}
		/**计算称谓到期时间
		 * time:配置表中的称谓持续时间
		 */
		public getTime(time:number):any{
			//根据配置表中的期限时间来计算，-1代表永久称谓，返回0，如果不为-1，根据传入的毫秒数计算出到期时间
			if(time!=-1){
				var nowtime = new Date().getTime();//获取当前时间的毫秒数
				var newtime = new Date(nowtime+time*RoleEnum.TIME_MILLISCOND);//将当前时间毫秒数加上配置表中的时间毫秒数，得到过期时间
				var str1 = "-";
				var strMonth = (newtime.getMonth()+1).toString();
				var strDate = (newtime.getDate()).toString();
				if(parseInt(strMonth) >=1 && parseInt(strMonth) <=9){
					strMonth = "0"+ strMonth;
				}
				if(parseInt(strDate) >=1 && parseInt(strDate) <=9){
					strDate = "0" + strDate;
				}
				var currentdate = newtime.getFullYear() + str1 + strMonth + str1 + strDate;
				return currentdate;
			}else
				return 0;
		}
		public hide():void {
			super.hide();
			models.RoleInfoModel.getInstance().currentKey = 1;
			ModuleManager.show(ModuleNames.ROLE_Info,this._app);
		}
		
		public getView():Sprite {
			return this._viewUI;
		}
	
	}
}