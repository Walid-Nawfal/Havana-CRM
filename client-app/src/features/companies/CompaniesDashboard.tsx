import { useHistory } from "react-router";
import CompaniesTable from "./CompaniesTable";
import { connect } from "react-redux";
import { Company } from "../../models/company";

interface Props {
    isLoaded: boolean;
    companies: Company[];
}

function CompaniesDashboard({isLoaded,companies}: Props) {
    const history = useHistory()
    if(window.localStorage.getItem("jwt") == null) history.replace('/');
    
    console.log("Dashboard rerender");
    
    
    return (
        <>
            <CompaniesTable companies={companies} isLoaded={isLoaded} />
        </>

    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        companies: state.companiesData.companies,
        isLoaded: state.companiesData.isLoaded
    }
}

export default connect(mapStateToProps)(CompaniesDashboard);