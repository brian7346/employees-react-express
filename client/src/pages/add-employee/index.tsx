import { Row } from "antd";
import { useState } from "react";
import { EmployeeForm } from "../../components/employee-form";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/layout";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useAddEmployeeMutation } from "../../app/serivices/employees";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";

export const AddEmployee = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleAddEmployee}
          title="Добавить сутрудника"
          btnText="Добавить"
          error={ error }
        />
      </Row>
    </Layout>
  );
};
