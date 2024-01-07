import React from "react";
import Portal from "../Portal";

class Modal extends React.Component<{ children?: React.ReactNode }> {
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
            {this.props.children}
        </div>
    </Portal>
  }
}

export default Modal