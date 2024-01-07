import React, { ReactNode, Component } from "react";
import Portal from "../Portal";

type ModalProps = {
    handleClose : () => void
    className? : string
}

type ModalState = {
    handleClose : () => void
    className? : string
}

class Modal extends Component<ModalProps & { children?: ReactNode }> {
    
    
    
    
    public readonly state : ModalState = {
        handleClose: this.props.handleClose,
        className: this.props.className
    }

    

    componentDidUpdate(prevProps : ModalState) {
        if(prevProps.className !== this.props.className) {
          this.setState({isOpen: this.props.handleClose, className: this.props.className});
        }
    }



    render() {
        return <Portal>
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "#000000aa",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div className={"flex flex-col justify-center flex-grow " + this.state.className}>
                        <div className="self-end" onClick={this.state.handleClose}>
                            X
                        </div>
                        {this.props.children}
                    </div>
                    
                </div>
        </Portal>
    }
}


export default Modal