/**
* 人物称谓 by ljm 
*/
module game.modules.bag.models{
	export class RoleTitleVo 
    {
    public titleid: number ;
    public name: string ;
    public availtime: number ;
        
	  constructor()
      {

      }
		public fromByteArray(bytes:ByteArray): void 
        {
            this.titleid = bytes.readInt32();
            this.name = ByteArrayUtils.readUtf16String(bytes);
            this.availtime = ByteArrayUtils.readLong(bytes);
		}
	}
}