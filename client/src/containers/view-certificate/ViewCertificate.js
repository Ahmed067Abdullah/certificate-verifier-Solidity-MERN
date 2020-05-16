import React, { useEffect, useState } from 'react';
import { Result } from 'antd';
import { getCertificate } from './ViewCertificate.service';
import { getCompany } from '../award-certificate/AwardCertificate.service';
import showNotification from '../../shared/showNotification';
import Spinner from '../../components/spinner/Spinner';
import Certificate from '../../components/certificate/Certificate';
import stylesheet from './ViewCertificate.styles';

const ViewCertificate = ({ match, history }) => {
  const [certificateLoading, setCertificateLoading] = useState(true);
  const [certificate, setCertificate] = useState({});
  const [company, setCompany] = useState({});
  const [certificateError, setCertificateError] = useState('');

  useEffect(() => {
    setupCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { params: { uuid } } = match;

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

  return certificateLoading
    ? <Spinner />
    : certificateError
      ? <div className={classes['not-found-container']}>
        <Result
          status={404}
          title={certificateError}
        />
      </div>
      : <div className='view-certificate-container'>
        {/* <button onClick={exportPDF}>Export PDF</button> */}
        <button onClick={() => history.push('/home')}>Go back to Application</button>
        <Certificate uuid={uuid} certificate={certificate} company={company} />
      </div>
}

export default ViewCertificate;