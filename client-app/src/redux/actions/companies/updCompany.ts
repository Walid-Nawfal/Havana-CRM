import { Company } from "../../../models/company";

export const updCompany = (company: Company) => ({
    type: "UPDATE_COMPANY",
    payload: company
})