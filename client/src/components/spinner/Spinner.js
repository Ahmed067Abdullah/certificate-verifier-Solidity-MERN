import React from 'react';
import { Spin } from 'antd';
import stylesheet from './Spinner.styles';

const Spinner = () => {
  const classes = stylesheet();

  return (
    <div className={classes['spinner-container']}>
      <Spin size="large" />
    </div>
  )
}

export default Spinner;
