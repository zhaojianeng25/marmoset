/**
* name 
*/
module game.modules.achievent.models
{
	export class ArchiveInfoVo
	{
		public archiveid:number ;		         // 历程id
		public state: number ;          		//状态 0 未完成, 1 已经完成, 2 已经领奖
		constructor()
		{

		}
	public fromByteArray(bytes:ByteArray):void 
	{
	  this.archiveid = bytes.readInt32();
	  this.state     = bytes.readInt32();
	  


	}
		
	}
}