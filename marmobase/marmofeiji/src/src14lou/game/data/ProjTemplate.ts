/**
* name 
*/
import ByteArrayUtils = game.utils.ByteArrayUtils;
import RoleRColorModel = game.modules.roleRColor.models.RoleRColorModel;
import RoleRColorConfigBaseVo = game.data.template.RoleRColorConfigBaseVo;
import CScheculedActivityBaseVo = game.data.template.CScheculedActivityBaseVo;
import CcheculedActivityBaseVo = game.data.template.CcheculedActivityBaseVo;  //d定时活动配置表
import CScheculedActivitypayBaseVo = game.data.template.CScheculedActivitypayBaseVo;  //d定时活动配置表for点卡服
import CbattlelistBaseVo = game.data.template.CbattlelistBaseVo;   //z战斗信息表_练功区特殊_9xxx
import CbiaoqingBaseVo = game.data.template.CbiaoqingBaseVo;  //b表情配置
import CBanWordsBaseVo = game.data.template.CBanWordsBaseVo;  //l聊天屏蔽字
import CquickchatBaseVo = game.data.template.CquickchatBaseVo;  //l聊天常用语
import CchatColorConfigBaseVo = game.data.template.CchatColorConfigBaseVo;  //Y颜色转换表
import CTitleConfigBaseVo = game.data.template.CTitleConfigBaseVo;  //称谓表
import CCommonBaseVo = game.data.template.CCommonBaseVo;  //t通用配置表
import CAddressProvinceBaseVo = game.data.template.CAddressProvinceBaseVo;  //d地理位置表
import CAddressCountryBaseVo = game.data.template.CAddressCountryBaseVo;  //d地理位置市表
import CAutoMovePathBaseVo = game.data.template.CAutoMovePathBaseVo;  //x巡游配置/x巡游路径总表
import CAutoMovePathPointBaseVo = game.data.template.CAutoMovePathPointBaseVo;  //x巡游配置/x巡游路径子地图表
import CMessageTipBaseVo = game.data.template.CMessageTipBaseVo;  //客户端提示信息表/客户端提示
import CStringResBaseVo = game.data.template.CStringResBaseVo;  //客户端提示信息表/程序内字符串
import CEffectPathBaseVo = game.data.template.CEffectPathBaseVo;  //t特效路径表
import CEffectPathNoneDramaBaseVo = game.data.template.CEffectPathNoneDramaBaseVo;  //t特效路径表_非剧情
import MissionCMainMissionInfoBaseVo = game.data.template.MissionCMainMissionInfoBaseVo;
import PetCPetAttrBaseVo = game.data.template.PetCPetAttrBaseVo;
import PetCPetAttrModDataBaseVo = game.data.template.PetCPetAttrModDataBaseVo;
import PetCPetNextExpBaseVo = game.data.template.PetCPetNextExpBaseVo;
import PetCPetResetPointConfigBaseVo = game.data.template.PetCPetResetPointConfigBaseVo;
import PetCPetFeedItemListBaseVo = game.data.template.PetCPetFeedItemListBaseVo;
import PetCPetDepotPriceBaseVo = game.data.template.PetCPetDepotPriceBaseVo;
import PetCPetFeedItemAttrBaseVo = game.data.template.PetCPetFeedItemAttrBaseVo;
import PetCFoodItemAttrBaseVo = game.data.template.PetCFoodItemAttrBaseVo;
import PetCShenShouIncBaseVo = game.data.template.PetCShenShouIncBaseVo;
import InstanceCInstaceConfigBaseVo = game.data.template.InstanceCInstaceConfigBaseVo;
import InstanceCBingFengWangZuoMapBaseVo = game.data.template.InstanceCBingFengWangZuoMapBaseVo;
import InstanceCShiGuangZhiXueConfigBaseVo = game.data.template.InstanceCShiGuangZhiXueConfigBaseVo;
import InstanceCShiGuangZhiXueNpcBaseVo = game.data.template.InstanceCShiGuangZhiXueNpcBaseVo;
import InstanceCParnterNpcConfigBaseVo = game.data.template.InstanceCParnterNpcConfigBaseVo;
import InstanceCEnChouLuNewConfigBaseVo = game.data.template.InstanceCEnChouLuNewConfigBaseVo;
import ClanCFactionYaoFangBaseVo = game.data.template.ClanCFactionYaoFangBaseVo;
import ClanCFactionLobbyBaseVo = game.data.template.ClanCFactionLobbyBaseVo;
import ClanCFactionGoldBankBaseVo = game.data.template.ClanCFactionGoldBankBaseVo;
import ClanCFactionHotelBaseVo = game.data.template.ClanCFactionHotelBaseVo;
import ClanCFactionDrugStoreBaseVo = game.data.template.ClanCFactionDrugStoreBaseVo;
import ClanCFactionPositionBaseVo = game.data.template.ClanCFactionPositionBaseVo;
import ClanCFactionFuLiBaseVo = game.data.template.ClanCFactionFuLiBaseVo;
import ClanCRuneSetBaseVo = game.data.template.ClanCRuneSetBaseVo;
import ClanCFactionHuoDongBaseVo = game.data.template.ClanCFactionHuoDongBaseVo;
import ClanCClanFightBaseVo = game.data.template.ClanCClanFightBaseVo;
import FriendGiveItemBaseVo=game.data.template.FriendGiveItemBaseVo;
import FriendGiveGiftBaseVo = game.data.template.FriendGiveGiftBaseVo;
import RecruitRewardBaseVo = game.data.template.RecruitRewardBaseVo;
import MyRecruitBaseVo = game.data.template.MyRecruitBaseVo;
import MyRecruitPayBaseVo = game.data.template.MyRecruitPayBaseVo;
import RecruitRewardPayBaseVo = game.data.template.RecruitRewardPayBaseVo;
import RecruitPathBaseVo = game.data.template.RecruitPathBaseVo;
import MarryConfBaseVo = game.data.template.MarryConfBaseVo;
import ZhenFaEffectBaseVo = game.data.template.ZhenFaEffectBaseVo;
import TeamListInfoBaseVo = game.data.template.TeamListInfoBaseVo;
import DTeamListInfoBaseVo = game.data.template.DTeamListInfoBaseVo;
import EffectConfigBaseVo = game.data.template.EffectConfigBaseVo;
import ColorEffectBaseVo = game.data.template.ColorEffectBaseVo;
import UseItemEffectBaseVo = game.data.template.UseItemEffectBaseVo;
import TongPingSettingBaseVo = game.data.template.TongPingSettingBaseVo;
import TuiSongSettingBaseVo = game.data.template.TuiSongSettingBaseVo;
import FPSSettingBaseVo = game.data.template.FPSSettingBaseVo;
import StepLoadTexSettingBaseVo = game.data.template.StepLoadTexSettingBaseVo;
import PCountFPSSettingBaseVo = game.data.template.PCountFPSSettingBaseVo;
import BattleCommandBaseVo = game.data.template.BattleCommandBaseVo;
import ResolutionBaseVo = game.data.template.ResolutionBaseVo;
import GameconfigBaseVo = game.data.template.GameconfigBaseVo;
import GameconfigResetBaseVo = game.data.template.GameconfigResetBaseVo;
import GengXinGongGaoBaseVo = game.data.template.GengXinGongGaoBaseVo;
import BuffConfigBaseVo = game.data.template.BuffConfigBaseVo;
import CAwardResultConfigBaseVo = game.data.template.CAwardResultConfigBaseVo;
import CAwardConfigBaseVo = game.data.template.CAwardConfigBaseVo;
import CEventConfigBaseVo = game.data.template.CEventConfigBaseVo;  //CLoginTips  CLoginTipsBaseVo
import CLoginTipsBaseVo = game.data.template.CLoginTipsBaseVo;
import CLoginImagesBaseVo = game.data.template.CLoginImagesBaseVo;
import CExitgameBaseVo = game.data.template.CExitgameBaseVo;

import CTriggerConditionBaseVo = game.data.template.CTriggerConditionBaseVo;
import CNpcServiceMappingBaseVo = game.data.template.CNpcServiceMappingBaseVo;
import CNPCConfigBaseVo = game.data.template.CNPCConfigBaseVo;
import CNPCInfoBaseVo = game.data.template.CNPCInfoBaseVo;
import CNpcChatBaseVo = game.data.template.CNpcChatBaseVo;
import CNpcServerConfigBaseVo = game.data.template.CNpcServerConfigBaseVo
import CMonsterConfigBaseVo = game.data.template.CMonsterConfigBaseVo
import CHeroBaseInfoBaseVo = game.data.template.CHeroBaseInfoBaseVo
import CLuaTestBaseVo = game.data.template.CLuaTestBaseVo
import CNpcShapeBaseVo = game.data.template.CNpcShapeBaseVo
import CNpcInAllBaseVo = game.data.template.CNpcInAllBaseVo
import CSceneNPCConfigBaseVo = game.data.template.CSceneNPCConfigBaseVo
import CSceneNPCBaseBaseVo = game.data.template.CSceneNPCBaseBaseVo
import CActionInfoBaseVo = game.data.template.CActionInfoBaseVo
import CRideBaseVo = game.data.template.CRideBaseVo
import CRideItemBaseVo = game.data.template.CRideItemBaseVo
import CLeitaiLevelBaseVo = game.data.template.CLeitaiLevelBaseVo
import CJingjiRandomRoleBaseVo = game.data.template.CJingjiRandomRoleBaseVo
import CJingjiRandomChatBaseVo = game.data.template.CJingjiRandomChatBaseVo
// ----------------------------------------Item系列49----------------------------------------
import ItemAttrBaseVo = game.data.template.ItemAttrBaseVo;
import ItemAttr_PointCardBaseVo = game.data.template.ItemAttr_PointCardBaseVo;
import EquipIteminfoBaseVo = game.data.template.EquipIteminfoBaseVo;
import EquipAddattributelibBaseVo = game.data.template.EquipAddattributelibBaseVo;
import EquipAddattributerandomlibBaseVo = game.data.template.EquipAddattributerandomlibBaseVo;
import AttributeDesConfigBaseVo = game.data.template.AttributeDesConfigBaseVo;
import ItemTypeBaseVo = game.data.template.ItemTypeBaseVo;
import EquipMakeInfoBaseVo = game.data.template.EquipMakeInfoBaseVo;
import PetItemEffectBaseVo = game.data.template.PetItemEffectBaseVo;
import PetItemEffect_PointCardBaseVo = game.data.template.PetItemEffect_PointCardBaseVo;
import FoodAndDrugEffectBaseVo = game.data.template.FoodAndDrugEffectBaseVo;
import FightDrugTypeBaseVo = game.data.template.FightDrugTypeBaseVo;
import FoodAndDrugEffect_PointCardBaseVo = game.data.template.FoodAndDrugEffect_PointCardBaseVo;
import ItembuffidsBaseVo = game.data.template.ItembuffidsBaseVo;
import GemEffectBaseVo = game.data.template.GemEffectBaseVo;
import GemEffect_PointCardBaseVo = game.data.template.GemEffect_PointCardBaseVo;
import GemTypeBaseVo = game.data.template.GemTypeBaseVo;
import GroceryEffectBaseVo = game.data.template.GroceryEffectBaseVo;
import GroceryEffect_PointCardBaseVo = game.data.template.GroceryEffect_PointCardBaseVo;
import EquipEffectBaseVo = game.data.template.EquipEffectBaseVo;
import EquipEffect_PointCardBaseVo = game.data.template.EquipEffect_PointCardBaseVo;
import TaskRelativeBaseVo = game.data.template.TaskRelativeBaseVo;
import TaskRelative_PointCardBaseVo = game.data.template.TaskRelative_PointCardBaseVo;
import EquipItemAttrBaseVo = game.data.template.EquipItemAttrBaseVo;
import EquipItemAttr_PointCardBaseVo = game.data.template.EquipItemAttr_PointCardBaseVo;
import PointCardEquipGemBaseVo = game.data.template.PointCardEquipGemBaseVo;
import ItemBuffBaseVo = game.data.template.ItemBuffBaseVo;
import PresentConfigBaseVo = game.data.template.PresentConfigBaseVo;
import PresentConfigPayBaseVo = game.data.template.PresentConfigPayBaseVo;
import ItemTypeNameListBaseVo = game.data.template.ItemTypeNameListBaseVo;
import OnLineGiftBaseVo = game.data.template.OnLineGiftBaseVo;
import PetEquipSuitBuffBaseVo = game.data.template.PetEquipSuitBuffBaseVo;
import PetEquipHeChengBaseVo = game.data.template.PetEquipHeChengBaseVo;
import EquipCombinBaseVo = game.data.template.EquipCombinBaseVo; //2张共用
import ItemUseTipBaseVo = game.data.template.ItemUseTipBaseVo;
import DepottableBaseVo = game.data.template.DepottableBaseVo;
import BagTableBaseVo = game.data.template.BagTableBaseVo;
import ItemToItemBaseVo = game.data.template.ItemToItemBaseVo;
import EquipPosNameBaseVo = game.data.template.EquipPosNameBaseVo;
import ComeFromBaseVo = game.data.template.ComeFromBaseVo;
import FoodAndDrugFormulaBaseVo = game.data.template.FoodAndDrugFormulaBaseVo;
import FumoEffectFormulaBaseVo = game.data.template.FumoEffectFormulaBaseVo;
import DashiSpaceGiftBaseVo = game.data.template.DashiSpaceGiftBaseVo;
import EquipRefineInfoBaseVo = game.data.template.EquipRefineInfoBaseVo;
import EquipRefineInfo_PointCardBaseVo = game.data.template.EquipRefineInfo_PointCardBaseVo;
import EquipRefineSkillInfoBaseVo = game.data.template.EquipRefineSkillInfoBaseVo;
import EquipRefineSkillInfo_PointCardBaseVo = game.data.template.EquipRefineSkillInfo_PointCardBaseVo;
import ExpFactorItemInfoBaseVo = game.data.template.ExpFactorItemInfoBaseVo;
// ----------------------------------------Skill系列21----------------------------------------
import FriendSkillBaseVo = game.data.template.FriendSkillBaseVo;
import EquipSkillBaseVo = game.data.template.EquipSkillBaseVo;
import EquipSkillInfoBaseVo = game.data.template.EquipSkillInfoBaseVo;
import SchoolSkillitemBaseVo = game.data.template.SchoolSkillitemBaseVo;
import PetSkillupgradeBaseVo = game.data.template.PetSkillupgradeBaseVo;
import PetSkillEffectBaseVo = game.data.template.PetSkillEffectBaseVo;
import SkillitemBaseVo = game.data.template.SkillitemBaseVo;
import SchoolSkillBaseVo = game.data.template.SchoolSkillBaseVo;
import PetSkillConfigBaseVo = game.data.template.PetSkillConfigBaseVo;
import SBLevelLimitBaseVo = game.data.template.SBLevelLimitBaseVo;
import SkillTypeConfigBaseVo = game.data.template.SkillTypeConfigBaseVo;
import SkillConfigBaseVo = game.data.template.SkillConfigBaseVo;
import LifeSkillBaseVo = game.data.template.LifeSkillBaseVo;
import LifeSkillCostBaseVo = game.data.template.LifeSkillCostBaseVo;
import LifeSkillCostPayBaseVo = game.data.template.LifeSkillCostPayBaseVo;
import ParticeSkillLevelupBaseVo = game.data.template.ParticeSkillLevelupBaseVo;
import PointCardParticeSkillLevelupBaseVo = game.data.template.PointCardParticeSkillLevelupBaseVo;
import PracticeItemExpBaseVo = game.data.template.PracticeItemExpBaseVo;
import HuanhuaInfoBaseVo = game.data.template.HuanhuaInfoBaseVo;
import HuanhuaUseBaseVo = game.data.template.HuanhuaUseBaseVo;
import InheritCostBaseVo = game.data.template.InheritCostBaseVo;
// ----------------------------------------Mission系列23----------------------------------------
import ShiGuangZhiXueConfigBaseVo = game.data.template.ShiGuangZhiXueConfigBaseVo;
import AcceptableTaskBaseVo = game.data.template.AcceptableTaskBaseVo;
import ArrowEffectBaseVo = game.data.template.ArrowEffectBaseVo;
import ArrowEffectSimpBaseVo = game.data.template.ArrowEffectSimpBaseVo;
import ActiveGiftBoxBaseVo = game.data.template.ActiveGiftBoxBaseVo;
import PointCardActiveGiftBox = game.data.template.PointCardActiveGiftBox;
import JingyingConfigBaseVo = game.data.template.JingyingConfigBaseVo;
import JingyingrenwuTaskBaseVo = game.data.template.JingyingrenwuTaskBaseVo;
import JingyingpingjiBaseVo = game.data.template.JingyingpingjiBaseVo;
import TasktrackingorderBaseVo = game.data.template.TasktrackingorderBaseVo;
import TikuBaseVo = game.data.template.TikuBaseVo;
import ActivityQuestionBaseVo = game.data.template.ActivityQuestionBaseVo;
import TaskNodeBaseVo = game.data.template.TaskNodeBaseVo;
import ActivityNewBaseVo = game.data.template.ActivityNewBaseVo;
import ActivityNewpayBaseVo = game.data.template.ActivityNewpayBaseVo;
import ActivityMapListBaseVo = game.data.template.ActivityMapListBaseVo;
import WeekListBaseVo = game.data.template.WeekListBaseVo;
import NewFunctionOpenBaseVo = game.data.template.NewFunctionOpenBaseVo;
import UICongigBaseVo = game.data.template.UICongigBaseVo;
import GuideCourseBaseVo = game.data.template.GuideCourseBaseVo;
import GuideCoursePayBaseVo = game.data.template.GuideCoursePayBaseVo;
import GuideCourseLabelBaseVo = game.data.template.GuideCourseLabelBaseVo;
import AnswerQuestionBaseVo = game.data.template.AnswerQuestionBaseVo;


// lqw
/**
* @Author: LinQiuWen
* @description:类的导入
*/
import SchoolInfoBaseVo = game.data.template.SchoolInfoBaseVo;
import CreateRoleConfigBaseVo = game.data.template.CreateRoleConfigBaseVo;
import AttrModDataBaseVo = game.data.template.AttrModDataBaseVo;
import ResMoneyConfigBaseVo = game.data.template.ResMoneyConfigBaseVo;
import SchoolMasterSkillInfoBaseVo = game.data.template.SchoolMasterSkillInfoBaseVo;
import AcupointInfoBaseVo = game.data.template.AcupointInfoBaseVo;
import AcupointLevelUpBaseVo = game.data.template.AcupointLevelUpBaseVo;
import AcupointLevelUpPayBaseVo = game.data.template.AcupointLevelUpPayBaseVo;
import SkillAcupointConfigBaseVo = game.data.template.SkillAcupointConfigBaseVo;
import SkillInfoConfigBaseVo = game.data.template.SkillInfoConfigBaseVo;
import CaddpointchangeBaseVo = game.data.template.CaddpointchangeBaseVo;
import AddPointResetItemConfigBaseVo = game.data.template.AddPointResetItemConfigBaseVo;
import EquipEffectConfigBaseVo = game.data.template.EquipEffectConfigBaseVo;
import ServiceLevelConfigBaseVo = game.data.template.ServiceLevelConfigBaseVo;
import ServiceExpConfigBaseVo = game.data.template.ServiceExpConfigBaseVo
// game.xml
import ThreePvpWhiteMenuBaseVo = game.data.template.ThreePvpWhiteMenuBaseVo;
import CloginawardBaseVo = game.data.template.CloginawardBaseVo;
import BindTelAwardBaseVo = game.data.template.BindTelAwardBaseVo;
import PointCardBindTelAwardBaseVo = game.data.template.PointCardBindTelAwardBaseVo;
import WisdomTrialVillBaseVo = game.data.template.WisdomTrialVillBaseVo;
import ActivityAwardBaseVo = game.data.template.ActivityAwardBaseVo;
import CshouchonglibaoBaseVo = game.data.template.CshouchonglibaoBaseVo;
import CqiandaojiangliBaseVo = game.data.template.CqiandaojiangliBaseVo;
import CpaihangbangBaseVo = game.data.template.CpaihangbangBaseVo;
import CDeathNoteBaseVo = game.data.template.CDeathNoteBaseVo;
import CNotifyConfigBaseVo = game.data.template.CNotifyConfigBaseVo;
import CSchoolWheelBaseVo = game.data.template.CSchoolWheelBaseVo;
import CShareConfigBaseVo = game.data.template.CShareConfigBaseVo;
import CWinFrameSizeBaseVo = game.data.template.CWinFrameSizeBaseVo;
import CTTInfoBaseVo =  game.data.template.CTTInfoBaseVo;
import CChangeSchoolCostBaseVo = game.data.template.CChangeSchoolCostBaseVo;
import CSpecialQuestConfigBaseVo = game.data.template.CSpecialQuestConfigBaseVo;
import CSchoolTaskBaseVo = game.data.template.CSchoolTaskBaseVo;
import CSchoolUseItemBaseVo = game.data.template.CSchoolUseItemBaseVo;
import CCircTaskItemCollectBaseVo = game.data.template.CCircTaskItemCollectBaseVo;
import CRepeatTaskBaseVo = game.data.template.CRepeatTaskBaseVo;
import CRepeatTaskChatBaseVo = game.data.template.CRepeatTaskChatBaseVo;
import CCircTaskItemFindBaseVo = game.data.template.CCircTaskItemFindBaseVo;
import CCircTaskPatrolBaseVo = game.data.template.CCircTaskPatrolBaseVo;
import CCircTaskPetCatchBaseVo = game.data.template.CCircTaskPetCatchBaseVo;
import CRenXingCircTaskCostBaseVo = game.data.template.CRenXingCircTaskCostBaseVo;
import CFubenTaskBaseVo = game.data.template.CFubenTaskBaseVo;
import CAnYeMaXiTuanConfBaseVo = game.data.template.CAnYeMaXiTuanConfBaseVo;

// shop.xml
import CGoodsBaseVo = game.data.template.CGoodsBaseVo;
import DCGoodsBaseVo = game.data.template.DCGoodsBaseVo;
import CMallShopBaseVo = game.data.template.CMallShopBaseVo;
import DCMallShopBaseVo = game.data.template.DCMallShopBaseVo;
import CPetShopBaseVo = game.data.template.CPetShopBaseVo;
import CNpcSaleBaseVo = game.data.template.CNpcSaleBaseVo;
import CCurrencyIconPathBaseVo = game.data.template.CCurrencyIconPathBaseVo;
import CCommerceFirstMenuBaseVo = game.data.template.CCommerceFirstMenuBaseVo;
import CCommerceSecondMenuBaseVo = game.data.template.CCommerceSecondMenuBaseVo;
import CMarketFirstTableBaseVo = game.data.template.CMarketFirstTableBaseVo;
import CMarketSecondTableBaseVo = game.data.template.CMarketSecondTableBaseVo;
import CMarketThreeTableBaseVo = game.data.template.CMarketThreeTableBaseVo;
import CQuickBuyBaseVo = game.data.template.CQuickBuyBaseVo;
import CShenShouShopBaseVo = game.data.template.CShenShouShopBaseVo;
import CMallShopTabNameBaseVo = game.data.template.CMallShopTabNameBaseVo;

//ljm
import AddCashluaBaseVo = game.data.template.AddCashluaBaseVo;
import ChargeReturnProfitBaseVo = game.data.template.ChargeReturnProfitBaseVo;
import RewardSystemBtnShowBaseVo = game.data.template.RewardSystemBtnShowBaseVo;
import VipInfoBaseVo = game.data.template.VipInfoBaseVo;
import RedPackConfigBaseVo = game.data.template.RedPackConfigBaseVo;
import BankConfigBaseVo = game.data.template.BankConfigBaseVo;
import CommonDayPayBaseVo = game.data.template.CommonDayPayBaseVo;
import MonthCardConfigBaseVo = game.data.template.MonthCardConfigBaseVo;
import FreeDisRewardConfigBaseVo = game.data.template.FreeDisRewardConfigBaseVo;
import QQGiftConfigBaseVo = game.data.template.QQGiftConfigBaseVo;
import HolidayGiftConfigBaseVo = game.data.template.HolidayGiftConfigBaseVo;
import GuoQingHuoYueGiftConfigBaseVo = game.data.template.GuoQingHuoYueGiftConfigBaseVo;
import GuoQingChargeGiftConfigBaseVo = game.data.template.GuoQingChargeGiftConfigBaseVo;
import HolidayTypeBaseVo = game.data.template.HolidayTypeBaseVo;
import HydReChargeRewardDataBaseVo = game.data.template.HydReChargeRewardDataBaseVo;
import HydScoreBaseVo = game.data.template.HydScoreBaseVo;
import MapConfigBaseVo = game.data.template.MapConfigBaseVo;
import MineAreainfoBaseVo = game.data.template.MineAreainfoBaseVo;
import ShowAreainfoBaseVo = game.data.template.ShowAreainfoBaseVo;
import WorldMapConfigBaseVo = game.data.template.WorldMapConfigBaseVo;
import WorldMapSmallHeadConfigBaseVo = game.data.template.WorldMapSmallHeadConfigBaseVo;
import ItemToPosBaseVo = game.data.template.ItemToPosBaseVo;
import StageInfoBaseVo = game.data.template.StageInfoBaseVo;
import SkillInfoBaseVo = game.data.template.SkillInfoBaseVo;
import BattleBackGroundBaseVo = game.data.template.BattleBackGroundBaseVo;
import FormationbaseConfigBaseVo = game.data.template.FormationbaseConfigBaseVo;
import FormationRestrainBaseVo = game.data.template.FormationRestrainBaseVo;
import BattleAIConfigBaseVo = game.data.template.BattleAIConfigBaseVo;
import RoleFighteAIBaseVo = game.data.template.RoleFighteAIBaseVo;

module game.data{
	export class ProjTemplate{
		private static _data:Object = {};
		public static roleRColorModelConfigData:Object = {};
		public static cscheculedActivityConfigData:Object = {};
		public static ccheculedActivityConfigData:Object = {};
		public static cscheculedActivitypayConfigData:Object = {};
		public static cbattlelistConfigData:Object = {};
		public static cbiaoqingConfigData:Object = {};
		public static cbanWordsConfigData:Object = {};
		public static cquickchatConfigData:Object = {};
		public static cchatColorConfigData:Object = {};
		public static ctitleConfigData:Object = {};
		public static ccommonConfigData:Object = {};
		public static caddressProvinceConfigData:Object = {};
		public static caddressCountryConfigData:Object = {};
		public static cautoMovePathConfigData:Object = {};
		public static cautoMovePathPointConfigData:Object = {};
		public static cmessageTipConfigData:Object = {};
		public static cstringResConfigData:Object = {};
		public static ceffectPathConfigData:Object = {};
		public static ceffectPathNoneDramaConfigData:Object = {};
		public static missionCMainMissionInfoData:Object = {};
		public static petCPetAttrData:Object = {};
		public static petCPetAttrModDataData:Object = {};
		public static petCPetNextExpData:Object = {};
		public static petCPetResetPointConfigData:Object = {};
		public static petCPetFeedItemListData:Object = {};
		public static petCPetDepotPriceData:Object = {};
		public static petCPetFeedItemAttrData:Object = {};
		public static petCPetFeedItemAttr_PointCardData:Object = {};
		public static petCFoodItemAttrData:Object = {};
		public static petCFoodItemAttr_PointCardData:Object = {};
		public static petCShenShouIncData:Object = {};
		public static instanceCInstaceConfigData:Object = {};
		public static instanceCBingFengWangZuoMapData:Object = {};
		public static instanceCShiGuangZhiXueConfigData:Object = {};
		public static instanceCShiGuangZhiXueNpcData:Object = {};
		public static instanceCParnterNpcConfigData:Object = {};
		public static instanceCEnChouLuNewConfigData:Object = {};
		public static clanCFactionYaoFangData:Object = {};
		public static clanCFactionLobbyData:Object = {};
		public static clanCFactionGoldBankData:Object = {};
		public static clanCFactionHotelData:Object = {};
		public static clanCFactionDrugStoreData:Object = {};
		public static clanCFactionPositionData:Object = {};
		public static clanCFactionFuLiData:Object = {};
		public static clanCRuneSetData:Object = {};
		public static clanCFactionHuoDongData:Object = {};
		public static clanCClanFightData:Object = {};
		public static FriendGiveItemData:Object={};
		public static FriendGiveGiftData:Object={};
		public static RecruitRewardData:Object={};
		public static RecruitRewardPayData:Object={};
		public static MyRecruitData:Object={};
		public static MyRecruitPayData:Object={};
		public static RecruitPathData:Object={};
		public static MarryConfData:Object={};
		public static ZhenFaEffectData:Object={};
		public static TeamListInfoData:Object={};
		public static DTeamListInfoData:Object={};
		public static EffectConfigData:Object={};
		public static ColorEffectData:Object={};
		public static UseItemEffectData:Object={};
		public static TongPingSettingData:Object={};
		public static TuiSongSettingData:Object={};
		public static FPSSettingData:Object={};
		public static StepLoadTexSettingData:Object={};
		public static PCountFPSSettingData:Object={};
		public static BattleCommandData:Object={};
		public static ResolutionData:Object={};
		public static GameconfigData:Object={};
		public static GameconfigResetData:Object={};
		public static GengXinGongGaoData:Object={};
		public static BuffConfigData:Object={};
		public static cawardResultConfigData: Object = {};
		public static cawardresultconfigpayData: Object = {};
		public static roleRColorModelConfigData3: Object = {};
		public static roleRColorModelConfigData4: Object = {};
		public static cawardConfigData: Object = {};
		public static cawardConfigpayData: Object = {};
		public static ceventConfigData: Object = {};
		public static ceventConfigpayData: Object = {};
		public static cloginTipsData: Object = {};
		public static cloginTipsDianKaData: Object = {};
		public static cloginImagesData: Object = {};
		public static cexitgameData: Object = {};
		public static ctriggerConditionData: Object = {};
		public static cnpcServiceMappingData: Object = {};
		public static cNPCConfigData: Object = {};
		public static cNPCInfoData: Object = {};
		public static cNpcChatData: Object = {};
		public static cnpcServerConfigData: Object = {};
		public static cmonsterConfigData: Object = {};
		public static cheroBaseInfoData: Object = {};
		public static cluaTestData: Object = {};
		public static cnpcShapeData: Object = {};
		public static cnpcInAllData: Object = {};
		public static csceneNPCConfigData: Object = {};
		public static csceneNPCBaseData: Object = {};
		public static cactionInfoData: Object = {};
		public static crideData: Object = {};
		public static crideItemData: Object = {};
		public static cleitaiLevelData: Object = {};
		public static cjingjiRandomRoleData: Object = {};
		public static cjingjiRandomChatData: Object = {};
		// public static roleRColorModelConfigData2:Object = {};
		// public static roleRColorModelConfigData3:Object = {};
		// public static roleRColorModelConfigData4:Object = {};
		public static itemAttrData: Object = {};
		public static itemAttr_PointCardData: Object = {};
		public static equipIteminfoData: Object = {};
		public static equipAddattributelibData: Object = {};
		public static equipAddattributerandomlibData: Object = {};
		public static attributeDesConfigData: Object = {};
		public static itemTypeData: Object = {};
		public static equipMakeInfoData: Object = {};
		public static petItemEffectData: Object = {};
		public static petItemEffect_PointCardData: Object = {};
		public static foodAndDrugEffectData: Object = {};
		public static fightDrugTypeData: Object = {};
		public static foodAndDrugEffect_PointCardData: Object = {};
		public static itembuffidsData: Object = {};
		public static gemEffectData: Object = {};
		public static gemEffect_PointCardData: Object = {};
		public static gemTypeData: Object = {};
		public static groceryEffectData: Object = {};
		public static groceryEffect_PointCardData: Object = {};
		public static equipEffectData: Object = {};
		public static equipEffect_PointCardData: Object = {};
		public static taskRelativeData: Object = {};
		public static taskRelative_PointCardData: Object = {};
		public static equipItemAttrData: Object = {};
		public static equipItemAttr_PointCardData: Object = {};
		public static pointCardEquipGemData: Object = {};
		public static itemBuffData: Object = {};
		public static presentConfigData: Object = {};
		public static presentConfigPayData: Object = {};
		public static itemTypeNameListData: Object = {};
		public static onLineGiftData: Object = {};
		public static petEquipSuitBuffData: Object = {};
		public static petEquipHeChengData: Object = {};
		public static cequipCombinData: Object = {};
		public static dcequipCombinData: Object = {};
		public static itemUseTipData: Object = {};
		public static depottableData: Object = {};
		public static bagTableData: Object = {};
		public static itemToItemData: Object = {};
		public static equipPosNameData: Object = {};
		public static comeFromData: Object = {};
		public static foodAndDrugFormulaData: Object = {};
		public static fumoEffectFormulaData: Object = {};
		public static dashiSpaceGiftData: Object = {};
		public static equipRefineInfoData: Object = {};
		public static equipRefineInfo_PointCardData: Object = {};
		public static equipRefineSkillInfoData: Object = {};
		public static equipRefineSkillInfo_PointCardData: Object = {};
		public static expFactorItemInfoData: Object = {};
		public static friendSkillData: Object = {};
		public static equipSkillData: Object = {};
		public static equipSkillInfoData: Object = {};
		public static schoolSkillitemData: Object = {};
		public static petSkillupgradeData: Object = {};
		public static petSkillEffectData: Object = {};
		public static skillitemData: Object = {};
		public static schoolSkillData: Object = {};
		public static petSkillConfigData: Object = {};
		public static sbLevelLimitData: Object = {};
		public static skillTypeConfigData: Object = {};
		public static skillConfigData: Object = {};
		public static lifeSkillData: Object = {};
		public static lifeSkillCostData: Object = {};
		public static lifeSkillCostPayData: Object = {};
		public static particeSkillLevelupData: Object = {};
		public static pointCardParticeSkillLevelupData: Object = {};
		public static practiceItemExpData: Object = {};
		public static huanhuaInfoData: Object = {};
		public static huanhuaUseData: Object = {};
		public static inheritCostData: Object = {};
		public static shiGuangZhiXueConfigData: Object = {};
		public static acceptableTaskData: Object = {};
		public static arrowEffectData: Object = {};
		public static arrowEffectSimpData: Object = {};
		public static activeGiftBoxData: Object = {};
		public static pointCardActiveGiftBoxData: Object = {};
		public static jingyingConfigData: Object = {};
		public static jingyingrenwuTaskData: Object = {};
		public static jingyingpingjiData: Object = {};
		public static tasktrackingorderData: Object = {};
		public static tikuData: Object = {};
		public static activityQuestionData: Object = {};
		public static taskNodeData: Object = {};
		public static activityNewData: Object = {};
		public static activityNewpayData: Object = {};
		public static activityMapListData: Object = {};
		public static weekListData: Object = {};
		public static newFunctionOpenData: Object = {};
		public static uiCongigData: Object = {};
		public static guideCourseData: Object = {};
		public static guideCoursePayData: Object = {};
		public static guideCourseLabelData: Object = {};
		public static answerQuestionData: Object = {};

	/**
		* @Author: LinQiuWen
		* @description:申明变量
		*/
		//role.xml
		public static schoolInfoData: Object = {};
		public static createRoleConfigData: Object = {};
		public static attrModData: Object = {};
		public static resMoneyConfigData: Object = {};
		public static schoolMasterSkillInfoData: Object = {};
		public static acupointInfoData: Object = {};
		public static acupointLevelUpData: Object = {};
		public static acupointLevelUpPayData: Object = {};
		public static skillAcupointConfigData: Object = {};
		public static skillInfoConfigData: Object = {};
		public static caddpointchangeData: Object = {}
		public static addPointResetItemConfigData: Object = {};
		public static equipEffectConfigData: Object = {};
		public static serviceLevelConfigData: Object = {};
		public static serviceExpConfigData: Object = {};
		//game.xml
		public static threePvpWhiteMenuData: Object = {};
		public static cloginawardData: Object = {};
		public static bindTelAwardData: Object = {};
		public static pointCardBindTelAwardData: Object = {};
		public static wisdomTrialVillData: Object = {};
		public static wisdomTrialProvData: Object = {};
		public static wisdomTrialStateData: Object = {};
		public static wisdomTrialVillPayData: Object = {};
		public static wisdomTrialProvPayData: Object = {};
		public static wisdomTrialStatePayData: Object = {};
		public static activityAwardBaseVoData: Object = {};
		public static cshouchonglibaoData: Object = {};
		public static cshouchonglibaopayData: Object = {};
		public static cqiandaojiangliData: Object = {};
		public static cpaihangbangData: Object = {};
		public static cdeathNoteData: Object = {};
		public static cnotifyConfigData: Object = {};
		public static cschoolWheelData:Object = {};
		public static cshareConfigData: Object = {};
		public static cshareConfigPayData: Object = {};
		public static cwinFrameSizeData: Object = {};
		public static cTTInfoData: Object = {};
		public static cTTInfoDKData: Object = {};
		public static cChangeSchoolCostData:Object = {};

		//circletask.xml
		public static cSpecialQuestConfigData:Object = {};
		public static cSchoolTaskData:Object = {};
		public static cSchoolUseItemData:Object = {};
		public static cCircTaskItemCollectData:Object = {};
		public static cRepeatTaskData:Object = {};
		public static cRepeatTaskChatData:Object = {};
		public static cCircTaskItemFindData:Object = {};
		public static cCircTaskPatrolData: Object = {};
		public static cCircTaskPetCatchData: Object = {};
		public static cRenXingCircTaskCostData: Object = {};
		public static cFubenTaskData = {};
		public static cAnYeMaXiTuanConfData = {};

		//shop.xml
		public static cGoodsData = {};
		public static dCGoodsData = {};
		public static cMallShopData = {};
		public static dCMallShopData = {};
		public static cPetShopData = {};
		public static cNpcSaleData = {};
		public static dCNpcSaleData = {};
		public static cCurrencyIconPathData = {};
		public static cCommerceFirstMenuData = {};
		public static dCCommerceFirstMenuData = {};
		public static cCommerceSecondMenuData = {};
		public static dCCommerceSecondMenuData = {};
		public static cMarketFirstTableData = {};
		public static dCMarketFirstTableData = {};
		public static cMarketSecondTableData = {};
		public static dCMarketSecondTableData = {};
		public static cMarketThreeTableData = {};
		public static dCMarketThreeTableData = {};
		public static cQuickBuyData = {}
		public static cQuickBuyPayData = {};
		public static cShenShouShopData = {};
		public static cMallShopTabNameData = {};
		public static dCMallShopTabNameData = {};
		//ljm
		public static AddCashluaData:Object = {};
        public static ChargeReturnProfitData:Object = {};
		public static RewardSystemBtnShowData:Object = {};
		public static VipInfoData:Object = {};
		public static RedPackConfigData:Object = {};
		public static BankConfigData:Object = {};
		public static CommonDayPayData:Object = {};
		public static MonthCardConfigData:Object = {};
		public static FreeDisRewardConfigData:Object = {};
		public static QQGiftConfigData:Object = {};
		public static HolidayGiftConfigData:Object = {};
		public static GuoQingHuoYueGiftConfigData:Object = {};
		public static GuoQingChargeGiftConfigData:Object = {};
		public static HolidayTypeData:Object = {};
		public static HydReChargeRewardDataData:Object = {};
		public static HydScoreData:Object = {};
		public static MapConfigData:Object = {};
		public static MineAreainfoData:Object = {};
		public static ShowAreainfoData:Object = {};
		public static WorldMapConfigData:Object = {};
		public static WorldMapSmallHeadConfigData:Object = {};
		public static ItemToPosData:Object = {};
		public static StageInfoData:Object = {};
		public static SkillInfoData:Object = {};
		public static BattleBackGroundData:Object = {};
		public static FormationbaseConfigData:Object = {};
		public static FormationRestrainData:Object = {};
		public static BattleAIConfigData:Object = {};
		public static RoleFighteAIData:Object = {};

		

		constructor(){}
		static loadTemplates():void{
			
			//Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
			//Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
			//Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
			//Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
			//Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);

			// Laya.loader.load("common/data/temp/timer.cscheculedactivity.bin",Handler.create(this,this.onloadedCScheculedActivityConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/timer.ccheculedactivity.bin",Handler.create(this,this.onloadedCcheCuledActivityConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/timer.cscheculedactivitypay.bin",Handler.create(this,this.onloadedCScheculedActivitypayConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/gm.cbattlelist.bin",Handler.create(this,this.onloadedCbattlelistConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/chat.cbiaoqing.bin",Handler.create(this,this.onloadedCbiaoqingConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/chat.cbanwords.bin",Handler.create(this,this.onloadedCBanWordsConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/chat.cquickchat.bin",Handler.create(this,this.onloadedCquickchatConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/chat.cchatcolorconfig.bin",Handler.create(this,this.onloadedCchatColorConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/title.ctitleconfig.bin",Handler.create(this,this.onloadedCTitleConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/common.ccommon.bin",Handler.create(this,this.onloadedCCommonConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/common.caddressprovince.bin",Handler.create(this,this.onloadedCAddressProvinceConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/common.caddresscountry.bin",Handler.create(this,this.onloadedCAddressCountryConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/move.cautomovepath.bin",Handler.create(this,this.onloadedCAutoMovePathConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/move.cautomovepathpoint.bin",Handler.create(this,this.onloadedCAutoMovePathPointConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/message.cmessagetip.bin",Handler.create(this,this.onloadedCMessageTipConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/message.cstringres.bin",Handler.create(this,this.onloadedCStringResConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/EffectPath.ceffectpath.bin",Handler.create(this,this.onloadedCEffectPathConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/EffectPath.ceffectpathnonedrama.bin",Handler.create(this,this.onloadedCEffectPathNoneDramaConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cmainmissioninfo.bin",Handler.create(this,this.onloadedMissionCMainMissionInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetattr.bin",Handler.create(this,this.onloadedPetCPetAttrComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetattrmoddata.bin",Handler.create(this,this.onloadedPetCPetAttrModDataComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetnextexp.bin",Handler.create(this,this.onloadedPetCPetNextExpComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetresetpointconfig.bin",Handler.create(this,this.onloadedPetCPetResetPointConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetfeeditemlist.bin",Handler.create(this,this.onloadedPetCPetFeedItemListComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetdepotprice.bin",Handler.create(this,this.onloadedPetCPetDepotPriceComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetfeeditemattr.bin",Handler.create(this,this.onloadedPetCPetFeedItemAttrComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cpetfeeditemattr_pointcard.bin",Handler.create(this,this.onloadedPetCPetFeedItemAttr_PointCardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cfooditemattr.bin",Handler.create(this,this.onloadedPetCFoodItemAttrComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cfooditemattr_pointcard.bin",Handler.create(this,this.onloadedPetCFoodItemAttr_PointCardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/pet.cshenshouinc.bin",Handler.create(this,this.onloadedPetCShenShouIncComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/ainstance.cinstaceconfig.bin",Handler.create(this,this.onloadedInstanceCInstaceConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/ainstance.cbingfengwangzuomap.bin",Handler.create(this,this.onloadedInstanceCBingFengWangZuoMapComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/ainstance.cshiguangzhixueconfig.bin",Handler.create(this,this.onloadedInstanceCShiGuangZhiXueConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/ainstance.cshiguangzhixuenpc.bin",Handler.create(this,this.onloadedInstanceCShiGuangZhiXueNpcComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/ainstance.cparnternpcconfig.bin",Handler.create(this,this.onloadedInstanceCParnterNpcConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/ainstance.cenchoulunewconfig.bin",Handler.create(this,this.onloadedInstanceCEnChouLuNewConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactionyaofang.bin",Handler.create(this,this.onloadedClanCFactionYaoFangComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactionlobby.bin",Handler.create(this,this.onloadedClanCFactionLobbyComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactiongoldbank.bin",Handler.create(this,this.onloadedClanClanCFactionGoldBankComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactionhotel.bin",Handler.create(this,this.onloadedClanCFactionHotelComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactiondrugstore.bin",Handler.create(this,this.onloadedClanCFactionDrugStoreComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactionposition.bin",Handler.create(this,this.onloadedClanCFactionPositionComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactionfuli.bin",Handler.create(this,this.onloadedClanCFactionFuLiComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cruneset.bin",Handler.create(this,this.onloadedClanCRuneSetComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cfactionhuodong.bin",Handler.create(this,this.onloadedClanCFactionHuoDongComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/clan.cclanfight.bin",Handler.create(this,this.onloadedClanCClanFightComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.cfriendgiveitem.bin",Handler.create(this,this.onloadedFriendGiveItemComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.cfriendgivegift.bin",Handler.create(this,this.onloadedFriendGiveGiftComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.crecruitreward.bin",Handler.create(this,this.onloadedRecruitRewardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.cmyrecruit.bin",Handler.create(this,this.onloadedMyRecruitComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.cmyrecruitpay.bin",Handler.create(this,this.onloadedMyRecruitPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.crecruitrewardpay.bin",Handler.create(this,this.onloadedRecruitRewardPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.crecruitpath.bin",Handler.create(this,this.onloadedRecruitPathComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/friends.cmarryconf.bin",Handler.create(this,this.onloadedMarryConfComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/team.czhenfaeffect.bin",Handler.create(this,this.onloadedZhenFaEffectComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/team.cteamlistinfo.bin",Handler.create(this,this.onloadedTeamListInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/team.dcteamlistinfo.bin",Handler.create(this,this.onloadedDTeamListInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/effect.ceffectconfig.bin",Handler.create(this,this.onloadedEffectConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/effect.ccoloreffect.bin",Handler.create(this,this.onloadedColorEffectComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/effect.cuseitemeffect.bin",Handler.create(this,this.onloadedUseItemEffectComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.ctongpingsetting.bin",Handler.create(this,this.onloadedTongPingSettingComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.ctuisongsetting.bin",Handler.create(this,this.onloadedTuiSongSettingComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.cfpssetting.bin",Handler.create(this,this.onloadedFPSSettingComplete),null,Loader.BUFFER);		
			// Laya.loader.load("common/data/temp/SysConfig.csteploadtexsetting.bin",Handler.create(this,this.onloadedStepLoadTexSettingComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.cpcountfpssetting.bin",Handler.create(this,this.onloadedPCountFPSSettingComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.cbattlecommand.bin",Handler.create(this,this.onloadedBattleCommandComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.resolution.bin",Handler.create(this,this.onloadedResolutionComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.cgameconfig.bin",Handler.create(this,this.onloadedGameconfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.cgameconfigreset.bin",Handler.create(this,this.onloadedGameconfigResetComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/SysConfig.cgengxingonggao.bin",Handler.create(this,this.onloadedGengXinGongGaoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/buff.cbuffconfig.bin",Handler.create(this,this.onloadedBuffConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/treasuremap.cawardresultconfig.bin",Handler.create(this,this.onloadedCAwardResultConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/treasuremap.cawardresultconfigpay.bin",Handler.create(this,this.onloadedCAwardResultConfigPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/treasuremap.cawardConfig.bin",Handler.create(this,this.onloadedCAwardConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/treasuremap.cawardConfigPay.bin",Handler.create(this,this.onloadedCAwardConfigPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/treasuremap.ceventConfig.bin",Handler.create(this,this.onloadedCEventConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/treasuremap.ceventConfigpay.bin",Handler.create(this,this.onloadedCEventConfigpayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/login.cloginTips.bin",Handler.create(this,this.onloadedCLoginTipsComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/login.cloginTipsDianKa.bin",Handler.create(this,this.onloadedCLoginTipsDianKaComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/login.cloginImages.bin",Handler.create(this,this.onloadedCLoginImagesComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/login.cexitgame.bin",Handler.create(this,this.onloadedCExitgameComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/triggers.ctriggerCondition.bin",Handler.create(this,this.onloadedCTriggerConditionDataComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcservicemapping.bin",Handler.create(this,this.onloadedCNpcServiceMappingComplete),null,Loader.BUFFER); 
			// Laya.loader.load("common/data/temp/npc.cnpcconfig.bin", Handler.create(this, this.onloadedCNPCConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcinfo.bin", Handler.create(this, this.onloadedcNPCInfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcchat.bin", Handler.create(this, this.onloadedcNpcChatComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcserverconfig.bin", Handler.create(this, this.onloadedcNpcServerConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cmonsterconfig.bin", Handler.create(this, this.onloadedcMonsterConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cherobaseinfo.bin", Handler.create(this, this.onloadedcHeroBaseInfoComplete), null, Loader.BUFFER); 
			// Laya.loader.load("common/data/temp/npc.cluatest.bin", Handler.create(this, this.onloadedcCLuaTestComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcshape.bin", Handler.create(this, this.onloadedcCNpcShapeComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcinall.bin", Handler.create(this, this.onloadedcCNpcInAllComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cscenenpcconfig.bin", Handler.create(this, this.onloadedcCSceneNPCConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cscenenpcbase.bin", Handler.create(this, this.onloadedCSceneNPCBaseComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cactioninfo.bin", Handler.create(this, this.onloadedCActionInfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cnpcshape.bin", Handler.create(this, this.onloadedCrideComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.crideitem.bin", Handler.create(this, this.onloadedCrideItemComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cleitailevel.bin", Handler.create(this, this.onloadedCLeitaiLevelComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cjingjirandomrole.bin", Handler.create(this, this.onloadedCJingjiRandomRoleComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/npc.cjingjirandomchat.bin", Handler.create(this, this.onloadedCJingjiRandomChatComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.crolercolorconfig.bin", Handler.create(this, this.onloadedRoleRColorConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.citemattr.bin", Handler.create(this, this.onloadedItemAttrComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.citemattr_pointcard.bin", Handler.create(this, this.onloadedItemAttr_PointCardComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequipiteminfo.bin", Handler.create(this, this.onloadedEquipIteminfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequipaddattributelib.bin", Handler.create(this, this.onloadedEquipAddattributelibComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequipaddattributerandomlib.bin", Handler.create(this, this.onloadedEquipAddattributerandomlibComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cattributedesconfig.bin", Handler.create(this, this.onloadedAttributeDesConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.citemtype.bin", Handler.create(this, this.onloadedItemTypeComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequipmakeinfo.bin", Handler.create(this, this.onloadedEquipMakeInfoComplete), null, Loader.BUFFER);								
			// Laya.loader.load("common/data/temp/item.cpetitemeffect.bin", Handler.create(this, this.onloadedPetItemEffectComplete), null, Loader.BUFFER);											
			// Laya.loader.load("common/data/temp/item.cpetitemeffect_pointcard.bin", Handler.create(this, this.onloadedPetItemEffect_PointCardtComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cfoodanddrugeffect.bin", Handler.create(this, this.onloadedFoodAndDrugEffectComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cfightdrugtype.bin", Handler.create(this, this.onloadedFightDrugTypeComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cfoodanddrugeffect_pointcard.bin", Handler.create(this, this.onloadedFoodAndDrugEffect_PointCardComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.citembuffids.bin", Handler.create(this, this.onloadedItembuffidsComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cgemeffect.bin", Handler.create(this, this.onloadedGemEffectComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cgemeffect_pointcard.bin", Handler.create(this, this.onloadedGemEffect_PointCardComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cgemtype.bin", Handler.create(this, this.onloadedGemTypeComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cgroceryeffect.bin", Handler.create(this, this.onloadedGroceryEffectComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cgroceryeffect_pointcard.bin", Handler.create(this, this.onloadedGroceryEffect_PointCardComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cequipeffect.bin", Handler.create(this, this.onloadedEquipEffectComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cequipeffect_pointcard.bin", Handler.create(this, this.onloadedEquipEffect_PointCardComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.ctaskrelative.bin", Handler.create(this, this.onloadedTaskRelativeComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.ctaskrelative_pointcard.bin", Handler.create(this, this.onloadedTaskRelative_PointCardComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cequipitemattr.bin", Handler.create(this, this.onloadedEquipItemAttrComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cequipitemattr_pointcard.bin", Handler.create(this, this.onloadedEquipItemAttr_PointCardComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cpointcardequipgem.bin", Handler.create(this, this.onloadedPointCardEquipGemComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.citembuff.bin", Handler.create(this, this.onloadedItemBuffComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cpresentconfig.bin", Handler.create(this, this.onloadedPresentConfigComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.cpresentconfigpay.bin", Handler.create(this, this.onloadedPresentConfigPayComplete), null, Loader.BUFFER);														
			// Laya.loader.load("common/data/temp/item.citemtypenamelist.bin", Handler.create(this, this.onloadedItemTypeNameListComplete), null, Loader.BUFFER);										
			// Laya.loader.load("common/data/temp/item.conlinegift.bin", Handler.create(this, this.onloadedonlinegiftComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cpetequipsuitbuff.bin", Handler.create(this, this.onloadedPetEquipSuitBuffComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cpetequiphecheng.bin", Handler.create(this, this.onloadedPetEquipHeChengComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequipcombin.bin", Handler.create(this, this.onloadedCequipCombinComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.dcequipcombin.bin", Handler.create(this, this.onloadedDcequipCombinComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.citemusetip.bin", Handler.create(this, this.onloadedItemUseTipComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cdepottable.bin", Handler.create(this, this.onloadedDepottableComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cbagtable.bin", Handler.create(this, this.onloadedBagTableComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.citemtoitem.bin", Handler.create(this, this.onloadedItemToItemComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequipposname.bin", Handler.create(this, this.onloadedEquipPosNameComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.ccomefrom.bin", Handler.create(this, this.onloadedComeFromComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cfoodanddrugformula.bin", Handler.create(this, this.onloadedFoodAndDrugFormulaComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cfumoeffectformula.bin", Handler.create(this, this.onloadedFumoEffectFormulaComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cdashispacegift.bin", Handler.create(this, this.onloadedDashiSpaceGiftComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequiprefineinfo.bin", Handler.create(this, this.onloadedEquipRefineInfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequiprefineinfo_pointcard.bin", Handler.create(this, this.onloadedEquipRefineInfo_PointCardComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequiprefineskillinfo.bin", Handler.create(this, this.onloadedEquipRefineSkillInfoDataComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cequiprefineskillinfo_pointcard.bin", Handler.create(this, this.onloadedEquipRefineSkillInfo_PointCardComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/item.cexpfactoriteminfo.bin", Handler.create(this, this.onloadedExpFactorItemInfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cfriendskill.bin", Handler.create(this, this.onloadedFriendSkillComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cequipskill.bin", Handler.create(this, this.onloadedEquipSkillComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cequipskillinfo.bin", Handler.create(this, this.onloadedEquipSkillInfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cschoolskillitem.bin", Handler.create(this, this.onloadedSchoolSkillitemComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cpetskillupgrade.bin", Handler.create(this, this.onloadedPetSkillupgradeComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cpetskilleffect.bin", Handler.create(this, this.onloadedPetSkillEffectComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cskillitem.bin", Handler.create(this, this.onloadedSkillitemComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cschoolskill.bin", Handler.create(this, this.onloadedSchoolSkillComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cpetskillconfig.bin", Handler.create(this, this.onloadedPetSkillConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.csblevellimit.bin", Handler.create(this, this.onloadedSBLevelLimitComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cskilltypeconfig.bin", Handler.create(this, this.onloadedSkillTypeConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cskillconfig.bin", Handler.create(this, this.onloadedSkillConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.clifeskill.bin", Handler.create(this, this.onloadedLifeSkillComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.clifeskillcost.bin", Handler.create(this, this.onloadedLifeSkillCostComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.clifeskillcostpay.bin", Handler.create(this, this.onloadedLifeSkillCostPayComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cparticeskilllevelup.bin", Handler.create(this, this.onloadedParticeSkillLevelupComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cpointcardparticeskilllevelup.bin", Handler.create(this, this.onloadedPointCardParticeSkillLevelupComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cpracticeitemexp.bin", Handler.create(this, this.onloadedPracticeItemExpComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.chuanhuainfo.bin", Handler.create(this, this.onloadedHuanhuaInfoComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.chuanhuause.bin", Handler.create(this, this.onloadedHuanhuaUseComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/skill.cinheritcost.bin", Handler.create(this, this.onloadedInheritCostComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cshiguangzhixueconfig.bin", Handler.create(this, this.onloadedShiGuangZhiXueConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cacceptabletask.bin", Handler.create(this, this.onloadedAcceptableTaskComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.carroweffect.bin", Handler.create(this, this.onloadedArrowEffectComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.carroweffectsimp.bin", Handler.create(this, this.onloadedArrowEffectSimpComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cactivegiftbox.bin", Handler.create(this, this.onloadedActiveGiftBoxComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cpointcardactivegiftbox.bin", Handler.create(this, this.onloadedPointCardActiveGiftBoxComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cjingyingconfig.bin", Handler.create(this, this.onloadedJingyingConfigComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cjingyingrenwutask.bin", Handler.create(this, this.onloadedJingyingrenwuTaskComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.cjingyingpingji.bin", Handler.create(this, this.onloadedJingyingpingjiComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.ctasktrackingorder.bin", Handler.create(this, this.onloadedTasktrackingorderComplete), null, Loader.BUFFER);
			// Laya.loader.load("common/data/temp/mission.ctiku.bin", Handler.create(this, this.onloadedTikuComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cactivityquestion.bin", Handler.create(this, this.onloadedActivityQuestionComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.ctasknode.bin", Handler.create(this, this.onloadedTaskNodeComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cactivitynew.bin", Handler.create(this, this.onloadedActivityNewComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cactivitynewpay.bin", Handler.create(this, this.onloadedActivityNewpayComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cactivitymaplist.bin", Handler.create(this, this.onloadedActivityMapListComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cweeklist.bin", Handler.create(this, this.onloadedWeekListComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cnewfunctionopen.bin", Handler.create(this, this.onloadedNewFunctionOpenComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cuicongig.bin", Handler.create(this, this.onloadedUICongigComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cguidecourse.bin", Handler.create(this, this.onloadedGuideCourseComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cguidecoursepay.bin", Handler.create(this, this.onloadedGuideCoursePayComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.cguidecourselabel.bin", Handler.create(this, this.onloadedGuideCourseLabelComplete), null, Loader.BUFFER);			
			// Laya.loader.load("common/data/temp/mission.answerquestion.bin", Handler.create(this, this.onloadedAnswerQuestionComplete), null, Loader.BUFFER);


			// /**
			// * @Author: LinQiuWen
			// * @description:加载数据
			// */
			// Laya.loader.load("common/data/temp/role.crolercolorconfig.bin",Handler.create(this,this.onloadedRoleRColorConfigComplete),null,Loader.BUFFER);
			// // role.xml
			// Laya.loader.load("common/data/temp/role.schoolinfo.bin",Handler.create(this,this.onloadedSchoolInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.createroleconfig.bin",Handler.create(this,this.onloadedCreateRoleConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.cattrmoddata.bin",Handler.create(this,this.onloadedAttrModDataComplete),null,Loader.BUFFER);	//数据不对

			// Laya.loader.load("common/data/temp/role.cresmoneyconfig.bin",Handler.create(this,this.onloadedResMoneyConfigComplete),null,Loader.BUFFER);

			// Laya.loader.load("common/data/temp/role.schoolmasterskillinfo.bin",Handler.create(this,this.onloadedSchoolMasterSkillInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.acupointinfo.bin",Handler.create(this,this.onloadedAcupointInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.acupointlevelup.bin",Handler.create(this,this.onloadedAcupointLevelUpComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.acupointleveluppay.bin",Handler.create(this,this.onloadedAcupointLevelUpPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.skillacupointconfig.bin",Handler.create(this,this.onloadedSkillAcupointConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.skillinfoconfig.bin",Handler.create(this,this.onloadedSkillInfoConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.caddpointchange.bin",Handler.create(this,this.onloadedCaddpointchangeComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.caddpointresetitemconfig.bin",Handler.create(this,this.onloadedAddPointResetItemConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.cequipeffectconfig.bin",Handler.create(this,this.onloadedEquipEffectConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.cservicelevelconfig.bin",Handler.create(this,this.onloadedServiceLevelConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/role.cserviceexpconfig.bin",Handler.create(this,this.onloadedServiceExpConfigComplete),null,Loader.BUFFER);
			// /**game.xml */
			// Laya.loader.load("common/data/temp/game.threepvpwhitemenu.bin",Handler.create(this,this.onloadedThreePvpWhiteMenuComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cloginaward.bin",Handler.create(this,this.onloadedCloginawardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cbindtelaward.bin",Handler.create(this,this.onloadedBindTelAwardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cpointcardbindtelaward.bin",Handler.create(this,this.onloadedPointCardBindTelAwardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.wisdomtrialvill.bin",Handler.create(this,this.onloadedWisdomTrialVillComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.wisdomtrialstate.bin",Handler.create(this,this.onloadedWisdomTrialStateComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.wisdomtrialvillpay.bin",Handler.create(this,this.onloadedWisdomTrialVillPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.wisdomtrialprovpay.bin",Handler.create(this,this.onloadedWisdomTrialProvPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.wisdomtrialstatepay.bin",Handler.create(this,this.onloadedWisdomTrialStatePayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cactivityaward.bin.bin",Handler.create(this,this.onloadedActivityAwardComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cshouchonglibao.bin",Handler.create(this,this.onloadedCshouchonglibaoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cshouchonglibaopay.bin",Handler.create(this,this.onloadedCshouchonglibaopayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cqiandaojiangli.bin",Handler.create(this,this.onloadedCqiandaojiangliComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cpaihangbang.bin",Handler.create(this,this.onloadedCpaihangbangComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cdeathnote.bin",Handler.create(this,this.onloadedCDeathNoteComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cnotifyconfig.bin",Handler.create(this,this.onloadedCNotifyConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cschoolwheel.bin",Handler.create(this,this.onloadedCSchoolWheelComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cshareconfig.bin",Handler.create(this,this.onloadedCShareConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cshareconfigpay.bin",Handler.create(this,this.onloadedCShareConfigPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cwinframesize.bin",Handler.create(this,this.onloadedCWinFrameSizeComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cttinfo.bin",Handler.create(this,this.onloadedCTTInfoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cttinfodk.bin",Handler.create(this,this.onloadedCTTInfoDKComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/game.cchangeschoolcost.bin",Handler.create(this,this.onloadedCChangeSchoolCostComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.cspecialquestconfig.bin",Handler.create(this,this.onloadedCSpecialQuestConfigComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.cschooltask.bin",Handler.create(this,this.onloadedCSchoolTaskComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.cschooluseitem.bin",Handler.create(this,this.onloadedCSchoolUseItemComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.cCircTaskItemCollect.bin",Handler.create(this,this.onloadedCCircTaskItemCollectComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.crepeattask.bin",Handler.create(this,this.onloadedCRepeatTaskComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.crepeattaskchat.bin",Handler.create(this,this.onloadedCRepeatTaskChatComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.ccirctaskitemfind.bin",Handler.create(this,this.onloadedCCircTaskItemFindComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.ccirctaskpatrol.bin",Handler.create(this,this.onloadedCCircTaskPatrolComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.ccirctaskpetcatch.bin",Handler.create(this,this.onloadedCCircTaskPetCatchComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.crenxingcirctaskcost.bin",Handler.create(this,this.onloadedCRenXingCircTaskCostComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.cfubentask.bin",Handler.create(this,this.onloadedCFubenTaskComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/circletask.canyemaxituanconf.bin",Handler.create(this,this.onloadedCAnYeMaXiTuanConfComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cgoods.bin",Handler.create(this,this.onloadedCGoodsComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcgoods.bin",Handler.create(this,this.onloadedDCGoodsComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cmallshop.bin",Handler.create(this,this.onloadedCMallShopComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcmallshop.bin",Handler.create(this,this.onloadedDCMallShopComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cpetshop.bin",Handler.create(this,this.onloadedCPetShopComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cnpcsale.bin",Handler.create(this,this.onloadedCNpcSaleComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcnpcsale.bin",Handler.create(this,this.onloadedDCNpcSaleComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.ccurrencyiconpath.bin",Handler.create(this,this.onloadedCCurrencyIconPathComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.ccommercefirstmenu.bin",Handler.create(this,this.onloadedCCommerceFirstMenuComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dccommercefirstmenu.bin",Handler.create(this,this.onloadedDCCommerceFirstMenuComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.ccommercesecondmenu.bin",Handler.create(this,this.onloadedCCommerceSecondMenuComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dccommercesecondmenu.bin",Handler.create(this,this.onloadedDCCommerceSecondMenuComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cmarketfirsttable.bin",Handler.create(this,this.onloadedCMarketFirstTableComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcmarketfirsttable.bin",Handler.create(this,this.onloadedDCMarketFirstTableComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cmarketsecondtable.bin",Handler.create(this,this.onloadedCMarketSecondTableComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcmarketsecondtable.bin",Handler.create(this,this.onloadedDCMarketSecondTableComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cmarketthreetable.bin",Handler.create(this,this.onloadedCMarketThreeTableComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcmarketthreetable.bin",Handler.create(this,this.onloadedDCMarketThreeTableComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cquickbuy.bin",Handler.create(this,this.onloadedCQuickBuyComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cquickbuypay.bin",Handler.create(this,this.onloadedCQuickBuyPayComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cshenshoushop.bin",Handler.create(this,this.onloadedCShenShouShopComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.cmallshoptabname.bin",Handler.create(this,this.onloadedCMallShopTabNameComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/shop.dcmallshoptabname.bin",Handler.create(this,this.onloadedDCMallShopTabNameComplete),null,Loader.BUFFER);

			// //ljm
			// Laya.loader.load("common/data/temp/fushi.caddcashlua.bin",Handler.create(this,this.onloadedAddCashluaComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.caddcashpcardlua.bin",Handler.create(this,this.onloadedAddCashluaComplete1),null,Loader.BUFFER);  
		    // Laya.loader.load("common/data/temp/fushi.cchargereturnprofit.bin",Handler.create(this,this.onloadedChargereturnProfitComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.crewardsystembtnshow.bin",Handler.create(this,this.onloadedRewardSystemBtnShowComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cvipinfo.bin",Handler.create(this,this.onloadedVipInfoBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.credpackconfig.bin",Handler.create(this,this.onloadedRedPackConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cbankconfig.bin",Handler.create(this,this.onloadedBankConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.ccommondaypay.bin",Handler.create(this,this.onloadedCommonDayPayBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cmonthcardconfig.bin",Handler.create(this,this.onloadedMonthCardConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cfreedisrewardconfig.bin",Handler.create(this,this.onloadedFreeDisRewardConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cfreedisrewardconfigpay.bin",Handler.create(this,this.onloadedFreeDisRewardConfigpayBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cqqgiftconfig.bin",Handler.create(this,this.onloadedQQGiftConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cqqgiftconfigpay.bin",Handler.create(this,this.onloadedQQGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
		    // Laya.loader.load("common/data/temp/fushi.cholidaygiftconfig.bin",Handler.create(this,this.onloadedHolidayGiftConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cholidaygiftconfigpay.bin",Handler.create(this,this.onloadedHolidayGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cguoqinghuoyuegiftconfigpay.bin",Handler.create(this,this.onloadedGuoQingHuoYueGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cguoqingchargegiftconfig.bin",Handler.create(this,this.onloadedGuoQingChargeGiftConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cguoqingchargegiftconfigpay.bin",Handler.create(this,this.onloadedGuoQingChargeGiftConfigPayBaseVoComplete),null,Loader.BUFFER);
		    // Laya.loader.load("common/data/temp/fushi.cholidaytype.bin",Handler.create(this,this.onloadedHolidayTypeBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/fushi.cholidaytypepay.bin",Handler.create(this,this.onloadedHolidayTypePayBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/activity.chydrechargerewarddata.bin",Handler.create(this,this.onloadedHydReChargeRewardDataBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/activity.chydrechargerewarddatadk.bin",Handler.create(this,this.onloadedHydReChargeRewardDataDKBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/activity.chydscore.bin",Handler.create(this,this.onloadedHydScoreBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/activity.chydscoredk.bin",Handler.create(this,this.onloadedHydScoreDKBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/map.cmapconfig.bin",Handler.create(this,this.onloadedMapConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/map.cmineareainfo.bin",Handler.create(this,this.onloadedMineAreainfoBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/map.cshowareainfo.bin",Handler.create(this,this.onloadedShowAreainfoBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/map.cworldmapconfig.bin",Handler.create(this,this.onloadedWorldMapConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/map.cworldmapsmallheadconfig.bin",Handler.create(this,this.onloadedWorldMapSmallHeadConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/map.citemtopos.bin",Handler.create(this,this.onloadedItemToPosBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cstageinfo.bin",Handler.create(this,this.onloadedStageInfoBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cstageinfo2.bin",Handler.create(this,this.onloadedStageInfo2BaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cskillinfo.bin",Handler.create(this,this.onloadedSkillInfoBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cbattlebackground.bin",Handler.create(this,this.onloadedBattleBackGroundBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cbattlebackmusic.bin",Handler.create(this,this.onloadedBattleBackMusicBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cformationbaseconfig.bin",Handler.create(this,this.onloadedFormationbaseConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cformationrestrain.bin",Handler.create(this,this.onloadedFormationRestrainBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.cbattleaiconfig.bin",Handler.create(this,this.onloadedBattleAIConfigBaseVoComplete),null,Loader.BUFFER);
			// Laya.loader.load("common/data/temp/battle.crolefighteai.bin",Handler.create(this,this.onloadedRoleFighteAIBaseVoComplete),null,Loader.BUFFER);
			
			

		}
		static onloadedRoleRColorConfigComplete():void {
			console.log("RoleRColorConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.crolercolorconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.roleRColorModelConfigData,RoleRColorConfigBaseVo,"id");
			// console.log("RoleRColorModel.configData:",this.roleRColorModelConfigData);
		}

	   static onloadedCScheculedActivityConfigComplete():void {
			console.log("CScheculedActivity表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/timer.cscheculedactivity.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cscheculedActivityConfigData,CScheculedActivityBaseVo,"id");
			// console.log("RoleRColorModel.configData:",this.cscheculedActivityConfigData);
		}

		static onloadedCcheCuledActivityConfigComplete():void {
			console.log("CcheculedActivity表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/timer.ccheculedactivity.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ccheculedActivityConfigData,CcheculedActivityBaseVo,"id");
			// console.log("RoleRColorModel.configData:",this.ccheculedActivityConfigData);
		}

	   static onloadedCScheculedActivitypayConfigComplete():void {
			console.log("CScheculedActivitypay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/timer.cscheculedactivitypay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cscheculedActivitypayConfigData,CScheculedActivitypayBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.cscheculedActivitypayConfigData);
		}

	   static onloadedCbattlelistConfigComplete():void {
			console.log("Cbattlelist表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/gm.cbattlelist.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cbattlelistConfigData,CbattlelistBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.cbattlelistConfigData);
		}

      static onloadedCbiaoqingConfigComplete():void {
			console.log("Cbiaoqing表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/chat.cbiaoqing.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cbiaoqingConfigData,CbiaoqingBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.cbiaoqingConfigData);
		}

		static onloadedCBanWordsConfigComplete():void {
			console.log("CBanWords表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/chat.cbanwords.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cbanWordsConfigData,CBanWordsBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.cbanWordsConfigData);
		}
		
		static onloadedCquickchatConfigComplete():void {
			console.log("Cquickchat表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/chat.cquickchat.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cquickchatConfigData,CquickchatBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.cquickchatConfigData);
		}
		
		static onloadedCchatColorConfigComplete():void {
			console.log("CchatColor表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/chat.cchatcolorconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cchatColorConfigData,CchatColorConfigBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.cchatColorConfigData);
		}

		static onloadedCTitleConfigComplete():void {
			console.log("CTitle表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/title.ctitleconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ctitleConfigData,CTitleConfigBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.ctitleConfigData);
		}

		static onloadedCCommonConfigComplete():void {
			console.log("CCommon表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/common.ccommon.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ccommonConfigData,CCommonBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.ccommonConfigData);
		}

		static onloadedCAddressProvinceConfigComplete():void {
			console.log("CAddressProvince表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/common.caddressprovince.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.caddressProvinceConfigData,CAddressProvinceBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.caddressProvinceConfigData);
		}

		static onloadedCAddressCountryConfigComplete():void {
			console.log("CAddressCountry表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/common.caddresscountry.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.caddressCountryConfigData,CAddressCountryBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.caddressCountryConfigData);
		}

		static onloadedCAutoMovePathConfigComplete():void {
			console.log("CAutoMovePath表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/move.cautomovepath.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cautoMovePathConfigData,CAutoMovePathBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.cautoMovePathConfigData);
		}

		static onloadedCAutoMovePathPointConfigComplete():void {
			console.log("CAutoMovePathPoint表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/move.cautomovepathpoint.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cautoMovePathPointConfigData,CAutoMovePathPointBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.cautoMovePathPointConfigData);
		}

		static onloadedCMessageTipConfigComplete():void {
			console.log("CMessageTip表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/message.cmessagetip.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cmessageTipConfigData,CMessageTipBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.cmessageTipConfigData);
		}

		static onloadedCStringResConfigComplete():void {
			console.log("CStringRes表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/message.cstringres.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cstringResConfigData,CStringResBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.cstringResConfigData);
		}

		static onloadedCEffectPathConfigComplete():void {
			console.log("CEffectPath表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpath.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ceffectPathConfigData,CEffectPathBaseVo,"id");
			//console.log("RoleRColorModel.configData:",this.ceffectPathConfigData);
		}

		static onloadedCEffectPathNoneDramaConfigComplete():void {
			console.log("CEffectPathNoneDrama表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/EffectPath.ceffectpathnonedrama.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ceffectPathNoneDramaConfigData,CEffectPathNoneDramaBaseVo,"id");
		//	console.log("RoleRColorModel.configData:",this.ceffectPathNoneDramaConfigData);
		}
		//z主任务配置
		static onloadedMissionCMainMissionInfoComplete():void {
			console.log("MissionCMainMissionInfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cmainmissioninfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.missionCMainMissionInfoData,MissionCMainMissionInfoBaseVo,"id");
			//console.log("missionCMainMissionInfoData:",this.missionCMainMissionInfoData);
		}
		//c宠物基本数据
		static onloadedPetCPetAttrComplete():void {
			console.log("PetCPetAttr表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattr.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetAttrData,PetCPetAttrBaseVo,"id");
			//console.log("petCPetAttrData:",this.petCPetAttrData);
		}
		//c宠物一级属性转换表
		static onloadedPetCPetAttrModDataComplete():void {
			console.log("PetCPetAttrModData表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetattrmoddata.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetAttrModDataData,PetCPetAttrModDataBaseVo,"id");
			//console.log("petCPetAttrModDataData:",this.petCPetAttrModDataData);
		}
		//c宠物升级经验表
		static onloadedPetCPetNextExpComplete():void {
			console.log("PetCPetNextExp表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetnextexp.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetNextExpData,PetCPetNextExpBaseVo,"id");
			//console.log("petCPetNextExpData:",this.petCPetNextExpData);
		}
		//c宠物属性重置消耗
		static onloadedPetCPetResetPointConfigComplete():void {
			console.log("PetCPetResetPointConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetresetpointconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetResetPointConfigData,PetCPetResetPointConfigBaseVo,"id");
		//	console.log("petCPetResetPointConfigData:",this.petCPetResetPointConfigData);
		}
		//c宠物培养显示表
		static onloadedPetCPetFeedItemListComplete():void {
			console.log("PetCPetFeedItemList表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemlist.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetFeedItemListData,PetCPetFeedItemListBaseVo,"id");
		//	console.log("petCPetFeedItemListData:",this.petCPetFeedItemListData);
		}
		//c宠物仓库扩充价格
		static onloadedPetCPetDepotPriceComplete():void {
			console.log("PetCPetDepotPrice表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetdepotprice.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetDepotPriceData,PetCPetDepotPriceBaseVo,"id");
		//	console.log("petCPetDepotPriceData:",this.petCPetDepotPriceData);
		}
		//c宠物物品表
		static onloadedPetCPetFeedItemAttrComplete():void {
			console.log("PetCPetFeedItemAttr表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemattr.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetFeedItemAttrData,PetCPetFeedItemAttrBaseVo,"id");
		//	console.log("petCPetFeedItemAttrData:",this.petCPetFeedItemAttrData);
		}
		//DMT3宠物物品表
		static onloadedPetCPetFeedItemAttr_PointCardComplete():void {
			console.log("PetCPetFeedItemAttr_PointCard表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cpetfeeditemattr_pointcard.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCPetFeedItemAttr_PointCardData,PetCPetFeedItemAttrBaseVo,"id");
		//	console.log("petCPetFeedItemAttr_PointCardData:",this.petCPetFeedItemAttr_PointCardData);
		}
		//s食品表
		static onloadedPetCFoodItemAttrComplete():void {
			console.log("PetCFoodItemAttr表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cfooditemattr.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCFoodItemAttrData,PetCFoodItemAttrBaseVo,"id");
			//console.log("petCFoodItemAttrData:",this.petCFoodItemAttrData);
		}
		//DMT3食品表
		static onloadedPetCFoodItemAttr_PointCardComplete():void {
			console.log("PetCFoodItemAttr_PointCard表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cfooditemattr_pointcard.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCFoodItemAttr_PointCardData,PetCFoodItemAttrBaseVo,"id");
		//	console.log("petCFoodItemAttr_PointCardData:",this.petCFoodItemAttr_PointCardData);
		}
		//c宠物灵兽提升
		static onloadedPetCShenShouIncComplete():void {
			console.log("PetCShenShouInc表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/pet.cshenshouinc.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.petCShenShouIncData,PetCShenShouIncBaseVo,"id");
		//	console.log("petCShenShouIncData:",this.petCShenShouIncData);
		}
		//公会副本参数
		static onloadedInstanceCInstaceConfigComplete():void {
			console.log("InstanceCInstaceConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cinstaceconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.instanceCInstaceConfigData,InstanceCInstaceConfigBaseVo,"id");
		//	console.log("instanceCInstaceConfigData:",this.instanceCInstaceConfigData);
		}
		//b冰静态地图
		static onloadedInstanceCBingFengWangZuoMapComplete():void {
			console.log("InstanceCBingFengWangZuoMap表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cbingfengwangzuomap.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.instanceCBingFengWangZuoMapData,InstanceCBingFengWangZuoMapBaseVo,"id");
		//	console.log("instanceCBingFengWangZuoMapData:",this.instanceCBingFengWangZuoMapData);
		}
		//精英副本任务
		static onloadedInstanceCShiGuangZhiXueConfigComplete():void {
			console.log("InstanceCShiGuangZhiXueConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cshiguangzhixueconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.instanceCShiGuangZhiXueConfigData,InstanceCShiGuangZhiXueConfigBaseVo,"id");
			//console.log("instanceCShiGuangZhiXueConfigData:",this.instanceCShiGuangZhiXueConfigData);
		}
		//精英副本刷新
		static onloadedInstanceCShiGuangZhiXueNpcComplete():void {
			console.log("InstanceCShiGuangZhiXueNpc表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cshiguangzhixuenpc.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.instanceCShiGuangZhiXueNpcData,InstanceCShiGuangZhiXueNpcBaseVo,"id");
			console.log("instanceCShiGuangZhiXueNpcData:",this.instanceCShiGuangZhiXueNpcData);
		}
		//z战斗NPC_协战_28xxx
		static onloadedInstanceCParnterNpcConfigComplete():void {
			console.log("InstanceCParnterNpcConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cparnternpcconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.instanceCParnterNpcConfigData,InstanceCParnterNpcConfigBaseVo,"id");
			//console.log("instanceCParnterNpcConfigData:",this.instanceCParnterNpcConfigData);
		}
		//b冰封王座配置表新
		static onloadedInstanceCEnChouLuNewConfigComplete():void {
			console.log("InstanceCEnChouLuNewConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/instance.cenchoulunewconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.instanceCEnChouLuNewConfigData,InstanceCEnChouLuNewConfigBaseVo,"id");
		//	console.log("instanceCEnChouLuNewConfigData:",this.instanceCEnChouLuNewConfigData);
		}
		//y药品购买配置
		static onloadedClanCFactionYaoFangComplete():void {
			console.log("ClanCFactionYaoFang表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionyaofang.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionYaoFangData,ClanCFactionYaoFangBaseVo,"id");
		//	console.log("clanCFactionYaoFangData:",this.clanCFactionYaoFangData);
		}
		//g公会大厅数据表
		static onloadedClanCFactionLobbyComplete():void {
			console.log("ClanCFactionLobby表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionlobby.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionLobbyData,ClanCFactionLobbyBaseVo,"id");
		//	console.log("clanCFactionLobbyData:",this.clanCFactionLobbyData);
		}
		//g公会大厅数据表
		static onloadedClanClanCFactionGoldBankComplete():void {
			console.log("ClanCFactionGoldBank表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiongoldbank.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionGoldBankData,ClanCFactionGoldBankBaseVo,"id");
		//	console.log("clanCFactionGoldBankData:",this.clanCFactionGoldBankData);
		}
		//g公会旅馆数据表
		static onloadedClanCFactionHotelComplete():void {
			console.log("ClanCFactionHotel表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhotel.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionHotelData,ClanCFactionHotelBaseVo,"id");
		//	console.log("clanCFactionHotelData:",this.clanCFactionHotelData);
		}
		//g公会药房数据表
		static onloadedClanCFactionDrugStoreComplete():void {
			console.log("ClanCFactionDrugStore表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactiondrugstore.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionDrugStoreData,ClanCFactionDrugStoreBaseVo,"id");
		//	console.log("clanCFactionDrugStoreData:",this.clanCFactionDrugStoreData);
		}
		//g公会职务以及权限表
		static onloadedClanCFactionPositionComplete():void {
			console.log("ClanCFactionPosition表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionposition.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionPositionData,ClanCFactionPositionBaseVo,"id");
		//	console.log("clanCFactionPositionData:",this.clanCFactionPositionData);
		}
		//g公会福利表
		static onloadedClanCFactionFuLiComplete():void {
			console.log("ClanCFactionFuLi表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionfuli.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionFuLiData,ClanCFactionFuLiBaseVo,"id");
		//	console.log("clanCFactionFuLiData:",this.clanCFactionFuLiData);
		}
		//g公会符文配置
		static onloadedClanCRuneSetComplete():void {
			console.log("ClanCRuneSet表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cruneset.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCRuneSetData,ClanCRuneSetBaseVo,"id");
		//	console.log("clanCRuneSetData:",this.clanCRuneSetData);
		}
		//g公会活动表
		static onloadedClanCFactionHuoDongComplete():void {
			console.log("ClanCFactionHuoDong表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cfactionhuodong.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCFactionHuoDongData,ClanCFactionHuoDongBaseVo,"id");
		//	console.log("clanCFactionHuoDongData:",this.clanCFactionHuoDongData);
		}
		//工会战
		static onloadedClanCClanFightComplete():void {
			console.log("ClanCClanFight表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/clan.cclanfight.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.clanCClanFightData,ClanCClanFightBaseVo,"id");
		//	console.log("clanCClanFightData:",this.clanCClanFightData);
		}
		//c持续性buff表
		static onloadedBuffConfigComplete():void {
			console.log("BuffConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/buff.cbuffconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.BuffConfigData,BuffConfigBaseVo,"id");
		//	console.log("BuffConfig.configData:",this.BuffConfigData);
		}
		//g更新公告
		static onloadedGengXinGongGaoComplete():void {
			console.log("GengXinGongGao表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cgengxingonggao.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GengXinGongGaoData,GengXinGongGaoBaseVo,"id");
		//	console.log("GengXinGongGao.configData:",this.GengXinGongGaoData);
		}
//x系统设置重置表
		static onloadedGameconfigResetComplete():void {
			console.log("GameconfigReset表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cgameconfigreset.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GameconfigResetData,GameconfigResetBaseVo,"id");
		//	console.log("GameconfigReset.configData:",this.GameconfigResetData);
		}
		//x系统设置配置表
		static onloadedGameconfigComplete():void {
			console.log("Gameconfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cgameconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GameconfigData,GameconfigBaseVo,"id");
		//	console.log("Gameconfig.configData:",this.GameconfigData);
		}
		//f分辨率配置
		static onloadedResolutionComplete():void {
			console.log("Resolution表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.resolution.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ResolutionData,ResolutionBaseVo,"id");
		//	console.log("Resolution.configData:",this.ResolutionData);
		}
		//BattleCommand
		static onloadedBattleCommandComplete():void {
			console.log("BattleCommand表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cbattlecommand.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.BattleCommandData,BattleCommandBaseVo,"id");
		//	console.log("BattleCommand.configData:",this.BattleCommandData);
		}
		//t同屏人数自适应配置
		static onloadedPCountFPSSettingComplete():void {
			console.log("PCountFPSSetting表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cpcountfpssetting.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.PCountFPSSettingData,PCountFPSSettingBaseVo,"id");
		//	console.log("PCountFPSSetting.configData:",this.PCountFPSSettingData);
		}
		//m每帧单步加载纹理
		static onloadedStepLoadTexSettingComplete():void {
			console.log("StepLoadTexSetting表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.csteploadtexsetting.bin");
		
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.StepLoadTexSettingData,StepLoadTexSettingBaseVo,"id");
		//console.log("StepLoadTexSetting.configData:",this.StepLoadTexSettingData);
		}
		//h画面刷新频率机型适配表
		static onloadedFPSSettingComplete():void {
			console.log("FPSSetting表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.cfpssetting.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FPSSettingData,FPSSettingBaseVo,"id");
		//	console.log("FPSSetting.configData:",this.FPSSettingData);
		}
		//推送提醒配置表
		static onloadedTuiSongSettingComplete():void {
			console.log("TuiSongSetting表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.ctuisongsetting.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.TuiSongSettingData,TuiSongSettingBaseVo,"id");
		//	console.log("TuiSongSetting.configData:",this.TuiSongSettingData);
		}
		//t同屏显示人数机型适配表
		static onloadedTongPingSettingComplete():void {
			console.log("TongPingSetting表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/SysConfig.ctongpingsetting.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.TongPingSettingData,TongPingSettingBaseVo,"id");
		//	console.log("TongPingSetting.configData:",this.TongPingSettingData);
		}
		//d道具使用粒子轨迹配置
		static onloadedUseItemEffectComplete():void {
			console.log("UseItemEffect表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/effect.cuseitemeffect.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.UseItemEffectData,UseItemEffectBaseVo,"id");
		//	console.log("UseItemEffect.configData:",this.UseItemEffectData);
		}
		//s特效数字表
		static onloadedColorEffectComplete():void {
			console.log("ColorEffect表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/effect.ccoloreffect.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ColorEffectData,ColorEffectBaseVo,"id");
			console.log("ColorEffect.configData:",this.ColorEffectData);
		}
		//s属性效果id表
		static onloadedEffectConfigComplete():void {
			console.log("EffectConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/effect.ceffectconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.EffectConfigData,EffectConfigBaseVo,"id");
		//	console.log("EffectConfig.configData:",this.EffectConfigData);
		}
		//队伍列表信息for点卡服
		static onloadedDTeamListInfoComplete():void {
			console.log("DCTeamListInfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/team.dcteamlistinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.DTeamListInfoData,DTeamListInfoBaseVo,"id");
		//	console.log("DCTeamListInfo.configData:",this.DTeamListInfoData);
		}
		//队伍列表信息
		static onloadedTeamListInfoComplete():void {
			console.log("TeamListInfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/team.cteamlistinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.TeamListInfoData,TeamListInfoBaseVo,"id");
			//console.log("TeamListInfo.configData:",this.TeamListInfoData);
		}
		//z光环效果配置表
		static onloadedZhenFaEffectComplete():void {
			console.log("ZhenFaEffect表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/team.czhenfaeffect.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ZhenFaEffectData,ZhenFaEffectBaseVo,"id");
			//console.log("ZhenFaEffect.configData:",this.ZhenFaEffectData);
		}

	
		//h好友赠送道具
		static onloadedFriendGiveItemComplete():void{
			console.log("FriendGiveItem表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.cfriendgiveitem.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FriendGiveItemData,FriendGiveItemBaseVo,"id");
		//	console.log("FriendGiveItem.configData:",this.FriendGiveItemData);
	}
	//h好友赠送礼物
		static onloadedFriendGiveGiftComplete():void{
			console.log("FriendGiveGift表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.cfriendgivegift.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FriendGiveGiftData,FriendGiveGiftBaseVo,"id");
		//	console.log("FriendGiveGift.configData:",this.FriendGiveGiftData);
		}
		//招募奖励
		static onloadedRecruitRewardComplete():void{
			console.log("CRecruitReward表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitreward.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.RecruitRewardData,RecruitRewardBaseVo,"id");
			//console.log("CRecruitReward.configData:",this.RecruitRewardData);
		}
		//我的招募奖励
		static onloadedMyRecruitComplete():void{
			console.log("CMyRecruit表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.cmyrecruit.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.MyRecruitData,MyRecruitBaseVo,"id");
		//	console.log("CMyRecruit.configData:",this.MyRecruitData);
		}
		//D点卡服表格/z招募点卡服/我的招募奖励点卡服
		static onloadedMyRecruitPayComplete():void{
			console.log("CMyRecruitPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.cmyrecruitpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.MyRecruitPayData,MyRecruitPayBaseVo,"id");
		//	console.log("CMyRecruitPay.configData:",this.MyRecruitPayData);
		}
		//D点卡服表格/z招募点卡服/招募奖励点卡服
		static onloadedRecruitRewardPayComplete():void{
			console.log("CRecruitRewardPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitrewardpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.RecruitRewardPayData,RecruitRewardPayBaseVo,"id");
		//	console.log("CRecruitRewardPay.configData:",this.RecruitRewardPayData);
		}
		//Z招募/招募请求地址
		static onloadedRecruitPathComplete():void{
			console.log("RecruitPath表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.crecruitpath.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.RecruitPathData,RecruitPathBaseVo,"id");
		//	console.log("RecruitPath.configData:",this.RecruitPathData);
		}
		//婚礼特效配置表
		static onloadedMarryConfComplete():void{
			console.log("MarryConf表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/friends.cmarryconf.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.MarryConfData,MarryConfBaseVo,"id");
		//	console.log("MarryConf.configData:",this.MarryConfData);
		}
		static onloadedCAwardResultConfigComplete(): void {
			console.log("CAwardResultConfig表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardresultconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cawardResultConfigData, CAwardResultConfigBaseVo, "id");
			//console.log("cawardResultModel.configData:", this.cawardResultConfigData);
		}

		static onloadedCAwardResultConfigPayComplete(): void {
			console.log("AwardResultConfigPay表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardresultconfigpay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cawardresultconfigpayData, CAwardResultConfigBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cawardresultconfigpayData);
		}

		static onloadedCAwardConfigComplete(): void {
			console.log("AwardConfig表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardConfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cawardConfigData, CAwardConfigBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cawardConfigData);
		}
		static onloadedCAwardConfigPayComplete(): void {
			console.log("AwardConfigPAY表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.cawardConfigPay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cawardConfigpayData, CAwardConfigBaseVo, "id");
		//console.log("cawardresultconfigpaModel.configData:", this.cawardConfigpayData);
		}
		//k开奖配置文件/k开奖事件表
		static onloadedCEventConfigComplete(): void {
			console.log("EventConfig表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.ceventConfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.ceventConfigData, CEventConfigBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.ceventConfigData);
		}
		//D点卡服表格/k开奖配置文件/k开奖事件表
		static onloadedCEventConfigpayComplete(): void {
			console.log("EventConfigPay表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/treasuremap.ceventConfigpay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.ceventConfigpayData, CEventConfigBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.ceventConfigpayData);
		}
		//onloadedCLoginTipsComplete
		static onloadedCLoginTipsComplete(): void {
			console.log("CLoginTips表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/login.cloginTips.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cloginTipsData, CLoginTipsBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cloginTipsData);
		}
		//onloadedCLoginTipsDianKaComplete
		static onloadedCLoginTipsDianKaComplete(): void {
			console.log("CLoginTipsDianKa表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/login.cloginTipsDianKa.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cloginTipsDianKaData, CLoginTipsBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cloginTipsDianKaData);
		}

		static onloadedCLoginImagesComplete(): void {
			console.log("CLoginImages表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/login.cloginImages.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cloginImagesData, CLoginImagesBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cloginImagesData);
		}
		//onloadedCExitgameComplete
		static onloadedCExitgameComplete(): void {
			console.log("CExitgame表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/login.cexitgame.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cexitgameData, CExitgameBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cexitgameData);
		}
		//onloadedCTriggerConditionDataComplete y隐藏剧情配置表
		static onloadedCTriggerConditionDataComplete(): void {
			console.log("CTriggerCondition表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/triggers.ctriggerCondition.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.ctriggerConditionData, CTriggerConditionBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.ctriggerConditionData);
		}
		//onloadedCNpcServiceMappingDataDataComplete
		static onloadedCNpcServiceMappingComplete(): void {
			console.log("CNpcServiceMapping表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcservicemapping.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cnpcServiceMappingData, CNpcServiceMappingBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cnpcServiceMappingData);
		}
		// onloadedCNPCConfigComplete NPC-复合/npc
		static onloadedCNPCConfigComplete(): void {
			console.log("CNPCConfigNPC-复合/npc表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cNPCConfigData, CNPCConfigBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cNPCConfigData);
		}
		static onloadedcNPCInfoComplete(): void {
			console.log("cNPCInfoNPC-复合/npc表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cNPCInfoData, CNPCInfoBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cNPCInfoData);
		}
		// cNpcChat npc对白配置
		static onloadedcNpcChatComplete(): void {
			console.log("cNPCInfoNPC-复合/npc对白配置 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcchat.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cNpcChatData, CNpcChatBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cNpcChatData);
		}
		//onloadedcNpcServerConfig
		static onloadedcNpcServerConfigComplete(): void {
			console.log("cNPCInfoNPC-复合/npc对白配置 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcserverconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cnpcServerConfigData, CNpcServerConfigBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cnpcServerConfigData);
		}
		static onloadedcMonsterConfigComplete(): void {
			console.log("cNPCInfoNPC-复合/npc对白配置 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cmonsterconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cmonsterConfigData, CMonsterConfigBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cmonsterConfigData);
		}
		static onloadedcHeroBaseInfoComplete(): void {
			console.log("CHeroBaseInfo-h伙伴系统/h伙伴信息配置表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cherobaseinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cheroBaseInfoData, CHeroBaseInfoBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cheroBaseInfoData);
		}
		//onloadedcCLuaTestComplete
		static onloadedcCLuaTestComplete(): void {
			console.log("CHeroBaseInfo-h伙伴系统/h伙伴信息配置表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cluatest.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cluaTestData, CLuaTestBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cluaTestData);
		}
		static onloadedcCNpcShapeComplete(): void {
			console.log("CHeroBaseInfo/z造型对应表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcshape.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cnpcShapeData, CNpcShapeBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cnpcShapeData);
		}
		//CNpcInAll
		static onloadedcCNpcInAllComplete(): void {
			console.log("CHeroBaseInfo/z造型对应表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcinall.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cnpcInAllData, CNpcInAllBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cnpcInAllData);
		}
		//onloadedcCSceneNPCConfigComplete
		static onloadedcCSceneNPCConfigComplete(): void {
			console.log("CSceneNPCConfig/z造型对应表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cscenenpcconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.csceneNPCConfigData, CSceneNPCConfigBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.csceneNPCConfigData);
		}
		// csceneNPCBaseData   onloadedcsceneNPCBaseComplete
		static onloadedCSceneNPCBaseComplete(): void {
			console.log("CSceneNPCConfig/z装饰NPC/z装饰npc基础信息 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cscenenpcbase.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.csceneNPCBaseData, CSceneNPCBaseBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.csceneNPCBaseData);
		}
		//onloadedCActionInfoComplete
		static onloadedCActionInfoComplete(): void {
			console.log("CActionInfo/z主角模型对照表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cactioninfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cactionInfoData, CActionInfoBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cactionInfoData);
		}
		//onloadedCrideComplete
		static onloadedCrideComplete(): void {
			console.log("CRIDE/z主角模型对照表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cnpcshape.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.crideData, CRideBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.crideData);
		}
		static onloadedCrideItemComplete(): void {
			console.log("CRideItem/z坐骑/z坐骑道具配置表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.crideitem.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.crideItemData, CRideItemBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.crideItemData);
		}
		//onloadedCLeitaiLevelComplete
		static onloadedCLeitaiLevelComplete(): void {
			console.log("CLeitaiLevel/l擂台等级分段 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cleitailevel.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cleitaiLevelData, CLeitaiLevelBaseVo, "id");
		//	console.log("cawardresultconfigpaModel.configData:", this.cleitaiLevelData);
		}
		//CJingjiRandomRoleBaseVo
		static onloadedCJingjiRandomRoleComplete(): void {
			console.log("PVP/j竞技场匹配表 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cjingjirandomrole.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cjingjiRandomRoleData, CJingjiRandomRoleBaseVo, "id");
			//console.log("cawardresultconfigpaModel.configData:", this.cjingjiRandomRoleData);
		}
		//onloadedCJingjiRandomChatComplete
		static onloadedCJingjiRandomChatComplete(): void {
			console.log("PVP/竞技场loading completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cjingjirandomchat.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cjingjiRandomChatData, CJingjiRandomChatBaseVo, "id");
		//console.log("cawardresultconfigpaModel.configData:", this.cjingjiRandomChatData);
		}
		static onloadedAnswerQuestionComplete(): void {
			console.log("AnswerQuestionData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.answerquestion.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.answerQuestionData, AnswerQuestionBaseVo, "id");
			//console.log("AnswerQuestionData:", this.answerQuestionData);
		}
		static onloadedGuideCourseLabelComplete(): void {
			console.log("GuideCourseLabelData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourselabel.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.guideCourseLabelData, GuideCourseLabelBaseVo, "id");
		//	console.log("GuideCourseLabelData:", this.guideCourseLabelData);
		}
		static onloadedGuideCoursePayComplete(): void {
			console.log("GuideCoursePayData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecoursepay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.guideCoursePayData, GuideCoursePayBaseVo, "id");
		//	console.log("GuideCoursePayData:", this.guideCoursePayData);
		}
		static onloadedGuideCourseComplete(): void {
			console.log("GuideCourseData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cguidecourse.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.guideCourseData, GuideCourseBaseVo, "id");
		//	console.log("GuideCourseData:", this.guideCourseData);
		}
		static onloadedUICongigComplete(): void {
			console.log("UICongigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cuicongig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.uiCongigData, UICongigBaseVo, "id");
		//	console.log("UICongigData:", this.uiCongigData);
		}
		static onloadedNewFunctionOpenComplete(): void {
			console.log("NewFunctionOpenData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cnewfunctionopen.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.newFunctionOpenData, NewFunctionOpenBaseVo, "id");
			//console.log("NewFunctionOpenData:", this.newFunctionOpenData);
		}
		static onloadedWeekListComplete(): void {
			console.log("WeekListData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cweeklist.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.weekListData, WeekListBaseVo, "id");
		//	console.log("WeekListData:", this.weekListData);
		}
		static onloadedActivityMapListComplete(): void {
			console.log("ActivityMapListData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitymaplist.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.activityMapListData, ActivityMapListBaseVo, "id");
		//	console.log("ActivityMapListData:", this.activityMapListData);
		}
		static onloadedActivityNewpayComplete(): void {
			console.log("ActivityNewpayData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitynewpay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.activityNewpayData, ActivityNewpayBaseVo, "id");
			//console.log("ActivityNewpayData:", this.activityNewpayData);
		}
		static onloadedActivityNewComplete(): void {
			console.log("ActivityNewData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivitynew.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.activityNewData, ActivityNewBaseVo, "id");
		//	console.log("ActivityNewData:", this.activityNewData);
		}
		static onloadedTaskNodeComplete(): void {
			console.log("TaskNodeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.ctasknode.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.taskNodeData, TaskNodeBaseVo, "id");
		//	console.log("TaskNodeData:", this.taskNodeData);
		}
		static onloadedActivityQuestionComplete(): void {
			console.log("ActivityQuestionData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivityquestion.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.activityQuestionData, ActivityQuestionBaseVo, "id");
			//console.log("ActivityQuestionData:", this.activityQuestionData);
		}
		static onloadedTikuComplete(): void {
			console.log("TikuData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.ctiku.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.tikuData, TikuBaseVo, "id");
			//console.log("TikuData:", this.tikuData);
		}
		static onloadedTasktrackingorderComplete(): void {
			console.log("TasktrackingorderData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.ctasktrackingorder.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.tasktrackingorderData, TasktrackingorderBaseVo, "id");
			//console.log("TasktrackingorderData:", this.tasktrackingorderData);
		}
		static onloadedJingyingpingjiComplete(): void {
			console.log("JingyingpingjiData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cjingyingpingji.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.jingyingpingjiData, JingyingpingjiBaseVo, "id");
			//console.log("JingyingpingjiData:", this.jingyingpingjiData);
		}
		static onloadedJingyingrenwuTaskComplete(): void {
			console.log("JingyingrenwuTaskData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cjingyingrenwutask.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.jingyingrenwuTaskData, JingyingrenwuTaskBaseVo, "id");
			//console.log("JingyingrenwuTaskData:", this.jingyingrenwuTaskData);
		}
		static onloadedJingyingConfigComplete(): void {
			console.log("JingyingConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cjingyingconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.jingyingConfigData, JingyingConfigBaseVo, "id");
		//	console.log("JingyingConfigData:", this.jingyingConfigData);
		}
		static onloadedPointCardActiveGiftBoxComplete(): void {
			console.log("PointCardActiveGiftBoxData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cpointcardactivegiftbox.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.pointCardActiveGiftBoxData, ActiveGiftBoxBaseVo, "id");
			//console.log("PointCardActiveGiftBoxData:", this.pointCardActiveGiftBoxData);
		}
		static onloadedActiveGiftBoxComplete(): void {
			console.log("ActiveGiftBoxData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cactivegiftbox.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.activeGiftBoxData, ActiveGiftBoxBaseVo, "id");
			//console.log("ActiveGiftBoxData:", this.activeGiftBoxData);
		}
		static onloadedArrowEffectSimpComplete(): void {
			console.log("ArrowEffectSimpData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.carroweffectsimp.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.arrowEffectSimpData, ArrowEffectSimpBaseVo, "id");
			//console.log("ArrowEffectSimpData:", this.arrowEffectSimpData);
		}
		static onloadedArrowEffectComplete(): void {
			console.log("ArrowEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.carroweffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.arrowEffectData, ArrowEffectBaseVo, "id");
			//console.log("ArrowEffectData:", this.arrowEffectData);
		}
		static onloadedAcceptableTaskComplete(): void {
			console.log("AcceptableTaskData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cacceptabletask.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.acceptableTaskData, AcceptableTaskBaseVo, "id");
			//console.log("AcceptableTaskData:", this.acceptableTaskData);
		}
		static onloadedShiGuangZhiXueConfigComplete(): void {
			console.log("ShiGuangZhiXueConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/mission.cshiguangzhixueconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.shiGuangZhiXueConfigData, ShiGuangZhiXueConfigBaseVo, "id");
		//	console.log("ShiGuangZhiXueConfigData:", this.shiGuangZhiXueConfigData);
		}
		static onloadedInheritCostComplete(): void {
			console.log("InheritCostData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cinheritcost.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.inheritCostData, InheritCostBaseVo, "id");
		//	console.log("InheritCostData:", this.inheritCostData);
		}
		static onloadedHuanhuaUseComplete(): void {
			console.log("HuanhuaUseData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuause.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.huanhuaUseData, HuanhuaUseBaseVo, "id");
			//console.log("HuanhuaUseData:", this.huanhuaUseData);
		}
		static onloadedHuanhuaInfoComplete(): void {
			console.log("HuanhuaInfoData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.chuanhuainfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.huanhuaInfoData, HuanhuaInfoBaseVo, "id");
			//console.log("HuanhuaInfoData:", this.huanhuaInfoData);
		}
		static onloadedPracticeItemExpComplete(): void {
			console.log("PracticeItemExpData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpracticeitemexp.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.practiceItemExpData, PracticeItemExpBaseVo, "id");
			//console.log("PracticeItemExpData:", this.practiceItemExpData);
		}
		static onloadedPointCardParticeSkillLevelupComplete(): void {
			console.log("PointCardParticeSkillLevelupData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpointcardparticeskilllevelup.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.pointCardParticeSkillLevelupData, PointCardParticeSkillLevelupBaseVo, "id");
		//	console.log("PointCardParticeSkillLevelupData:", this.pointCardParticeSkillLevelupData);
		}
		static onloadedParticeSkillLevelupComplete(): void {
			console.log("LifeSkillCostPayData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cparticeskilllevelup.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.particeSkillLevelupData, ParticeSkillLevelupBaseVo, "id");
		//	console.log("ParticeSkillLevelupData:", this.particeSkillLevelupData);
		}
		static onloadedLifeSkillCostPayComplete(): void {
			console.log("LifeSkillCostPayData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskillcostpay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.lifeSkillCostPayData, LifeSkillCostPayBaseVo, "id");
		//	console.log("LifeSkillCostPayData:", this.lifeSkillCostPayData);
		}
		static onloadedLifeSkillCostComplete(): void {
			console.log("LifeSkillCostData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskillcost.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.lifeSkillCostData, LifeSkillCostBaseVo, "id");
		//	console.log("LifeSkillCostData:", this.lifeSkillCostData);
		}
		static onloadedLifeSkillComplete(): void {
			console.log("LifeSkillData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.clifeskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.lifeSkillData, LifeSkillBaseVo, "id");
		//	console.log("LifeSkillData:", this.lifeSkillData);
		}
		static onloadedSkillConfigComplete(): void {
			console.log("SkillConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskillconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.skillConfigData, SkillConfigBaseVo, "id");
		//	console.log("SkillConfigData:", this.skillConfigData);
		}
		static onloadedSkillTypeConfigComplete(): void {
			console.log("SkillTypeConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskilltypeconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.skillTypeConfigData, SkillTypeConfigBaseVo, "id");
		//	console.log("SkillTypeConfigData:", this.skillTypeConfigData);
		}
		static onloadedSBLevelLimitComplete(): void {
			console.log("SBLevelLimitData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.csblevellimit.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.sbLevelLimitData, SBLevelLimitBaseVo, "id");
		//	console.log("SBLevelLimitData:", this.sbLevelLimitData);
		}
		static onloadedPetSkillConfigComplete(): void {
			console.log("PetSkillConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petSkillConfigData, PetSkillConfigBaseVo, "id");
		//	console.log("PetSkillConfigData:", this.petSkillConfigData);
		}
		static onloadedSchoolSkillComplete(): void {
			console.log("SchoolSkillData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cschoolskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.schoolSkillData, SchoolSkillBaseVo, "id");
		//	console.log("SchoolSkillData:", this.schoolSkillData);
		}
		static onloadedSkillitemComplete(): void {
			console.log("SkillitemData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cskillitem.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.skillitemData, SkillitemBaseVo, "id");
		//	console.log("SkillitemData:", this.skillitemData);
		}
		static onloadedPetSkillEffectComplete(): void {
			console.log("PetSkillEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskilleffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petSkillEffectData, PetSkillEffectBaseVo, "id");
			//console.log("PetSkillEffectData:", this.petSkillEffectData);
		}
		static onloadedPetSkillupgradeComplete(): void {
			console.log("PetSkillupgradeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cpetskillupgrade.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petSkillupgradeData, PetSkillupgradeBaseVo, "id");
		//	console.log("PetSkillupgradeData:", this.petSkillupgradeData);
		}
		static onloadedSchoolSkillitemComplete(): void {
			console.log("SchoolSkillitemData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cschoolskillitem.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.schoolSkillitemData, SchoolSkillitemBaseVo, "id");
		//	console.log("SchoolSkillitemData:", this.schoolSkillitemData);
		}
		static onloadedEquipSkillInfoComplete(): void {
			console.log("EquipSkillInfoData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cequipskillinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipSkillInfoData, EquipSkillInfoBaseVo, "id");
		//	console.log("EquipSkillInfoData:", this.equipSkillInfoData);
		}
		static onloadedEquipSkillComplete(): void {
			console.log("EquipSkillData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cequipskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipSkillData, EquipSkillBaseVo, "id");
		//	console.log("EquipSkillData:", this.equipSkillData);
		}
		static onloadedFriendSkillComplete(): void {
			console.log("FriendSkillData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/skill.cfriendskill.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.friendSkillData, FriendSkillBaseVo, "id");
		//	console.log("FriendSkillData:", this.friendSkillData);
		}
		static onloadedExpFactorItemInfoComplete(): void {
			console.log("ExpFactorItemInfoData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cexpfactoriteminfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.expFactorItemInfoData, ExpFactorItemInfoBaseVo, "id");
		//	console.log("ExpFactorItemInfoData:", this.expFactorItemInfoData);
		}
		static onloadedEquipRefineSkillInfo_PointCardComplete(): void {
			console.log("EquipRefineSkillInfo_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineskillinfo_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipRefineSkillInfo_PointCardData, EquipRefineSkillInfo_PointCardBaseVo, "id");
			//console.log("EquipRefineSkillInfo_PointCardData:", this.equipRefineSkillInfo_PointCardData);
		}
		static onloadedEquipRefineSkillInfoDataComplete(): void {
			console.log("EquipRefineInfo_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineskillinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipRefineSkillInfoData, EquipRefineSkillInfoBaseVo, "id");
			//console.log("EquipRefineSkillInfoData:", this.equipRefineSkillInfoData);
		}
		static onloadedEquipRefineInfo_PointCardComplete(): void {
			console.log("EquipRefineInfo_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineinfo_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipRefineInfo_PointCardData, EquipRefineInfo_PointCardBaseVo, "id");
		//	console.log("EquipRefineInfo_PointCardData:", this.equipRefineInfo_PointCardData);
		}
		static onloadedEquipRefineInfoComplete(): void {
			console.log("EquipRefineInfoData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequiprefineinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipRefineInfoData, EquipRefineInfoBaseVo, "id");
		//	console.log("EquipRefineInfoData:", this.equipRefineInfoData);
		}
		static onloadedDashiSpaceGiftComplete(): void {
			console.log("DashiSpaceGiftData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cdashispacegift.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.dashiSpaceGiftData, DashiSpaceGiftBaseVo, "id");
		//	console.log("DashiSpaceGiftData:", this.dashiSpaceGiftData);
		}
		static onloadedFumoEffectFormulaComplete(): void {
			console.log("FumoEffectFormulaData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfumoeffectformula.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.fumoEffectFormulaData, FumoEffectFormulaBaseVo, "id");
		//	console.log("FumoEffectFormulaData:", this.fumoEffectFormulaData);
		}
		static onloadedFoodAndDrugFormulaComplete(): void {
			console.log("FoodAndDrugFormulaData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugformula.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.foodAndDrugFormulaData, FoodAndDrugFormulaBaseVo, "id");
		//	console.log("FoodAndDrugFormulaData:", this.foodAndDrugFormulaData);
		}
		static onloadedComeFromComplete(): void {
			console.log("ComeFromData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.ccomefrom.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.comeFromData, ComeFromBaseVo, "id");
			//console.log("ComeFromData:", this.comeFromData);
		}
		static onloadedEquipPosNameComplete(): void {
			console.log("EquipPosNameData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipposname.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipPosNameData, EquipPosNameBaseVo, "id");
			//console.log("EquipPosNameData:", this.equipPosNameData);
		}
		static onloadedItemToItemComplete(): void {
			console.log("ItemToItemData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtoitem.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itemToItemData, ItemToItemBaseVo, "id");
			//console.log("ItemToItemData:", this.itemToItemData);
		}
		static onloadedBagTableComplete(): void {
			console.log("BagTableData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cbagtable.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.bagTableData, BagTableBaseVo, "id");
			//console.log("BagTableData:", this.bagTableData);
		}
		static onloadedDepottableComplete(): void {
			console.log("DepottableData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cdepottable.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.depottableData, DepottableBaseVo, "id");
		//	console.log("DepottableData:", this.depottableData);
		}
		static onloadedItemUseTipComplete(): void {
			console.log("ItemUseTipData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemusetip.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itemUseTipData, ItemUseTipBaseVo, "id");
			//console.log("ItemUseTipData:", this.itemUseTipData);
		}
		static onloadedDcequipCombinComplete(): void {
			console.log("DcEquipCombinData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.dcequipcombin.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.dcequipCombinData, EquipCombinBaseVo, "id");
			//console.log("DcEquipCombinData:", this.dcequipCombinData);
		}
		static onloadedCequipCombinComplete(): void {
			console.log("cEquipCombinBaseVo表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipcombin.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.cequipCombinData, EquipCombinBaseVo, "id");
			//console.log("cEquipCombinBaseVo:", this.cequipCombinData);
		}
		static onloadedPetEquipHeChengComplete(): void {
			console.log("PetEquipHeChengData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequiphecheng.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petEquipHeChengData, PetEquipHeChengBaseVo, "id");
			//console.log("PetEquipHeChengData:", this.petEquipHeChengData);
		}
		static onloadedPetEquipSuitBuffComplete(): void {
			console.log("PetEquipSuitBuffData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetequipsuitbuff.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petEquipSuitBuffData, PetEquipSuitBuffBaseVo, "id");
		//	console.log("PetEquipSuitBuffData:", this.petEquipSuitBuffData);
		}
		static onloadedonlinegiftComplete(): void {
			console.log("OnLineGiftData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.conlinegift.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.onLineGiftData, OnLineGiftBaseVo, "id");
		//	console.log("OnLineGiftData:", this.onLineGiftData);
		}
		static onloadedItemTypeNameListComplete(): void {
			console.log("ItemTypeNameListData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtypenamelist.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itemTypeNameListData, ItemTypeNameListBaseVo, "id");
		//	console.log("ItemTypeNameListData:", this.itemTypeNameListData);
		}
		static onloadedPresentConfigPayComplete(): void {
			console.log("PresentConfigPayData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpresentconfigpay.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.presentConfigPayData, PresentConfigPayBaseVo, "id");
		//	console.log("PresentConfigPayData:", this.presentConfigPayData);
		}
		static onloadedPresentConfigComplete(): void {
			console.log("PresentConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpresentconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.presentConfigData, PresentConfigBaseVo, "id");
		//	console.log("PresentConfigData:", this.presentConfigData);
		}
		static onloadedItemBuffComplete(): void {
			console.log("ItemBuffData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citembuff.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itemBuffData, ItemBuffBaseVo, "id");
		//	console.log("ItemBuffData:", this.itemBuffData);
		}
		static onloadedPointCardEquipGemComplete(): void {
			console.log("PointCardEquipGemData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpointcardequipgem.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.pointCardEquipGemData, PointCardEquipGemBaseVo, "id");
	//		console.log("PointCardEquipGemData:", this.pointCardEquipGemData);
		}
		static onloadedEquipItemAttr_PointCardComplete(): void {
			console.log("EquipItemAttrData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipitemattr_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipItemAttr_PointCardData, EquipItemAttr_PointCardBaseVo, "id");
		//	console.log("EquipItemAttr_PointCardData:", this.equipItemAttr_PointCardData);
		}
		static onloadedEquipItemAttrComplete(): void {
			console.log("EquipItemAttrData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipitemattr.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipItemAttrData, EquipItemAttrBaseVo, "id");
		//	console.log("EquipItemAttrData:", this.equipItemAttrData);
		}
		static onloadedTaskRelative_PointCardComplete(): void {
			console.log("TaskRelative_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.ctaskrelative_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.taskRelative_PointCardData, TaskRelative_PointCardBaseVo, "id");
		//	console.log("TaskRelative_PointCardData:", this.taskRelative_PointCardData);
		}
		static onloadedTaskRelativeComplete(): void {
			console.log("TaskRelativeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.ctaskrelative.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.taskRelativeData, TaskRelativeBaseVo, "id");
		//	console.log("TaskRelativeData:", this.taskRelativeData);
		}
		static onloadedEquipEffect_PointCardComplete(): void {
			console.log("EquipEffect_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipeffect_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipEffect_PointCardData, EquipEffect_PointCardBaseVo, "id");
		//	console.log("EquipEffect_PointCardData:", this.equipEffect_PointCardData);
		}
		static onloadedEquipEffectComplete(): void {
			console.log("EquipEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipEffectData, EquipEffectBaseVo, "id");
		//	console.log("EquipEffectData:", this.equipEffectData);
		}
		static onloadedGroceryEffect_PointCardComplete(): void {
			console.log("GroceryEffect_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgroceryeffect_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.groceryEffect_PointCardData, GroceryEffect_PointCardBaseVo, "id");
		//	console.log("GroceryEffect_PointCardData:", this.groceryEffect_PointCardData);
		}
		static onloadedGroceryEffectComplete(): void {
			console.log("GroceryEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgroceryeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.groceryEffectData, GroceryEffectBaseVo, "id");
		//	console.log("GroceryEffectData:", this.groceryEffectData);
		}
		static onloadedGemTypeComplete(): void {
			console.log("GemTypeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemtype.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.gemTypeData, GemTypeBaseVo, "id");
		//	console.log("GemTypeData:", this.gemTypeData);
		}
		static onloadedGemEffect_PointCardComplete(): void {
			console.log("GemEffect_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemeffect_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.gemEffect_PointCardData, GemEffect_PointCardBaseVo, "id");
		//	console.log("GemEffect_PointCardData:", this.gemEffect_PointCardData);
		}
		static onloadedGemEffectComplete(): void {
			console.log("GemEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cgemeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.gemEffectData, GemEffectBaseVo, "id");
			//console.log("GemEffectData:", this.gemEffectData);
		}
		static onloadedItembuffidsComplete(): void {
			console.log("ItembuffidsData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citembuffids.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itembuffidsData, ItembuffidsBaseVo, "id");
			//console.log("ItembuffidsData:", this.itembuffidsData);
		}
		static onloadedFoodAndDrugEffect_PointCardComplete(): void {
			console.log("FoodAndDrugEffect_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugeffect_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.foodAndDrugEffect_PointCardData, FoodAndDrugEffect_PointCardBaseVo, "id");
		//	console.log("FoodAndDrugEffect_PointCardData:", this.foodAndDrugEffect_PointCardData);
		}
		static onloadedFightDrugTypeComplete(): void {
			console.log("FightDrugTypeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfightdrugtype.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.fightDrugTypeData, FightDrugTypeBaseVo, "id");
			//console.log("FightDrugTypeData:", this.fightDrugTypeData);
		}
		static onloadedFoodAndDrugEffectComplete(): void {
			console.log("FoodAndDrugEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cfoodanddrugeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.foodAndDrugEffectData, FoodAndDrugEffectBaseVo, "id");
		//console.log("FoodAndDrugEffectData:", this.foodAndDrugEffectData);
		}
		static onloadedPetItemEffect_PointCardtComplete(): void {
			console.log("PetItemEffect_PointCardData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetitemeffect_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petItemEffect_PointCardData, PetItemEffect_PointCardBaseVo, "id");
		//	console.log("PetItemEffect_PointCardData:", this.petItemEffect_PointCardData);
		}
		static onloadedPetItemEffectComplete(): void {
			console.log("PetItemEffectData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cpetitemeffect.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.petItemEffectData, PetItemEffectBaseVo, "id");
		//	console.log("PetItemEffectData:", this.petItemEffectData);
		}
		static onloadedEquipMakeInfoComplete(): void {
			console.log("EquipMakeInfoData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipmakeinfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipMakeInfoData, EquipMakeInfoBaseVo, "id");
		//	console.log("EquipMakeInfoData:", this.equipMakeInfoData);
		}
		static onloadedItemTypeComplete(): void {
			console.log("ItemTypeData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemtype.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itemTypeData, ItemTypeBaseVo, "id");
			//console.log("ItemTypeData:", this.itemTypeData);
		}
		static onloadedAttributeDesConfigComplete(): void {
			console.log("AttributeDesConfigData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cattributedesconfig.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.attributeDesConfigData, AttributeDesConfigBaseVo, "id");
			//console.log("AttributeDesConfigData:", this.attributeDesConfigData);
		}
		static onloadedEquipAddattributerandomlibComplete(): void {
			console.log("EquipAddattributerandomlibData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipaddattributerandomlib.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipAddattributerandomlibData, EquipAddattributerandomlibBaseVo, "id");
		//	console.log("EquipAddattributerandomlibData:", this.equipAddattributerandomlibData);
		}
		static onloadedEquipAddattributelibComplete(): void {
			console.log("EquipAddattributelibData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipaddattributelib.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipAddattributelibData, EquipAddattributelibBaseVo, "id");
		//	console.log("EquipAddattributelibData:", this.equipAddattributelibData);
		}
		static onloadedEquipIteminfoComplete(): void {
			console.log("EquipIteminfoData表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.cequipiteminfo.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.equipIteminfoData, EquipIteminfoBaseVo, "id");
		//	console.log("EquipIteminfoData:", this.equipIteminfoData);
		}
		static onloadedItemAttr_PointCardComplete(): void {
			console.log("ItemAttr_PointCard表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemattr_pointcard.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			ByteArrayUtils.FillList(data, size, this.itemAttr_PointCardData, ItemAttr_PointCardBaseVo, "id");
			//console.log("Itemattr_PointCardData:", this.itemAttr_PointCardData);
		}
		static onloadedItemAttrComplete(): void {
			console.log("ItemAttr表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/item.citemattr.bin");
			var data: Byte = new Byte(arrayBuffer);
			var size: number = this.readDataHead(data);
			//ByteArrayUtils.FillList(data, size, this.itemAttrData, ItemAttrBaseVo, "id");
			//console.log("ItemattrData:", this.itemAttrData);
		}




	/**
		* @Author: LinQiuWen
		* @description:onLoad函数
		*/

		//SchoolInfo
		static onloadedSchoolInfoComplete(): void {
			console.log("SchoolInfo表格加载完毕 completed");
			var arrayBuffer: ArrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.schoolInfoData,SchoolInfoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.schoolInfoData);	
		}

		//CreateRoleConfig
		static onloadedCreateRoleConfigComplete():void {
			console.log("CreateRoleConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.createroleconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.createRoleConfigData,CreateRoleConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.createRoleConfigData);
		}

		//AttrModData
		static onloadedAttrModDataComplete():void {
			console.log("attrModData表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cattrmoddata.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.attrModData,AttrModDataBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.attrModData);
		}

		// //resMoneyConfig
		static onloadedResMoneyConfigComplete():void {
			console.log("resMoneyConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cresmoneyconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.resMoneyConfigData,ResMoneyConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.resMoneyConfigData);
		}

		//SchoolMasterSkillInfo
		static onloadedSchoolMasterSkillInfoComplete():void {
			console.log("SchoolMasterSkillInfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.schoolmasterskillinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.schoolMasterSkillInfoData,SchoolMasterSkillInfoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.schoolMasterSkillInfoData);
		}

		//AcupointInfoBaseVo
		static onloadedAcupointInfoComplete():void {
			console.log("AcupointInfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.acupointInfoData,AcupointInfoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.acupointInfoData);
		}

		// AcupointLevelUpBaseVo
		static onloadedAcupointLevelUpComplete():void {
			console.log("AcupointLevelUp表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointlevelup.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.acupointLevelUpData,AcupointLevelUpBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.acupointLevelUpData);
		}

		// AcupointLevelUpPayBaseVo
		static onloadedAcupointLevelUpPayComplete():void {
			console.log("AcupointLevelUpPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.acupointleveluppay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.acupointLevelUpPayData,AcupointLevelUpPayBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.acupointLevelUpPayData);
		}

		SkillAcupointConfigBaseVo
		static onloadedSkillAcupointConfigComplete():void {
			console.log("SkillAcupointConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.skillacupointconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.skillAcupointConfigData,SkillAcupointConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.skillAcupointConfigData);
		}

		SkillInfoConfigBaseVo
		static onloadedSkillInfoConfigComplete():void {
			console.log("SkillInfoConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.skillinfoconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.skillInfoConfigData,SkillInfoConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.skillInfoConfigData);
		}

		CaddpointchangeBaseVo
		static onloadedCaddpointchangeComplete():void {
			console.log("Caddpointchange表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointchange.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.caddpointchangeData,CaddpointchangeBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.caddpointchangeData);
		}

		// AddPointResetItemConfigBaseVo
		static onloadedAddPointResetItemConfigComplete():void {
			console.log("AddPointResetItemConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.caddpointresetitemconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.addPointResetItemConfigData,AddPointResetItemConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.addPointResetItemConfigData);
		}

		static onloadedEquipEffectConfigComplete():void {
			console.log("EquipEffectConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cequipeffectconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.equipEffectConfigData,EquipEffectConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.equipEffectConfigData);
		}

		// ServiceLevelConfigBaseVo
		static onloadedServiceLevelConfigComplete():void {
			console.log("ServiceLevelConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cservicelevelconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.serviceLevelConfigData,ServiceLevelConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.serviceLevelConfigData);
		}

		// ServiceExpConfigBaseVo
		static onloadedServiceExpConfigComplete():void {
			console.log("ServiceExpConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/role.cserviceexpconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.serviceExpConfigData,ServiceExpConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.serviceExpConfigData);
		}

		/**game.xml */
		ThreePvpWhiteMenuBaseVo
		static onloadedThreePvpWhiteMenuComplete():void {
			console.log("ThreePvpWhiteMenu表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.threepvpwhitemenu.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.threePvpWhiteMenuData,ThreePvpWhiteMenuBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.threePvpWhiteMenuData);
		}

		CloginawardBaseVo
		static onloadedCloginawardComplete():void {
			console.log("Cloginaward表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cloginaward.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cloginawardData,CloginawardBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cloginawardData);
		}

		BindTelAwardBaseVo
		static onloadedBindTelAwardComplete():void {
			console.log("CBindTelAward表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cbindtelaward.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.bindTelAwardData,BindTelAwardBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.bindTelAwardData);
		}

		//PointCardBindTelAwardBaseVo
		static onloadedPointCardBindTelAwardComplete():void {
			console.log("PointCardBindTelAward表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cpointcardbindtelaward.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.pointCardBindTelAwardData,PointCardBindTelAwardBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.pointCardBindTelAwardData);
		}
		
		//WisdomTrialVillBaseVo
		static onloadedWisdomTrialVillComplete():void {
			console.log("WisdomTrialVill表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialvill.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.wisdomTrialVillData,WisdomTrialVillBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.wisdomTrialVillData);
		}

		// WisdomTrialState
		static onloadedWisdomTrialStateComplete():void {
			console.log("WisdomTrialState表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialstate.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.wisdomTrialStateData,WisdomTrialVillBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.wisdomTrialStateData);
		}

		// WisdomTrialVillPay
		static onloadedWisdomTrialVillPayComplete():void {
			console.log("WisdomTrialVillPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialvillpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.wisdomTrialVillPayData,WisdomTrialVillBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.wisdomTrialVillPayData);
		}	

		// WisdomTrialProvPay
		static onloadedWisdomTrialProvPayComplete():void {
			console.log("WisdomTrialProvPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialprovpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.wisdomTrialProvPayData,WisdomTrialVillBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.wisdomTrialProvPayData);
		}

		// WisdomTrialStatePay
		static onloadedWisdomTrialStatePayComplete():void {
			console.log("WisdomTrialStatePay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.wisdomtrialstatepay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.wisdomTrialStatePayData,WisdomTrialVillBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.wisdomTrialStatePayData);
		}

		// CActivityAwardBaseVo
		static onloadedActivityAwardComplete():void {
			console.log("CActivityAward表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cactivityaward.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.activityAwardBaseVoData,ActivityAwardBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.activityAwardBaseVoData);
		}

		// CshouchonglibaoBaseVo
		static onloadedCshouchonglibaoComplete():void {
			console.log("Cshouchonglibao表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cshouchonglibao.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cshouchonglibaoData,CshouchonglibaoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cshouchonglibaoData);
		}

		// Cshouchonglibaopay
		static onloadedCshouchonglibaopayComplete():void {
			console.log("Cshouchonglibaopay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cshouchonglibaopay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cshouchonglibaopayData,CshouchonglibaoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cshouchonglibaopayData);
		}

		// CqiandaojiangliBaseVo
		static onloadedCqiandaojiangliComplete():void {
			console.log("Cqiandaojiangli表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cqiandaojiangli.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cqiandaojiangliData,CqiandaojiangliBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cqiandaojiangliData);
		}

		// CpaihangbangBaseVo
		static onloadedCpaihangbangComplete():void {
			console.log("Cpaihangbang表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cpaihangbang.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cpaihangbangData,CpaihangbangBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cpaihangbangData);
		}

		// CDeathNoteBaseVo
		static onloadedCDeathNoteComplete():void {
			console.log("CDeathNote表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cdeathnote.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cdeathNoteData,CDeathNoteBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cdeathNoteData);
		}

		// CNotifyConfigBaseVo
		static onloadedCNotifyConfigComplete():void {
			console.log("CNotifyConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cnotifyconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cnotifyConfigData,CNotifyConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cnotifyConfigData);
		}

		// CSchoolWheelBaseVo
		static onloadedCSchoolWheelComplete():void {
			console.log("CSchoolWheel表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cschoolwheel.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cschoolWheelData,CSchoolWheelBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cschoolWheelData);
		}

		// CShareConfigBaseVo
		static onloadedCShareConfigComplete():void {
			console.log("CShareConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cshareconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cshareConfigData,CShareConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cshareConfigData);
		}

		// CShareConfigPay
		static onloadedCShareConfigPayComplete():void {
			console.log("CShareConfigPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cshareconfigpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cshareConfigPayData,CShareConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cshareConfigPayData);
		}

		// CWinFrameSizeBaseVo
		static onloadedCWinFrameSizeComplete():void {
			console.log("CWinFrameSize表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cwinframesize.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cwinFrameSizeData,CWinFrameSizeBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cwinFrameSizeData);
		}

		// CTTInfoBaseVo
		static onloadedCTTInfoComplete():void {
			console.log("CTTInfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cttinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cTTInfoData,CTTInfoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cTTInfoData);
		}

		// CTTInfoDK
		static onloadedCTTInfoDKComplete():void {
			console.log("CTTInfoDK表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cttinfodk.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cTTInfoDKData,CTTInfoBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cTTInfoDKData);
		}

		static onloadedCChangeSchoolCostComplete():void {
			console.log("CChangeSchoolCost表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cchangeschoolcost.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cChangeSchoolCostData,CChangeSchoolCostBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cChangeSchoolCostData);
		}

		/**circletask */
		// CSpecialQuestConfigBaseVo
		static onloadedCSpecialQuestConfigComplete():void {
			console.log("CSpecialQuestConfig表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cspecialquestconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cSpecialQuestConfigData,CSpecialQuestConfigBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cSpecialQuestConfigData);
		}

		// CSchoolTaskBaseVo
		static onloadedCSchoolTaskComplete():void {
			console.log("CSchoolTask表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cschooltask.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cSchoolTaskData,CSchoolTaskBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cSchoolTaskData);
		}

		// CSchoolUseItemBaseVo
		static onloadedCSchoolUseItemComplete():void {
			console.log("CSchoolUseItem表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cschooluseitem.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cSchoolUseItemData,CSchoolUseItemBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cSchoolUseItemData);
		}

		// CCircTaskItemCollectBaseVo
		static onloadedCCircTaskItemCollectComplete():void {
			console.log("CCircTaskItemCollect表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cCircTaskItemCollect.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCircTaskItemCollectData,CCircTaskItemCollectBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCircTaskItemCollectData);
		}

		// CRepeatTaskBaseVo
		static onloadedCRepeatTaskComplete():void {
			console.log("CRepeatTask表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattask.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cRepeatTaskData,CRepeatTaskBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cRepeatTaskData);
		}

		// CRepeatTaskChatBaseVo
		static onloadedCRepeatTaskChatComplete():void {
			console.log("CRepeatTaskChat表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crepeattaskchat.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cRepeatTaskChatData,CRepeatTaskChatBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cRepeatTaskChatData);
		}

		// CCircTaskItemFindBaseVo
		static onloadedCCircTaskItemFindComplete():void {
			console.log("CCircTaskItemFind表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskitemfind.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCircTaskItemFindData,CCircTaskItemFindBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCircTaskItemFindData);
		}

		// CCircTaskPatrolBaseVo
		static onloadedCCircTaskPatrolComplete():void {
			console.log("CCircTaskPatrol表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskpatrol.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCircTaskPatrolData,CCircTaskPatrolBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCircTaskPatrolData);
		}

		// CCircTaskPetCatchBaseVo
		static onloadedCCircTaskPetCatchComplete():void {
			console.log("CCircTaskPetCatch表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.ccirctaskpetcatch.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCircTaskPetCatchData,CCircTaskPetCatchBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCircTaskPetCatchData);
		}

		// CRenXingCircTaskCostBaseVo
		static onloadedCRenXingCircTaskCostComplete():void {
			console.log("CRenXingCircTaskCost表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.crenxingcirctaskcost.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cRenXingCircTaskCostData,CRenXingCircTaskCostBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cRenXingCircTaskCostData);
		}

		// CFubenTaskBaseVo
		static onloadedCFubenTaskComplete():void {
			console.log("CFubenTask表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.cfubentask.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cFubenTaskData,CFubenTaskBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cFubenTaskData);
		}

		// CAnYeMaXiTuanConfBaseVo
		static onloadedCAnYeMaXiTuanConfComplete():void {
			console.log("CAnYeMaXiTuanConf表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/circletask.canyemaxituanconf.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cAnYeMaXiTuanConfData,CAnYeMaXiTuanConfBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cAnYeMaXiTuanConfData);
		}

		// CGoodsBaseVo
		static onloadedCGoodsComplete():void {
			console.log("CGoods表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cgoods.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cGoodsData,CGoodsBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cGoodsData);
		}

		// DCGoodsBaseVo
		static onloadedDCGoodsComplete():void {
			console.log("DCGoods表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcgoods.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCGoodsData,DCGoodsBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCGoodsData);
		}

		// CMallShopBaseVo
		static onloadedCMallShopComplete():void {
			console.log("CMallShop表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmallshop.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cMallShopData,CMallShopBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cMallShopData);
		}

		// DCMallShopBaseVo
		static onloadedDCMallShopComplete():void {
			console.log("DCMallShop表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmallshop.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCMallShopData,DCMallShopBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCMallShopData);
		}

		// CPetShopBaseVo
		static onloadedCPetShopComplete():void {
			console.log("CPetShop表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cpetshop.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cPetShopData,CPetShopBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cPetShopData);
		}

		// CNpcSaleBaseVo
		static onloadedCNpcSaleComplete():void {
			console.log("CNpcSale表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cnpcsale.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cNpcSaleData,CNpcSaleBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cNpcSaleData);
		}

		// dCNpcSale集成CNpcSaleBaseVo
		// DCNpcSale
		static onloadedDCNpcSaleComplete():void {
			console.log("DCNpcSale表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcnpcsale.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCNpcSaleData,CNpcSaleBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCNpcSaleData);
		}

		// CCurrencyIconPathBaseVo
		static onloadedCCurrencyIconPathComplete():void {
			console.log("CCurrencyIconPath表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccurrencyiconpath.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCurrencyIconPathData,CCurrencyIconPathBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCurrencyIconPathData);
		}

		// CCommerceFirstMenu
		static onloadedCCommerceFirstMenuComplete():void {
			console.log("CCommerceFirstMenu表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercefirstmenu.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCommerceFirstMenuData,CCommerceFirstMenuBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCommerceFirstMenuData);
		}

		// dCCommerceFirstMenu		
		static onloadedDCCommerceFirstMenuComplete():void {
			console.log("dCCommerceFirstMenu表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dccommercefirstmenu.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCCommerceFirstMenuData,CCommerceFirstMenuBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCCommerceFirstMenuData);
		}

		// CCommerceSecondMenu
		static onloadedCCommerceSecondMenuComplete():void {
			console.log("CCommerceSecondMenu表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.ccommercesecondmenu.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cCommerceSecondMenuData,CCommerceSecondMenuBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cCommerceSecondMenuData);
		}

		// DCCommerceSecondMenu
		static onloadedDCCommerceSecondMenuComplete():void {
			console.log("DCCommerceSecondMenu表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dccommercesecondmenu.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCCommerceSecondMenuData,CCommerceSecondMenuBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCCommerceSecondMenuData);
		}

		// CMarketFirstTable
		static onloadedCMarketFirstTableComplete():void {
			console.log("CMarketFirstTable表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketfirsttable.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cMarketFirstTableData,CMarketFirstTableBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cMarketFirstTableData);
		}
		// DCMarketFirstTable
		static onloadedDCMarketFirstTableComplete():void {
			console.log("DCMarketFirstTable表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmarketfirsttable.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCMarketFirstTableData,CMarketFirstTableBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCMarketFirstTableData);
		}

		// CMarketSecondTable
		static onloadedCMarketSecondTableComplete():void {
			console.log("CMarketSecondTable表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketsecondtable.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cMarketSecondTableData,CMarketSecondTableBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cMarketSecondTableData);
		}
		// DCMarketSecondTable
		static onloadedDCMarketSecondTableComplete():void {
			console.log("DCMarketSecondTable表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmarketsecondtable.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCMarketSecondTableData,CMarketSecondTableBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCMarketSecondTableData);
		}

		// CMarketThreeTableBaseVo
		static onloadedCMarketThreeTableComplete():void {
			console.log("CMarketThreeTable表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmarketthreetable.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cMarketThreeTableData,CMarketThreeTableBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cMarketThreeTableData);
		}

		// DCMarketThreeTable
		static onloadedDCMarketThreeTableComplete():void {
			console.log("DCMarketThreeTable表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmarketthreetable.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCMarketThreeTableData,CMarketThreeTableBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCMarketThreeTableData);
		}

		// CQuickBuy
		static onloadedCQuickBuyComplete():void {
			console.log("CQuickBuy表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cquickbuy.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cQuickBuyData,CQuickBuyBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cQuickBuyData);
		}

		// CQuickBuyPay
		static onloadedCQuickBuyPayComplete():void {
			console.log("CQuickBuyPay表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cquickbuypay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cQuickBuyPayData,CQuickBuyBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cQuickBuyPayData);
		}

		// CShenShouShop
		static onloadedCShenShouShopComplete():void {
			console.log("CShenShouShop表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cshenshoushop.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cShenShouShopData,CShenShouShopBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cShenShouShopData);
		}

		static onloadedCMallShopTabNameComplete():void {
			console.log("CMallShopTabName表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.cmallshoptabname.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.cMallShopTabNameData,CMallShopTabNameBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.cMallShopTabNameData);
		}

		// DCMallShopTabName
		static onloadedDCMallShopTabNameComplete():void {
			console.log("DCMallShopTabName表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/shop.dcmallshoptabname.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.dCMallShopTabNameData,CMallShopTabNameBaseVo,"id");
			console.log("RoleRColorModel.configData:",this.dCMallShopTabNameData);
		}

		//ljm
		//c充值配置表
		static onloadedAddCashluaComplete():void {
			console.log("AddCashlua表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.caddcashlua.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.AddCashluaData,AddCashluaBaseVo,"id");
			console.log("AddCashlua.configData:",this.AddCashluaData);
		}
		//c充值配置表/點卡服
		static onloadedAddCashluaComplete1():void {
			console.log("AddCashlua表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.caddcashpcardlua.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.AddCashluaData,AddCashluaBaseVo,"id");
			console.log("AddCashlua.configData:",this.AddCashluaData);
		}
		//c充值返利表
		static onloadedChargereturnProfitComplete():void {
			console.log("ChargereturnProfit表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cchargereturnprofit.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ChargeReturnProfitData,ChargeReturnProfitBaseVo,"id");
			console.log("ChargereturnProfit.configData:",this.ChargeReturnProfitData);
		}
		//J奖励系统表
		static onloadedRewardSystemBtnShowComplete():void {
			console.log("ChargereturnProfit表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.crewardsystembtnshow.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.RewardSystemBtnShowData,RewardSystemBtnShowBaseVo,"id");
			console.log("crewardsystembtnshow.configData:",this.RewardSystemBtnShowData);
		}
		//VIP
		static onloadedVipInfoBaseVoComplete():void {
			console.log("cvipinfo表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cvipinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.VipInfoData,VipInfoBaseVo,"id");
			console.log("cvipinfo.configData:",this.VipInfoData);
		}
		//H红包配置表
		static onloadedRedPackConfigBaseVoComplete():void {
			console.log("credpackconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.credpackconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.RedPackConfigData,RedPackConfigBaseVo,"id");
			console.log("credpackconfig.configData:",this.RedPackConfigData);
		}
		//D点卡服表格/钱庄配置表
		static onloadedBankConfigBaseVoComplete():void {
			console.log("cbankconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cbankconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.BankConfigData,BankConfigBaseVo,"id");
			console.log("cbankconfig.configData:",this.BankConfigData);
		}
		//D点卡服表格/t通用点卡服配置表
		static onloadedCommonDayPayBaseVoComplete():void {
			console.log("ccommondaypay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.ccommondaypay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.CommonDayPayData,CommonDayPayBaseVo,"id");
			console.log("ccommondaypay.configData:",this.CommonDayPayData);
		}
		//月卡奖励表
		static onloadedMonthCardConfigBaseVoComplete():void {
			console.log("cmonthcardconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cmonthcardconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.MonthCardConfigData,MonthCardConfigBaseVo,"id");
			console.log("cmonthcardconfig.configData:",this.MonthCardConfigData);
		}
		//自由分配礼包配置表
		static onloadedFreeDisRewardConfigBaseVoComplete():void {
			console.log("cfreedisrewardconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cfreedisrewardconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FreeDisRewardConfigData,FreeDisRewardConfigBaseVo,"id");
			console.log("cfreedisrewardconfig.configData:",this.FreeDisRewardConfigData);
		}
		//D点卡服表格/DMT3自由分配礼包配置表
		static onloadedFreeDisRewardConfigpayBaseVoComplete():void {
			console.log("cfreedisrewardconfigpay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cfreedisrewardconfigpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FreeDisRewardConfigData,FreeDisRewardConfigBaseVo,"id");
			console.log("cfreedisrewardconfigpay.configData:",this.FreeDisRewardConfigData);
		}
		//f福利奖励/QQ奖励表
		static onloadedQQGiftConfigBaseVoComplete():void {
			console.log("cqqgiftconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cqqgiftconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.QQGiftConfigData,QQGiftConfigBaseVo,"id");
			console.log("cqqgiftconfig.configData:",this.QQGiftConfigData);
		}
		//D点卡服表格/DMT3QQ奖励表
		static onloadedQQGiftConfigPayBaseVoComplete():void {
			console.log("cqqgiftconfigpay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cqqgiftconfigpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.QQGiftConfigData,QQGiftConfigBaseVo,"id");
			console.log("cqqgiftconfigpay.configData:",this.QQGiftConfigData);
		}
		//f福利奖励/节日奖励表
		static onloadedHolidayGiftConfigBaseVoComplete():void {
			console.log("cholidaygiftconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaygiftconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HolidayGiftConfigData,HolidayGiftConfigBaseVo,"id");
			console.log("cholidaygiftconfig.configData:",this.HolidayGiftConfigData);
		}
		//D点卡服表格/DMT3节日奖励表
		static onloadedHolidayGiftConfigPayBaseVoComplete():void {
			console.log("cholidaygiftconfigpay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaygiftconfigpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HolidayGiftConfigData,HolidayGiftConfigBaseVo,"id");
			console.log("cholidaygiftconfigpay.configData:",this.HolidayGiftConfigData);
		}
		//f福利奖励/节日活跃度奖励表
		static onloadedGuoQingHuoYueGiftConfigBaseVoComplete():void {
			console.log("cguoqinghuoyuegiftconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqinghuoyuegiftconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GuoQingHuoYueGiftConfigData,GuoQingHuoYueGiftConfigBaseVo,"id");
			console.log("cguoqinghuoyuegiftconfig.configData:",this.GuoQingHuoYueGiftConfigData);
		}
		//D点卡服表格/DMT3节日活跃度奖励表
		static onloadedGuoQingHuoYueGiftConfigPayBaseVoComplete():void {
			console.log("cguoqinghuoyuegiftconfigpay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqinghuoyuegiftconfigpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GuoQingHuoYueGiftConfigData,GuoQingHuoYueGiftConfigBaseVo,"id");
			console.log("cguoqinghuoyuegiftconfigpay.configData:",this.GuoQingHuoYueGiftConfigData);
		}
		//f福利奖励/节日充值奖励表
		static onloadedGuoQingChargeGiftConfigBaseVoComplete():void {
			console.log("cguoqingchargegiftconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqingchargegiftconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GuoQingChargeGiftConfigData,GuoQingChargeGiftConfigBaseVo,"id");
			console.log("cguoqingchargegiftconfig.configData:",this.GuoQingChargeGiftConfigData);
		}
		//D点卡服表格/DMT3节日充值奖励表
		static onloadedGuoQingChargeGiftConfigPayBaseVoComplete():void {
			console.log("cguoqingchargegiftconfigpay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cguoqingchargegiftconfigpay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.GuoQingChargeGiftConfigData,GuoQingChargeGiftConfigBaseVo,"id");
			console.log("cguoqingchargegiftconfigpay.configData:",this.GuoQingChargeGiftConfigData);
		}
		//f福利奖励/节日活动类型表
		static onloadedHolidayTypeBaseVoComplete():void {
			console.log("cholidaytype 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaytype.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HolidayTypeData,HolidayTypeBaseVo,"id");
			console.log("cholidaytype.configData:",this.HolidayTypeData);
		}
		//D点卡服表格/DMT3节日活动类型表
		static onloadedHolidayTypePayBaseVoComplete():void {
			console.log("cholidaytypepay 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/fushi.cholidaytypepay.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HolidayTypeData,HolidayTypeBaseVo,"id");
			console.log("cholidaytypepay.configData:",this.HolidayTypeData);
		}
		//f福利奖励/节日分档充值礼包
		static onloadedHydReChargeRewardDataBaseVoComplete():void {
			console.log("chydrechargerewarddata 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydrechargerewarddata.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HydReChargeRewardDataData,HydReChargeRewardDataBaseVo,"id");
			console.log("chydrechargerewarddata.configData:",this.HydReChargeRewardDataData);
		}
		//D点卡服表格/点卡服节日分档充值礼包
		static onloadedHydReChargeRewardDataDKBaseVoComplete():void {
			console.log("chydrechargerewarddatadk 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydrechargerewarddatadk.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HydReChargeRewardDataData,HydReChargeRewardDataBaseVo,"id");
			console.log("chydrechargerewarddatadk.configData:",this.HydReChargeRewardDataData);
		}
		//f福利奖励/节日积分收集表
		static onloadedHydScoreBaseVoComplete():void {
			console.log("chydscore 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydscore.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HydScoreData,HydScoreBaseVo,"id");
			console.log("chydscore.configData:",this.HydScoreData);
		}
		//D点卡服表格/点卡服节日积分收集表
		static onloadedHydScoreDKBaseVoComplete():void {
			console.log("chydscoredk 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/activity.chydscoredk.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.HydScoreData,HydScoreBaseVo,"id");
			console.log("chydscoredk.configData:",this.HydScoreData);
		}
		//d地图
		static onloadedMapConfigBaseVoComplete():void {
			console.log("cmapconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cmapconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.MapConfigData,MapConfigBaseVo,"id");
			console.log("cmapconfig.configData:",this.MapConfigData);
		}
		//a暗雷区域描述
		static onloadedMineAreainfoBaseVoComplete():void {
			console.log("cmineareainfo 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cmineareainfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.MineAreainfoData,MineAreainfoBaseVo,"id");
			console.log("cmineareainfo.configData:",this.MineAreainfoData);
		}
		//m明雷区域描述
		static onloadedShowAreainfoBaseVoComplete():void {
			console.log("cshowareainfo 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cshowareainfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ShowAreainfoData,ShowAreainfoBaseVo,"id");
			console.log("cshowareainfo.configData:",this.ShowAreainfoData);
		}
		//s世界地图配置
		static onloadedWorldMapConfigBaseVoComplete():void {
			console.log("cworldmapconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cworldmapconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.WorldMapConfigData,WorldMapConfigBaseVo,"id");
			console.log("cworldmapconfig.configData:",this.WorldMapConfigData);
		}
		//s世界地图小头像
		static onloadedWorldMapSmallHeadConfigBaseVoComplete():void {
			console.log("cworldmapsmallheadconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/map.cworldmapsmallheadconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.WorldMapSmallHeadConfigData,WorldMapSmallHeadConfigBaseVo,"id");
			console.log("cworldmapsmallheadconfig.configData:",this.WorldMapSmallHeadConfigData);
		}
		//x循环任务/d道具随机使用坐标生成表
		static onloadedItemToPosBaseVoComplete():void {
			console.log("citemtopos 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/map.citemtopos.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.ItemToPosData,ItemToPosBaseVo,"id");
			console.log("citemtopos.configData:",this.ItemToPosData);
		}
		//技能相关表/j技能阶段表
		static onloadedStageInfoBaseVoComplete():void {
			console.log("cstageinfo 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.StageInfoData,StageInfoBaseVo,"id");
			console.log("cstageinfo.configData:",this.StageInfoData);
		}
		//技能相关表/j技能阶段表_远程
		static onloadedStageInfo2BaseVoComplete():void {
			console.log("cstageinfo2 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cstageinfo2.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.StageInfoData,StageInfoBaseVo,"id");
			console.log("cstageinfo2.configData:",this.StageInfoData);
		}
		//技能相关表/j技能阶段串联表
		static onloadedSkillInfoBaseVoComplete():void {
			console.log("cskillinfo 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cskillinfo.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.SkillInfoData,SkillInfoBaseVo,"id");
			console.log("cskillinfo.configData:",this.SkillInfoData);
		}
		//z战斗底图表
		static onloadedBattleBackGroundBaseVoComplete():void {
			console.log("cbattlebackground 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackground.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.BattleBackGroundData,BattleBackGroundBaseVo,"id");
			console.log("cbattlebackground.configData:",this.BattleBackGroundData);
		}
		//z战斗背景音乐表
		static onloadedBattleBackMusicBaseVoComplete():void {
			console.log("cbattlebackmusic 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattlebackmusic.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.BattleBackGroundData,BattleBackGroundBaseVo,"id");
			console.log("cbattlebackmusic.configData:",this.BattleBackGroundData);
		}
		//光环表
		static onloadedFormationbaseConfigBaseVoComplete():void {
			console.log("cformationbaseconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationbaseconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FormationbaseConfigData,FormationbaseConfigBaseVo,"id");
			console.log("cformationbaseconfig.configData:",this.FormationbaseConfigData);
		}
		//光环表
		static onloadedFormationRestrainBaseVoComplete():void {
			console.log("cformationrestrain 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cformationrestrain.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.FormationRestrainData,FormationRestrainBaseVo,"id");
			console.log("cformationrestrain.configData:",this.FormationRestrainData);
		}
		//z战斗AI/AI动作表
		static onloadedBattleAIConfigBaseVoComplete():void {
			console.log("cbattleaiconfig 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.cbattleaiconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.BattleAIConfigData,BattleAIConfigBaseVo,"id");
			console.log("cbattleaiconfig.configData:",this.BattleAIConfigData);
		}
		//挂机设置
		static onloadedRoleFighteAIBaseVoComplete():void {
			console.log("crolefighteai 表格加载完毕 completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.crolefighteai.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = this.readDataHead(data);
			ByteArrayUtils.FillList(data,size,this.RoleFighteAIData,RoleFighteAIBaseVo,"id");
			console.log("crolefighteai.configData:",this.RoleFighteAIData);
		}



		public static readDataHead(data:Byte):number{
			//console.log("readDataHead data:",data,data.pos,data.length);
			data.pos = 0;
			//console.log("readDataHead data:",data,data.pos,data.length);
			var itemCount:number = 0;
			var type:number = data.getUint32();
			//console.log("type:",type);

			var size:number = data.getUint32();
			//console.log("size:",size);
			
			var version1:number = data.getUint16();
			//console.log("version1:",version1);

			itemCount = data.getUint16();
			//console.log("itemCount:",itemCount);
			
			var colCheckNumber:number = data.getUint32();
			//console.log("colCheckNumber:",colCheckNumber);
			return itemCount;
		}
		/*static setData(v:Object){
			ProjTemplate._data = v;
		}*/

		static get data():Object{
			return ProjTemplate._data;
		}
	}
}