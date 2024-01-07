type ButtonProps = JSX.IntrinsicElements['button']
  
const Button = ({className, ...props }: ButtonProps) => {
    return (
        <button className={"select-none " + className} {...props}>
            {props.children}
        </button>
    );
}

export default Button