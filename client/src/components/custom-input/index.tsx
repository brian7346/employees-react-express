import React from "react";
import { Form, Input } from "antd";

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export const CustomInput = ({
  type = 'text',
  name,
  placeholder,
}: Props) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Обязательное поле" }]}
      shouldUpdate={ true }
    >
      <Input
        placeholder={placeholder}
        type={ type }
        size="large"
      />
    </Form.Item>
  );
};
