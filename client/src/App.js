import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewCertificate from './containers/view-certificate/ViewCertificate';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/about" component={ViewCertificate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
