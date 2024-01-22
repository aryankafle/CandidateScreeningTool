import NavButton from "../NavButton"
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";





type BackButtonProps = {
    toRoute : string
}





const BackButton = (props: BackButtonProps) => {

    return (
        <NavButton 
            className=" dark:border-white dark:text-white dark:bg-black dark:hover:bg-gray dark:active:bg-blue
                        border-black text-black bg-white hover:bg-gray active:bg-blue
                        w-[3rem]"
            toRoute={props.toRoute}
        >
            <IonIcon icon={arrowBackOutline} size="small"/>
        </NavButton>
    );

}

export default BackButton