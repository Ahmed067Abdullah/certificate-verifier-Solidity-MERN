import React from 'react';
import { Card } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import stylesheet from './Home.styles';

const Home = () => {
  const classes = stylesheet();

  return (
    <div>
      <Navbar />
      <Card className={classes['container']}>
        <p>Intro text</p>
      </Card>
    </div>
  );
}

export default Home;
