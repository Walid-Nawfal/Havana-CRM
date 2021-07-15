import { Employee } from "../../../models/employee";

export const addEmployee = (employee: Employee) => ({
    type: "ADD_EMPLOYEE",
    payload: employee
})