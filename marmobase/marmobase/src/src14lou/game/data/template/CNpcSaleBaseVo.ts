/**
* @Author: LinQiuWen
* @description:s商店商城商会表/NPCMT3买卖物品表
*/
module game.data.template{
    export class CNpcSaleBaseVo{
       /*字段*/
       public id:number;   //商店ID
       public npcId:number;    //NPCid
       public shopName: string;    //商店名
       public funcTitle: string;   //NPC服务按钮名
       public currency: number;    //默认显示货币类型
       public floating: number;    //价格是否波动
       public goodsids: Array<number> = []; //商品1id,商品2id,商品3id,商品4id,商品5id,商品6id,商品7id,商品8id,商品9id,商品10id,商品11id,商品12id,商品13id,商品14id,商品15id,商品16id,商品17id,商品18id,商品19id,商品20id,商品21id,商品22id,商品23id,商品24id,商品25id,商品26id,商品27id,商品28id,商品29id,商品30id,商品31id,商品32id,商品33id,商品34id,商品35id,商品36id,商品37id,商品38id,商品39id,商品40id,商品41id,商品42id,商品43id,商品44id,商品45id,商品46id,商品47id,商品48id,商品49id,商品50id,商品51id,商品52id,商品23id,商品54id,商品55id,商品56id,商品57id,商品58id,商品59id,商品60id,商品61id,商品62id,商品63id,商品64id,商品65id,商品66id,商品67id,商品68id,商品69id,商品70id,商品71id,商品72id,商品73id,商品74id,商品75id,商品76id,商品77id,商品78id,商品79id,商品80id,商品81id,商品82id,商品83id,商品84id,商品85id,商品86id,商品87id,商品88id,商品89id,商品90id,商品91id,商品92id,商品93id,商品94id,商品95id,商品96id,商品97id,商品98id,商品99id,商品100id,商品101id

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.npcId = data.getUint32();
           this.shopName = data.getUTFBytes(data.getUint32());
           this.funcTitle = data.getUTFBytes(data.getUint32());
           this.currency = data.getUint32();
           this.floating = data.getUint32();
           let length = data.getInt32();
           for (var index = 0; index < length;index++) {
               this.goodsids.push(data.getUint32());
           }
       }
    }
}