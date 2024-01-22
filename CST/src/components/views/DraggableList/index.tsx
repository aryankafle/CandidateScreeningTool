import { DndContext, DragEndEvent, PointerSensor, SensorDescriptor, SensorOptions, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { UniquelyIdentified } from "../../../utils/UniquelyIdentified"





type DraggableListProps = {

    uniqueIDItems : UniquelyIdentified[]
    setUniqueIDItems : React.Dispatch<React.SetStateAction<any[]>>
    sensors? : SensorDescriptor<SensorOptions>[]
    autoScroll? : boolean
    ItemCard : React.FC<{ item : any, isDragging : boolean}>
    className? : string

}



const DraggableList : React.FC<DraggableListProps> = (props : DraggableListProps) => {

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



    const ItemCard = (props: {item : UniquelyIdentified, ItemCard : React.FC<{ item : UniquelyIdentified, isDragging : boolean}>}) => {

        const ItemCard = props.ItemCard

        const { setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
            id: props.item.id,
            data: {
                item: props.item
            }
        })



        const style = {
            transition,
            transform: CSS.Transform.toString(transform)
        }




        
        if(isDragging) {
            return (
                <div 
                    style={style}
                    ref={setNodeRef}
                    className="cursor-grabbing"
                >
                    <ItemCard item={props.item} isDragging/>
                </div>
            )
        }
        else {
            return (
                <div 
                    style={style}
                    ref={setNodeRef}
                    {...attributes}
                    {...listeners}
                    className="cursor-grab"
                >
                    <ItemCard item={props.item} isDragging={false}/>
                </div>
    
            )
        }
    }


    
    return (
        <DndContext
            onDragEnd={onDragEnd}
            sensors={props.sensors ? props.sensors : sensors}
            autoScroll={props.autoScroll ? props.autoScroll : true}
        >
            <SortableContext items={props.uniqueIDItems.map((uniquelyID) => {return {id: uniquelyID.id}})}>
                <ol className={props.className}>
                    {props.uniqueIDItems.map((item) => (
                        <ItemCard key={item.id} item={item} ItemCard={props.ItemCard} />
                    ))}
                </ol>
            </SortableContext>
        </DndContext>
    )

}

export default DraggableList