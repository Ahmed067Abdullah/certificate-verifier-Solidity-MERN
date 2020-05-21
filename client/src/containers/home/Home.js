import React from 'react';
import Footer from '../../components/footer/Footer';
import { Card } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import stylesheet from './Home.styles';

const Home = () => {
  const classes = stylesheet();

  return (
    <div className="main-container">
      <Navbar />
      <div className="navbar-placeholder" />
      <Card className={classes['container']}>
        <p>Intro text</p>
      </Card>
      <Footer />
    </div>
  );
}

export default Home;
