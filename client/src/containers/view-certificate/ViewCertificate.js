import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
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

  return <div>
    <Navbar />
    {certificateLoading
      ? <Spinner />
      : certificateError
        ? <div className={classes['not-found-container']}>
          <Result
            status={404}
            title={certificateError}
          />
        </div>
        : <div className='view-certificate-container'>
          <Button type="primary" onClick={addToStarredHandler} loading={starLoading}>
            Add to Starred
        </Button>
          <button onClick={() => history.push('/home')}>Go back to Application</button>
          <Certificate uuid={uuid} certificate={certificate} company={company} />
        </div>}
  </div>
}

export default ViewCertificate;