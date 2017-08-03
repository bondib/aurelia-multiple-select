import { bindable, bindingMode } from "aurelia-framework";

export class MultipleSelect {

    @bindable
    items: any[];

    @bindable({ defaultBindingMode: bindingMode.twoWay })
    selectedItems: any[];

    /**
     * If set to true - enables the filter searchbox above the selection. 
     * One must implement filterItemAction - so the filter will actully do something
     *
     * @type {boolean}
     * @memberof MultipleSelect
     */
    @bindable
    isSearchFilterEnabled: boolean = true;

    itemsToSelect: SelectableItem[] = [];
    itemsAlreadySelected: SelectableItem[] = [];

    /**
     *  gets or sets the selectable items list filter
     * @type {string}
     * @memberof MultipleSelect
     */
    @bindable
    filterOfSelectableItems: string = "";

    /**
     *  gets or sets the already selected items list filter
     * @type {string}
     * @memberof MultipleSelect
     */
    @bindable
    filterOfSelectedItems: string = "";

    /**
      * In case of not using a replacebale tmeplate - this field will be used
      * for each item - as the dsiplay field
      * @type {string}
      * @memberof MultipleSelect
       */
    @bindable
    displayFieldName: string = "name";

    private _itemsInternal: SelectableItem[] = [];
    private _isAttached: boolean = false;
    private _ignoreInternalSelectedItemsChanged: boolean = false;

    @bindable
    filterItemAction: (filterKeyword: string, item: any) => boolean =
    (filterKeyword, item) => {
        if (item) {
            if (item[this.displayFieldName] && item[this.displayFieldName].indexOf) {
                if (item[this.displayFieldName].toLowerCase().indexOf(filterKeyword.toLowerCase()) > -1) {
                    return true;
                }
            }

            if (item.indexOf && item.toLowerCase().indexOf(filterKeyword.toLowerCase()) > -1) {
                return true;
            }
        };
        return false;
    }

    /**
     *  In case of not using a replacebale template - enables to override
     *  the method that returns the item display (what to display)
     * @memberof MultipleSelect
     */
    @bindable
    getItemDisplay: (item: any) => string =
    (item: any) => {
        if (item && item[this.displayFieldName]) {
            return item[this.displayFieldName];
        }
        return item;
    }

    /*******  LIFE CYCLE  **** */

    attached() {
        this._isAttached = true;
        this.itemsChanged(); // populate lists
    }

    dettached() {
        this._isAttached = false;
        this._itemsInternal = [];
    }

    /*********** BINDING CHANGES */

    itemsChanged() {

        if (!this._isAttached) {
            return;
        }

        this._itemsInternal = [];
        if (!this.items) {
            return;
        }

        this.items.forEach((item, index) => {
            let isItemSelected = false;
            if (this.selectedItems) {
                isItemSelected = this.selectedItems.indexOf(item) > -1;
            }
            this._itemsInternal.push(new SelectableItem(item, isItemSelected, index));
        })

        this.refreshLists();
    }

    selectedItemsChanged() {
        if (this._ignoreInternalSelectedItemsChanged == true) {
            this._ignoreInternalSelectedItemsChanged = false;
            return;
        }
        this.itemsChanged();
    }


    /** filter changes */
    filterOfSelectableItemsChanged() {
        this.refreshLists();
    }

    filterOfSelectedItemsChanged() {
        this.refreshLists();
    }



    /** Selection of items */
    selectItem(item: SelectableItem, addToSelected: boolean) {

        item.isSelected = addToSelected;
        this.refreshLists();
        this._ignoreInternalSelectedItemsChanged = true;
        // refresh the selected items list:
        this.selectedItems = this.itemsAlreadySelected.map(localItem => localItem.item);
        return;
    }


    private refreshLists() {

        let itemsAlreadySelected: SelectableItem[] = [];
        let itemsToSelect: SelectableItem[] = [];

        this._itemsInternal.forEach(item => {
            if (item.isSelected) {
                if (this.filterOfSelectedItems.trim() !== "") {
                    if (!this.filterItemAction(this.filterOfSelectedItems.trim(), item.item)) // as filter doesn't match
                    {
                        return; // skip adding this item
                    }
                }
                itemsAlreadySelected.push(item);
            } else {
                if (this.filterOfSelectableItems.trim() !== "") {
                    if (!this.filterItemAction(this.filterOfSelectableItems.trim(), item.item)) // as filter doesn't match
                    {
                        return; // skip adding this item
                    }
                }
                itemsToSelect.push(item);
            }
        });

        this.itemsAlreadySelected = itemsAlreadySelected;
        this.itemsToSelect = itemsToSelect;
    }


}


export class SelectableItem {
    constructor(public item: any, public isSelected: boolean, public indexInList: number) {

    }
}
