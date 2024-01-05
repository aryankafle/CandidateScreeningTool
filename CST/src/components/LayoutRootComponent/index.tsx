import { ReactNode } from "react";

const Root = (props: {children : ReactNode}) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-between overflow-auto">
       {props.children}
    </div>
  )
};

export default Root;