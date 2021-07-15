import { Grid, Card, Icon, Container, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Employee } from "../../models/employee";
import { useParams } from "react-router";
import { Company } from "../../models/company";
import AddStageForm from "../stages/AddStageForm";
import ModalContainer from "../../common/modal/ModalContainer";
import { useState } from "react";
import agent from "../../api/agent";
import { Stage } from "../../models/stage";

interface Props {
    employees: Employee[];
    companies: Company[]
}

function CompanyDetails({ employees, companies }: Props) {
    const { id } = useParams<{ id: string }>();
    const opportunity = companies.filter(x => x.id === id)[0];
    opportunity.stages.map(stage => console.log(stage));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalBody, setModalBody] = useState(<h1>Hello</h1>);

    function openModal(content: JSX.Element) {
        setIsModalOpen(true);
        setModalBody(content);
    }
    const [target, setTarget] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleDeleteStage(stage, e) {
        const apiStage: Stage = {
            status: stage.status,
            commissions: stage.commissions,
            id: stage.id,
            remarks: stage.remarks,
            percentage: stage.percentage,
            company: stage.company
        }
        console.log(stage);
        setIsLoading(true);
        setTarget(e.currentTarget.name);
        await agent.Companies.removeStage(id, apiStage).catch(res => console.log(res))
        setIsLoading(false)
    }
    const extra = (
        <Icon name='home' />
    );
    console.log(employees)
    return (
        <>
            <ModalContainer isModalOpen={isModalOpen} modalBody={modalBody} setIsModalOpen={setIsModalOpen} setModalBody={setModalBody} />
            <Container style={{ marginTop: 80, marginLeft: '2rem' }}>
                <h3 style={{ display: "inline" }}>Walid Nawfal <Icon size='big' name='long arrow alternate right' /> Al Athbi Real Estate </h3>
                <Button color='teal' content="Add Stage" onClick={() => openModal(<AddStageForm id={opportunity.id} setIsModalOpen={setIsModalOpen} />)} style={{ marginLeft: '8rem', marginBottom: '2rem' }} />
                <Grid>
                    {opportunity.stages.map(stage => (
                        <Grid.Column key={stage.id} width={5}>
                            <h3><Icon size='big' name='chart pie' /></h3>
                            <Card
                                header={stage.company}
                                meta={stage.status}
                                description={"Status:" + stage.status + ", Percentage: " + stage.percentage + ", Meeting Date: " + stage.updatedAt + ", Commissions: " + stage.commissions + ", Remarks: " + stage.remarks}
                                extra={extra}
                            />
                            <Button
                                basic
                                color='red'
                                icon='trash'
                                loading={target === stage.id && isLoading}
                                onClick={e => handleDeleteStage(stage, e)}
                                name={stage.id}
                            />
                        </Grid.Column>
                    )
                    )}
                </Grid>
            </Container>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        employees: state.employeesData.employees,
        companies: state.companiesData.companies
    }
}

export default connect(mapStateToProps)(CompanyDetails);