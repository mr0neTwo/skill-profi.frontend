import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface LocationState {
    from: {
        pathname: string;
    };
}

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as LocationState | undefined;
    const fromPage = state?.from?.pathname || '/admin';

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const user = form.username.value // логика логина

        navigate(fromPage, {replace: true})
    }

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input name='username'/>
                </label>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export { LoginPage }