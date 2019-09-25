/**
* 路径配置
*/
module game {
	export class Path {
		static scene: string = "scene/";
		static scene_maps: string = "scene/maps/";
		static scene_avatar: string = "scene/avatar/";
		static scene_mask: string = "scene/mask/";
		static scene_sf: string = "scene/sf/";
		static scene_title: string = "scene/title/";
		
		static ui: string = "ui/";
		static ui_effect: string = "ui/effect/";
		static ui_tongyong: string = "ui/tongyong/";

		static atlas_ui_effect: string = "res/atlas/ui/effect/";
		static atlas_ui: string = "res/atlas/ui/";
		static atlas_scene: string = "res/atlas/scene/";
		static template: string = 'data/temp/template.bin';

		/**
		 * 获得一直序列帧地址
		 * @param path 图片路径
		 * @param count 帧数
		 * @param start 起始位置
		 * @param reverse 是否倒序播放
		 */
		static getSeqFrames(path: string, count: number, start: number = 0, reverse: boolean = false): string[] {
			let paths = [];
			if (reverse)
				for (let i = count - 1; i >= start; i--) {
					paths.push(StringU.substitute(path, i));
				}
			else
				for (let i = start; i < start + count; i++) {
					paths.push(StringU.substitute(path, i));
				}
			return paths;
		}
	}
}