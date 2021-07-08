import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { RouteComponentProps } from "react-router-dom"
import { setAccessToken } from '../accessToken'
import { Message } from '../components/Message'
import { IsUserLoggedInDocument, IsUserLoggedInQuery, MeDocument, MeQuery, useIsUserLoggedInQuery, useLoginMutation } from '../generated/graphql'
import { ApolloError } from "@apollo/client/errors"


export const Login: React.FC<RouteComponentProps> = ({ history }) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showMessage, setShowMessage] = useState({
        show: false,
        value: ""
    })
    const [login, { data, client }] = useLoginMutation()

    const loginUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {

            const response = await login({
                variables: {
                    username,
                    password
                },
                update: (cache, { data }) => {
                    if (!data) {
                        return null;
                    }
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.loginUser?.user
                        }
                    })
                    cache.writeQuery<IsUserLoggedInQuery>({
                        query: IsUserLoggedInDocument,
                        data: {
                            isUserLoggedIn: true
                        }
                    })

                },
            })
            if (response && response.data) {
                setAccessToken(response.data.loginUser?.accessToken!)
                history.push("/")
                setUsername("")
                setPassword("")
            }
        } catch (error) {
            setShowMessage({ show: true, value: error.message })
            console.log(error)
        }
    }

    return (
        <div>
            <form className="login-form">
                {showMessage.show && (
                    <Message message={showMessage.value} />
                )}
                <label htmlFor="username">username: </label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">password: </label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button onClick={e => loginUser(e)}>Login</button>
            </form>
        </div>
    );
}



