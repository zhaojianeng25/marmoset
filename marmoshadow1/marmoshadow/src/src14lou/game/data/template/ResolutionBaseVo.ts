module game.data.template{
    export class ResolutionBaseVo{
        public id:number;
        public number:number;//编号
        public longa:number;//长
        public wide:number;//宽
        public description:string;//描述
        public positionsByresolution:Array<string>=[];//点位1,点位2,点位3,点位4,点位5,点位6,点位7,点位8,点位9,点位10,点位11,点位12,点位13,点位14,点位15,点位16,点位17,点位18,点位19,点位20,点位21,点位22,点位23,点位24,点位25,点位26,点位27,点位28
        public positionsBywatch:Array<string>=[];//观战点位1,观战点位2,观战点位3,观战点位4,观战点位5,观战点位6,观战点位7,观战点位8,观战点位9,观战点位10
        public positionsByme:string;//己方中心点位
        public positionsBytarget:string;//敌方中心点位
        constructor(){

        }
        public parse(data:Byte){
            this.id = data.getUint32();
            this.number = data.getUint32();
            this.longa = data.getUint32();
            this.wide = data.getUint32();
            this.description = data.getUTFBytes(data.getUint32());   
            let listCount:number = data.getUint32();
			for (var index = 0; index < listCount; index++) {	
                this.positionsByresolution.push(data.getUTFBytes(data.getUint32()));		
				//console.log(data.getUTFBytes(data.getUint32()));				
			}
             let listCount1:number = data.getUint32();
			for (var index = 0; index < listCount1; index++) {	
                this.positionsBywatch.push(data.getUTFBytes(data.getUint32()));			
				//console.log(data.getUTFBytes(data.getUint32()));				
			}
            this.positionsByme = data.getUTFBytes(data.getUint32());   
            this.positionsBytarget = data.getUTFBytes(data.getUint32());   
            
        }
    }
}   