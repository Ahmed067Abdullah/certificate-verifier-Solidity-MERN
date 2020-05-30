import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import Footer from '../../components/footer/Footer';
import { LeftOutlined } from '@ant-design/icons';
import { getCertificate } from './ViewCertificate.service';
import { getCompany } from '../award-certificate/AwardCertificate.service';
import showNotification from '../../shared/showNotification';
import Spinner from '../../components/spinner/Spinner';
import Certificate from '../../components/certificate/Certificate';
import stylesheet from './ViewCertificate.styles';
import { addStarredCertificate } from '../starred-certificates/StarredCertificates.service';
import { verifyMe } from '../../components/auth-modal/AuthModal.service';


const ViewCertificate = ({ match, history }) => {
  const [certificateLoading, setCertificateLoading] = useState(true);
  const [starLoading, setStarLoading] = useState(false);
  const [certificate, setCertificate] = useState({});
  const [company, setCompany] = useState({});
  const [certificateError, setCertificateError] = useState('');

  useEffect(() => {
    setupCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { params: { uuid } } = match;

  const addToStarredHandler = async () => {
    setStarLoading(true);
    try {
      let res = await verifyMe();
      if (res && res.data && res.data.id) {
        await addStarredCertificate(uuid);
        showNotification('Success', 'Certificate starred successfully');
      } else {
        history.push(`/starred-certificates?cid=${uuid}`)
      }
    }
    catch (e) {
      console.log(e.response);
      if (e && e.response && e.response.data.error === 'Certificate is already starred') {
        showNotification('Error', e, true);
      } else {
        history.push(`/starred-certificates?cid=${uuid}`)
      }
    }
    finally {
      setStarLoading(false);
    }
  }

  const copyUrlHandler = () => {
    var textarea = document.createElement("textarea");
    textarea.textContent = window.location.href;
    textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");  // Security exception may be thrown by some browsers.
      showNotification('Success', 'URL copied successfully');
      return;
    }
    catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    }
    finally {
      document.body.removeChild(textarea);
    }
  }

  const setupCertificate = async () => {
    try {
      const certificateObj = await getCertificate(uuid);
      setCertificate(certificateObj);
      console.log(certificateObj);
      if (certificateObj[0] !== "") {
        const companyObj = await getCompany(certificateObj['4']);
        console.log(companyObj);
        setCompany(companyObj);
        setCertificateLoading(false);
        if (companyObj['0'] === '') {
          setCertificateError('Certificate issuer not found');
        }
      } else {
        setCertificateLoading(false);
        setCertificateError('Certificate not found');
      }
    }
    catch (e) {
      showNotification('Error', 'Error occurred while fetching certificate');
      console.log(e);
    }
  }

  const classes = stylesheet();

  return <div className="main-container">
    <Navbar />
    <div className="navbar-placeholder" />
    <Button type="primary" onClick={() => history.goBack()} className={classes['back-btn']}>
      <LeftOutlined />
      Back
    </Button>
    {certificateLoading
      ? <Spinner />
      : certificateError
        ? <div className={classes['not-found-container']}>
          <Result
            status={404}
            title={certificateError}
          />
        </div>
        : <div className={classes['view-certificate-container']}>
          <div className='certificate-container'>
            <Certificate uuid={uuid} certificate={certificate} company={company} />
          </div>
          <div className={classes['btns-container']}>
            <Button type="primary" onClick={addToStarredHandler} loading={starLoading}>
              Add to Starred
            </Button>
            <Button type="primary" onClick={copyUrlHandler}>
              Copy URL
            </Button>
          </div>
        </div>}
    <Footer />
  </div>
}

export default ViewCertificate;