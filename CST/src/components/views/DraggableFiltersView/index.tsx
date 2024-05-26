import { SetStateAction } from "react";

import { Filter } from "../../../utils/Filter";



import { useTheme } from "@mui/material"; 

import Box from "@mui/material/Box";
import List from "@mui/material/List";

import DraggableList from "../DraggableList";

import { FilterLayerCard } from "../../list-cards/FilterCard";





type DraggableFiltersViewProps = {

    selectedFilters : Filter[]
    setSelectedFilters: React.Dispatch<SetStateAction<Filter[]>>

}




export const DraggableFiltersView = ({ selectedFilters, setSelectedFilters } : DraggableFiltersViewProps) => {

    const { palette } = useTheme()



    function handleRemoveFilter(index : number) {

        const temp = [...selectedFilters].filter((filter, someIndex) => someIndex !== index)
        
        setSelectedFilters(temp)
        
    }



    

    return (
        <Box
            sx={{
                padding: "0.333em",
                flexGrow: 1,
                overflow: "auto"
            }}
        >

            <List>
                <DraggableList
                    uniqueIDItems={selectedFilters}
                    setUniqueIDItems={setSelectedFilters}
                    onDelete={(index) => handleRemoveFilter(index)}
                    ItemCard={FilterLayerCard}
                    className="h-[10em] overflow-x-clip"
                />
            </List>

        </Box>
    );
}