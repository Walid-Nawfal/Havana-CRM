import agent from "../../api/agent";
import { Company } from "../../models/company";
import { addCompany } from "../actions/companies/addCompany";
import { delCompany } from "../actions/companies/delCompany";
import { setCompanies } from "../actions/companies/setCompanies";
import { setIsLoaded } from "../actions/companies/setIsLoaded";
import { updCompany } from "../actions/companies/updCompany";
import { initState } from "../store/store";

export const loadCompanies = () => async (dispatch) => {
    dispatch(setIsLoaded(false))
    const companies = await agent.Companies.list();
    dispatch(setCompanies(companies));
    dispatch(setIsLoaded(true))
}

export const postCompany = (company: Company) => async(dispatch) => {
    dispatch(setIsLoaded(false))
    dispatch(addCompany(company));
    dispatch(setIsLoaded(true))
}

export const deleteCompany = (id: string) => async(dispatch) => {
    dispatch(setIsLoaded(false))
    dispatch(delCompany(id));
    dispatch(setIsLoaded(true))
}

export const updateCompany = (company: Company) => async(dispatch) => {
    dispatch(setIsLoaded(false))
    dispatch(updCompany(company))
    dispatch(setIsLoaded(true))
}

export const companiesReducer = (state = initState, action: any) => {
    switch (action.type) {
        case 'SET_COMPANIES': {
            return {...state, companies: action.payload}
        }
        case 'ADD_COMPANY': {
            return {...state, companies: [...state.companies, action.payload]}
        }
        case 'DELETE_COMPANY': {
                return {...state, companies: state.companies.filter(x => x.id !== action.payload)}
        }
        case 'UPDATE_COMPANY': {
            return {...state, companies: [...state.companies.filter(x => x.id !== action.payload.id), action.payload]}
        }
        case 'SET_ISLOADED': {
            return {...state, isLoaded: true}
        }
        default:
            return state
    }
}
