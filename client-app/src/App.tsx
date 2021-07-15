import { Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import './App.css';
import CompaniesProvider from './features/companies/CompaniesProvider';
import CompanyDetails from './features/companies/CompanyDetails';
import EmployeeDetails from './features/employees/EmployeeDetails';
import EmployeesDashboard from './features/employees/EmployeesDashboard';
import Home from './layout/Home';
import Navbar from './layout/Navbar';

function App() {
  return (
    <>
    <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <ToastContainer position='bottom-right' hideProgressBar />
            <Navbar />
            <Switch>
              <Route exact path='/companies' component={CompaniesProvider} />
              <Route exact path='/employees' component={EmployeesDashboard} />
              <Route exact path='/employees/:id' component={EmployeeDetails} />
              <Route exact path='/companies/:id' component={CompanyDetails} />
            </Switch>
          </>
        )}
      />
      </>
  );
}

export default App;
