import React from "react";

type Props = {
    onChange?: (value: string) => void | Promise<void>;
    placeholder?: string;
    name?: string;
    value?: string;
};

const Input = ({
    
    
    onChange,
    placeholder,
    name,
    value,
}: Props) => {
    const changeHandler = !onChange ? undefined : (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };
    return (
        <input
            name={name}
            onChange={changeHandler}    
            placeholder={placeholder}    
            value={value}
        />
    );
};

export default Input;