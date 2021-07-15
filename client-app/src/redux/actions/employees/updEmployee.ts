import { Employee } from "../../../models/employee";

export const updEmployee = (employee: Employee) => ({
    type: "UPDATE_COMPANY",
    payload: employee
})