import React, { useEffect, useState } from 'react'
import { IsUserLoggedInDocument, IsUserLoggedInQuery, useIsUserLoggedInQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { setAccessToken } from '../accessToken';
import { Link } from "react-router-dom"
import { Login } from '../pages/Login';


interface HeaderProps {

}


export const Header: React.FC<HeaderProps> = ({ }) => {

    const { data, loading, error } = useMeQuery()
    const [logout, { client }] = useLogoutMutation()

    const LoginState = useIsUserLoggedInQuery({ fetchPolicy: "network-only" })
    const [showLoginLink, setShowLoginLink] = useState(true)

    useEffect(() => {
        let isMounted = false
        const isUserLogged = LoginState.data?.isUserLoggedIn
        if (isUserLogged) {
            setShowLoginLink(false)
        } else {
            setShowLoginLink(true)
        }
        return () => {
            isMounted = true
        }
    }, [LoginState.data])



    let UserLogStatebody: any = null;
    if (loading) {
        UserLogStatebody = <div>loading...</div>
    }

    else if (data && data?.me) {
        const handleLogout = async () => {
            await logout();
            setAccessToken("")
            await client.resetStore()
        }
        UserLogStatebody =
            <div>
                hello,  {data!.me!.username} {" "}
                <button onClick={() => handleLogout()}>logout</button>
            </div>
    } else if (error) {
        console.error(error)
    }
    else {
        UserLogStatebody = <div>not logged in</div>;
    }

    return (
        <div className="header">
            <ul className="app-menu">
                <li><Link className="link" to="/" >home</Link></li>
                <li><Link className="link" to="/test">test</Link></li>
                {showLoginLink && (
                    <>
                        <li><Link className="link" to="/register">register</Link></li>
                        <li><Link className="link" to="/login">login</Link></li>
                    </>
                )}

            </ul>
            <div className="user-state">
                {UserLogStatebody}
            </div>

        </div>
    );
}