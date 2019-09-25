/**
* name z主任务配置
*/
module game.data.template{
	export class MissionCMainMissionInfoBaseVo{
		public id:number;
		public AutoDo:number;
		public MissionName:string;
		public MissionTypeString:string;
		public MinLevel:number;
		public MaxLevel:number;
		public CruiseId:number;
		public TransMinLevel:number;
		public TransMaxLevel:number;
		public RequestRoleIDList:Array<number>;
		public PostMissionList:Array<number>;
		public TransformID:number;
		public FollowID:number;
		public NoteInfo:string;
		public ExpReward:number;
		public MoneyReward:number;
		public PetExpReward:number;
		public ShengWang:number;
		public SMoney:number;
		public RewardMapJumpType:number;
		public RewardMapID:number;
		public RewardMapXPos:number;
		public RewardMapYPos:number;
		public ProcessBarTime:number;
		public ProcessBarText:string;
		public ProcessBarColor:string;
		public RewardType:number;
		public RewardOption:number;
		public RewardItemIDList:Array<number>;
		public RewardItemNumList:Array<number>;
		public RewardItemShapeIDList:Array<number>;
		public RewardItemIsBindList:Array<number>;
		public MissionType:number;
		public ActiveInfoNpcID:number;
		public ActiveInfoMapID:number;
		public ActiveInfoLeftPos:number;
		public ActiveInfoTopPos:number;
		public ActiveInfoRightPos:number;
		public ActiveInfoBottomPos:number;
		public ActiveInfoTargetID:number;
		public ActiveInfoTargetNum:number;
		public ActiveInfoMiniStep:number;
		public ActiveInfoStepProbability:number;
		public ActiveInfoMaxStep:number;
		public ActiveInfoTeamState:number;
		public ActiveInfoTimeLimit:number;
		public ActiveInfoIsRestartTimer:number;
		public ActiveInfoGiveBackMoney:number;
		public ActiveInfoGiveBackPetID:number;
		public ActiveInfoUseItemID:string;
		public ActiveInfoOtherType:number;
		public QuestionInfoCorrectAnswer:string;
		public QuestionInfoWrongAnswerList:Array<string>;
		public QuestionInfoNpcID:number;
		public QuestionInfoConversion:string;
		public TaskInfoDescriptionListA:string;
		public TaskInfoPurposeListA:string;
		public TaskInfoTraceListA:string;
		public AIInfoAIID:number;
		public AIInfoBattleResult:number;
		public AIInfoDeathPunish:number;
		public AIInfoTeamSteate:number;
		public AIInfoBattleLevel:string;
		public BattleInfoBattleMapType:number;
		public BattleInfoBattleZoneID:number;
		public BattleInfoDrop:number;
		public BattleInfoBattleTimes:number;
		public BattleInfoMonsterList:Array<number>;
		public BattleInfoMonsterNum:number;
		public BattleInfoDropItemID:number;
		public BattleInfoDropItemNum:number;
		public ScenarioInfoAnimationID:number;
		public ScenarioInfoBranchNpcID:number;
		public ScenarioInfoBranchNote:string;
		public ScenarioInfoNpcConversationList:Array<string>;
		public ScenarioInfoNpcID:Array<number>;
		public ScenarioInfoFinishConversationList:Array<string>;
		public ScenarioInfoFinishNpcID:Array<number>;
		public vTaskShowNpc:Array<number>;
		public BiaoQingA:Array<string>;
		public BiaoQingB:Array<string>;
		public ProcessBarTeXiao:number;
		public UnionSeekHelp:number;
		public WorldSeekHelp:number;
		public nopuitype:number;
		public nuiid:number;
		public vNpcChatSound:Array<string>;
		public vNpcChatSoundFinish:Array<string>;
		public BattlePreString:string;
		public BattleVideo:number;
		public Tipsid:number;

		constructor(){
			this.RequestRoleIDList = new Array<number>();
			this.PostMissionList = new Array<number>();
			this.RewardItemIDList = new Array<number>();
			this.RewardItemNumList = new Array<number>();
			this.RewardItemShapeIDList = new Array<number>();
			this.RewardItemIsBindList = new Array<number>();
			this.QuestionInfoWrongAnswerList = new Array<string>();
			this.BattleInfoMonsterList = new Array<number>();
			this.ScenarioInfoNpcConversationList = new Array<string>();
			this.ScenarioInfoNpcID = new Array<number>();
			this.ScenarioInfoFinishConversationList = new Array<string>();
			this.ScenarioInfoFinishNpcID = new Array<number>();
			this.vTaskShowNpc = new Array<number>();
			this.BiaoQingA = new Array<string>();
			this.BiaoQingB = new Array<string>();
			this.vNpcChatSound = new Array<string>();
			this.vNpcChatSoundFinish = new Array<string>(); 
		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.AutoDo = data.getUint32();
			this.MissionName = data.getUTFBytes(data.getUint32());
			this.MissionTypeString = data.getUTFBytes(data.getUint32());
			this.MinLevel = data.getUint32();
			this.MaxLevel = data.getUint32();
			this.CruiseId = data.getUint32();
			this.TransMinLevel = data.getUint32();
			this.TransMaxLevel = data.getUint32();
			let listCount1:number = data.getUint32();
			for (var index = 0; index < listCount1; index++) {	
				this.RequestRoleIDList.push(data.getFloat64());				
			}
			let listCount2:number = data.getUint32();
			for (var index = 0; index < listCount2; index++) {	
				this.PostMissionList.push(data.getUint32());							
			}
			this.TransformID = data.getUint32();
			this.FollowID = data.getUint32();
			this.NoteInfo = data.getUTFBytes(data.getUint32());
			this.ExpReward = data.getFloat64();
			this.MoneyReward = data.getFloat64();
			this.PetExpReward = data.getFloat64();
			this.ShengWang = data.getUint32();
			this.SMoney = data.getFloat64();
			this.RewardMapJumpType = data.getUint32();
			this.RewardMapID = data.getUint32();
			this.RewardMapXPos = data.getUint32();
			this.RewardMapYPos = data.getUint32();
			this.ProcessBarTime = data.getUint32();
			this.ProcessBarText = data.getUTFBytes(data.getUint32());
			this.ProcessBarColor = data.getUTFBytes(data.getUint32());
			this.RewardType = data.getUint32();
			this.RewardOption = data.getUint32();
			let listCount3:number = data.getUint32();
			for (var index = 0; index < listCount3; index++) {	
				this.RewardItemIDList.push(data.getUint32());								
			}
			let listCount4:number = data.getUint32();
			for (var index = 0; index < listCount4; index++) {	
				this.RewardItemNumList.push(data.getUint32());							
			}
			let listCount5:number = data.getUint32();
			for (var index = 0; index < listCount5; index++) {	
				this.RewardItemShapeIDList.push(data.getUint32());							
			}
			let listCount6:number = data.getUint32();
			for (var index = 0; index < listCount6; index++) {	
				this.RewardItemIsBindList.push(data.getUint32());							
			}
			this.MissionType = data.getUint32();
			this.ActiveInfoNpcID = data.getUint32();
			this.ActiveInfoMapID = data.getUint32();
			this.ActiveInfoLeftPos = data.getUint32();
			this.ActiveInfoTopPos = data.getUint32();
			this.ActiveInfoRightPos = data.getUint32();
			this.ActiveInfoBottomPos = data.getUint32();
			this.ActiveInfoTargetID = data.getUint32();
			this.ActiveInfoTargetNum = data.getUint32();
			this.ActiveInfoMiniStep = data.getUint32();
			this.ActiveInfoStepProbability = data.getUint32();
			this.ActiveInfoMaxStep = data.getUint32();
			this.ActiveInfoTeamState = data.getUint32();
			this.ActiveInfoTimeLimit = data.getUint32();
			this.ActiveInfoIsRestartTimer = data.getUint32();
			this.ActiveInfoGiveBackMoney = data.getFloat64();
			this.ActiveInfoGiveBackPetID = data.getUint32();
			this.ActiveInfoUseItemID = data.getUTFBytes(data.getUint32());
			this.ActiveInfoOtherType = data.getUint32();
			this.QuestionInfoCorrectAnswer = data.getUTFBytes(data.getUint32())
			let listCount7:number = data.getUint32();
			for (var index = 0; index < listCount7; index++) {	
				this.QuestionInfoWrongAnswerList.push(data.getUTFBytes(data.getUint32()));						
			}
			this.QuestionInfoNpcID = data.getUint32();
			this.QuestionInfoConversion = data.getUTFBytes(data.getUint32())
			this.TaskInfoDescriptionListA = data.getUTFBytes(data.getUint32())
			this.TaskInfoPurposeListA = data.getUTFBytes(data.getUint32())
			this.TaskInfoTraceListA = data.getUTFBytes(data.getUint32())
			this.AIInfoAIID = data.getUint32();
			this.AIInfoBattleResult = data.getUint32();
			this.AIInfoDeathPunish = data.getUint32();
			this.AIInfoTeamSteate = data.getUint32();
			this.AIInfoBattleLevel = data.getUTFBytes(data.getUint32())
			this.BattleInfoBattleMapType = data.getUint32();
			this.BattleInfoBattleZoneID = data.getUint32();
			this.BattleInfoDrop = data.getUint32();
			this.BattleInfoBattleTimes = data.getUint32();
			let listCount8:number = data.getUint32();
			for (var index = 0; index < listCount8; index++) {	
				this.BattleInfoMonsterList.push(data.getUint32());							
			}
			this.BattleInfoMonsterNum = data.getUint32();
			this.BattleInfoDropItemID = data.getUint32();
			this.BattleInfoDropItemNum = data.getUint32();
			this.ScenarioInfoAnimationID = data.getUint32();
			this.ScenarioInfoBranchNpcID = data.getUint32();
			this.ScenarioInfoBranchNote = data.getUTFBytes(data.getUint32())
			let listCount9:number = data.getUint32();
			for (var index = 0; index < listCount9; index++) {	
				this.ScenarioInfoNpcConversationList.push(data.getUTFBytes(data.getUint32()));							
			}
			let listCount10:number = data.getUint32();
			for (var index = 0; index < listCount10; index++) {	
				this.ScenarioInfoNpcID.push(data.getUint32());							
			}
			let listCount11:number = data.getUint32();
			for (var index = 0; index < listCount11; index++) {	
				this.ScenarioInfoFinishConversationList.push(data.getUTFBytes(data.getUint32()));							
			}
			let listCount12:number = data.getUint32();
			for (var index = 0; index < listCount12; index++) {	
				this.ScenarioInfoFinishNpcID.push(data.getUint32());								
			}
			let listCount13:number = data.getUint32();
			for (var index = 0; index < listCount13; index++) {	
				this.vTaskShowNpc.push(data.getUint32());								
			}
			let listCount14:number = data.getUint32();
			for (var index = 0; index < listCount14; index++) {	
				this.BiaoQingA.push(data.getUTFBytes(data.getUint32()));							
			}
			let listCount15:number = data.getUint32();
			for (var index = 0; index < listCount15; index++) {	
				this.BiaoQingB.push(data.getUTFBytes(data.getUint32()));								
			}
			this.ProcessBarTeXiao = data.getUint32();
			this.UnionSeekHelp = data.getUint32();
			this.WorldSeekHelp = data.getUint32();
			this.nopuitype = data.getUint32();
			this.nuiid = data.getUint32();
			let listCount16:number = data.getUint32();
			for (var index = 0; index < listCount16; index++) {	
				this.vNpcChatSound.push(data.getUTFBytes(data.getUint32()));							
			}
			let listCount17:number = data.getUint32();
			for (var index = 0; index < listCount17; index++) {	
				this.vNpcChatSoundFinish.push(data.getUTFBytes(data.getUint32()));							
			}
			this.BattlePreString = data.getUTFBytes(data.getUint32());
			this.BattleVideo = data.getUint32();
			this.Tipsid = data.getUint32();
		}
	}
}