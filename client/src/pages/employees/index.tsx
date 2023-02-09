import React, { useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusCircleOutlined } from '@ant-design/icons';
import { CustomButton } from "../../components/custom-button";
import { Employee } from "@prisma/client";
import { Paths } from "../../paths";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/serivices/employees";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const gotToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
      <CustomButton type="primary" onClick={gotToAddUser} icon={ <PlusCircleOutlined /> }>
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
