import { useCallback, useEffect, useState } from "react";
import { UniquelyIdentified } from "../utils/UniquelyIdentified";

export const useSelectableList = <ItemType>(list : ItemType[], setList: React.Dispatch<React.SetStateAction<ItemType[]>>) => {

    class ItemSelection extends UniquelyIdentified {

        public readonly item : ItemType

        public isSelected : boolean
        


        constructor(item : ItemType, isSelected : boolean) {
            super()
            this.item = item
            this.isSelected = isSelected
        }

    }





    const [selectableItems, setSelectableItems] = useState<ItemSelection[]>([])
    
    useEffect(() => {

        setSelectableItems(list.map((item) => {
                return new ItemSelection(
                    item,
                    selectableItems.some(selection => selection.item === item && selection.isSelected))}
        ))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])



    const [previouslySelectedIndex, setPreviouslySelectedIndex] = useState(0)

    const getAllSelected = () => {

        return selectableItems.filter((selectable) => selectable.isSelected)
    
    }

    const getAllNotSelected = () => {

        return selectableItems.filter((selectable) => !selectable.isSelected)
    
    }

    const amountSelected = () => {

        let amt = 0;
        for(let i = 0; i < selectableItems.length; i++) {
            if(selectableItems[i].isSelected) amt++
        }

        return amt
    }

    const anySelected = () => {

        return selectableItems.some((selectable) => selectable.isSelected)
    
    }





    const toggleItemFromSelection = useCallback((itemindex : number) => {

        const _temp = selectableItems
        _temp[itemindex].isSelected = !_temp[itemindex].isSelected
        setSelectableItems([..._temp])

    }, [selectableItems])



    const clearSelection = useCallback(() => {

        const _noneSelected = [...selectableItems]

        for(let i = 0; i < _noneSelected.length; i++) {
            _noneSelected[i].isSelected = false
        }

        setSelectableItems([..._noneSelected])

    }, [selectableItems])



    const selectAll = useCallback(() => {

        const _allSelected = [...selectableItems]

        for(let i = 0; i < _allSelected.length; i++) {
            _allSelected[i].isSelected = true
        }

        setSelectableItems([..._allSelected])

    }, [selectableItems])



    const removeCurrentSelectionFromList = useCallback(() => {

        setList(
            selectableItems.filter(
                (selection : ItemSelection) => { return !selection.isSelected }
            ).map((selection) => selection.item)
        )
        
        setPreviouslySelectedIndex(0)

    }, [selectableItems, setList])





    const handleClickSelect = useCallback((itemindex : number) => {
        setPreviouslySelectedIndex(itemindex);

        if(selectableItems[itemindex].isSelected) {
            toggleItemFromSelection(itemindex)
        }
        else {
            clearSelection()
            toggleItemFromSelection(itemindex)
        }
    }, [clearSelection, selectableItems, toggleItemFromSelection])



    const handleCtrlKeySelect = useCallback((itemindex : number) => {
        setPreviouslySelectedIndex(itemindex);
        toggleItemFromSelection(itemindex)
    }, [toggleItemFromSelection])



    const handleShiftClickSelect = useCallback((itemindex : number) => {
        if(selectableItems[previouslySelectedIndex].isSelected) {
            if(itemindex < previouslySelectedIndex) {
                for(let i = itemindex; i <= previouslySelectedIndex; i++) {
                    selectableItems[i].isSelected = true
                }
            }
            else {
                for(let i = itemindex; i >= previouslySelectedIndex; i--) {
                    selectableItems[i].isSelected = true
                }
            }
        }
        else {
            for(let i = 0; i <= itemindex; i++) {
                selectableItems[i].isSelected = true
            }
        }

        setPreviouslySelectedIndex(itemindex);
        setSelectableItems([...selectableItems])
    }, [previouslySelectedIndex, selectableItems])





    const handleSelectionOnKeyDown = useCallback((event : KeyboardEvent) => {
        
        if(event.key === "Escape") {
            clearSelection()
        }
        else if(event.ctrlKey) {
            if(event.key === "a") {
                selectAll()
            }
        }

    }, [clearSelection, selectAll])


    
    const handleSelectionOnClick = useCallback((event : React.MouseEvent<any, MouseEvent>, itemIndex : number) => {

        if (event.shiftKey) {
            handleShiftClickSelect(itemIndex);
        }
        else if (event.ctrlKey) {
            handleCtrlKeySelect(itemIndex);
        }
        else {
            handleClickSelect(itemIndex);
        }

        setPreviouslySelectedIndex(itemIndex);
    }, [handleClickSelect, handleCtrlKeySelect, handleShiftClickSelect])





    
    return {

        selectableItems,
        setSelectableItems,

        getAllSelected,
        getAllNotSelected,
        amountSelected,
        anySelected,

        previouslySelectedIndex,

        handleClickSelect,
        handleCtrlKeySelect,
        handleShiftClickSelect,

        toggleItemFromSelection,

        clearSelection,
        selectAll,
        removeCurrentSelectionFromList,

        handleSelectionOnKeyDown,
        handleSelectionOnClick

    }
    
}