import { Container, DropdownItemProps, Button, Select, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Employee } from "../../models/employee";
import { Company } from "../../models/company";
import CompaniesTable from "../companies/CompaniesTable";
import { useEffect, useState } from "react";
import { loadCompanies } from "../../redux/reducers/companiesReducer";
import { useDispatch } from "react-redux";
import { assignOpportunity, unassignOpportunity } from "../../redux/reducers/employeesReducer";
import { setIsLoaded } from "../../redux/actions/employees/setIsLoaded";
import Loading from "../../layout/Loading"

interface Props {
    isLoaded: boolean;
    employees: Employee[];
    companies: Company[];
}


function EmployeeDetails({ employees, isLoaded, companies }: Props) {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const [compId, setCompId] = useState(null);
    const [compIdRem, setcompIdRem] = useState(null);
    const employee = employees.filter(x => x.id === id)[0];
    var companyOptions: DropdownItemProps[] = [];
    companies.forEach(x => companyOptions.push({ key: x.name, value: x.id, text: x.name }));
    console.log(employees);
    console.log(companyOptions);

    function handleAssingOpportunity(empId, compId) {
        console.log(compId);
        var company: Company = {
            id: compId
        }
        dispatch(setIsLoaded(false));
        dispatch(assignOpportunity(empId, company))
        dispatch(setIsLoaded(true));
    }

    function handleUnAssingOpportunity(empId, compIdRem) {
        console.log(compIdRem);
        var company: Company = {
            id: compIdRem
        }
        dispatch(setIsLoaded(false));
        dispatch(unassignOpportunity(empId, company));
        dispatch(setIsLoaded(true));
    }

    useEffect(() => {
        dispatch(loadCompanies());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (employee != null) {
        return (
            <Container style={{ marginTop: 80 }}>
                <Grid style={{marginBottom: -100}}>
                    <Grid.Column style={{marginLeft: '2rem'}} width={7}>
                        <h3>Name: {employee.name}
                        <br />
                        <br />Mobile: {employee.mobile},<br /> Email: {employee.email}
                        <br />Location: {employee.location},   Department:{employee.department}</h3>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <h3 color='teal'>Manage Employee Assignments</h3>
                        <Select id="MySelect1" placeholder='Select Opportunity' options={companyOptions} onChange={(event, data) => setCompId(data.value)} />
                        <Button loading={!isLoaded} color='teal' content="Assign" onClick={() => handleAssingOpportunity(employee.id, compId)} style={{ marginLeft: '2rem' }} />
                        <br />
                        <br />
                        <Select id="MySelect" placeholder='Select Opportunity' options={companyOptions} onChange={(event, data) => setcompIdRem(data.value)} />
                        <Button loading={!isLoaded} color='teal' content="Unassign" onClick={() => handleUnAssingOpportunity(employee.id, compIdRem)} style={{ marginLeft: '2rem' }} />
                    </Grid.Column>
                </Grid>
                <CompaniesTable companies={employee.opportunities} isLoaded={isLoaded} />
            </Container>
        )
    } else {
        return(
            <Loading />
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        employees: state.employeesData.employees,
        isLoaded: state.employeesData.isLoaded,
        companies: state.companiesData.companies
    }
}

export default connect(mapStateToProps)(EmployeeDetails);