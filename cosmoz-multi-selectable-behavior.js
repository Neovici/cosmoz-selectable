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
			readOnly: true,
			notify: true
		},

		selectedValues: {
			type: Array,
			notify: true
		}
	},

	observers: [
		'_selectedChanged(selectedValues.splices)'
	] ,

	_selectedChanged: function (change) {
		if (this.multiSelection) {
			this._updateMultiSelected(this.selectedValues);
		} else {
			this._updateSelected(this.selected);
		}
	},

	_updateMultiSelected: function (values) {
		if (values) {
			if (!this._doNotUpdateSelectedItems) {
				var newSelectedItems = this._valuesToItems(values);
				if (this.selectedItems) {
					this.splice.apply(this, ['selectedItems', 0, this.selectedItems.length].concat(newSelectedItems));
				} else {
					this._setSelectedItems(newSelectedItems);
				}
			}
		}
	},

	selectItems: function (items) {
		items.forEach(function (item) {
			this.selectItem(item);
		}, this);
	},

	selectItem: function (item) {
		var newSelectedValues;
		if (this.multiSelection) {
			if (this.selectedItems) {
				if (this.selectedItems.indexOf(item) < 0) {
					this.push('selectedItems', item);
				}
			} else {
				this._setSelectedItems([item]);
			}
			newSelectedValues = this._itemsToValues(this.selectedItems);
			this._doNotUpdateSelectedItems = true;
			if (this.selectedValues) {
				this.splice.apply(this, ['selectedValues', 0, this.selectedValues.length].concat(newSelectedValues));
			} else {
				this.selectedValues = newSelectedValues;
			}
			this._doNotUpdateSelectedItems = false;

		} else {
			this._doNotUpdateSelectedItem = true;
			this._setSelectedItem(item);
			this._doNotUpdateSelectedItem = false;

			this._setSelectedItems([item]);
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
			this._setSelectedItem(null);
		}

	},

	isSelected: function (item) {
		if (this.selectedItems) {
			return this.selectedItems.indexOf(item) >= 0;
		}
	},

	_valuesToItems: function (values) {
		return values === null ? null : values.map(function (value) {
			return this._valueToItem(value);
		}, this);
	},

	_itemsToValues: function (items) {
		return items === null ? null : items.map(function (item) {
			return this._valueForItem(item);
		}, this);
	}

};

/**
  @polymerBehavior
 */
Cosmoz.MultiSelectableBehavior = [
	Cosmoz.SelectableBehavior,
	Cosmoz.MultiSelectableBehaviorImpl
];