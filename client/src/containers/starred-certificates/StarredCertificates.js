import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Result, Tooltip } from 'antd';
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import Navbar from '../../components/nav-bar/NavBar';
import AuthModal from '../../components/auth-modal/AuthModal';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { setUser } from '../../components/auth-modal/AuthModal.actions';
import stylesheet from './StarredCertificates.styles';
import { verifyMe, getStarredCertificates, removeStarredCertificate } from './StarredCertificates.service';
import showNotification from '../../shared/showNotification';

const StarredCertificates = ({ history, setUser }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [starred, setStarred] = useState([]);
  const [toRemove, setToRemove] = useState([]);

  useEffect(() => {
    verifyUserAndFetchStarred();
  }, []);

  useEffect(() => {
    const cid = toRemove[toRemove.length - 1];
    if (cid) {
      const updatedStarred = starred.filter(s => s._id !== cid);
      setStarred(updatedStarred);
    }
  }, [toRemove]);

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

  const handleRemoveFromStarred = cid => {
    const token = localStorage.getItem("certificate-verifier-token");
    const updatedCertificates = starred.map(s => {
      if (cid === s._id) {
        s.loading = true;
      }
      return s;
    });
    setStarred(updatedCertificates);
    removeStarredCertificate(token, cid)
      .then(() => {
        setToRemove([...toRemove, cid]);
        showNotification('Success', 'Certificate removed from starred');
      })
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
        <Card style={{ 'position': 'relative' }}>
          <p>Awarded to: <span className={classes['candidate-name']}>{c.candidateName}</span></p>
          <div className={classes['icon-container']}>
            {c.loading
              ? <LoadingOutlined />
              : <Tooltip placement="top" title="Remove from starred">
                <CloseCircleFilled onClick={() => handleRemoveFromStarred(c._id)} />
              </Tooltip>}
          </div>
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
        subTitle={<p>You haven't starred any certificate yet</p>}
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ setUser }, dispatch);

export default connect(null, mapDispatchToProps)(StarredCertificates);
