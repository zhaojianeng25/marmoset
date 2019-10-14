
module game.modules.guaji.models{
    /** 刷新挂机AI数据返回事件 */
    export const GET_AUTOFIGHTAI_DATA:string = "getAutoFightData";
    /** 人物技能图片改变事件 */
    export const ROLE_SKILL_IMG_CHANGE:string = "roleSkillImgChange";
    /** 挂机系统的proxy */
    export class GuaJiProxy extends hanlder.ProxyBase{
        constructor(){
            super();
            GuaJiProxy._instance = this;
            this.init();
        }
        private static _instance:GuaJiProxy;
        public static getInstance():GuaJiProxy {
			if(!this._instance) {
				this._instance = new GuaJiProxy();
			}
			return this._instance;
		}

        public init():void{
            GuaJiModel.getInstance(); 
            this.addNetworkListener();

            //加载练功区怪物配置表
            Laya.loader.load("common/data/temp/npc.cmonsterconfig.bin", Handler.create(this,this.onloadedCMonsterConfigComplete), null, Loader.BUFFER);
            //加载挂机设置的配置表
            Laya.loader.load("common/data/temp/battle.crolefighteai.bin", Handler.create(this,this.onloadedCRoleFighteAIComplete), null, Loader.BUFFER);
             //s死亡提醒表
            Laya.loader.load("common/data/temp/game.cdeathnote.bin", Handler.create(this,this.onloadedDeathNoteComplete), null, Loader.BUFFER);
        }
        private onloadedCRoleFighteAIComplete():void{
            console.log("CRoleFighteAI表加载完毕------ completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/battle.crolefighteai.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,GuaJiModel.getInstance().roleFightAIDic,game.data.template.RoleFighteAIBaseVo,"id");
			console.log("onloadedCreateRoleConfigComplete:",GuaJiModel.getInstance().roleFightAIDic);
        }

        private onloadedCMonsterConfigComplete():void{
            console.log("CNpcInAll表加载完毕------ completed");
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/npc.cmonsterconfig.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,GuaJiModel.getInstance().monstersDic,game.data.template.CMonsterConfigBaseVo,"id");
			console.log("onloadedCreateRoleConfigComplete:",GuaJiModel.getInstance().monstersDic);
        }
        private onloadedDeathNoteComplete():void{
			var arrayBuffer:ArrayBuffer = Laya.loader.getRes("common/data/temp/game.cdeathnote.bin");
			var data:Byte = new Byte(arrayBuffer);
			var size:number = game.data.ProjTemplate.readDataHead(data);
			ByteArrayUtils.FillList(data,size,GuaJiModel.getInstance().deatNote,game.data.template.CDeathNoteBaseVo,"id");
			console.log("onloadedCreateRoleConfigComplete:",GuaJiModel.getInstance().monstersDic);
        }

        // 添加监听
        private addNetworkListener(): void {
            Network._instance.addHanlder(ProtocolsEnum.SFlushRoleFightAI, this, this.onSFlushRoleFightAI);
             Network._instance.addHanlder(ProtocolsEnum.SRefreshRoleHookBattleData, this, this.onSRefreshRoleHookBattleData);
		}
        /**
         * 服务器刷新挂机战斗相关数据返回
         */
        private onSRefreshRoleHookBattleData(optcode: number, msg: hanlder.S2C_SRefreshRoleHookBattleData):void{
            models.GuaJiModel._instance.hookBattleData = msg.RoleHookBattleData;
        }

        /**
         * 刷新挂机AI数据返回
         */
        private onSFlushRoleFightAI(optcode: number, msg: hanlder.S2C_SFlushRoleFightAI):void{
            models.GuaJiModel._instance.autoFightData = [];
            models.GuaJiModel._instance.autoFightData = msg.fightaiids;
            GuaJiProxy.getInstance().event(models.GET_AUTOFIGHTAI_DATA,[msg.fightaiids]);
        }
    }
}