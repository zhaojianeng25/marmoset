module game.gui.page{
    /**
     * HUD战斗界面
     * name 王谦
     */
	export class HudFightPage extends game.gui.base.Page{
    //     private _viewUI:ui.common.Hud_ZhanDouUI;	//UI
    //     private _isAuto:boolean;
    //     private _roleInfo:any;
    //     private _anger:number;
    //     private _spellIds:number[];
    //     private _spellId:number;
    //     private _isLock:boolean;
    //     private _aniSuper:UIFrameAnimation;
    //     private _aniLight:UIFrameAnimation[];
    //     private _huihe:HuiHe;
    //     private app:AppBase;

    //     constructor(app: AppBase, onOpenFunc?: Function, onCloseFunc?: Function) {
    //         super(app, onOpenFunc, onCloseFunc);
    //         this._asset = [
    //             Path.atlas_ui + "hud_zhandou.atlas",
    //             Path.atlas_ui + "huihe.atlas"
    //         ];
    //         let roles:BattleRole[] = this._app.battleMgr.battleRoles0;
    //         for(let i:number = 0; i < roles.length; i++){
    //             this._asset.push(Path.ui + "hud_zhandou/tu_n" + roles[i].entry+".png");
    //         }
    //         this.app = app;
    //     }
    //     // 页面初始化函数
    //     protected init(): void {
    //         this._view = this._viewUI = new ui.common.Hud_ZhanDouUI();
    //         this.addChild(this._viewUI);
    //         this._viewUI.boxMaskNormal.mouseEnabled = this._viewUI.boxMaskSpell0.mouseEnabled = this._viewUI.boxMaskSpell1.mouseEnabled = this._viewUI.boxMaskSuper.mouseEnabled = true;
    //         this._viewUI.mcRoundGod.visible = false;
    //     }
    //     // 页面打开时执行函数
    //     protected onOpen(): void {
    //         super.onOpen();
    //         this._viewUI.boxAnger.visible = this._viewUI.boxRound.visible = this._viewUI.boxAuto.visible = this._viewUI.boxAniSpell.visible = 
    //         this._viewUI.boxGod.visible = this._viewUI.boxNormal.visible = this._viewUI.boxSpell0.visible = this._viewUI.boxSpell1.visible = this._viewUI.boxSuper.visible = false;
    //         this._aniLight = [];
    //         this._huihe = new HuiHe();
    //         this._huihe.visible = false;
    //         this._viewUI.addChild(this._huihe);
    //         this._isAuto = false;
    //         this._app.battleMgr.battleEvent(BattleMgr.BATTLE_UIREADY, this._isAuto);//SceneBattle.onUIReady会监听此消息，然后调用SceneBattle.startFight();然后delayPlay
    //         this.updateView();
    //     }
    //     //页面关闭函数
    //     public close(): void {
    //         if(this._viewUI){
    //             if(this._huihe){
    //                 this._huihe.clearAniHuihe();
    //                 this._huihe.removeSelf();
    //                 this._huihe = null;
    //             }
    //             this.clearAniLight(0);
    //             this.clearAniLight(1);
    //             this.clearAniSuper();
    //             this._roleInfo = null;
    //             this._spellIds = null;
    //             this._spellId = this._anger = 0;
    //             this._isAuto = this._isLock = false;
    //         }
    //         super.close();
    //     }
    //     //添加事件侦听
    //     protected set addListener(isAdd: boolean) {
    //         DisplayU.setMouseListener(this._viewUI.btnExit, isAdd, this, this.onClickHandler);
    //         DisplayU.setMouseListener(this._viewUI.btnAuto, isAdd, this, this.onClickHandler);
    //         DisplayU.setMouseListener(this._viewUI.btnNormal, isAdd, this, this.onClickHandler);
    //         DisplayU.setMouseListener(this._viewUI.btnSpell0, isAdd, this, this.onClickHandler);
    //         DisplayU.setMouseListener(this._viewUI.btnSpell1, isAdd, this, this.onClickHandler);
    //         DisplayU.setMouseListener(this._viewUI.btnSuper, isAdd, this, this.onClickHandler);
    //         DisplayU.setMouseListener(this._viewUI.chat_btn, isAdd, this, this.onShowChat);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_ROUND, this, this.updateRound);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_WAIT, this, this.updateWait);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_ROLE, this, this.updateRole);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_SELECT, this, this.updateSelect);
    //         //DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_CONTINUE, this, this.updateContinue);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_SUPER, this, this.showAniSuper);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_RESULT, this, this.showResult);
    //         DisplayU.setEventListener(this._app.battleMgr, isAdd, BattleMgr.BATTLE_EXIT, this, this.onExitBattle);
    //     }
    //     //更新界面
    //     private updateView():void{
    //         this._anger = this._app.battleMgr.anger;
    //         this.updateAnger();
    //         let rounds:string[] = FightMgr.MAX_ROUND.toString().split("");
    //         for(let i:number = 0; i < 2; i++){
    //             if(i < rounds.length){
    //                 this._viewUI["mcMax"+i].index = Number(rounds[i]);
    //                 this._viewUI["mcMax"+i].visible = true;
    //             }else this._viewUI["mcMax"+i].visible = false;
    //         }
    //         this._viewUI.imgAuto.skin = this._isAuto?"common/ui/hud_zhandou/tu_shoudong.png":"common/ui/hud_zhandou/tu_zidong.png";
    //     }
    //     //更新怒气点数
    //     private updateAnger():void{
    //         let angers:string[] = this._anger.toString().split("");
    //         for(let i:number = 0; i < 3; i++){
    //             if(i < angers.length){
    //                 this._viewUI["mcAnger"+i].index = Number(angers[i]);
    //                 this._viewUI["mcAnger"+i].visible = true;
    //             }else this._viewUI["mcAnger"+i].visible = false;
    //         }
    //     }
    //     //更新粉面回合数
    //     private updateRound(data:any):void{
    //         if(!data){
    //             this._huihe.clearAniHuihe();
    //             return;
    //         }
    //         this._huihe.showAniHuihe(data.curRound);
    //         let rounds:string[] = data.curRound.toString().split("");
    //         rounds.reverse();
    //         for(let i:number = 0; i < 2; i++){
    //             if(i < rounds.length){
    //                 this._viewUI["mcRound"+i].index = Number(rounds[i]);
    //                 this._viewUI["mcRound"+i].visible = true;
    //             }else{
    //                  this._viewUI["mcRound"+i].visible = false;
    //             }
    //         }
    //         this._viewUI.boxRound.visible = true;
    //         if(!this._viewUI.boxAnger.visible) this._viewUI.boxAnger.visible = true;
    //     }
    //     //等待玩家操作
    //     private updateWait(data:any):void{
    //         this._roleInfo = data;
    //         this._roleInfo.isWait = true;
    //         this.clearAniLight(0);
    //         this.clearAniLight(1);
    //         if(data.isAttack){
    //             if(!this._isAuto){
    //                  this.updateSpells();//显示技能图标
    //             }else{
    //                  this._app.battleMgr.fight();//自动战斗
    //             }
    //         }else{
    //              this._viewUI.boxNormal.visible = this._viewUI.boxSpell0.visible = this._viewUI.boxSpell1.visible = this._viewUI.boxSuper.visible = false;
    //         }
    //     }
    //     //更新技能图标
    //     private updateSpells():void{
    //         this._viewUI.imgLightSpell0.visible = this._viewUI.imgLightSpell1.visible = false;
    //         this._isLock = false;
    //         this._spellIds = [0,0,0,0];
    //         let role:BattleRole = this._app.battleMgr.getBattleRole(this._roleInfo.isAttack, this._roleInfo.index);
    //         let spells:any[] = role.spells.concat();
    //         let temp:any;
    //         if(spells.length < 4){
    //             temp = Template.getCreatureTempById(role.entry);
    //             //被动技能
    //             for(let i:number = 0; i < temp.passive.length; i++){
    //                 spells.push({id:temp.passive[i], lv:1, round:0});
    //                 if(spells.length >= 4){
    //                      break;
    //                 }
    //             }
    //         }
    //         let name:string;
    //         let index:number;
    //         let isSpell:boolean;
    //         for(let i:number = 0; i < spells.length; i++){
    //             temp = Template.getSkillsTempById(spells[i].id);
    //             if(!temp) continue;
    //             switch(temp.type){
    //                 case 1:
    //                     name = "Normal";
    //                     index = 0;
    //                     break;
    //                 case 0:
    //                 case 2:
    //                     if(!isSpell){
    //                         name = "Spell0";
    //                         index = 1;
    //                     }else{
    //                         name = "Spell1";
    //                         index = 2;
    //                     }
    //                     if(!temp.type){
    //                          this.showAniLight(index-1);
    //                     }else{
    //                          this.clearAniLight(index-1);
    //                     }
    //                     isSpell = true;
    //                     break;
    //                 case 3:
    //                     name = "Super";
    //                     index = 3;
    //                     break;
    //             }
    //             this._spellIds[index] = temp.id;
    //             this.showSpell(name, spells[i], temp);
    //         }
    //         this.selectSpell(0);
    //     }
    //     //显示技能
    //     private showSpell(name:string, spell:any, temp:any):void{
    //         if(temp.cost){
    //             let costs:string[] = temp.cost.toString().split("");
    //             for(let i:number = 0; i < 2; i++){
    //                 if(i < costs.length){
    //                     this._viewUI["mcCost"+name+i].index = Number(costs[i]);
    //                     this._viewUI["mcCost"+name+i].visible = true;
    //                 }else{
    //                      this._viewUI["mcCost"+name+i].visible = false;
    //                 }
    //             }
    //             this._viewUI["boxCost"+name].visible = true;
    //         }else{
    //              this._viewUI["boxCost"+name].visible = false;
    //         }

    //         this._viewUI["boxMask"+name].visible = temp.cost && temp.cost > this._anger;//怒气点不足
    //         if(spell.round){
    //             if(name != "Super"){
    //                  this._viewUI["mcRound"+name].index = spell.round;
    //             }else{
    //                  this._viewUI["mcRound"+name].skin = "common/ui/hud_zhandou/tu_djs"+spell.round+".png";
    //             }
    //             this._viewUI["mcRound"+name].visible = true;
    //             this._viewUI["boxMask"+name].visible = true;//回合冷却中
    //         }else{
    //              this._viewUI["mcRound"+name].visible = false;
    //         }
    //         this._viewUI["img" + name].skin = "common/ui/icon/"+temp.icon+".png";
    //         this._viewUI["box" + name].visible = true;
    //     }
	// 	//显示被动技能动画
	// 	private showAniLight(index:number): void {
	// 		if (index < this._aniLight.length && this._aniLight[index]) return;
	// 		this._aniLight[index] = ObjectPools.malloc(UIFrameAnimation, [24], 24) as UIFrameAnimation;
	// 		let frames:any[] = [{frame:0,rotation:0},{frame:25,rotation:360}];
    //         let imgLight:LImage = this._viewUI["imgLightSpell"+index];
    //         this._aniLight[index].addTarget(imgLight, frames)
    //         imgLight.rotation = 0;
    //         imgLight.visible = true;
    //         this._aniLight[index].play(true);
    //     }
	// 	//清理被动技能动画
	// 	private clearAniLight(index:number): void {
	// 		if (index >= this._aniLight.length || !this._aniLight[index]) return;
    //         this._viewUI["imgLightSpell"+index].visible = false;
	// 		ObjectPools.free(this._aniLight[index]);
	// 		this._aniLight[index] = null;
    //     }
    //     //选中技能
    //     private selectSpell(index:number):void{
    //         if(index == -1) return;
    //         let temp:any = Template.getSkillsTempById(this._spellIds[index]);
    //         if(!temp || !temp.type) return;//被动技能
    //         this._viewUI.imgSelectNormal.visible = this._viewUI.imgSelectSpell0.visible = this._viewUI.imgSelectSpell1.visible = this._viewUI.imgSelectSuper.visible = false;
    //         let name:string;
    //         switch(index){
    //             case 0: name = "Normal"; break;
    //             case 1: name = "Spell0"; break;
    //             case 2: name = "Spell1"; break;
    //             case 3: name = "Super"; break;
    //         }
    //         this._viewUI["imgSelect" + name].visible = true;
    //         this._spellId = this._spellIds[index];
    //         this._app.battleMgr.battleEvent(BattleMgr.BATTLE_SPELL, this._spellId);
    //     }
    //     //更新战将信息
    //     private updateRole(data:any):void{
    //         this._roleInfo = data;
    //         if(data.isAttack && data.anger != undefined){
    //             this._anger = data.anger;
    //             this.updateAnger();
    //         }
    //         this._viewUI.boxNormal.visible = this._viewUI.boxSpell0.visible = this._viewUI.boxSpell1.visible = this._viewUI.boxSuper.visible = false;
    //     }
    //     //场景选中
    //     private updateSelect(data:any):void{
    //         let role:BattleRole = this._app.battleMgr.getBattleRoleByPos(data.isAttack, data.pos + 14);
    //         this._app.battleMgr.fight(data.spellId, role.spos);
    //         this._spellId = 0;
    //     }
    //     //更新继续
    //     private updateContinue():void{
            
    //     }
	// 	//显示大招动画
	// 	private showAniSuper(data:any): void {
    //         if(!data){
    //             this.clearAniSuper();
    //             return;
    //         }
	// 		if (this._aniSuper) return;
	// 		this._aniSuper = ObjectPools.malloc(UIFrameAnimation, [24], 24) as UIFrameAnimation;
	// 		let frames:any[] = [{frame:0,x:396,y:670},{frame:35,x:375,y:676}];
    //         this._viewUI.imgSpellRole.pos(396, 670);
	// 		this._aniSuper.addTarget(this._viewUI.imgSpellRole, frames);//大招角色
    //         this._viewUI.imgSpellBack.skin = "common/ui/hud_zhandou/di_"+(Math.random()<0.5?1:2)+".png";
    //         this._viewUI.imgSpellRole.skin = "common/ui/hud_zhandou/tu_n"+data.entry+".png";
    //         this._viewUI.boxAniSpell.visible = true;
    //         this._aniSuper.play();
    //     }
	// 	//清理大招动画
	// 	private clearAniSuper(): void {
	// 		if (!this._aniSuper) return;
    //         this._viewUI.boxAniSpell.visible = false;
	// 		ObjectPools.free(this._aniSuper);
	// 		this._aniSuper = null;
    //     }
    //     //显示战斗结算
    //     private showResult(data:any):void{
    //         if(!this._app.battleMgr.battleInfo.winner) return;
    //         let pageId:number = this._app.battleMgr.battleInfo.winner==1?PageDef.BATTLE_WIN_PAGE:PageDef.BATTLE_FAIL_PAGE;
    //         this._app.uiRoot.general.open(pageId);
    //     }
    //     //退出战斗
    //     private onExitBattle(data:any):void{
    //         this.close();
    //         this._app.uiRoot.general.close(PageDef.BATTLE_WIN_PAGE);
    //         this._app.uiRoot.general.close(PageDef.BATTLE_FAIL_PAGE);
    //         this._app.battleMgr.exit();
    //         ModuleManager.show(ModuleNames.MAIN_MENU,this._app );
    //     }
    //     //退出战斗场景
    //     private onExit():void{
    //         this._app.battleMgr.battleEvent(BattleMgr.BATTLE_EXIT);
    //         var action:any = {};
    //         action.operationType = 9;//逃跑
    //         action.aim = 1;
    //         action.operationID = 1;
	// 		RequesterProtocols._instance.c2s_CSendAction(action, 1, 0);
	// 		ModuleManager.show(ModuleNames.MAIN_MENU,this._app );
    //     }
    //     //鼠标点击事件
    //     private onClickHandler(e: LEvent): void {
    //         TweenBtnEff.BtnTween(e.currentTarget);
    //         switch (e.currentTarget) {
    //             case this._viewUI.btnExit://退出
    //                 this._app.uiRoot.general.open(PageDef.PROMPT_PAGE, (page:Page)=>{page.dataSource = {type:PromptPage.TYPE_EXIT, callback:Handler.create(this,this.onExit,null,false)}});
    //                 break;
    //             case this._viewUI.btnAuto://自动
    //                 this._viewUI.boxAuto.visible = this._isAuto = !this._isAuto;
    //                 this._viewUI.imgAuto.skin = this._isAuto?"common/ui/hud_zhandou/tu_shoudong.png":"common/ui/hud_zhandou/tu_zidong.png";
    //                 this._app.battleMgr.battleEvent(BattleMgr.BATTLE_AUTO, this._isAuto);//SceneBattle.updateAuto会监听此消息
    //                 if(this._roleInfo && this._roleInfo.isWait && this._isAuto){
    //                      this._app.battleMgr.fight(this._spellId);//battleMgr.fight()里会调用fightMgr.fight()
    //                 }
    //                 break;
    //             case this._viewUI.btnNormal://普通
    //                 this.selectSpell(0);
    //                 break;
    //             case this._viewUI.btnSpell0://技能
    //                 this.selectSpell(1);
    //                 break;
    //             case this._viewUI.btnSpell1://技能
    //                 this.selectSpell(2);
    //                 break;
    //             case this._viewUI.btnSuper://大招
    //                 this.selectSpell(3);
    //                 break;
    //         }
    //     }

    //     private onShowChat():void
    //     {
    //         ModuleManager.show(ModuleNames.Chat,this.app);
    //     }
	// }
	// export class HuiHe extends ui.common.HuiHeUI{
    //     private _aniHuihe:UIFrameAnimation;

    //     constructor(){
    //         super();
    //     }
	// 	//显示回合动画
	// 	public showAniHuihe(round:number): void {
    //         let rounds:string[] = round.toString().split("");
    //         for(let i:number = 0; i < 2; i++){
    //             if(i < rounds.length){
    //                 this["imgRound"+i].skin = "common/ui/huihe/D"+rounds[i]+".png";
    //                 this["imgRound"+i].visible = true;
    //             }else this["imgRound"+i].visible = false;
    //         }
    //         this.boxRound.width = rounds.length==1?114:189;
    //         this.boxRound.x = 317;
    //         this.ani1.play(0, false);
    //         this.visible = true;
	// 		// if (this._aniHuihe) return;
	// 		// this._aniHuihe = ObjectPools.malloc(UIFrameAnimation, [24], 24) as UIFrameAnimation;
	// 		// let frames:any[] = [{frame:0,x:396,y:670},{frame:35,x:375,y:676}];
    //         // this._aniHuihe.play();
    //     }
	// 	//清理回合动画
	// 	public clearAniHuihe(): void {
    //         this.ani1.stop();
    //         this.visible = false;
	// 		// if (!this._aniHuihe) return;
	// 		// ObjectPools.free(this._aniHuihe);
	// 		// this._aniHuihe = null;
    //     }
    }
}