import { Employee } from "../../../models/employee";

export const setEmployees = (employees: Employee[]) => ({
    type: "SET_EMPLOYEES",
    payload: employees
})