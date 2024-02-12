import React from "react";
import _ from 'lodash'





type NavButtonProps = {

    title : string
    placeholder : string
    errorFunction? : (val : string) => string
    onChange? : (e : React.ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit? : (e : React.FormEvent<HTMLFormElement>) => void
    value : string
    height? : number

}

type NavButtonState = {

    errorFunction? : (val : string) => string
    errorMessage? : string
    onChange? : (e : React.ChangeEvent<HTMLTextAreaElement>) => void
    onSubmit? : (e : React.FormEvent<HTMLFormElement>) => void
    value : string
    height : number

}



class MultilineInputBox extends React.Component<NavButtonProps> {
    
    public readonly state : NavButtonState = {

        errorFunction: this.props.errorFunction,
        errorMessage: "",
        onChange: this.props.onChange,
        onSubmit: this.props.onSubmit,
        value : this.props.value,
        height : this.props.height || 8

    }

    

    componentDidUpdate(prevProps : NavButtonProps) {

        if(!_.isEqual(prevProps, this.props)) {
            this.setState({
                errorFunction: this.props.errorFunction,
                onChange: this.props.onChange,
                onSubmit: this.props.onSubmit,
                value: this.props.value,
                height: this.props.height || 8
            });
        }
        
    }

    

    render () {
        return (
            <form
                onSubmit={(event) => {
                    event.preventDefault()

                    if(this.state.errorFunction) {
                        this.setState({
                            errorMessage: this.state.errorFunction(this.state.value),
                            errorFunction: this.state.errorFunction,
                            value: this.state.value,
                            height: this.state.height
                        })
                    }

                    if(this.state.onSubmit) {
                        this.state.onSubmit(event);
                    }
                }
            }>
                <label
                    className="flex pb-3 w-full select-none !overflow-visible truncate text-[2rem] font-normal leading-tight text-gray-500">
                    {this.props.title}
                </label>
                <div className={`select-none relative h-[${this.state.height}rem] min-w-[200px]`}>
                    <textarea
                        value={this.state.value}
                        placeholder={this.props.placeholder}
                        onChange={(event) => {
                            event.preventDefault()
                            
                            this.setState({
                                errorMessage: this.state.errorMessage,
                                errorFunction: this.state.errorFunction,
                                value: event.target,
                                height: this.state.height
                            })

                            if(this.state.onChange) {
                                this.state.onChange(event)
                            }
                        }}
                        className="text-[1rem] h-full w-full border border-blue-gray-200 bg-transparent pb-0 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                    <span className="text-red">{this.state.errorMessage}</span>
                </div>
            </form>
        )
    }

}

export default MultilineInputBox