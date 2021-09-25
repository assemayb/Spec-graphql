import { useEffect, useState } from "react"
import { NotificationType, useListUserNotifsQuery } from "../generated/graphql"

export const useGetNotification = (start: number, end: number) => {
    const [notifs, setNotifs] = useState<NotificationType[]>([])
    const { data } = useListUserNotifsQuery({
        fetchPolicy: "network-only",
        onCompleted: (data) => {
            const chunk = data?.listUserNotifs!.slice(start, end)
            setNotifs(chunk!)
        }
    })

    useEffect(() => {
        if (data?.listUserNotifs.length! >= 20) {
            const chunk = data?.listUserNotifs!.slice(start, end)
            setNotifs(chunk!)
        }
    }, [start, end, data?.listUserNotifs])

    return notifs
}