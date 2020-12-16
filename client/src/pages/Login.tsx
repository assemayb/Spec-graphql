import React, { useState } from 'react'
import { RouteComponentProps } from "react-router-dom"
import { setAccessToken } from '../accessToken'
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql'



export const Login: React.FC<RouteComponentProps> = ({ }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [login] = useLoginMutation()

    const loginUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log(e.currentTarget.textContent)
        const response = await login({
            variables: {
                username,
                password
            },
            update: (store, { data }) => {
                if (!data) {
                    return null;
                }
                store.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        me: data.loginUser?.user
                    }
                })
            }

        })
        if (response && response.data) {
            setAccessToken(response.data.loginUser?.accessToken!)
        }
        console.log(response.data)
    }
    return (
        <div>
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3rem"
                }}>
                <label htmlFor="username">username: </label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">password: </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                {/* <label htmlFor="email">email: </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} /> */}
                <button onClick={e => loginUser(e)}>Login</button>
            </form>
        </div>
    );
}



