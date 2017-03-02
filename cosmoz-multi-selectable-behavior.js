/*global Cosmoz, Polymer, window */
"use strict";

window.Cosmoz = window.Cosmoz || {};

/**
  @polymerBehavior
 */
Cosmoz.MultiSelectableBehaviorImpl = {
	properties: {
		multiSelection: {
			type: Boolean,
			value: false
		},
		selectedItems: {
			type: Array,
			notify: true
		}
	},

	selectItems: function (items) {
		items.forEach(function (item) {
			this.selectItem(item);
		}, this);
	},

	selectItem: function (item) {
		if (this.multiSelection) {
			if (this.selectedItems) {
				if (this.selectedItems.indexOf(item) < 0) {
					this.push('selectedItems', item);
				}
			} else {
				this.selectedItems = [item];
			}
		} else {
			this.selectedItem = item;
			this.selectedItems = [item];
		}
	},

	deselectItem: function (item) {
		var	selectedIndex = this.selectedItems ? this.selectedItems.indexOf(item) : -1;
		if (selectedIndex !== -1) {
			this.splice('selectedItems', selectedIndex, 1);
		}
	},

	emptySelection: function () {
		if (this.selectedItems) {
			this.splice('selectedItems', 0, this.selectedItems.length);
			//this.set('selectedItems', []);
		}
		if (!this.multiSelection) {
			this.selectedItem = null;
		}

	},

	isSelected: function (item) {
		if (this.selectedItems) {
			return this.selectedItems.indexOf(item) >= 0;
		}
	},

};

/**
  @polymerBehavior
 */
Cosmoz.MultiSelectableBehavior = [
	Cosmoz.SelectableBehavior,
	Cosmoz.MultiSelectableBehaviorImpl
];