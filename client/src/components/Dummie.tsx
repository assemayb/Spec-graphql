import React, { useEffect, useState } from "react";

interface LoginProps {}

export const NewLoginComponent: React.FC<LoginProps> = ({}) => {
  const [loginInfo, setLoginInfo] = useState<{
    username: string;
    passord: string;
  }>({ username: "", passord: "" });
  return <h1>asfsafms</h1>;
};
