import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewCertificate from './containers/view-certificate/ViewCertificate';
import RegisterCompany from './containers/register-company/RegisterCompany';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/view-certificate" component={ViewCertificate} />
          <Route path="/register-company" component={RegisterCompany} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
