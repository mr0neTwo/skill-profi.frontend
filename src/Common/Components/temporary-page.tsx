import React from "react";

interface TemporaryPageProps {
    text: string;
}

const TemporaryPage : React.FC<TemporaryPageProps> = ({text}) => {
    return (
        <div className="flex justify-center items-center grow h-full w-full">
            <h3>{text}</h3>
        </div>
    )
}

export { TemporaryPage }