import React, { useState, useEffect } from 'react'
import { useIsUserLoggedInQuery } from '../generated/graphql'
import { RouteComponentProps } from "react-router-dom"

interface HomeProps {

}

export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
    
    const { data, error, loading, client } = useIsUserLoggedInQuery({
        fetchPolicy: "cache-and-network"
    })
    useEffect(() => {
        console.log(data?.isUserLoggedIn)
    }, [])
    return (
        <div className="home-page">
            <div>home page stuff here comp.</div>
        </div>
    );
}