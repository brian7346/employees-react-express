import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";

type Props = {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
};

export const PasswordInput = ({
  name,
  placeholder,
  dependencies,
}: Props) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value ) {
              return Promise.resolve();
            }

            if (name === 'confirmPassword') {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Пароли должны совпадать")
              );
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("Пароль должен быть длиньше 6-ти символов")
                );
              }

              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  );
};
