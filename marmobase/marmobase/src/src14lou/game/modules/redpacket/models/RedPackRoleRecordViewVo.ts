/**
*  红包历史界面信息的VO
*/
module game.modules.redPacket.models{
	export class RedPackRoleRecordViewVo{
        //玩家红包记录类型，0发出；1收到
        public modeltype:number;
        //用来处理分页，0表示第一页；表示其他页
        public firstpageflag:number;
        //红包总个数
        public redpackallnum:number;
        //红包总金额
        public redpackallmoney:number;//long型数据
        //红包总符石
        public redpackallfushi:number;//long型数据
        

		constructor(){

		}
    }	
}