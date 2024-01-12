import React from "react";





type NavButtonProps = {
    title : string
    placeholder : string
    errorFunction? : (val : string) => string
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
}



type NavButtonState = {
    errorFunction? : (val : string) => string
    errorMessage? : string
    currentInput : string
}




class InputBox extends React.Component<NavButtonProps> {
    
    public readonly state : NavButtonState = {
        errorFunction: this.props.errorFunction,
        errorMessage: "",
        currentInput: "",
    }

    

    componentDidUpdate(prevProps : NavButtonProps) {
        if(prevProps.errorFunction !== this.props.errorFunction) {
          this.setState({errorFunction: this.props.errorFunction});
        }
    }

    

    render () {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault()

                    if(this.state.errorFunction) {
                        this.setState({
                            errorMessage: this.state.errorFunction(this.state.currentInput),
                            errorFunction: this.state.errorFunction,
                            currentInput: this.state.currentInput
                        })
                    }
                }
            }>
                <div className="relative h-[2rem] min-w-[200px]">
                    <label
                        className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        {this.props.title}
                    </label>
                    <input
                        placeholder={this.props.placeholder}
                        onChange={(event) => {
                            event.preventDefault()
                            
                            this.setState({
                                errorMessage: this.state.errorMessage,
                                errorFunction: this.state.errorFunction,
                                currentInput: event.target.value
                            })
                            this.props.onChange(event)
                        }}
                        className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    <span className="text-red">{this.state.errorMessage}</span>
                </div>
            </form>
        )
    }

}

export default InputBox