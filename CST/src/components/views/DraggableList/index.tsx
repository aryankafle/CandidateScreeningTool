import React, { Component, useState } from "react"
import _ from "lodash"
import { UniquelyIdentified } from "../../../utils/UniquelyIdentified"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, SensorDescriptor, SensorOptions, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import { Draggable } from "react-beautiful-dnd"





type DraggableListProps = {

    uniqueIDItems : UniquelyIdentified[]
    setUniqueIDItems : React.Dispatch<React.SetStateAction<any[]>>
    children : React.ReactNode
    sensors? : SensorDescriptor<SensorOptions>[]

}



const DraggableListWrapper : React.FC<DraggableListProps> = (props : DraggableListProps) => {
    
    const [activeItem, setActiveItem] = useState<UniquelyIdentified>()



    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    )





    const onDragStart = (event : DragStartEvent) => {

        if(event.active.data.current?.type === "Item") {
            setActiveItem(event.active.data.current.filter)
            return;
        }

    }



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

        setActiveItem(undefined)
        
    }




    
    return (
        <DndContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            sensors={props.sensors ? props.sensors : sensors}
            autoScroll={false}
        >
            <SortableContext items={props.uniqueIDItems.map((uniquelyID) => {return {id: uniquelyID.id}})}>
                {props.children}
            </SortableContext>
            { createPortal(activeItem && <DragOverlay />, document.body) }
        </DndContext>
    )

}

export default DraggableListWrapper