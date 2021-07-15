import { useEffect, useState } from "react";
import { Container, Dimmer, Image, Loader, Segment } from "semantic-ui-react";
import agent from "../../api/agent";
import CompaniesDashboard from './CompaniesDashboard'
import { User } from "../../models/user";
import { connect, useDispatch } from 'react-redux';
import { loadCompanies } from '../../redux/reducers/companiesReducer';

function CompaniesProvider(props) {
    const [isLoaded] = useState(true);
    const [user, setUser] = useState<User|any>();
    const dispatch = useDispatch();

    async function getUser() {
        const tempUser = await agent.Account.current();
        console.log(tempUser);
        setUser(tempUser);
    }

    useEffect(() => {
        getUser();
        dispatch(loadCompanies());
        // return () => {
        //     setUser({}); // This worked for me
        //   };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.username])

    if (isLoaded && props.companies.length !== 0) {
        return (
            <CompaniesDashboard />
        )
    }
    else {
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

const mapStateToProps = (state) => {
    console.log(state);
    return {
        companies: state.companiesData.companies
    }
}


export default connect(mapStateToProps)(CompaniesProvider);