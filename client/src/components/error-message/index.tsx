import { Alert } from "antd";
import React from "react";

type Props = {
  message?: string;
};

export const ErrorMessage = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return <Alert message={message} type="error" />;
};
