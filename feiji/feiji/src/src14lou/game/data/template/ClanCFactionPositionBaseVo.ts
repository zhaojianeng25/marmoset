/**
* name g公会职务以及权限表
*/
module game.data.template{
	export class ClanCFactionPositionBaseVo{
		public id:number;//职务编号
		public posname:string;//公会职务名称
		public poslevel:number;//职务等级
		public changefactionname:number;//修改公会名称（会长）
		public isrecvxuetu:number;//设置公会是否可自动接收学徒（会长）
		public changeidea:number;//修改公会宗旨（会长、副会长）
		public selectchanyao:number;//公会药房选择产药方式（会长、副会长）
		public clearapplylist:number;//清空申请列表（会长、副会长）
		public renming:number;//任命（会长、副会长、军团长）
		public jinyan:number;//禁言（会长、副会长、军团长）
		public tichu:number;//踢出（会长、副会长、军团长）
		public qunfa:number;//公会群发消息（会长、副会长、军团长）
		public fenhong:number;//领取公会分红（公会所有人员，学徒除外）
		public cansai:number;//参与公会竞赛（公会所有人员，学徒除外）
		public yaoqing:number;//邀请成员（公会所有人员）
		public gonghuipindao:number;//使用公会频道（公会所有人员）
		public wanchenggonghuirenwu:number;//完成公会任务（公会所有人员）
		public canyuhuodong:number;//参与公会活动（公会所有人员）
		public fuli:number;//享受公会福利（公会所有人员）

		constructor(){

		}
		
		public parse(data:Byte){
			this.id = data.getUint32();
			this.posname = data.getUTFBytes(data.getUint32());
			this.poslevel = data.getUint32();
			this.changefactionname = data.getUint32();
			this.isrecvxuetu = data.getUint32();
			this.changeidea = data.getUint32();
			this.selectchanyao = data.getUint32();
			this.clearapplylist = data.getUint32();
			this.renming = data.getUint32();
			this.jinyan = data.getUint32();
			this.tichu = data.getUint32();
			this.qunfa = data.getUint32();
			this.fenhong = data.getUint32();
			this.cansai = data.getUint32();
			this.yaoqing = data.getUint32();
			this.gonghuipindao = data.getUint32();
			this.wanchenggonghuirenwu = data.getUint32();
			this.canyuhuodong = data.getUint32();
			this.fuli = data.getUint32();
		}
	}
}