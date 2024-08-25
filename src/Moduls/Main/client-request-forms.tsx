import React, {useRef, useState} from "react";
import {IInputRef, Input} from "../../Common/Components/input";
import {Button} from "../../Common/Components/button";
import {TextAria} from "../../Common/Components/text-area";
import {useCreateClientMessageMutation} from "../ClientMessagess/client-request-api";

const ClientRequestForms:React.FC = () => {

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [message, setMessage] = useState('')

    const nameRef = useRef<IInputRef>(null);
    const emailRef = useRef<IInputRef>(null);
    const messageRef = useRef<IInputRef>(null);

    const [createClientMessage] =  useCreateClientMessageMutation()

    const handleCreateRequest = () => {

        if(validateForm()){
            createClientMessage({clientName, clientEmail, message})
            handleClean()
        }
    }

    const validateForm = ():boolean => {

        const isNameValid = nameRef.current && nameRef.current.validate()
        const isEmailValid = emailRef.current && emailRef.current.validate()
        const isMessageValid = messageRef.current && messageRef.current.validate()
        return (isNameValid && isEmailValid && isMessageValid) || false
    }

    const handleClean = () => {

        setClientName('')
        setClientEmail('')
        setMessage('')
    }

    return (
        <div className='column g-15'>
            <h2>Оставить заявку или задать вопрос</h2>
            <Input
                ref={nameRef}
                label='Имя'
                onChange={value => setClientName(value)}
                value={clientName}
                required={true}
                limit={30}
            />
            <Input
                ref={emailRef}
                label='Email'
                onChange={value => setClientEmail(value)}
                value={clientEmail}
                required={true}
                limit={30}
            />
            <TextAria
                ref={messageRef}
                label='Сообщение'
                onChange={value => setMessage(value)}
                value={message}
                required={true}
                limit={600}
            />
            <div className='row g-15'>
                <Button
                    type='primary'
                    text='Отправить'
                    onClick={handleCreateRequest}
                />
                <Button
                    type='secondary'
                    text='Очистить'
                    onClick={handleClean}
                />
            </div>
        </div>
    )
}

export { ClientRequestForms }