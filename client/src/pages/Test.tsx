import React from 'react'
import { getAccessToken } from '../accessToken';
import { useUsersListQuery } from '../generated/graphql';

interface TestProps {

}

export const Test: React.FC<TestProps> = () => {
    const { data, error, loading } = useUsersListQuery({
        fetchPolicy: "network-only"
    })

    if (loading) {
        return (<div>loading......</div>)
    }

    return (

        <div>
            <h1>
                Current Users:
            </h1>
            <ul>
                {data?.getAllUsers?.map((user, idx) =>
                (
                    <li key={idx}>{user.email}, {user.username}</li>
                )
                )}
            </ul>

        </div>
    );
}