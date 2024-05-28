import { ReactNode } from "react";





const Root = (props: {children : ReactNode}) => {
  return (
    <div style={{
        height: "100vh",
        width: "100vw",
        overflow: "clip",
    }}>
       {props.children}
    </div>
  )
};

export default Root;