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
        <Button onClick={() => {
            navigate(props.toRoute)
        }}>
            <IonIcon icon={arrowBackOutline} size="1rem"/>
        </Button>
    );

}

export default BackButton