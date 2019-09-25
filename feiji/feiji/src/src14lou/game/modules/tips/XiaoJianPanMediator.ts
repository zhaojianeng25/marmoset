/**
* 通用小键盘
*/
module game.modules.tips {
    export class XiaoJianPanMediator extends game.modules.UiMediator {
        private _viewUI: ui.common.component.XiaoJianPanUI;


        constructor(uiLayer: Sprite) {
            super(uiLayer);
            this._viewUI = new ui.common.component.XiaoJianPanUI();
            this.isCenter = false;
            this._viewUI.mouseThrough = true;
            this.initNumList();
        }

        /**
         * 初始化键盘数字
         */
        public initNumList() {
            var numArr: Array<any> = [];
            for (var i = 1; i <= 9; i++) {
                numArr.push({ num_btn: i })
            }
            var numlist = this._viewUI.num_list;
            numlist.array = numArr;
            numlist.repeatX = 3;
            numlist.repeatY = 3;

            this._viewUI.ok_btn.on(LEvent.MOUSE_DOWN, this, this.onOkBtn);
            this._viewUI.zero_btn.on(LEvent.MOUSE_DOWN, this, this.onZeroBtn);
            this._viewUI.delete_btn.on(LEvent.MOUSE_DOWN, this, this.onDeleteBtn);
            this._viewUI.yincang_box.on(LEvent.MOUSE_DOWN, this, this.hide);
            this._viewUI.num_list.selectHandler = new Handler(this, this.numListSelect);
        }
        /**
         * 隐藏小键盘
         * @describe 鼠标点击空白处，隐藏小键盘
         */
         public onHide():void{
             this.hide();
         }
        /**
         * 点击键盘数字
         * @param index 
         */
        public numListSelect(index: number) {
            if (this._viewUI.num_list.selectedIndex != -1) {
                var cell = this._viewUI.num_list.getCell(index);
                var num_btn: Button = cell.getChildByName("num_btn") as Button;
                var num = num_btn.label;
                this.sendNum(num);
                this._viewUI.num_list.selectedIndex = -1;
            }
        }

        /**
         * 点击0
         */
        public onZeroBtn() {
            this.sendNum(0);
        }

        /**
         * 点击删除
         */
        public onDeleteBtn() {
            this.sendNum(-1);
        }

        /**
         * 发送数据
         */
        public sendNum(num) {
            models.TipsProxy.getInstance().event(models.ON_KRYBOARD, num);
        }

        /**
         * 点击ok
         */
        public onOkBtn() {
            this.hide();
        }

        /**
         * @describe 输入x，y的值，再根据UI来进行小键盘UI位置的调整
         * @param x 
         * @param y 
         * @param UI 
         */
        public show(x?:number,y?:number,UI?:any) {
            if(x != null && y != null){
                if(UI != null){                    
                    if(UI = ui.common.RedEnvelopeUI){//如果是发送红包界面的UI
                        this._viewUI.bg_img.x = x;
                        this._viewUI.bg_img.y = y - this._viewUI.bg_img.height;
                    }
                }
            }
            super.show();
        }
        /**设置小键盘出现位置 */
        public onShow(x?:number,y?:number) {
            super.show();
            if(x != null && y != null){
                this._viewUI.bg_img.x = x;
                this._viewUI.bg_img.y = y;
            }
        }
        /** 
         * 获取购售商品数据
         * @param type  1商品限购次数查询  2商品限售次数查询
         * @param arr  查询商品id
         */
        public getgoodsLimit(type:number,arr:Array<number>):void
        {
            RequesterProtocols._instance.c2s_query_limit(type,arr);
        }

        public hide(): void {
            super.hide();
            this.sendNum(-2);
        }

        public getView(): Sprite {
            return this._viewUI;
        }
    }
}