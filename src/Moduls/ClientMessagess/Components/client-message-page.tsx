import React from "react";
import {ClientMessageTable} from "./client-message-table";

const ClientMessagePage : React.FC = () => {
    return (
        <div className='page-container'>
            <ClientMessageTable/>
        </div>
    )
}

export { ClientMessagePage }