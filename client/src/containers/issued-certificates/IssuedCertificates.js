import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Result } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import stylesheet from './IssuedCertificates.styles';
import { getIssuedCertificates } from './IssuedCertificates.service';
import showNotification from '../../shared/showNotification';

const IssuedCertificates = () => {

  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    callGetIssuedCertificates();

    window.ethereum.on('accountsChanged', () => {
      setLoading(true);
      callGetIssuedCertificates();
    });

    return () => {
      window.ethereum.removeAllListeners();
    }
  }, []);

  const callGetIssuedCertificates = () => {
    getIssuedCertificates()
      .then(res => {
        setCertificates(res.data);
      })
      .catch(err => {
        showNotification('Error', err, true);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      })
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
  } else if (certificates.length) {
    certificatesJSX = certificates.map(c => <Col span={6} key={c.uuid}>
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

export default IssuedCertificates;
