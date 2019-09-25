module game.data.template{
    export class MarryConfBaseVo{
        public id:number;
        public effectid:number;//显示特效ID
        public posx:number;//显示特效X轴
        public posy:number;//显示特效Y轴
        public actionid:number;//显示动画ID
        public actiontime:number;//动画时间（s）
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.effectid = data.getUint32();
            this.posx = data.getUint32();
            this.posy = data.getUint32();
            this.actionid = data.getUint32();
            this.actiontime = data.getUint32();           
        }
    }
}