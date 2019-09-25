/**
* name 
*/
module game.object{
    export interface IAvatarObj {
		userData:any;       //使用者才知道的数据，方便，性能考虑
        // isValid:boolean;    //是否有效
        pos:Vector2;        //场景位置
        hiding:boolean;
	}
}