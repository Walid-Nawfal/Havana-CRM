import { Company } from "../../../models/company";

export const setCompanies = (companies: Company[]) => ({
    type: "SET_COMPANIES",
    payload: companies
})