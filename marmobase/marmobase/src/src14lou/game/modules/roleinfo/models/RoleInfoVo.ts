/**
* 人物基础属性
*/
module game.modules.roleinfo.models{
	export class RoleInfoVo{
        /**序号 */
       public id: number;
        /**类型 */
       public type: number; 
       /**体质 */
       public tizhi: number;   
       /**魔力  */
       public moli: number;    
       /**力量 */
       public liliang: number; 
       /**耐力 */
       public naili: number;   
       /**敏捷 */
       public minjie: number;   

       constructor(){
       }
       public parse(data:Byte){
           this.id = data.getUint32();
           this.type = data.getUint32();
           this.tizhi = data.getUint32();
           this.moli = data.getUint32();
           this.liliang = data.getUint32();
           this.naili = data.getUint32();
           this.minjie = data.getUint32();
       }
	}
}