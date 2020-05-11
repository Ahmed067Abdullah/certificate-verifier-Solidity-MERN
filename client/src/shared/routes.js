import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from '../containers/home/Home';
import ViewCertificate from '../containers/view-certificate/ViewCertificate';
import RegisterCompany from '../containers/register-company/RegisterCompany';
import AwardCertificate from '../containers/award-certificate/AwardCertificate';
import FindCertificate from '../containers/find-certificate/FindCertificate';
import IssuedCertificates from '../containers/issued-certificates/IssuedCertificates';
import NotFound from '../containers/not-found/NotFound';

const getRoutes = status => {
  let routes;
  if (status === 1 || status === 2) {
    routes = <>
      <Route path="/not-found" component={() => <NotFound status={status} />} />
      <Redirect to="/not-found" />
    </>
  } else if (status === 3) {
    routes = <Switch>
      <Route path="/home" component={Home} />
      <Route path="/find-certificate" component={FindCertificate} />
      <Route path="/view-certificate/:uuid" component={ViewCertificate} />
      <Route path="/register-company" component={RegisterCompany} />
      <Route path="/award-certificate" component={AwardCertificate} />
      <Route path="/register-company" component={RegisterCompany} />
      <Route path="/issued-certificates" component={IssuedCertificates} />
      <Redirect to="/home" />
    </Switch>
  }
  return routes;
}

export default getRoutes;