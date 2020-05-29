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
        <p className={classes.heading}>Problem:</p>
        <p className={classes.text}>
          Whenever an employee leaves an organization or a student completes a course/bootcamp,
          a certificate is awarded to them. These certificates are usually awarded in the form of Hard
          Copy (on paper) and there is no way to check their authenticity. Such certificates are helpful
          in job search and creating resume BUT they can be forged easily.
        </p>
        <p className={classes.heading}>Solution:</p>
        <p className={classes.text}>
          To deal with the above mentioned issue, We can maintain a decentralized record of the
          certificates. To do that, at first the company/organization would have to register themselves
          using an ethereum address. The organization would also have to show their ethereum address on
          their official website so that it can be verified that a particular address belongs to a 
          particular company. Once a company/organization is registered, they can start awarding
          the certificates to the candidates by submitting a simple form. All this data would be stored
          on ethereum blockchain in order to achieve immutability and verifiability.
        </p>
        <p className={classes.heading}>Technology Stack:</p>

        <ol style={{ 'paddingLeft': '20px' }}>
          <li>
            <p className={classes['bullet-point']}>
              <span>Solidity</span> is used for smart contract development.
            </p>
          </li>
          <li>
            <p className={classes['bullet-point']}>
              For frontend of the application, the famous UI library of JS, i.e <span>React</span> is used.
            </p>
          </li>
          <li>
            <p className={classes['bullet-point']}>
              Backend server for user authentication and storing metadata of certificates is written in <span>Node</span>.
            </p>
          </li>
          <li>
            <p className={classes['bullet-point']}>
              The No SQL database <span>MongoDB Atlas</span> is used for data persistance.
            </p>
          </li>
        </ol>
        {/* <p className={classes.text}>
          1. &nbsp;&nbsp;<span>Solidity</span> is used for smart contract development.
          <br />
          2. &nbsp;&nbsp;For frontend of the application, the famous UI library of JS, i.e <span>React</span> is used.
          <br />
          3. &nbsp;&nbsp;Backend server for user authentication and storing metadata of certificates is written in <span>Node</span>.
          <br />
          4. &nbsp;&nbsp;The No SQL database <span>MongoDB Atlas</span> is used for data persistance.
          <br />
        </p> */}
      </Card>
      <Footer />
    </div >
  );
}

export default Home;
