import BackButton from "../../buttons/BackButton"
import { IonIcon } from "@ionic/react"
import { colorWandOutline } from "ionicons/icons"
import NavButton from "../../buttons/NavButton"





const HeaderButtons = () => {

    return (
        <div className="overflow-auto p-[0.3rem] flex flex-row justify-between">
            <div className="flex flex-col justify-center">
                <BackButton toRoute="/home"></BackButton>
            </div>
            <div className="flex flex-col justify-center">
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
    )
}

export default HeaderButtons