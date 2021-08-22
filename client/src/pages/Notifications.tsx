/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useMeLazyQuery } from '../generated/graphql';

interface NotificationsProps {

}

export const Notifications: React.FC<NotificationsProps> = ({}) => {

    useEffect(() => {
        console.log(document.URL);
        
    }, [])
        return (
            <div>
                notifications page
            </div>
        );
}