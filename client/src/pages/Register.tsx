import React, { useState } from 'react'
import { RouteComponentProps } from "react-router-dom"
import { useRegisterMutation } from '../generated/graphql'


export const Register: React.FC<RouteComponentProps> = ({ }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [register] = useRegisterMutation()
    // console.log(username, email, password)
    const registerNewUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        register({
            variables: {
                username,
                email,
                password,
            }
        }).then(response => {
            console.log(response)
        })
        setEmail("")
        setUsername("")
        setPassword("")
    }
    return (
        <div >
            <form className="signup-form">
                <label htmlFor="username">username: </label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">password: </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <label htmlFor="email">email: </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={(e) => registerNewUser(e)}>Register</button>
            </form>
        </div>
    );
}
