export declare class MultipleSelect {
    items: any[];
    selectedItems: any[];
    isSearchFilterEnabled: boolean;
    itemsToSelect: SelectableItem[];
    itemsAlreadySelected: SelectableItem[];
    filterOfSelectableItems: string;
    filterOfSelectedItems: string;
    displayFieldName: string;
    selectableTitle: string;
    selectionTitle: string;
    private _itemsInternal;
    private _isAttached;
    private _ignoreInternalSelectedItemsChanged;
    filterItemAction: (filterKeyword: string, item: any) => boolean;
    getItemDisplay: (item: any) => string;
    attached(): void;
    dettached(): void;
    itemsChanged(): void;
    selectedItemsChanged(): void;
    filterOfSelectableItemsChanged(): void;
    filterOfSelectedItemsChanged(): void;
    selectItem(item: SelectableItem, addToSelected: boolean): void;
    private refreshLists();
}
export declare class SelectableItem {
    item: any;
    isSelected: boolean;
    indexInList: number;
    constructor(item: any, isSelected: boolean, indexInList: number);
}
