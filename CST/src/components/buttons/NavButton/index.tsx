import Button from "../ImprovedButtonComponent"
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";





type NavButtonProps = {
    toRoute : string
    children : ReactNode
    className : string
    usesPreviousRoute? : boolean
}



const NavButton = (props: NavButtonProps) => {

    const navigate = useNavigate()



    return (
        <Button 
            className={`${props.className} rounded-md justify-center gap-[0.5rem] border-[0.1rem] flex p-[0.5rem]`}
            onClick={() => {
                if(props.usesPreviousRoute) {
                    navigate(-1)
                } else {
                    navigate(props.toRoute)
                }
            }}
        >
            {props.children}
        </Button>
    );

}

export default NavButton