import React, { useEffect, useState } from "react";

export const useGetUserThreads = () => {
  const [threads, setThreads] = useState([]) 
  useEffect(() => {
    const getData = async () => {
      const url = "http://localhost:8000/get_user_threads";
      const x = await fetch(url, {
        method: "GET",
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(x.json());
    };
    getData();
  }, []);
  return null
};
