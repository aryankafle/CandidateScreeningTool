import React, { FC, InputHTMLAttributes} from "react";
import { Key, useContext, useEffect, useState } from "react";


const ViewSavedListsScreen = () => {
    

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
    const [nameInput, setNameInput] = useState("");
    const onChange = (str: string) => {
        setNameInput(str);
    };


    return(
        //<div>
            <form>
                <Input
                    onChange={onChange}
                    name="name"
                    placeholder="Enter your name"
                    value={nameInput}
                />
            </form>
        //</div>
        // <div>
        //     <LinkBox className = "gruh" label = "buh"></LinkBox>
        // </div>
    )
    
    
}
export default ViewSavedListsScreen