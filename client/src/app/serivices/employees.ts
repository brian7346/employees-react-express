import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
        body: { id },
      }),
    }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: "/employees/add",
        method: "POST",
        body: employee,
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeQuery,
  useEditEmployeeMutation,
  useRemoveEmployeeMutation,
  useAddEmployeeMutation,
} = employeesApi;

export const {
  endpoints: {
    getAllEmployees,
    getEmployee,
    editEmployee,
    removeEmployee,
    addEmployee,
  },
} = employeesApi;
