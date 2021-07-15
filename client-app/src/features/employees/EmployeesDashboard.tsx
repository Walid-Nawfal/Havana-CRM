import { useHistory } from "react-router";
import { connect, useDispatch } from "react-redux";
import EmployeesTable from "./EmployeesTable";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { User } from "../../models/user";
import { loadEmployees } from "../../redux/reducers/employeesReducer";

interface Props {
    isLoaded: boolean;
}

function EmployeesDashboard({isLoaded}: Props) {
    const [user, setUser] = useState<User>();
    const dispatch = useDispatch();
    const history = useHistory();
    if(window.localStorage.getItem("jwt") == null) history.replace('/');
    
    console.log("Dashboard rerender");

    async function getUser() {
        const tempUser = await agent.Account.current();
        console.log(tempUser);
        setUser(tempUser);
    }

    useEffect(() => {
        getUser();
        dispatch(loadEmployees());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.username])

    return (
        <>
            <EmployeesTable isLoaded={isLoaded} />
        </>

    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        employees: state.employeesData.employees,
        isLoaded: state.employeesData.isLoaded
    }
}

export default connect(mapStateToProps)(EmployeesDashboard);