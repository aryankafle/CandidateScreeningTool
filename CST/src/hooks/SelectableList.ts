import { useCallback, useEffect, useState } from "react";

export const useSelectableList = <ItemType>(list : ItemType[], setList: React.Dispatch<React.SetStateAction<ItemType[]>>) => {

    type ItemSelection = {
        item: ItemType,
        isSelected: boolean
    }





    const [selectableItems, setSelectableItems] = useState<ItemSelection[]>([])
    
    useEffect(() => {

        setSelectableItems(list.map((item) => {
                return {item: item, isSelected: selectableItems.some(selection => selection.item === item && selection.isSelected)} as ItemSelection
            }
        ))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])



    const [previouslySelectedIndex, setPreviouslySelectedIndex] = useState(0)





    const toggleFileFromSelection = useCallback((fileIndex : number) => {

        const _temp = selectableItems
        _temp[fileIndex].isSelected = !_temp[fileIndex].isSelected
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





    const handleClickSelect = useCallback((fileIndex : number) => {
        setPreviouslySelectedIndex(fileIndex);

        if(selectableItems[fileIndex].isSelected) {
            toggleFileFromSelection(fileIndex)
        }
        else {
            clearSelection()
            toggleFileFromSelection(fileIndex)
        }
    }, [clearSelection, selectableItems, toggleFileFromSelection])



    const handleCtrlKeySelect = useCallback((fileIndex : number) => {
        setPreviouslySelectedIndex(fileIndex);
        toggleFileFromSelection(fileIndex)
    }, [toggleFileFromSelection])



    const handleShiftClickSelect = useCallback((fileIndex : number) => {
        if(selectableItems[previouslySelectedIndex].isSelected) {
            if(fileIndex < previouslySelectedIndex) {
                for(let i = fileIndex; i <= previouslySelectedIndex; i++) {
                    selectableItems[i].isSelected = true
                }
            }
            else {
                for(let i = fileIndex; i >= previouslySelectedIndex; i--) {
                    selectableItems[i].isSelected = true
                }
            }
        }
        else {
            for(let i = 0; i <= fileIndex; i++) {
                selectableItems[i].isSelected = true
            }
        }

        setPreviouslySelectedIndex(fileIndex);
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

        previouslySelectedIndex,

        handleClickSelect,
        handleCtrlKeySelect,
        handleShiftClickSelect,

        toggleFileFromSelection,

        clearSelection,
        selectAll,
        removeCurrentSelectionFromList,

        handleSelectionOnKeyDown,
        handleSelectionOnClick

    }
    
}