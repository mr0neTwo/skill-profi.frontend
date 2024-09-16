import React from "react"

interface IH1 {
    children: React.ReactNode;
    className?: string;
}

const H1: React.FC<IH1> = ({ children, className }) => {
    return (
        <h1 className={`text-4xl py-6 font-bold text-main dark:text-main-dark ${className}`}>{children}</h1>
    )
}

export { H1 }