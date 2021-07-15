import { Company } from "./company";

export interface Employee {
    id: string;
    name: string;
    department: string;
    location: string;
    email: string;
    mobile: string;
    opportunities: Company[],
}
