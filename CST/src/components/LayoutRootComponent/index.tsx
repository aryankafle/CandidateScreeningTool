import { ReactNode } from "react";

const Root = (props: {children : ReactNode}) => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-clip">
       {props.children}
    </div>
  )
};

export default Root;