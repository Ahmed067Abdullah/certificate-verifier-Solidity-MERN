import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewCertificate from './containers/view-certificate/ViewCertificate';
import RegisterCompany from './containers/register-company/RegisterCompany';
import AwardCertificate from './containers/award-certificate/AwardCertificate';
import FindCertificate from './containers/find-certificate/FindCertificate';
import contract from './shared/contract';
import './App.css';

const App = () => {
  const [isMetaMaskEnabled, setIsMetaMaskEnabled] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install metamask');
    }
    ethereum.enable()
      .then(() => {
        setIsMetaMaskEnabled(true);
      });

    contract.methods.getCertificate('05879432-81a9-464b-a275-9502ee129202')
      .call({ from: ethereum.selectedAddress })
      .then(res => {
        console.log('App, Certificate:', res)
      })
      .catch(err => {
        console.log(err)
      });

    contract.methods.getCompany('0x4Af3462EdE5F27469cF2Ef9F590947f0648dDecf')
      .call({ from: ethereum.selectedAddress })
      .then(res => {
        console.log('App, Comapny:', res)
      })
      .catch(err => {
        console.log(err)
      });
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/find-certificate/" component={FindCertificate} />
          <Route path="/view-certificate/:uuid" component={ViewCertificate} />
          <Route path="/register-company" component={RegisterCompany} />
          <Route path="/award-certificate" component={AwardCertificate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
