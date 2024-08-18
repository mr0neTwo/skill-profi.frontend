import React from "react";

interface TemporaryPageProps {
    text: string;
}

const TemporaryPage : React.FC<TemporaryPageProps> = ({text}) => {
    return (
        <div className="temporary-page-container">
            <h3>{text}</h3>
        </div>
    )
}

export { TemporaryPage }