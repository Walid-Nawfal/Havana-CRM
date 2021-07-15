import { Company } from "../../../models/company";

export const assOpportuunity = (empId: string, compId: Company) => ({
    type: "ASSIGN_OPPORUNITY",
    payload: {empId,compId}
})