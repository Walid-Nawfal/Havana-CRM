import { Company } from "../../../models/company";

export const addCompany = (company: Company) => ({
    type: "ADD_COMPANY",
    payload: company
})