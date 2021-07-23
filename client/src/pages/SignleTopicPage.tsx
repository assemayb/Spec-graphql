import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

interface SignleTopicPageProps {}

export const SignleTopicPage: React.FC<SignleTopicPageProps> = ({}) => {
  const params = useParams();
  useEffect(() => {
    console.log(params);
  });
  return <h1>pages</h1>;
};
