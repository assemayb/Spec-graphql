import React from 'react'
import {useParams} from "react-router-dom"

interface UserProps {

}

export const User: React.FC<UserProps> = ({}) => {
    const params: {username: string} = useParams()
        return (
            <h1>
                {params.username}
            </h1>
        );
}