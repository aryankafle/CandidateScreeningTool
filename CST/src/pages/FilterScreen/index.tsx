import { useContext } from "react"
import { FileContext } from "../../context/FileContext"
import BackButton from "../../components/BackButton"
import { IonIcon } from "@ionic/react"
import { colorWandOutline } from "ionicons/icons"
import NavButton from "../../components/NavButton"

const FilterScreen = () => {
    const fileContext = useContext(FileContext)

    return (
        <div className="w-screen">
            <div className="overflow-auto p-[0.3rem] flex flex-row justify-between">
                <div className="">
                    <BackButton toRoute="/home"></BackButton>
                </div>
                <div>
                    <NavButton
                            className=" dark:border-white dark:text-white dark:bg-black dark:hover:bg-gray dark:active:bg-blue
                                        border-black text-black bg-white hover:bg-gray active:bg-blue"
                            toRoute="/results"
                    >
                        <IonIcon
                            icon={colorWandOutline}
                            size="small"
                            className="self-center"
                        />
                        <span>Apply Filters</span>
                    </NavButton>
                </div>
            </div>
        </div>
        
        
        
    )
}
export default FilterScreen