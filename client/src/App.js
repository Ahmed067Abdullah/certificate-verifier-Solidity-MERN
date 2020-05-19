import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Spinner from './components/spinner/Spinner';
import './App.css';
import getRoutes from './shared/routes';
import store from "./store";

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
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {metamastStatus
            ? getRoutes(metamastStatus)
            : <Spinner />}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
