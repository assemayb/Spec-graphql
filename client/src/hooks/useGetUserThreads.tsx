import React, { useEffect, useState } from "react";

export const useGetUserThreads = () => {
  const [threads, setThreads] = useState<{
    count: number;
    threads: [];
  }>({ count: -1, threads: [] });

  useEffect(() => {
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
  }, []);

  return threads?.threads && threads;
};
