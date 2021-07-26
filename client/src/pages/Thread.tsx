import React, { useEffect } from 'react'
import {useParams, useLocation} from  "react-router-dom"
interface ThreadProps {

}

export const Thread: React.FC<ThreadProps> = ({}) => {
        const params = useParams()
        useEffect(() => {
            console.log(params);

        }, [params])


        
        return (
            <h1>thread</h1>
        );
}