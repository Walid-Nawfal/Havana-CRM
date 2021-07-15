import { Company } from "../../models/company";
import { Employee } from "../../models/employee";

export const initState = {
    employees: [] as Employee[],
    companies: [] as Company[],
    isLoaded: false
}