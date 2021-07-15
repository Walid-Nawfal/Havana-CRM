import { Stage } from "./stage";

export interface Company {
    id: string;
    name?: string;
    location?: string;
    industry?: string;
    agent?: string;
    size?: string;
    targetMarket?: string;
    operatingRegion?: string;
    email?: string;
    fax?: string;
    websiteLink?: string;
    phoneNumber?: string;
    landLine?: string;
    updatedAt?: string;
    remarks?: string;
    stages?: Stage[]
}