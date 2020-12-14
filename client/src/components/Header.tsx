import React from 'react'
import { useMeQuery } from '../generated/graphql';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({ }) => {
    const { data, error, loading } = useMeQuery()
    let body: any = null;
    if (loading) {
        body = <h4>loading...</h4>
    }
    else if (data && data.me) {
        body = <h4>ur logged in as {data.me.username}</h4>
    }
    else {
        body = <div>not logged in</div>;
    }
    return (
        <div style={{
            backgroundColor: "blueviolet",
            color: "black"
        }}>
            {body}
        </div>
    );
}