import React, { useEffect, useState } from "react";

type UseGetUserThreadsProps = {
  subData?: any
}
export const useGetUserThreads = ( { subData }: UseGetUserThreadsProps ) => {
  const [threads, setThreads] = useState<{
    count: number;
    threads: [];
  }>({ count: -1, threads: [] });

  useEffect(() => { 
    console.log("props is changed =============>", subData);
    const getData = async () => {
      const url = "http://localhost:8000/get_user_threads";
      const data = await fetch(url, {
        method: "GET",
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = data.ok && await data.json();
      setThreads(json);
    };
    getData();

  }, [subData]);

  return threads?.threads && threads;
};
