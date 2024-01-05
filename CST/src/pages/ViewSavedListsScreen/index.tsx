import React, { FC, InputHTMLAttributes} from "react";
import { Key, useContext, useEffect, useState } from "react";


const ViewSavedListsScreen = () => {
    const [nameInput, setNameInput] = useState("");
    const onChange = (str: string) => {
        setNameInput(str);
    };

    // const LinkBox = (InputProps: {className: string, label: string}) => {
    //     return (
    //         <div className = "input-wrapper">
    //             <label htmlFor = {InputProps.className}>{InputProps.label}</label>
    //             <input id={InputProps.className} ></input>
    //         </div>
    //     )
    // }
    type Props = {
        onChange: (str: string) => void;
        placeholder: string;
        name: string;
        value?: string;
       // onkeypress: (event: React.KeyboardEventHandler<HTMLElement>) => void;
    };
    function Input({ onChange, name, placeholder, value = "" }: Props) {
        return (
            <input
            onChange={event => onChange(event.target.value)}
            name={name}
            placeholder={placeholder}
            value={value}
            />
        );
    }
    // function handleEnterKey(e){ 
    //     if(e.keyCode == 13){ // enter pressed
    //         try{
    //             e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    
    //             //DO ALTERNATE ACTION RATHER THAN SEND ENTER
    
    //         }catch(err){
    //             console.log(err.message); 
    //         }
    //     }
    // }

    return(
        //<div>
            <form>
                <Input
                    onChange={onChange}
                    name="name"
                    placeholder="Enter your name"
                    value={nameInput}
                    //onkeypress= "handleEnterKey(event)"
                />
            </form>

    )
    
    
}
export default ViewSavedListsScreen