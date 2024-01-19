type ButtonProps = JSX.IntrinsicElements['button']



const Button = ({className, ...props }: ButtonProps) => {
    return (
        <button className={"flex flex-row select-none " + className} {...props}>
            {props.children}
        </button>
    );
}

export default Button