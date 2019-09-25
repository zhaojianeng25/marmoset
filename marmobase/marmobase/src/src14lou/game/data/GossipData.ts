/**
* 闲聊数据
*/
module game.data {
	export class GossipData {
		//存储 生物ID和文本的关系（1对多的关系）
		// private static gossipData: laya.utils.Dictionary = new laya.utils.Dictionary();
		private static _isInit: boolean = false;
		constructor() {

		}
		// static init(): void {
		// 	if (GossipData._isInit)
		// 		return;
		// 	GossipData._isInit = true;
		// 	let count = Template.data["tb_gossip"].length;
		// 	for (let i: number = 1; i <= count; i++) {
		// 		let temp: any = Template.getGossipTempById(i);
		// 		for (let j = 0; j < temp.creature_id.length; j++) {
		// 			let list: Array<Number> = GossipData.gossipData.get(temp.creature_id[j]);
		// 			if (list == null) {
		// 				list = new Array<Number>();
		// 				GossipData.gossipData.set(temp.creature_id[j], list)
		// 			}
		// 			list.push(i);
		// 		}
		// 	}
		// }
		// //小黄鸡捡东西次数
		// static PICK_COUNT: number = 0;
		// static randGossip(entry: number): string {
		// 	let list: Array<number> = GossipData.gossipData.get(entry);
		// 	if (list == null)
		// 		return null;
		// 	let total: number = 0;
		// 	let datas: Array<any> = [];
		// 	for (var i = 0; i < list.length; i++) {
		// 		let temp: any = Template.getGossipTempById(list[i]);
		// 		datas.push(temp);
		// 		total += temp.gailv;
		// 	}
		// 	let rand = Math.random() * total;
		// 	for (var i = 0; i < list.length; i++) {
		// 		let temp: any = datas[i];
		// 		if (rand > temp.gailv) {
		// 			rand -= temp.gailv
		// 		}
		// 		else {
		// 			let msg = temp.text;
		// 			return msg;
		// 		}
		// 	}
		// 	datas.length = 0;
		// 	return null;
		// }

	}
}