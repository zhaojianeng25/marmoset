/**
* 野生宠物回收信息
*/
module game.modules.pet.models {
    export class PetRecoveryInfo {
        /** 宠物回收所需要的key */
        public petKey: number;
        /** 宠物名称 */
        public petName: string;
        /** 宠物等级 */
        public petLevel: number;
        constructor() {
        }
    }
}