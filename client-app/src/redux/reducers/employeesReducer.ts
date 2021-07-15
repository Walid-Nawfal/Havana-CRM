import agent from "../../api/agent";
import { Company } from "../../models/company";
import { Employee } from "../../models/employee";
import { addEmployee } from "../actions/employees/addEmployee";
import { assOpportuunity } from "../actions/employees/assOpportunity";
import { delEmployee } from "../actions/employees/delEmployee";
import { setEmployees } from "../actions/employees/setEmployees";
import { setIsLoaded } from "../actions/employees/setIsLoaded";
import { updEmployee } from "../actions/employees/updEmployee";
import { initState } from "../store/store";



export const loadEmployees = () => async (dispatch) => {
    console.log("haiii")
    const employees = await agent.Employees.list();
    dispatch(setIsLoaded(true))
    dispatch(setEmployees(employees));
}

export const postEmployee = (employee: Employee) => async(dispatch) => {
    dispatch(addEmployee(employee));
}

export const deleteEmployee = (id: string) => async(dispatch) => {
    dispatch(delEmployee(id));
}

export const updateEmployee = (employee: Employee) => async(dispatch) => {
    dispatch(updEmployee(employee))
}

export const assignOpportunity = (empId: string, compId: Company) => async(dispatch) => {
    console.log(compId);
    agent.Employees.assign(empId, compId);
    dispatch(assOpportuunity(empId,compId));
}

export const unassignOpportunity = (empId: string, compId: Company) => async(dispatch) => {
    console.log(compId);
    agent.Employees.unassign(empId, compId);
    dispatch(assOpportuunity(empId,compId));
}

export const employeesReducer = (state = initState, action: any) => {
    switch (action.type) {
        case 'SET_EMPLOYEES': {
            return {...state, employees: action.payload}
        }
        case 'ADD_EMPLOYEE': {
            return {...state, employees: [...state.employees, action.payload]}
        }
        case 'DELETE_EMPLOYEE': {
                return {...state, employees: state.employees.filter(x => x.id !== action.payload)}
        }
        case 'UPDATE_EMPLOYEE': {
            return {...state, employees: [...state.employees.filter(x => x.id !== action.payload.id), action.payload]}
        }
        case 'SET_ISLOADED': {
            return {...state, isLoaded: true}
        }
        default:
            return state
    }
}