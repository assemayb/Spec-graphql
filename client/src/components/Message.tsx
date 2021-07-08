import React from "react";

interface MessageProps {
  message: string;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div style={{ color: "red" }}>
      <div>{message}</div>
    </div>
  );
};
