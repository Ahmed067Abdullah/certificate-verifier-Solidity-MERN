import React from 'react';
import { Result, Button } from 'antd';
import stylesheet from './NotFound.styles';

const NotFound = ({ status }) => {

  let message = "Please install metamask extension";
  let btn = <Button type="primary" onClick={() => window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en')}>Get Metamask</Button>
  let title = 'Metamask not found';
  let errorStatus = 404;
  if (status === 2) {
    message = "Please allow application to access metamask addresses";
    btn = <Button type="primary" onClick={() => window.location.reload()}>Reload</Button>;
    title = 'Access denied';
    errorStatus = 403;
  } else if (status === 4) {
    message = "Please select Ropsten Test Network in metamask extension";
    btn = null;
    title = 'Network issue';
    errorStatus = 403;
  }

  const classes = stylesheet();

  return (
    <div className={classes['container']}>
      <Result
        status={errorStatus}
        title={title}
        subTitle={message}
        extra={btn}
      />
    </div>
  );
};

export default NotFound;
