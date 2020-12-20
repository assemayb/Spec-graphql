import React, { useEffect, useState } from 'react'
import { IsUserLoggedInDocument, IsUserLoggedInQuery, MeDocument, MeQuery, useIsUserLoggedInQuery, useLogoutMutation, useMeQuery } from '../generated/graphql';
import { gql, useQuery } from "@apollo/client";
import { setAccessToken } from '../accessToken';
import { Link } from "react-router-dom"
interface HeaderProps {

}


export const Header: React.FC<HeaderProps> = ({ }) => {
    // const [isLogged, setIsLogged] = useState<Boolean|null>(null)
    const { data, loading } = useMeQuery()
    const [logout, { client }] = useLogoutMutation()

    const handleLogout = async () => {
        await logout();
        setAccessToken("")
        await client.resetStore()
    }

    let UserLogStatebody: any = null;
    if (loading) {
        UserLogStatebody = <div>loading...</div>
    }

    else if (data && data.me) {
        UserLogStatebody =
            <div>
                hello,  {data.me.username} {" "}
                <button onClick={() => handleLogout()}>logout</button>
            </div>
    }
    else {
        UserLogStatebody = <div>not logged in</div>;
    }

    return (
        <div className="header">
            <ul className="app-menu">
                <li><Link className="link" to="/" >home</Link></li>
                <li><Link className="link" to="/test">test</Link></li>
                <li><Link className="link" to="/register">register</Link></li>
                <li><Link className="link" to="/login">login</Link></li>
            </ul>
            <div className="user-state">
                {UserLogStatebody}
            </div>

        </div>
    );
}