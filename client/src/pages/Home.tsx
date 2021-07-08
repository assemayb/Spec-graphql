import React, { useState, useEffect } from 'react'
import { useIsUserLoggedInQuery } from '../generated/graphql'
import { RouteComponentProps } from "react-router-dom"

interface HomeProps {

}

export const Home: React.FC<RouteComponentProps> = ({ history, location }) => {
    const [date, setDate] = useState("2018-07-22")
    return (
        <div className="home-page">
            <div>home page stuff here comp.</div>
        </div>
    );
}