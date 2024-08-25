import React from "react";

export interface ICell {
    children: React.ReactNode;
    className?: string
}

const Cell: React.FC<ICell> = ({children, className}) => {
    return (
        <td className={`py-1.5 px-5 h-8 ${className ?? ''}`}>{children}</td>
    )
}

export { Cell }

