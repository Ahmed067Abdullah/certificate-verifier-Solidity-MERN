import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Spin } from 'antd';

import contract from './shared/contract';
import './App.css';
import getRoutes from './shared/routes';

const App = () => {
  const [metamastStatus, setMetamastStatus] = useState(0);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      setMetamastStatus(1);
    } else {
      ethereum.enable()
        .then(() => {
          setTimeout(() => {
            setMetamastStatus(3);
          }, 500);
        })
        .catch(err => {
          setMetamastStatus(2);
          console.log(err)
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
    }
  }, [])

  return (
    <Router>
      <div className="App">
        {metamastStatus
          ? getRoutes(metamastStatus)
          : <div className="initial-spinner-container">
            <Spin size="large" />
          </div>}
      </div>
    </Router>
  );
}

export default App;
