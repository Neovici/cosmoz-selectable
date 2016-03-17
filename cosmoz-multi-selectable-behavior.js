/*global _, Cosmoz, document, Polymer, window */
"use strict";

window.Cosmoz = window.Cosmoz || {};

Cosmoz.MultiSelectableBehaviorImpl = {
	properties: {
		multiSelection: {
			type: Boolean,
			value: false
		},
		selectedItems: {
			type: Array,
			readOnly: true,
			notify: true
		}
	},

	selectItems: function (items) {
		var selectable = this;
		items.forEach(function (item) {
			selectable.selectItem(item);
		});
	},

	selectItem: function (item) {
		if (this.multiSelection) {
			if (this.selectedItems) {
				this.push('selectedItems', item);
			} else {
				this._setSelectedItems([item]);
			}
		} else {
			this._setSelectedItem(item);
			this._setSelectedItems([item]);
		}
	},

	deselectItem: function (item) {
		var
			i = this.selectedItems ? this.selectedItems.indexOf(item) : -1,
			selected = i >= 0;
		if (selected) {
			this.splice('selectedItems', i, 1);
		}
	},

	emptySelection: function () {
		if (this.selectedItems) {
			this.splice('selectedItems', 0, this.selectedItems.length);
			//this.set('selectedItems', []);
		}
		if (!this.multiSelection) {
			this._setSelectedItem(null);
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