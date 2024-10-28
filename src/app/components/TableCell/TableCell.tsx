import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode
  additionalClassNames?: string,
  bgColor?: string
}

export default function TableCell({ children, ...props }:Props) {

  const className = "border-2 border-slate-600 px-2 " + props.additionalClassNames + " " + props.bgColor

  return(
    <td data-testid="TableCell" className={className}>{children}</td>
  )
}
