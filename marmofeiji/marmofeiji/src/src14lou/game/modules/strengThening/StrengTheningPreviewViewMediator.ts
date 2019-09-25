/**
* 装备预览 
*/
module game.modules.strengThening {
	export class StrengTheningPreviewViewMediator extends game.modules.UiMediator {
		public static LOGIN_EVENT: string = "strengTheningEvent";
		private _viewUI: ui.common.StrengTheningPreviewUI;

		/**装备生成基本属性表 */
		equipIteminfoData = StrengTheningModel.getInstance().equipIteminfoData;
		/**属性效果id表 */
		attributeDesConfigData = StrengTheningModel.getInstance().attributeDesConfigData;
		/**复合表 */
		itemAttrData = BagModel.getInstance().itemAttrData;
		/**道具类型表 */
		itemTypeData = StrengTheningModel.getInstance().itemTypeData;
		/**装备打造表 */
		equipMakeInfoData = StrengTheningModel.getInstance().equipMakeInfoData;

		constructor(uiLayer: Sprite, equipId) {
			super(uiLayer);
			this._viewUI = new ui.common.StrengTheningPreviewUI();
			this.isCenter = false;
			this._viewUI.close_btn.on(LEvent.MOUSE_DOWN, this, this.hide);
			this.showEquip(equipId);
		}
        
		/**显示装备 */
		public showEquip(equipId) {
			var icon = this.itemAttrData[equipId].icon;
			var m_icon = SaleModel._instance.getIcon(icon);
			this._viewUI.content_img.skin = m_icon;
			var name = this.itemAttrData[equipId].name;
			this._viewUI.equipName_lab.text = name;
			var itemtypeid = this.itemAttrData[equipId].itemtypeid;
			this._viewUI.equipType_lab.text = this.itemTypeData[itemtypeid].name;

			this.showEquipAttr(equipId);
		}
         
		/**显示装备属性 */
		public showEquipAttr(equipId): void {
			var attribute_list = this._viewUI.attribute_list;
			var attributeArr = [];
			var shuxing1id = this.equipIteminfoData[equipId].shuxing1id;   //属性id1
			if (shuxing1id != 0) {
				var attrName1 = this.attributeDesConfigData[shuxing1id].name;
				var vptdazhaoid = this.equipMakeInfoData[equipId].vptdazhaoid;
				var phyattack_Attr1 = this.getphyattack_Attr(equipId);
				var phyattack_Attr2 = this.getphyattack_Attr(vptdazhaoid[1]);
				var phyattack_Attr3 = this.getphyattack_Attr(vptdazhaoid[2]);
				attributeArr.push({ name_lab: attrName1, greenQuality_lab: phyattack_Attr1, blueQuality_lab: phyattack_Attr2, purpleQuality_lab: phyattack_Attr3 });
			}
			var shuxing2id = this.equipIteminfoData[equipId].shuxing2id;   //属性id2
			if (shuxing2id != 0) {
				var attrName2 = this.attributeDesConfigData[shuxing2id].name;
				var getmagicattack_Attr1 = this.getmagicattack_Attr(equipId);
				var getmagicattack_Attr2 = this.getmagicattack_Attr(vptdazhaoid[1]);
				var getmagicattack_Attr3 = this.getmagicattack_Attr(vptdazhaoid[2]);
				attributeArr.push({ name_lab: attrName2, greenQuality_lab: getmagicattack_Attr1, blueQuality_lab: getmagicattack_Attr2, purpleQuality_lab: getmagicattack_Attr3 });
			}
			var shuxing3id = this.equipIteminfoData[equipId].shuxing3id;   //属性id3
			if (shuxing3id != 0) {
				var attrName3 = this.attributeDesConfigData[shuxing3id].name;
				var getzhiliao_Attr1 = this.getzhiliao_Attr(equipId);
				var getzhiliao_Attr2 = this.getzhiliao_Attr(vptdazhaoid[1]);
				var getzhiliao_Attr3 = this.getzhiliao_Attr(vptdazhaoid[2]);
				attributeArr.push({ name_lab: attrName3, greenQuality_lab: getzhiliao_Attr1, blueQuality_lab: getzhiliao_Attr2, purpleQuality_lab: getzhiliao_Attr3 });
			}
			SaleModel._instance.showList(attribute_list, attributeArr);
		}

        /**获取物理属性 */
		public getphyattack_Attr(equipId) {
			var shuxing1bodongduanmin = this.equipIteminfoData[equipId].shuxing1bodongduanmin;
			var shuxing1bodongduanmax = this.equipIteminfoData[equipId].shuxing1bodongduanmax;
			var phyattack_Attr = "+" + shuxing1bodongduanmin[0] + "-" + shuxing1bodongduanmax[shuxing1bodongduanmax.length - 1];
			return phyattack_Attr;
		}

        /**法术攻击属性 */
		public getmagicattack_Attr(equipId) {
			var shuxing2bodongduanmin = this.equipIteminfoData[equipId].shuxing2bodongduanmin;
			var shuxing2bodongduanmax = this.equipIteminfoData[equipId].shuxing2bodongduanmax;
			var magicattack_Attr = "+" + shuxing2bodongduanmin[0] + "-" + shuxing2bodongduanmax[shuxing2bodongduanmax.length - 1];
			return magicattack_Attr;
		}
        
		/**治疗强度属性 */
		public getzhiliao_Attr(equipId) {
			var shuxing3bodongduanmin = this.equipIteminfoData[equipId].shuxing3bodongduanmin;
			var shuxing3bodongduanmax = this.equipIteminfoData[equipId].shuxing3bodongduanmax;
			var zhiliao_Attr = "+" + shuxing3bodongduanmin[0] + "-" + shuxing3bodongduanmax[shuxing3bodongduanmax.length - 1];
			return zhiliao_Attr;
		}

		public show(): void {
			models.StrengTheningProxy.getInstance().event(models.OPENZHEZHAO);
			super.show();
		}

		public hide(): void {
			models.StrengTheningProxy.getInstance().event(models.CLOSEZHEZHAO);
			super.hide();
		}

		public getView(): Sprite {
			return this._viewUI;
		}
	}
}