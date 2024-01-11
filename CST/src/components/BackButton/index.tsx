import Button from "../ImprovedButtonComponent"
import { Navigate, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";





type ButtonProps = {
    toRoute : string
}




const BackButton = (props: ButtonProps) => {

    const navigate = useNavigate()



    return (
        <Button 
            className=" dark:border-white dark:text-white dark:bg-black dark:hover:bg-gray dark:active:bg-blue
                        border-black text-black bg-white hover:bg-gray active:bg-blue
                        rounded-md justify-center border-[0.1rem] w-[4rem] flex p-[0.5rem]"
            onClick={() => {
                navigate(props.toRoute)
            }}
        >
            <IonIcon icon={arrowBackOutline} size="small"/>
        </Button>
    );

}

export default BackButton