module game.data.template{
    export class EffectConfigBaseVo{
        public id:number;//属性id
        public classname:string;//属性名
        public xianshi:number;//是否显示
        public color:number;//显示颜色
        public order:number;//显示优先级
        public effectid:number;//特效id
        public reducecolor:number;//减属性显示颜色
        public reduceeffectid:number;//减属性特效id
        public width:number;//特效宽度
        public ablLimit:number;//数值型值上限
        public pctLimit:number;   //百分比型值上限    
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.classname = data.getUTFBytes(data.getUint32());
            this.xianshi = data.getUint32();
            this.color = data.getUint32();
            this.order = data.getUint32();
            this.effectid = data.getUint32();
            this.reducecolor = data.getUint32();
            this.reduceeffectid = data.getUint32();
            this.width = data.getUint32();
            this.ablLimit = data.getFloat64();
            this.pctLimit = data.getFloat64();
            
        }
    }
}