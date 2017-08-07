System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, MultipleSelect, SelectableItem;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            MultipleSelect = (function () {
                function MultipleSelect() {
                    var _this = this;
                    this.isSearchFilterEnabled = true;
                    this.itemsToSelect = [];
                    this.itemsAlreadySelected = [];
                    this.filterOfSelectableItems = "";
                    this.filterOfSelectedItems = "";
                    this.displayFieldName = "name";
                    this.selectableTitle = "";
                    this.selectionTitle = "";
                    this._itemsInternal = [];
                    this._isAttached = false;
                    this._ignoreInternalSelectedItemsChanged = false;
                    this.filterItemAction = function (filterKeyword, item) {
                        if (item) {
                            if (item[_this.displayFieldName] && item[_this.displayFieldName].indexOf) {
                                if (item[_this.displayFieldName].toLowerCase().indexOf(filterKeyword.toLowerCase()) > -1) {
                                    return true;
                                }
                            }
                            if (item.indexOf && item.toLowerCase().indexOf(filterKeyword.toLowerCase()) > -1) {
                                return true;
                            }
                        }
                        ;
                        return false;
                    };
                    this.getItemDisplay = function (item) {
                        if (item && item[_this.displayFieldName]) {
                            return item[_this.displayFieldName];
                        }
                        return item;
                    };
                }
                MultipleSelect.prototype.attached = function () {
                    this._isAttached = true;
                    this.itemsChanged();
                };
                MultipleSelect.prototype.dettached = function () {
                    this._isAttached = false;
                    this._itemsInternal = [];
                };
                MultipleSelect.prototype.itemsChanged = function () {
                    var _this = this;
                    if (!this._isAttached) {
                        return;
                    }
                    this._itemsInternal = [];
                    if (!this.items) {
                        return;
                    }
                    this.items.forEach(function (item, index) {
                        var isItemSelected = false;
                        if (_this.selectedItems) {
                            isItemSelected = _this.selectedItems.indexOf(item) > -1;
                        }
                        _this._itemsInternal.push(new SelectableItem(item, isItemSelected, index));
                    });
                    this.refreshLists();
                };
                MultipleSelect.prototype.selectedItemsChanged = function () {
                    if (this._ignoreInternalSelectedItemsChanged == true) {
                        this._ignoreInternalSelectedItemsChanged = false;
                        return;
                    }
                    this.itemsChanged();
                };
                MultipleSelect.prototype.filterOfSelectableItemsChanged = function () {
                    this.refreshLists();
                };
                MultipleSelect.prototype.filterOfSelectedItemsChanged = function () {
                    this.refreshLists();
                };
                MultipleSelect.prototype.selectItem = function (item, addToSelected) {
                    item.isSelected = addToSelected;
                    this.refreshLists();
                    this._ignoreInternalSelectedItemsChanged = true;
                    this.selectedItems = this.itemsAlreadySelected.map(function (localItem) { return localItem.item; });
                    return;
                };
                MultipleSelect.prototype.refreshLists = function () {
                    var _this = this;
                    var itemsAlreadySelected = [];
                    var itemsToSelect = [];
                    this._itemsInternal.forEach(function (item) {
                        if (item.isSelected) {
                            if (_this.filterOfSelectedItems.trim() !== "") {
                                if (!_this.filterItemAction(_this.filterOfSelectedItems.trim(), item.item)) {
                                    return;
                                }
                            }
                            itemsAlreadySelected.push(item);
                        }
                        else {
                            if (_this.filterOfSelectableItems.trim() !== "") {
                                if (!_this.filterItemAction(_this.filterOfSelectableItems.trim(), item.item)) {
                                    return;
                                }
                            }
                            itemsToSelect.push(item);
                        }
                    });
                    this.itemsAlreadySelected = itemsAlreadySelected;
                    this.itemsToSelect = itemsToSelect;
                };
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", Array)
                ], MultipleSelect.prototype, "items", void 0);
                __decorate([
                    aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
                    __metadata("design:type", Array)
                ], MultipleSelect.prototype, "selectedItems", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", Boolean)
                ], MultipleSelect.prototype, "isSearchFilterEnabled", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", String)
                ], MultipleSelect.prototype, "filterOfSelectableItems", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", String)
                ], MultipleSelect.prototype, "filterOfSelectedItems", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", String)
                ], MultipleSelect.prototype, "displayFieldName", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", String)
                ], MultipleSelect.prototype, "selectableTitle", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", String)
                ], MultipleSelect.prototype, "selectionTitle", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", Function)
                ], MultipleSelect.prototype, "filterItemAction", void 0);
                __decorate([
                    aurelia_framework_1.bindable,
                    __metadata("design:type", Function)
                ], MultipleSelect.prototype, "getItemDisplay", void 0);
                return MultipleSelect;
            }());
            exports_1("MultipleSelect", MultipleSelect);
            SelectableItem = (function () {
                function SelectableItem(item, isSelected, indexInList) {
                    this.item = item;
                    this.isSelected = isSelected;
                    this.indexInList = indexInList;
                }
                return SelectableItem;
            }());
            exports_1("SelectableItem", SelectableItem);
        }
    };
});

//# sourceMappingURL=multiple-select.js.map
