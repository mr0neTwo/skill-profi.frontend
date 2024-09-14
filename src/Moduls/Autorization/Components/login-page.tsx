import React, {useEffect, useState} from "react"
import {useLocation, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"

import {useLoginMutation, useRefreshQuery} from "../auth-api"
import {setCredentials} from "../auth-slice"

import {Input} from "../../../Common/Components/input"
import {Button} from "../../../Common/Components/button"
import {Spinner} from "../../../Common/Components/spinner"

interface LocationState {
    from: {
        pathname: string;
    };
}

const LoginPage: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const [login] = useLoginMutation()
    const {data: authResponse, isLoading} = useRefreshQuery()

    const state = location.state as LocationState | undefined;
    const fromPage = state?.from?.pathname || '/admin';

    useEffect(() => {
        if (authResponse?.success) {
            dispatch(setCredentials({ user: authResponse.user }));
            navigate(fromPage, {replace: true})
        }
    }, [authResponse, dispatch]);

    const handleSubmit = async () => {

        const authResponse = await login({email, password})

        if(authResponse.data?.success){
            const { user } = authResponse.data
            dispatch(setCredentials({user}))
            setEmail('')
            setPassword('')
            setError('')
            navigate(fromPage, {replace: true})
        } else {
            setError(authResponse.data?.errorMessage ?? 'Ошибка авторизации')
        }

    }

    if(isLoading) return <Spinner />;

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='flex flex-col gap-4'>
                {error}
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