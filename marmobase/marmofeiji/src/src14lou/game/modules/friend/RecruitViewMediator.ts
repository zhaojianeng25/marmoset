/**
 * 招募类
 */
// import RecruitUI = ui.common.FriendRecruitUI;
module game.modules.friend {
    export class RecruitViewMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.FriendRecruitUI;
        /**标签名数组 */
        private biaoqianNameArr:Array<any>;
        /**当前选中下标 */
        private selectNum:number=0;
        /** 招募奖励配置表数据*/
        private cRecruitRewardObj:Object;
        /**道具表数据 */
        private cItemAttrObj:Object;
        /**招募奖励项名称 */
        private rewardNameArr:Array<any>;
        /**奖励1 */
        private rewardItemArr1:Array<any>;
        /**奖励2 */
        private rewardItemArr2:Array<any>;
        /**奖励图片1 */
        private rewardImgArr1:Array<any>;
        /**奖励图片2 */
        private rewardImgArr2:Array<any>;
        /**服务器id */
        private serverid:string;
        constructor(uiLayer:Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.FriendRecruitUI();
            this._viewUI.mouseThrough = true;
            this.isCenter = false;
            this.getListData();
            this.initialize();
            this.registerEvent();
            this.eventListener();
            
        }
             /**初始化 */
		public initialize():void{
            this.biaoqianNameArr = [{Label:"招募"},{Label:"招募奖励"},{Label:"我的招募"},{Label:"招募分享有奖"}];
            this.rewardNameArr = new Array<any>();
            this.rewardItemArr1 = new Array<any>();
            this.rewardItemArr2 = new Array<any>();
            this.rewardImgArr1 = new Array<any>();
            this.rewardImgArr2 = new Array<any>();
        }
        /**注册事件监听 */
		public eventListener():void{
            models.FriendProxy.getInstance().on(models.SRspServerId_EVENT,this,this.onRspServerId);
            models.FriendProxy.getInstance().on(models.SReqRecruitWheel_EVENT,this,this.onReqRecruitWheel);
            models.FriendProxy.getInstance().on(models.SReqFortuneWheel_EVENT,this,this.onReqFortuneWheel);
        }
        /**服务器发送抽奖*/
        public onReqFortuneWheel(e:any):void{
            var data:hanlder.s2c_req_fortune_wheel = models.FriendModel.getInstance().SReqFortuneWheelData.get("data");
        }
        /**请求招募大转盘信息结果*/
        public onReqRecruitWheel(e:any):void{
            var data:hanlder.S2C_req_recruitwheel = models.FriendModel.getInstance().SReqRecruitWheelData.get("data");
        }
         /**返回服务器id*/
        public onRspServerId(e:any):void{
            var data:hanlder.S2C_SRspServerId = models.FriendModel.getInstance().SRspServerIdData.get("data");
            this.serverid = data.serverid.toString();
        }
        /**初始化数据 */
        public initData():void{
            var myData = createrole.models.LoginModel.getInstance().roleDetail;
            this._viewUI.recruitCode_lab.text = myData.roleid + "2345";//招募码
            this.cRecruitRewardObj = models.FriendModel.getInstance().CRecruitRewardBinDic;
            this.cItemAttrObj = BagModel.getInstance().itemAttrData;
            //招募奖励
            for(var i:number=1;i<6;i++){
                this.rewardNameArr.push(this.cRecruitRewardObj[i]["text"]);
                var str = this.cRecruitRewardObj[i]["items"];
				var spit = str.split(";");
				this.rewardItemArr1.push(spit[0]);
				this.rewardItemArr2.push(spit[1]);
            }
            for(var i:number=0;i<this.rewardItemArr1.length;i++){
                this.rewardImgArr1.push({img:"common/icon/item/"+this.cItemAttrObj[this.rewardItemArr1[i]]["icon"]+".png"})
                this.rewardImgArr2.push({img:"common/icon/item/"+this.cItemAttrObj[this.rewardItemArr2[i]]["icon"]+".png"})
            }
            this.getRewardListData();
            RequesterProtocols._instance.c2s_CReqServerId(1);//请求服务器id
            RequesterProtocols._instance.c2s_req_recruitwheel();//请求招募大转盘信息
            
        }
           /**渲染招募奖励列表 */
        public getRewardListData():void{
			this._viewUI.recruidAward_list.vScrollBarSkin = "";
			this._viewUI.recruidAward_list.scrollBar.elasticBackTime = 200;
            this._viewUI.recruidAward_list.scrollBar.elasticDistance = 50;
			this._viewUI.recruidAward_list.array = this.rewardNameArr;
			this._viewUI.recruidAward_list.renderHandler = new Handler(this,this.onRewardRender);
			this._viewUI.recruidAward_list.selectHandler = new Handler(this,this.onRewardSelect);
			this._viewUI.recruidAward_list.selectedIndex = 0;
		}

         public onRewardRender(cell:Laya.Box,index:number):void{
        	var awardNameLab:Laya.Label = cell.getChildByName("recruidAward_btn").getChildByName("awardName_lab")as Laya.Label;
            var awardImg1:Laya.Image = cell.getChildByName("recruidAward_btn").getChildByName("awardContent1_img")as Laya.Image;
            var awardImg2:Laya.Image = cell.getChildByName("recruidAward_btn").getChildByName("awardContent2_img")as Laya.Image;
           	awardNameLab.text = this.rewardNameArr[index];
            awardImg1.skin = this.rewardImgArr1[index].img;
            awardImg2.skin = this.rewardImgArr2[index].img;
        }

        public onRewardSelect(index:number):void{
            if(index!=-1){
                this.selectNum = index;
                var getBtn:Laya.Button = this._viewUI.recruidAward_list.getCell(index).getChildByName("recruidAward_btn").getChildByName("awardGet_btn")as Laya.Button;
                getBtn.on(LEvent.MOUSE_DOWN,this, this.get);
                this._viewUI.recruidAward_list.selectedIndex = -1;
            }
        }
        /**
         * 领取协议
         * 奖励类型 1招募人数奖励 2招募玩家充值奖励 3招募玩家等级奖励
         * 配置招募奖励表里的id
         * 被招募的角色id
         * 被招募的角色所在服务器id
         */
        public get():void{
            var myData = createrole.models.LoginModel.getInstance().roleDetail;
            RequesterProtocols._instance.c2s_get_recruitaward(1,this.selectNum+1,myData.roleid,this.serverid);
            
        }
           /**渲染联系人列表 */
        public getListData():void{
			this._viewUI.button_list.vScrollBarSkin = "";
			this._viewUI.button_list.scrollBar.elasticBackTime = 200;
            this._viewUI.button_list.scrollBar.elasticDistance = 50;
			this._viewUI.button_list.array = this.biaoqianNameArr;
			this._viewUI.button_list.renderHandler = new Handler(this,this.onRender);
			this._viewUI.button_list.selectHandler = new Handler(this,this.onSelect);
			this._viewUI.button_list.selectedIndex = 0;
		}
        public onRender(cell:Laya.Box,index:number):void{
        	var recruitBtn:Laya.Button = cell.getChildByName("recruit_btn")as Laya.Button;
           	recruitBtn.label = this.biaoqianNameArr[index].Label;
        }

        public onSelect(index:number):void{
            if(index!=-1){
                switch(index){
                    case 0:
                        this._viewUI.recruitPanel_box.visible = true;
                        this._viewUI.recruidAward_list.visible = false;
                        this._viewUI.myRecruit_box.visible = false;
                        this._viewUI.rotaryPanel_box.visible = false;
                        break;
                    case 1:
                        this._viewUI.recruitPanel_box.visible = false;
                        this._viewUI.recruidAward_list.visible = true;
                        this._viewUI.myRecruit_box.visible = false;
                        this._viewUI.rotaryPanel_box.visible = false;
                        break;
                    case 2:
                        this._viewUI.recruitPanel_box.visible = false;
                        this._viewUI.recruidAward_list.visible = false;
                        this._viewUI.myRecruit_box.visible = true;
                        this._viewUI.rotaryPanel_box.visible = false;
                        break;
                    case 3:
                        this._viewUI.recruitPanel_box.visible = false;
                        this._viewUI.recruidAward_list.visible = false;
                        this._viewUI.myRecruit_box.visible = false;
                        this._viewUI.rotaryPanel_box.visible = true;
                        break;
                }
                this._viewUI.button_list.selectedIndex = -1;
            }
        }
        public show(): void {
            super.show();
            this.initData();
        }

        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }

        /**
         * 注册事件
         */
        private registerEvent(): void {
            this._viewUI.start_btn.on(LEvent.MOUSE_DOWN,this, this.xuanZhuan);
        }

        public xuanZhuan():void{
			this._viewUI.zhuanPan_img.rotation = 0;
			this._viewUI.start_btn.visible = false;
			RequesterProtocols._instance.c2s_begin_recruitwheel();//开始转盘协议
			Laya.timer.frameLoop(1,this,this.animate);
		}

        private animate(e:Event):void{
			this._viewUI.zhuanPan_img.rotation +=3;
			// switch(this.randomNum){
			// 	case this.zhuanpanIdArr[0]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 945){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20131.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();//结束转盘协议
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[1]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 990){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20096.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[2]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 1035){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20060.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[3]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 1080){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20097.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[4]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 765){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20096.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[5]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 810){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20053.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[6]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 855){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20051.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// 	case this.zhuanpanIdArr[7]:
			// 		if(this._viewUI.zhuanPan_img.rotation == 900){
			// 			Laya.timer.clear(this,this.animate);
			// 			this._viewUI.tipItem_img.skin = "common/icon/item/20094.png";
			// 			this._viewUI.start_btn.visible = true;
			// 			RequesterProtocols._instance.c2s_CEndSchoolWheel();
			// 		}
			// 		break;
			// }
		}
    }
}
