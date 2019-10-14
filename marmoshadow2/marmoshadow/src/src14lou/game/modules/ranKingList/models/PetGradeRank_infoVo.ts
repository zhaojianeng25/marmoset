
module game.modules.ranKingList.models{
    /** 宠物榜的Vo */
    export class PetGradeRank_infoVo{
        /** roleid 角色id */
        public roleid:number;//long型数据
        //宠物的唯一id
        public uniquePetId:number;//long型数据
        /** 角色名字 */
        public nickname:string;
        /** 宠物名字 */
        public petname:string;
        /** 宠物评分 */
        public petgrade:number;
        /** 排名 */
        public rank:number;
        /** 宠物颜色 */
        public colour:number;

        constructor(){

        }
        public fromByteArray(bytes:ByteArray):void {
			this.roleid = bytes.readLong();
            this.uniquePetId = bytes.readLong();
            this.nickname = ByteArrayUtils.readUtf16String(bytes);
            this.petname = ByteArrayUtils.readUtf16String(bytes);
            this.petgrade = bytes.readInt32();
            this.rank = bytes.readInt32();
            this.colour = bytes.readInt32();
	    }
    }
    
}
