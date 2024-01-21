import React, { ReactNode, Component } from "react";
import _ from "lodash"





type KeyedItem = {
    item : any
    id : string | number
}





type Selectable = {
    item : KeyedItem,
    isSelected : boolean
}



type SelectableListProps = {
    itemList : KeyedItem[]
    onSelect? : (selectedArray : Selectable[]) => void
    UnselectedCard : React.ReactNode
    SelectedCard : React.ReactNode
    selectionToggle? : boolean
}

type SelectableListState = {
    selectableList : Selectable[]
    onSelect? : (selectedArray : Selectable[]) => void
    UnselectedCard : React.ReactNode
    SelectedCard : React.ReactNode
    selectionToggle? : boolean
}



class SelectableList extends Component<SelectableListProps & { children?: ReactNode }> {
    
    public readonly state : SelectableListState = {
        
        selectableList : this.props.itemList.map(
            (item) => {
                return {item: item, isSelected: false} as Selectable
            }
        ),
        onSelect : this.props.onSelect,
        UnselectedCard : this.props.UnselectedCard,
        SelectedCard : this.props.SelectedCard,
        selectionToggle : this.props.selectionToggle
        
    }

    

    componentDidUpdate(prevProps : SelectableListProps) {

        if(!_.isEqual(prevProps, this.props)) {
            this.setState({
                selectableList : this.props.itemList.map(
                    (item) => {
                        const isItemAlreadySelected = this.state.selectableList.some(
                            (selection) => selection.item === item
                        )

                        return {item: item, isSelected: isItemAlreadySelected} as Selectable
                    }
                ),
                onSelect : this.props.onSelect,
                unselectedCard : this.props.UnselectedCard,
                selectedCard : this.props.SelectedCard,
                selectionToggle : this.props.selectionToggle
            })
        }

    }



    render() {
        return (
            <div>
                {this.state.selectableList.map(
                    (selectable) => {return this.props.UnselectedCard}
                )}
            </div>
        )
    }

}


export default SelectableList