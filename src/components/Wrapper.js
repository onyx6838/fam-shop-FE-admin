import React from "react";
import { useSelector } from "react-redux";

const Wrapper = ({ children }) => {
  const layout = useSelector(state => state.layout)

  return (
    <div className={"wrapper " + (layout.isBoxed ? "wrapper-boxed" : "")}>
      {children}
    </div>
  )
}

export default Wrapper