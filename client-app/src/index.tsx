import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux"
import thunk from 'redux-thunk';
import { companiesReducer } from './redux/reducers/companiesReducer';
import { employeesReducer } from './redux/reducers/employeesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  companiesData: companiesReducer,
  employeesData: employeesReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
