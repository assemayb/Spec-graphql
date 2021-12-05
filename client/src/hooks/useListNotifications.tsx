/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NotificationType, useListUserNotifsQuery } from "../generated/graphql";

interface Range {
  start: number;
  end: number;
  reload: boolean;
}

export const useGetNotification = ({ start, end, reload }: Range) => {
  const [notifs, setNotifs] = useState<NotificationType[]>([]);

  const { data, refetch } = useListUserNotifsQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const chunk = data?.listUserNotifs!.slice(start, end);
      setNotifs(chunk!);
    },
  });

  useEffect(() => {
    refetch();
    const chunk = data?.listUserNotifs!.slice(start, end);
    setNotifs(chunk!);
  }, [start, end, reload]);

  return notifs;
};
