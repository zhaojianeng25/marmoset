/**
* 服务器的Vo
*/
module game.modules.createrole.models{
	export class ServerVo{ 
        /** 服务器名字 */
        public name:string;
        /** 服务器状态 */
        public serverstate:number;
        /** 服务器ip地址 */
        public ip:string;
        /** 服务器信息 */
        public serverinfo:string;
        /** 是否还是新服 */
        public isNew:boolean;
        /** 列表中的索引 */
        public index:number;
    }
}