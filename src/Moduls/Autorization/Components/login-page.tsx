import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Input} from "../../../Common/Components/input";
import {Button} from "../../../Common/Components/button";

interface LocationState {
    from: {
        pathname: string;
    };
}

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState | undefined;
    const fromPage = state?.from?.pathname || '/admin';

    const handleSubmit = () => {

         console.log([email, password])

        navigate(fromPage, {replace: true})
    }

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col gap-4'>
                <Input
                    label='Email'
                    onChange={email => setEmail(email)}
                    value={email}
                    required={true}
                    limit={30}
                />
                <Input
                    label='Пароль'
                    onChange={password => setPassword(password)}
                    value={password}
                    limit={30}
                    required={true}
                    password={true}
                />
                <Button
                    type='primary'
                    text='Войти'
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

export { LoginPage }