import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Result, Tooltip } from 'antd';
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import Navbar from '../../components/nav-bar/NavBar';
import AuthModal from '../../components/auth-modal/AuthModal';
import { connect } from 'react-redux';
import stylesheet from './StarredCertificates.styles';
import { bindActionCreators } from "redux";
import { getStarredCertificates, addStarredCertificate, removeStarredCertificate } from './StarredCertificates.service';
import { setUser } from '../../components/auth-modal/AuthModal.actions';
import { verifyMe } from '../../components/auth-modal/AuthModal.service';
import showNotification from '../../shared/showNotification';

const StarredCertificates = ({ history, setUser, user, location }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [starred, setStarred] = useState([]);
  const [toRemove, setToRemove] = useState([]);

  useEffect(() => {
    fetchStarred();
  }, []);

  useEffect(() => {
    if (!loading && !user.id && !showAuthModal) {
      setShowAuthModal(true)
    }
  }, [user]);

  useEffect(() => {
    const cid = toRemove[toRemove.length - 1];
    if (cid) {
      const updatedStarred = starred.filter(s => s._id !== cid);
      setStarred(updatedStarred);
    }
  }, [toRemove]);

  const fetchStarred = async () => {
    const token = localStorage.getItem("certificate-verifier-token");
    if (token) {
      try {
        const res = await getStarredCertificates(token);
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

  const userAuthenticated = async flag => {
    setTimeout(() => {
      setShowAuthModal(false);
    }, 500);
    if (flag) {
      setLoading(true);
      let res = await verifyMe();
      setUser(res.data);
      const cid = new URLSearchParams(location.search).get("cid");
      if (cid) {
        await addStarredCertificate(cid);
      }
      fetchStarred();
    } else {
      history.goBack();
    }
  }

  const handleRemoveFromStarred = cid => {
    const updatedCertificates = starred.map(s => {
      if (cid === s._id) {
        s.loading = true;
      }
      return s;
    });
    setStarred(updatedCertificates);
    removeStarredCertificate(cid)
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

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StarredCertificates);
