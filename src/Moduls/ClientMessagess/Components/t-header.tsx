import React from "react";
import {ICell} from "./cell";

const THeader: React.FC<ICell> = ({children, className}) => {
    return (
        <td className={`py-1.5 px-5 h-8 ${className ?? ''}`}>{children}</td>
    )
}
export {THeader};