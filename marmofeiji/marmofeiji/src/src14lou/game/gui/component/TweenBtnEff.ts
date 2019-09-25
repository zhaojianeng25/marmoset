
module game.gui.component {
	/**
	* 按钮效果
	*/
	export class TweenBtnEff {
		constructor() {

		}
		/**
		 * 按钮点击动画
		 * @param btn 按钮
		 * @param scaleX 原始缩放x
		 * @param scaleY 原始缩放y
		 */
		public static BtnTween(btn: any, scaleX: number = 1, scaleY: number = 1): void {
			if (btn && btn != Laya.stage) {
				if (btn.scaleX < 0 && scaleX == 1) scaleX = -1;
				if (btn.scaleY < 0 && scaleY == 1) scaleY = -1;
				let props: any = { scaleX: scaleX, scaleY: scaleY };
				btn.scaleX = scaleX * 0.75;
				btn.scaleY = scaleY * 0.75;
				Laya.Tween.clearAll(btn);
				Laya.Tween.to(btn, props, 500, Laya.Ease.elasticOut);
			}
		}
	}
}