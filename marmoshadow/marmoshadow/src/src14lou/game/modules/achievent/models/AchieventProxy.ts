/**
* LJM 
*/
module game.modules.achievent.models
{	
	   /**成就系统红点 */
    export const ACHIEVEPOINT_EVENT:string = "achievePoint";
	  /**隐藏成就系统红点 */
    export const HIDEACHIEVEPOINT_EVENT:string = "hideAchievePoint";
	export class AchieventProxy extends hanlder.ProxyBase{
		constructor()
		{
			super();
			AchieventProxy._instance = this;
			this.init();
		}
		private static _instance:AchieventProxy;
		public static getInstance():AchieventProxy 
		{
			if(!this._instance) 
			{
				this._instance = new AchieventProxy();
			}
			return this._instance;
		}
		
		public init():void 
		{
			AchieventModel.getInstance();
			this.addNetworkListener();
			/** z指引历程配置表 */
			Laya.loader.load("common/data/temp/mission.cguidecourse.bin", Handler.create(this,this.onloadedGuideCourseComplete), null, Loader.BUFFER);
			/** z指引历程页签表配置表  */
			Laya.loader.load("common/data/temp/mission.cguidecourselabel.bin", Handler.create(this,this.onloadedGuideCourseLabelComplete), null, Loader.BUFFER);
			Laya.loader.load("common/data/temp/role.schoolmasterskillinfo.bin", Handler.create(this,this.onloadedSchoolmasterSkillInfoComplete), null, Loader.BUFFER);
			
		}
		private onloadedSchoolmasterSkillInfoComplete():void 
		{
			console.log("schoolmasterskillinfo职业师傅配置表表格加载完毕------ completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolmasterskillinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,AchieventModel.getInstance().MasterNpcDic,game.data.template.SchoolMasterSkillInfoBaseVo,"id");
			console.log("onloadedCreateRoleConfigComplete:",AchieventModel.getInstance().MasterNpcDic);
		}	
		private onloadedGuideCourseComplete():void 
		{
			console.log("cguidecourse表格加载完毕------ completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourse.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,AchieventModel.getInstance().guideCourseDic,game.data.template.GuideCourseBaseVo,"id");
			console.log("onloadedCreateRoleConfigComplete:",AchieventModel.getInstance().guideCourseDic);
		}		
		private onloadedGuideCourseLabelComplete():void 
		{
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourselabel.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,AchieventModel.getInstance().guideCourseLabelDic,game.data.template.GuideCourseLabelBaseVo,"id");
			console.log("onloadedSchoolInfoComplete:",AchieventModel.getInstance().guideCourseLabelDic);
		}

		 /** 添加监听  */ 
		private addNetworkListener(): void
		 {
			Network._instance.addHanlder(ProtocolsEnum.SGetArchiveInfo, this, this.onSGetArchiveInfo);	
		 }

		/** 移除监听  */
		private removeNetworkListener(): void 
		{
			Network._instance.removeHanlder(ProtocolsEnum.SGetArchiveInfo, this, this.onSGetArchiveInfo);	
		}

		/** 请求成就返回  */
		private onSGetArchiveInfo(optcode:number, msg:hanlder.s2c_get_archive_info): void 
		{
			console.log("请求成就返回......AchieventProxy.......................................................");
			var  achieventInfoVo = new Array<AchieventInfoVo>();
			achieventInfoVo = msg.archiveinfos; 
			if(achieventInfoVo.length == 0 ) return;
			/** 清空数据  */
			AchieventModel._instance.AchieventInfo = [];
			AchieventModel._instance.AchieventInfo = achieventInfoVo;
			//将所有成就存进map中
			for(var i:number = 0;i<achieventInfoVo.length;i++){
				AchieventModel._instance.achieventDic.set(achieventInfoVo[i].archiveid,achieventInfoVo[i].state);
			}
			var key = true;
			//如果有可以领取的成就，发送协议，通知主界面显示成就红点
			for(var i:number=0;i<AchieventModel._instance.achieventDic.keys.length;i++){
				if(AchieventModel._instance.achieventDic.values[i] ==1){
					AchieventProxy._instance.event(models.ACHIEVEPOINT_EVENT);
					key = false;
				}
			}
			//如果没有可以领取的成就，发送协议，通知主界面隐藏成就红点
			if(key) AchieventProxy._instance.event(models.HIDEACHIEVEPOINT_EVENT);
		}
		
		
	}
}