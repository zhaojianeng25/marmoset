/**
* name 
*/
module game.data.template {
    export class TaskNodeBaseVo {
        public id: number;
        public text: string;
        public taskID: Array<string>; //taskID1,taskID2,taskID3,taskID4,taskID5,taskID6,taskID7,taskID8,taskID9,taskID10
        constructor() {

        }
        public parse(data: Byte) {
            this.id = data.getUint32();
            this.text = data.getUTFBytes(data.getUint32());
            let taskIDLength: number = data.getUint32();
            this.taskID = [];
            for (var index = 0; index < taskIDLength; index++) {
                this.taskID.push(data.getUTFBytes(data.getUint32()));
            }
        }
    }
}