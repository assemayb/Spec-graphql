/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NotificationType, useListUserNotifsQuery } from "../generated/graphql";

type Range = {
  start: number;
  end: number;
  reload: boolean;
};

export const useGetNotification = ({ start, end, reload }: Range) => {
  const [notifs, setNotifs] = useState<NotificationType[]>([]);
  const { data } = useListUserNotifsQuery({
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log(data.listUserNotifs.length);
      const chunk = data?.listUserNotifs!.slice(start, end);
      setNotifs(chunk!);
    },
  });

  useEffect(() => {
    if (data?.listUserNotifs.length! >= 20) {
      const chunk = data?.listUserNotifs!.slice(start, end);
      setNotifs(chunk!);
    }
  }, [reload, start, end]);

  return notifs;
};
