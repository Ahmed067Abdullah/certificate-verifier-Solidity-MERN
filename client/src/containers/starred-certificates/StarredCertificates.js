import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Result } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import AuthModal from '../../components/auth-modal/AuthModal';
import stylesheet from './StarredCertificates.styles';
import { verifyMe, getStarredCertificates } from './StarredCertificates.service';
import showNotification from '../../shared/showNotification';

const StarredCertificates = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
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
        setShowAuthModal(true);
      }
      finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setShowAuthModal(true);
    }
  }

  const userAuthenticated = flag => {
    setTimeout(() => {
      setShowAuthModal(false);
    }, 500);
    if (flag) {
      setLoading(true);
      verifyUserAndFetchStarred()
    } else {
      history.goBack();
    }
  }

  const showCertificate = uuid => {
    window.open(`${window.location.origin}/view-certificate/${uuid}`)
  }

  const classes = stylesheet();

  let certificatesJSX;
  if (loading) {
    certificatesJSX = <Row gutter={[16, 24]}>
      {Array(8).fill().map((c, i) => <Col span={6} key={i}>
        <Card loading={true} />
      </Col>)}
    </Row>;
  } else if (showAuthModal) {
    certificatesJSX = <AuthModal onClose={userAuthenticated} />;
  } else if (starred.length) {
    certificatesJSX = <Row gutter={[16, 24]}>
      {starred.map(c => <Col span={6} key={c.uuid}>
        <Card>
          <p>Awarded to: <span className={classes['candidate-name']}>{c.candidateName}</span></p>
          <Button type="primary" onClick={() => showCertificate(c.uuid)}>
            View Certificate
        </Button>
        </Card>
      </Col>)}
    </Row>;
  } else {
    certificatesJSX = <div className={classes['empty-state-container']}>
      <Result
        status={404}
        title='No certificate found'
        subTitle={<p>Click <Link to="/award-certificate">here</Link> to issue your first certificate</p>}
      />
    </div>
  }

  return (
    <div>
      <Navbar />
      <div className={classes['certificates-container']}>
        {certificatesJSX}
      </div>
    </div>
  );
};

export default StarredCertificates;
