import React, {useState} from "react";
import {ClientRequestForms} from "./client-request-forms";
import {Button} from "../../Common/Components/button";

const MainPage: React.FC = () => {

    const [showForms, setShowForms] = useState(false)

    return (
        <div className='page-container mt-30'>
            <img  className='banner' src='/baner.jpg' alt='baner'/>
            <div className='main-quote'>IT консалтинг без регистрации и смс </div>
            <Button
                className='make-request-button-position'
                type='primary'
                text='Оставить заявку'
                onClick={() => setShowForms(!showForms)}
            />

            {showForms ? <ClientRequestForms/> : null}

        </div>
    )
}

export { MainPage }