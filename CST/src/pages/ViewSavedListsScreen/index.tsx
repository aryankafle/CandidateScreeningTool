import React, { FC, InputHTMLAttributes} from "react";
import { Key, useContext, useEffect, useState } from "react";
const ViewSavedListsScreen = () => {
    

    // function LinkTextBox(){
    //     <input
    //     type="text"
    //     value={this.state.value}
    //     onChange={this.handleChange}
    //  />
    // }
    const LinkBox = (InputProps: {className: string, label: string}) => {
        return (
            <div className = "input-wrapper">
                <label htmlFor = {InputProps.className}>{InputProps.label}</label>
                <input id={InputProps.className} ></input>
            </div>
        )
    }
    
    return(
        <div>
            <LinkBox className = "gruh" label = "buh"></LinkBox>
        </div>
    )
    
    
}
export default ViewSavedListsScreen