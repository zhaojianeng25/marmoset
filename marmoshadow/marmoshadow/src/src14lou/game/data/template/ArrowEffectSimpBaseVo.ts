/**
* name 
*/
module game.data.template {
    export class ArrowEffectSimpBaseVo {
        public id: number; //id
        public step: number; //下一步
        public task: number; //触发任务id
        public startlevel: number; //触发等级
        public level: number; //等级上限
        public screen: number; //是否锁屏
        public button: string; //按钮名称
        public usebutton: string; //响应按钮
        public item: number; //道具id
        public skill: number; //技能id
        public text: string; //箭头内容
        public uiposition: number; //界面位置
        public textposition: number; //文字位置
        public imagename: string; //图片名称
        public cleareffect: number; //解锁特效
        public functionid: number; //触发功能ID
        public battleId: number; //战斗ID触发
        public battleRoundId: number; //回合数触发
        public battlePos: number; //相应战斗点位
        public startAni: number; //是否播放提醒动画
        public isAllwaysLock: number; //是否永久锁屏
        public conditionItemId: number; //条件道具ID
        public onTeam: number; //是否判定组队状态
        public guideType: number; //引导特效类别
        public guideEffectId: number; //引导特效
        public assistEffectId: number; //辅助引导特效
        public effectScale: number; //引导特效缩放比例
        public teamInfo: number; //队伍列表信息
        public guideModel: number; //出现类型	
        public isEquipGuide: number; //是否为穿装备	
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
			this.step = data.getUint32();
			this.task = data.getUint32();
			this.startlevel = data.getUint32();
			this.level = data.getUint32();
			this.screen = data.getUint32();
			this.button = data.getUTFBytes(data.getUint32()); 
			this.usebutton = data.getUTFBytes(data.getUint32()); 
			this.item = data.getUint32();
			this.skill = data.getUint32();
			this.text = data.getUTFBytes(data.getUint32()); 
			this.uiposition = data.getUint32();
			this.textposition = data.getUint32();
			this.imagename = data.getUTFBytes(data.getUint32());
			this.cleareffect = data.getUint32();
			this.functionid = data.getUint32();
			this.battleId = data.getUint32();
			this.battleRoundId = data.getUint32();
			this.battlePos = data.getUint32();
			this.startAni = data.getUint32();
			this.isAllwaysLock = data.getUint32();
			this.conditionItemId = data.getUint32();
			this.onTeam = data.getUint32();
			this.guideType = data.getUint32();
			this.guideEffectId = data.getUint32();
			this.assistEffectId = data.getUint32();
			this.effectScale = data.getUint32();
			this.teamInfo = data.getUint32();
			this.guideModel = data.getUint32();
			this.isEquipGuide = data.getUint32();
        }
    }
}