/**Rename.ui */
// import RenameUi = ui.common.component.GaiMingKaUI;
module game.modules.commonUI {
    export class RenameMediators extends game.modules.UiMediator {
        /**提示界面选择界面 */
        private _viewUI: ui.common.component.GaiMingKaUI;
        /** 飘窗提示界面 */
        private DisappearMessageTipsMediator:game.modules.commonUI.DisappearMessageTipsMediator;
        /**提示界面的单例 */
        public static _instance: RenameMediators;
        /** 改名符的key */
        private renameKey:number;
        constructor(uiLayer: Sprite,app: AppBase)
        {
            super(uiLayer);
            this.uiLayer = app.uiRoot.general;
			this._clientWidth = app.clientWidth;
			this._clientHeight = app.clientHeight;
            this._app = app; 
			this._viewUI = new ui.common.component.GaiMingKaUI();
            this._viewUI.mouseThrough = true;
            // 默认居中
            this.isCenter = true;
        }
        
        public static getInstance(uiLayer: Sprite,app: AppBase): RenameMediators 
        {
            if (!this._instance) 
            {
                this._instance = new RenameMediators(uiLayer,app);
            }
            return this._instance;
        }


        ////////////////
        ///业务逻辑
        ////////////////
        /**
         * @describe  改名卡
         *  
         */
        public onShow(renameKey:number): void {
            this.renameKey = renameKey;
            super.show();
            this.onLoad();
            this.registEvent();
        }
        /** 初始化数据 */
        private onLoad():void
        {
            let oldName = LoginModel.getInstance().roleDetail.rolename;
            this._viewUI.oldname_lab.changeText(oldName);
            let roleId = LoginModel.getInstance().roleDetail.roleid;
            this._viewUI.IDnum_lab.text = "ID:"+ roleId;
        }
        private registEvent():void
        {
            this._viewUI.close_btn.on(LEvent.MOUSE_DOWN,this,this.hide);
            this._viewUI.reName_btn.on(LEvent.MOUSE_DOWN,this,this.onRenameEvent);
        }
        /** 点击改名 */
        private onRenameEvent():void
        {
            let textInput = this._viewUI.text_input.text;
            let islegitimate = this.chargeCharacter(textInput);
            if(!islegitimate)
            {
                let promp = "名字只能输入2-7个中文字符或4—11个英文字符";
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(promp);
            }else
            {
                let newName = this._viewUI.text_input.text;
                RequesterProtocols._instance.c2s_CModifyRoleName(newName,this.renameKey);
                this.hide();
            }
            
        }
        /** 判断输入是否合法 */
        public chargeCharacter(text:string):boolean
        {
            let textInput = text;
            if(textInput == null)
            {
                let promp = "请输入要修改的名称";
                this.DisappearMessageTipsMediator = new game.modules.commonUI.DisappearMessageTipsMediator(this._app);
                this.DisappearMessageTipsMediator.onShow(promp);
                return false;
            }else
            {
               /** 中文个数 */
               let chinese:number = 0;
               /** 数字个数 */
               let number:number = 0;
               /** 字母个数 包含26个大小写字母 */
               let letter:number = 0 
               let reg = new RegExp("[\u4E00-\u9FFF]+","g"); 
              for (var index = 0; index < textInput.length; index++) 
              {
                  if(textInput.charCodeAt(index) > 255)
                  {
                      chinese++;
                  }else if(textInput.charCodeAt(index) >= 48 && textInput.charCodeAt(index)<= 57)
                  {
                      number++;
                  }else if((textInput.charCodeAt(index) >= 65 && textInput.charCodeAt(index)<= 90) || (textInput.charCodeAt(index) >= 97 && textInput.charCodeAt(index) <= 122) )
                  {
                      letter++;
                  }
              }
              if((chinese >= 2 && chinese <= 7) || (letter >= 4 && letter <= 11) || ( letter  >= 4 && letter <= 11 ) )
              {
                  return true;
              }
              return false;
            }
        }
        public hide(): void {
            super.hide();
        }

        public getView(): Sprite {
            return this._viewUI;
        }
       
        ////////////////
        ///UI
        ////////////////

        /**
         * @describe  设置提示语
         * @param prompt   提示语
         */

      

       


        ////////////////
        ///事件
        ////////////////

       
    }
}