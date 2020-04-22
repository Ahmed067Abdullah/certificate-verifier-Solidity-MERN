import React from 'react';
import moment from 'moment';
import './ViewCertificate.css';

const ViewCertificate = () => {

  const getDifference = (startDate, endDate) => {
    const diff = Math.floor(moment(endDate).diff(moment(startDate), 'months', true));

    const years = Math.floor(diff / 12);
    let diffString = '';
    if (years) {
      diffString = years + ' year';
      if (years > 1) {
        diffString += 's';
      }
    }

    const months = diff % 12;
    if (months) {
      if (years) {
        diffString += ' & ';
      }
      diffString += months + ' month';
      if (months > 1) {
        diffString += 's';
      }
    }
    return diffString;
  }

  const name = 'Ahmed Abdullah';
  const achievement = 'CMAD course';
  const logoURL = 'https://ipac.page/images/brand-logo-1.jpg';
  const startDate = 1581111186969;
  const endDate = 1587551502739;
  const difference = getDifference(startDate, endDate);
  const companyName = 'Sudofy';
  const user = 'Amin Ahmed Khan';
  const designation = 'CEO';
  const awardedAt = 1587551502739;
  return (
    <div className="view-certificate-container">
      <div className="certificate-container">
        <div className="styled-div">
          <img src={logoURL} alt="Company logo" />
        </div>
        <div className="main-content">
          <p className="main-heading">
            <span>Certificate </span>
            of Achievement</p>
          <p className="certificate-text">
            This certificate is presented to
            <span className="name">{name}</span>
            For successfully completing&nbsp;
            <span>{achievement}</span> from&nbsp;
            <span>{moment(startDate).format('MMMM Do YYYY')}</span> to&nbsp;
            <span>{moment(endDate).format('MMMM Do YYYY')}</span>&nbsp;
            {difference ? `(${difference})` : ''}
          </p>
        </div>
        <div className="certificate-footer">
          <div>
            <p className="issuer">{user}</p>
            <p className="issuer-designation">{designation} at {companyName}</p>
          </div>
          <p className="issued-date">{moment(awardedAt).format('Do MMMM, YYYY.')}</p>
        </div>
      </div>
    </div >
  )
}

export default ViewCertificate;