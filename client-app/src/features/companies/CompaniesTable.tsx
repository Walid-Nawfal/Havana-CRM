import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { Container } from '@material-ui/core';
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';
import agent from '../../api/agent';
import { Company } from '../../models/company';
// import { Company } from '../../models/property';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCompany, postCompany, updateCompany } from '../../redux/reducers/companiesReducer';

const tableIcons : any = {
    Add: forwardRef((props, ref: any) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref: any) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref: any) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref: any) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref: any) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref: any) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref: any) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref: any) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref: any) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref: any) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref: any) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref: any) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref: any) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref: any) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref: any) => <ViewColumn {...props} ref={ref} />)
};



interface Props {
    isLoaded: boolean;
    companies: Company[];
}


function CompaniesTable({ isLoaded, companies }: Props) {
    console.log("Table rerender");
    console.log(companies)
    const history = useHistory();
    const dispatch = useDispatch();
    if (isLoaded) {
        return (
            <Container style={{ marginTop: '8rem' }}>
                {/* <Header color='teal' as='h2'>Companies</Header> */}
                <MaterialTable
                    icons={tableIcons}
                    title="Companies"
                    columns={[
                        { title: 'Name', field: 'name' },
                        {
                            title: 'Industry',
                            field: 'industry',
                            lookup: { 'IT': "IT", "Real Estate": "Real Estate", "Cleaning": "Cleaning", "Consulting": "Consulting" }
                        },
                        {
                            title: 'Location',
                            field: 'location',
                            lookup: { 'Pearl': 'Pearl', 'Doha': 'Doha', 'West Bay': 'West Bay' },
                        },
                        { title: 'Size', field: 'size' },
                        { title: 'Agent', field: 'agent' },
                        { title: 'Target Market', field: 'targetMarket' },
                        { title: 'Operating Region', field: 'operatingRegion' },
                        { title: 'Email', field: 'email' },
                        { title: 'Fax', field: 'fax' },
                        { title: 'Website Link', field: 'websiteLink' },
                        { title: 'Phone Number', field: 'phoneNumber' },
                        { title: 'Land Line', field: 'landLine' },
                        { title: 'Remarks', field: 'remarks' },
                        { title: 'Date', field: 'updatedAt' }
                    ]}
                    onRowClick={((evt, selectedRow) => {
                        history.replace(`/companies/${selectedRow?.id}`);
                    })}
                    editable={{
                        onRowAdd: newData => {
                            dispatch(postCompany(newData));
                            return agent.Companies.create(newData)
                        },
                        onRowUpdate: (newData, oldData) => {
                            dispatch(updateCompany(newData))
                            return agent.Companies.update(newData);
                        },
                        onRowDelete: oldData => {
                            dispatch(deleteCompany(oldData.id))
                            return agent.Companies.delete(oldData.id)
                        }
                    }}
                    data={companies}
                    options={{
                        filtering: true,
                    }}
                />
            </Container>
        )
    } else {
        return (
            <Container style={{ marginTop: '8rem' }}>
                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                    <Image src='assets/skeletonLoading.png' />
                </Segment>
            </Container>
        )
    }
}


export default CompaniesTable;