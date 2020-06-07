import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Spinner from './components/spinner/Spinner';
import './App.css';
import getRoutes from './shared/routes';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { setUser } from './components/auth-modal/AuthModal.actions';
import { verifyMe } from './components/auth-modal/AuthModal.service';

const App = ({ setUser }) => {
  const [metamastStatus, setMetamastStatus] = useState(0);

  useEffect(() => {
    setUpUserAndWallet();

    if (window.ethereum) {
      window.ethereum.on('networkChanged', networkId => {
        if (networkId !== 3) {
          setMetamastStatus(4);
        } else {
          enableEthereum();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setUpUserAndWallet = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      setMetamastStatus(1);
    } else {
      try {
        let res = await verifyMe();
        if (res) {
          setUser(res.data);
        }
      } catch (e) {
        localStorage.removeItem("certificate-verifier-token");
      } finally {
        setTimeout(() => {
          if (ethereum.networkVersion !== "3") {
            setMetamastStatus(4);
          } else {
            enableEthereum();
          }
        }, 50);
      }
    }
  }

  const enableEthereum = () => {
    const { ethereum } = window;
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

  return (
    <Router>
      <div className="App">
        {metamastStatus
          ? getRoutes(metamastStatus)
          : <Spinner />}
      </div>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setUser }, dispatch);

export default connect(null, mapDispatchToProps)(App);
