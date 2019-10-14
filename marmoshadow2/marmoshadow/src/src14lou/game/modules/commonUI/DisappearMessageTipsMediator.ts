/**messageTips.ui */

// import DissappearMessageTips = ui.common.component.DisappearTipsMessageUI;

module game.modules.commonUI {

    export class DisappearMessageTipsMediator extends game.modules.ModuleMediator {

        /**提示界面选择界面 */
        private _viewUI: ui.common.component.DisappearTipsMessageUI;
        private px;
        private py;
        private x1;
		private y1;
		private x2;
		private y2;
        /** 存放数字皮肤地址 */
        private numSkinStr:Array<string> = [];
        constructor(app: AppBase){
            super();
            this.uiLayer = app.uiRoot.topUnder;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 

			this._viewUI = new ui.common.component.DisappearTipsMessageUI()
            this._viewUI.mouseThrough = true;
            this.isCenter = true;
            // this.regestEvent();
            this.px = this._viewUI.msgTips_img.x;
            this.py = this._viewUI.msgTips_img.y;
            this.x1 = this._viewUI.msgTips1_img.x;
			this.y1 = this._viewUI.msgTips1_img.y;
			this.x2 = this._viewUI.msgTips2_img.x;
			this.y2 = this._viewUI.msgTips2_img.y;
        }
        





        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  显示提示UI
         * @param    
         * 
         */
        public onShow(promoto:string,id?:number): void 
        {
            this.show();
            if(id ==undefined)
                this.onLoad(promoto);
            else if(id==1)
                this.onLoad1(promoto);
            else if(id==2)
                this.onLoad2(promoto);
        }
        public show():void{
            super.show();
            
        }
        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
        /** 属性变化特效
         * @param diff 差值
		 * @param flag true:增加，false:减少
		 * @param shuxingType 属性类型
         */
        public onLoadRolePropertyChangeEffect(diff:number, flag:boolean, shuxingType:number):void{
            this._viewUI.attrChange_box.visible = true;
            let shuxingType_img = this._viewUI.shuxingType_img;
            if(flag){//增加属性
                this._viewUI.changeType_img.skin = "common/ui/bag/greenjia_res.png";
                switch(shuxingType){
                    case shuxing.MAX_HP://最大生命值
                        shuxingType_img.skin = "common/ui/bag/shengming_res000.png";
                        break;
                    case shuxing.MAX_MP://最大魔法值
                        shuxingType_img.skin = "common/ui/bag/mofa2_res000.png";
                        break;
                    case shuxing.ATTACK://物理攻击
                        shuxingType_img.skin = "common/ui/bag/wuligongji_res000.png";
                        break;
                    case shuxing.DEFEND://物理防御
                        shuxingType_img.skin = "common/ui/bag/wulifangyu_res000.png";
                        break;
                    case shuxing.MAGIC_ATTACK://法术攻击
                        shuxingType_img.skin = "common/ui/bag/fashugongji_res000.png";
                        break;
                    case shuxing.MAGIC_DEF://法术防御
                        shuxingType_img.skin = "common/ui/bag/fashufangyu_res000.png";
                        break;
                    case shuxing.MEDICAL://治疗强度
                        shuxingType_img.skin = "common/ui/bag/zhiliaoqiangdu_res000.png";
                        break;
                    case shuxing.SEAL://控制命中
                        shuxingType_img.skin = "common/ui/bag/kongzhimingzhong_res000.png";
                        break;
                    case shuxing.UNSEAL://控制抗性
                        shuxingType_img.skin = "common/ui/bag/kongzhikangxing_res000.png";
                        break;
                    case shuxing.SPEED://速度
                        shuxingType_img.skin = "common/ui/bag/sudu_res000.png";
                        break;
                }
            }
            else{//减少属性                
                this._viewUI.changeType_img.skin = "common/ui/bag/redjian_res.png";
                switch(shuxingType){
                    case shuxing.MAX_HP://最大生命值
                        shuxingType_img.skin = "common/ui/bag/shengming2_res000.png";
                        break;
                    case shuxing.MAX_MP://最大魔法值
                        shuxingType_img.skin = "common/ui/bag/mofa_res000.png";
                        break;
                    case shuxing.ATTACK://物理攻击
                        shuxingType_img.skin = "common/ui/bag/wuligongji2_res000.png";
                        break;
                    case shuxing.DEFEND://物理防御
                        shuxingType_img.skin = "common/ui/bag/wulifangyu2_res000.png";
                        break;
                    case shuxing.MAGIC_ATTACK://法术攻击
                        shuxingType_img.skin = "common/ui/bag/fashugongji2_res000.png";
                        break;
                    case shuxing.MAGIC_DEF://法术防御
                        shuxingType_img.skin = "common/ui/bag/fashufangyu2_res000.png";
                        break;
                    case shuxing.MEDICAL://治疗强度
                        shuxingType_img.skin = "common/ui/bag/zhiliaoqiangdu2_res000.png";
                        break;
                    case shuxing.SEAL://控制命中
                        shuxingType_img.skin = "common/ui/bag/kongzhimingzhong2_res000.png";
                        break;
                    case shuxing.UNSEAL://控制抗性
                        shuxingType_img.skin = "common/ui/bag/kongzhikangxing2_res000.png";
                        break;
                    case shuxing.SPEED://速度
                        shuxingType_img.skin = "common/ui/bag/sudu2_res000.png";
                        break;
                }
            }
            this.updateDiff(diff, flag);
            let terminalY:number = 300;
            Laya.Tween.to(this._viewUI.attrChange_box,{y:terminalY},1500,Laya.Ease.circOut,Laya.Handler.create(this,function() {
                   this._viewUI.attrChange_box.visible = false;this._viewUI.attrChange_box.x = this.px;this._viewUI.attrChange_box.y = this.py;}  ),null,true);
            this.show();
        }
        /** 更新差值 */
        private updateDiff(diff:number, flag:boolean):void{
            let temp: number = Math.abs(diff);
            let diffArray = [];
            let i: number = 0;
            do {
                var num: number = Math.floor(temp % 10);
                temp = temp / 10;
                diffArray[i] = num;
                i++;
            } while (temp >= 1)
            let skinArray: Array<string> = [];
            for (let k = 0; k <= i - 1; k++) {
                skinArray[k] = this.getSkinSource(diffArray[i - k - 1], flag);
            }
            this.numSkinStr = skinArray;
            this._viewUI.diff_lst.array = skinArray;
            this._viewUI.diff_lst.renderHandler = new Laya.Handler(this, this.numRender);
        }
        /** 数字渲染 */
        private numRender(cell:Box, index:number):void{
            if(index >= this.numSkinStr.length || index < 0) return;
            let diffvalue:Laya.Image = cell.getChildByName("diffvalue") as Laya.Image;
            diffvalue.skin = this.numSkinStr[index];
        }
        /** 获取图片地址 */
        private getSkinSource(index:number, flag:boolean):string{
            let skinStr:string;
            if(flag){
                switch(index){
                    case 0 :
                        skinStr = "common/ui/bag/green0_res.png";
                        break;
                    case 1 :
                        skinStr = "common/ui/bag/green1_res.png";
                        break;
                    case 2 :
                        skinStr = "common/ui/bag/green2_res.png";
                        break;
                    case 3 :
                        skinStr = "common/ui/bag/green3_res.png";
                        break;
                    case 4 :
                        skinStr = "common/ui/bag/green4_res.png";
                        break;
                    case 5 :
                        skinStr = "common/ui/bag/green5_res.png";
                        break;
                    case 6 :
                        skinStr = "common/ui/bag/green6_res.png";
                        break;
                    case 7 :
                        skinStr = "common/ui/bag/green7_res.png";
                        break;
                    case 8 :
                        skinStr = "common/ui/bag/green8_res.png";
                        break;
                    case 9 :
                        skinStr = "common/ui/bag/green9_res.png";
                        break;
                }
            }
            else{
                switch(index){
                    case 0 :
                        skinStr = "common/ui/bag/red0_res.png";
                        break;
                    case 1 :
                        skinStr = "common/ui/bag/red1_res.png";
                        break;
                    case 2 :
                        skinStr = "common/ui/bag/red2_res.png";
                        break;
                    case 3 :
                        skinStr = "common/ui/bag/red3_res.png";
                        break;
                    case 4 :
                        skinStr = "common/ui/bag/red4_res.png";
                        break;
                    case 5 :
                        skinStr = "common/ui/bag/red5_res.png";
                        break;
                    case 6 :
                        skinStr = "common/ui/bag/red6_res.png";
                        break;
                    case 7 :
                        skinStr = "common/ui/bag/red7_res.png";
                        break;
                    case 8 :
                        skinStr = "common/ui/bag/red8_res.png";
                        break;
                    case 9 :
                        skinStr = "common/ui/bag/red9_res.png";
                        break;
                }
            }
            if(skinStr){
                return skinStr;
            }
        }
        /**
         * @describe  
         * @param  data 提示语句   
         */
        private onLoad(promoto:string) 
        {
             var terminalY:number = 300;
			 this._viewUI.msgTips_img.visible = true;
			 this._viewUI.msgTips1_lab.visible = false;
             this._viewUI.msgTips_lab.visible = true;
             this._viewUI.msgTips_lab.style.width = 409;
             this._viewUI.msgTips_lab.style.align = "center";
			 this._viewUI.msgTips_lab.innerHTML = promoto;
             /** 文本垂直居中 */
             this._viewUI.msgTips_lab.y = (this._viewUI.msgTips_img.height - this._viewUI.msgTips_lab.contextHeight)/2;
			 Laya.Tween.to(this._viewUI.msgTips_img,{y:terminalY},1500,Laya.Ease.circOut,Laya.Handler.create(this,function() {
                   this._viewUI.msgTips_img.visible = false;this._viewUI.msgTips_img.x = this.px;this._viewUI.msgTips_img.y = this.py;}  ),null,true);
        }

        	/**升级提示 */
		private onLoad1(promoto:string) 
        {		
			var terminalY:number = 580;
			this._viewUI.msgTips1_img.visible = true;
			this._viewUI.msgTips1_htm.visible = true;
			this._viewUI.msgTips1_htm.style.width = 409;
			this._viewUI.msgTips1_htm.style.align = "center";
			this._viewUI.msgTips1_htm.innerHTML = promoto;
            /** 文本垂直居中 */
            this._viewUI.msgTips1_htm.y = (this._viewUI.msgTips1_img.height - this._viewUI.msgTips1_htm.contextHeight)/2;
			Laya.Tween.to(this._viewUI.msgTips1_img,{y:terminalY},1500,Laya.Ease.circOut,Laya.Handler.create(this,function() { 
                 this._viewUI.msgTips1_img.visible = false;
                 this._viewUI.msgTips1_img.x = this.x1;
                 this._viewUI.msgTips1_img.y = this.y1;
                 this._viewUI.sheng_img.visible = false;
                 this._viewUI.ji_img.visible = false;
                 this._viewUI.unlock_img.visible = false;
                 this._viewUI.guangxiao_img.visible = false;
                }),null,false);
        }
		/**加经验提示 */
		private onLoad2(promoto:string) 
        {		
			var terminalY:number = 244;
			this._viewUI.msgTips2_img.visible = true;
			this._viewUI.msgTips2_htm.visible = true;
			this._viewUI.msgTips2_htm.style.width = 409;
			this._viewUI.msgTips2_htm.style.align = "center";
			this._viewUI.msgTips2_htm.innerHTML = promoto;
             /** 文本垂直居中 */
            this._viewUI.msgTips2_htm.y = (this._viewUI.msgTips2_img.height - this._viewUI.msgTips2_htm.contextHeight)/2;
			Laya.Tween.to(this._viewUI.msgTips2_img,{y:terminalY},1500,Laya.Ease.circOut,Laya.Handler.create(this,function() {  this._viewUI.msgTips2_img.visible = false;this._viewUI.msgTips2_img.x = this.x2;this._viewUI.msgTips2_img.y = this.y2;}  ),null,false);
        }
        public xingongneng():void{
            this._viewUI.unlock_img.visible = true;
            this._viewUI.guangxiao_img.visible = true;
            this._viewUI.guangxiao_img.alpha = 0.1;
            Laya.timer.frameLoop(2,this,this.guangxiao);
        }
        private guangxiao(e:Event):void{
            this._viewUI.guangxiao_img.alpha += 0.1;
             if(this._viewUI.guangxiao_img.alpha == 1){
                  Laya.timer.clear(this,this.guangxiao);
             }
        }
        public xuanzhuan():void{
            this._viewUI.sheng_img.scaleX = -1;
            this._viewUI.sheng_img.visible = true;
            Laya.timer.frameLoop(1,this,this.animate);
        }
        private animate(e:Event):void{
            this._viewUI.sheng_img.scaleX += 0.1; 
            if(this._viewUI.sheng_img.scaleX > 1){
                this._viewUI.sheng_img.scaleX = 1;
                Laya.timer.clear(this,this.animate);
                this._viewUI.ji_img.scaleX = -1; 
                this._viewUI.ji_img.visible = true;
                Laya.timer.frameLoop(1,this,this.animate2);
            }     
        }
        private animate2(e:Event):void{
            this._viewUI.ji_img.scaleX += 0.1; 
            if(this._viewUI.ji_img.scaleX > 1){
                this._viewUI.ji_img.scaleX = 1;
                this._viewUI.sheng_img.visible = false;
                this._viewUI.ji_img.visible = false;
                Laya.timer.clear(this,this.animate2);
            }
         }
        // private regestEvent():void
        // {
        //     game.modules.chat.models.ChatProxy.getInstance().on(game.modules.chat.models.SHOW_DISSAPEAR_MSG_TIPS,this,this.onShow);
        // }
        /** 
         * @param promoto 提示信息 @param isshowInlab 是否用Label显示
         */
        public onShowData(promoto,isshowInlab):void
        {
            this.show();
            if(typeof(isshowInlab) == "undefined")
            {
                this.onLoad(promoto);
            }else if(isshowInlab == true)
            {
             var terminalY:number = 300;
			 this._viewUI.msgTips_img.visible = true;
			 this._viewUI.msgTips1_lab.visible = true;
             this._viewUI.msgTips_lab.innerHTML = "";
             this._viewUI.msgTips1_lab.text = promoto;
			 Laya.Tween.to(this._viewUI.msgTips_img,{y:terminalY},1500,Laya.Ease.circOut,Laya.Handler.create(this,function() {
                   this._viewUI.msgTips_img.visible = false; this._viewUI.msgTips1_lab.visible = false;this._viewUI.msgTips_img.x = this.px;this._viewUI.msgTips_img.y = this.py;}  ),null,true);
            }
        }
        


        ////////////////
        ///UI
        ////////////////

        private hideTips():void
        {
           
        }
       


        ////////////////
        ///事件
        ////////////////

        
    }
}