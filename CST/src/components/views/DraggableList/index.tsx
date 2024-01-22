import { UniquelyIdentified } from "../../../utils/UniquelyIdentified"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, SensorDescriptor, SensorOptions, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"





type DraggableListProps = {

    uniqueIDItems : UniquelyIdentified[]
    setUniqueIDItems : React.Dispatch<React.SetStateAction<any[]>>
    children : React.ReactNode
    sensors? : SensorDescriptor<SensorOptions>[]
    autoScroll? : boolean

}



const DraggableListWrapper : React.FC<DraggableListProps> = (props : DraggableListProps) => {

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    )



    const onDragEnd = (event : DragEndEvent) => {

        const { active, over } = event

        if(!over) return;



        const activeFilterId = active.id
        const overFilterId = over.id

        if(activeFilterId !== overFilterId) {
            props.setUniqueIDItems((filters) => {
                const activeFilterIndex = filters.findIndex((filter) => filter.id === activeFilterId)
                const overColumnIndex = filters.findIndex((filter) => filter.id === overFilterId)

                return arrayMove(filters, activeFilterIndex, overColumnIndex)
            })
        }
        
    }




    
    return (
        <DndContext
            onDragEnd={onDragEnd}
            sensors={props.sensors ? props.sensors : sensors}
            autoScroll={props.autoScroll ? props.autoScroll : true}
        >
            <SortableContext items={props.uniqueIDItems.map((uniquelyID) => {return {id: uniquelyID.id}})}>
                {props.children}
            </SortableContext>
        </DndContext>
    )

}

export default DraggableListWrapper