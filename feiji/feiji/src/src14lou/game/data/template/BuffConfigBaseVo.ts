module game.data.template{
    export class BuffConfigBaseVo{
        public id:number;//Buff编号
        public name:string;//Buff名称
        public inbattle:number;//战斗内是否显示
        public strshowname:string;//Buff简述
        public shapeid:number;//图标id
        public discribe:string;//Tips描述
        public effect:string;//特效
        public effectsort:number;//特效优先级
        public wordeffect:string;//文字特效
        public wordsort:number;//文字特效优先级
        public cleartype:number;//清除方式
        public specialshow:Array<number>=[];//特殊表现
        public x:number;//人物脚底x偏移
        public y:number;//人物脚底y偏移
        public scale:number; //缩放比
        public floor:number;//特效层级，0代表特效在模型上， 1代模型在特效上
        
      
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.name = data.getUTFBytes(data.getUint32());    
            this.inbattle = data.getUint32();   
            this.strshowname = data.getUTFBytes(data.getUint32());
            this.shapeid = data.getInt32();   
            this.discribe = data.getUTFBytes(data.getUint32());
            this.effect = data.getUTFBytes(data.getUint32());
            this.effectsort = data.getUint32();   
            this.wordeffect = data.getUTFBytes(data.getUint32());
            this.wordsort = data.getUint32();  
            this.cleartype = data.getInt32();  
            let listCount:number = data.getUint32();
            for (var index = 0; index < listCount; index++) {
                this.specialshow.push(data.getUint32());            
            }
          
            this.x = data.getInt32();
            this.y = data.getInt32();
            this.scale = data.getFloat64();
            this.floor = data.getUint32();
            
        }
    }
}   