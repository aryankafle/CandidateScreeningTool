import React, { ReactNode, Component } from "react";
import Portal from "../Portal";
import _ from "lodash";





type ModalProps = {

    onClose : () => void
    className? : string
    modalTrigger : boolean

}

type ModalState = {

    onClose : () => void
    className? : string
    modalTrigger : boolean

}

class Modal extends Component<ModalProps & { children?: ReactNode }> {
    
    private handleClose = () => {

        this.state.onClose()

    }
    

    
    public readonly state : ModalState = {
        
        onClose: this.props.onClose,
        className: this.props.className,
        modalTrigger: this.props.modalTrigger
        
    }

    

    componentDidUpdate(prevProps : ModalProps) {

        if(!_.isEqual(prevProps, this.props)) {
            this.setState(
                {
                    onClose: this.props.onClose,
                    className: this.props.className,
                    modalTrigger: this.props.modalTrigger
                }
            )
        }

    }



    render() {
        return this.state.modalTrigger && (
            <Portal>
                <div className={"" + this.props.className}
                    onClick={
                        (event) => {
                            if(event.currentTarget === event.target) {
                                this.handleClose();
                            }
                        }
                    }
                    style={
                        {
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
                        }
                    }>
                    <div className="flex flex-grow w-screen h-screen">
                        {this.props.children}
                    </div>
                </div>
            </Portal>
        )
    }

}


export default Modal