/*global Cosmoz, Polymer, window */
'use strict';

window.Cosmoz = window.Cosmoz || {};

/**
  @polymerBehavior
 */
Cosmoz.SelectableBehavior = {
	properties: {
		/**
		 * Currently selected item
		 */
		selectedItem: {
			type: Object,
			readOnly: true,
			notify: true
		},
		/**
		 * The list of selectable items
		 */
		items: {
			type: Array,
			observer: '_itemsChanged'
		},
		/**
		 * Whether to maintain selection even when selectedItem
		 * isn't in the list of items anymore.
		 */
		persistSelection: {
			type: Boolean,
			value: false
		},
		valueProperty: {
			type: String,
			value: 'label'
		}
	},

	_itemsChanged: function (newItems) {
		if (!this.persistSelection && newItems.indexOf(this.selectedItem) === -1) {
			this.emptySelection();
		}
		this.fire('items-changed', { items: this.items});
	},

	selectItem: function (item) {
		this._setSelectedItem(item);
	},

	emptySelection: function (item) {
		this._setSelectedItem(null);
	},

	selectByIndex: function (itemIndex) {
		var item = this.items[itemIndex];
		this.selectItem(item);
	},

	selectByValue: function (value) {
		var item = this._valueToItem(value);
		if (item) {
			this.selectItem(item);
		}

	},

	_valueToItem: function (value) {
		return value === null
			? null
			: this.items[this._valueToIndex(value)];
	},
	_valueToIndex: function (value) {
		var index;

		this.items.some(function (item, i) {
			if (this._valueForItem(item) === value) {
				index = i;
				return true;
			}
		}, this);
		return index;
	},

	_valueForItem: function (item) {
		return item[this.valueProperty];
	}
};