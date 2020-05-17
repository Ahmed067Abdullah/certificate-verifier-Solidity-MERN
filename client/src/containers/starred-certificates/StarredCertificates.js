import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Result } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import stylesheet from './StarredCertificates.styles';
import { verifyMe, getStarredCertificates } from './StarredCertificates.service';
import showNotification from '../../shared/showNotification';

const StarredCertificates = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    verifyUserAndFetchStarred();
  }, []);

  const verifyUserAndFetchStarred = async () => {
    const token = localStorage.getItem("certificate-verifier-token");
    if (token) {
      try {
        let res = await verifyMe(token);
        setUser(res.data);
        res = await getStarredCertificates(token);
        setStarred(res.data.favourites)
        setIsAuthenticated(true);
      }
      catch (e) {
        console.log(e)
      }
      finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  const showCertificate = uuid => {
    window.open(`${window.location.origin}/view-certificate/${uuid}`)
  }

  const classes = stylesheet();

  let certificatesJSX;
  if (loading) {
    certificatesJSX = Array(8).fill().map((c, i) => <Col span={6} key={i}>
      <Card loading={true} />
    </Col>);
  } else if (starred.length) {
    certificatesJSX = starred.map(c => <Col span={6} key={c.uuid}>
      <Card>
        <p>Awarded to: <span className={classes['candidate-name']}>{c.candidateName}</span></p>
        <Button type="primary" onClick={() => showCertificate(c.uuid)}>
          View Certificate
        </Button>
      </Card>
    </Col>);
  }

  return (
    <div>
      <Navbar />
      <div className={classes['certificates-container']}>
        {certificatesJSX
          ? <Row gutter={[16, 24]}>
            {certificatesJSX}
          </Row>
          : <div className={classes['empty-state-container']}>
            <Result
              status={404}
              title='No certificate found'
              subTitle={<p>Click <Link to="/award-certificate">here</Link> to issue your first certificate</p>}
            />
          </div>}

      </div>
    </div>
  );
};

export default StarredCertificates;
