import axios, { AxiosResponse } from "axios";
import { Company } from "../models/company";
import { Employee } from "../models/employee";
import { Stage } from "../models/stage";
import { User, UserFormValues } from "../models/user";

axios.defaults.baseURL = '/api';

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string, body?: string|any) => axios.delete<T>(url, body).then(responseBody)
}

const Companies = {
    list: () => requests.get<Company[]>('/companies'),
    details: (id: string) => requests.get<Company>(`/companies/${id}`),
    create: (company: Company) => requests.post('/companies', company),
    update: (company: Company) => requests.put<any>(`/companies/${company.id}`, company),
    delete: (id: string) => requests.del<any>(`/companies/${id}`),
    addStage: (stage: Stage, id: string) => requests.post(`/companies/${id}/stages`, stage),
    removeStage: (id: string, stage: Stage) => requests.del(`/companies/${id}/stages`, stage)
}

const Employees = {
    list: () => requests.get<Employee[]>('/employees'),
    details: (id: string) => requests.get<Company>(`/employees/${id}`),
    create: (employee: Employee) => requests.post('/employees', employee),
    update: (employee: Employee) => requests.put<any>(`/employees/${employee.id}`, employee),
    delete: (id: string) => requests.del<any>(`/employees/${id}`),
    assign: (empId:string, id:Company) => requests.post(`/employees/${empId}/opportunities`, id),
    unassign: (empId:string, id:Company) => requests.del(`/employees/${empId}/opportunities`, id)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Account,
    Companies,
    Employees
}

export default agent;