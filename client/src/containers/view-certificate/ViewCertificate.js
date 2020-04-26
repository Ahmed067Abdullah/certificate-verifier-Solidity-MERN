import React from 'react';
import moment from 'moment';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import stylesheet from './ViewCertificate.styes';
import { createUseStyles } from 'react-jss';
// import './ViewCertificate.css';

const ViewCertificate = () => {
  const classes = createUseStyles(stylesheet())();

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

  const exportPDF = () => {
    html2canvas(document.querySelector(".certificate-container")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf");
    });
  }

  const uuid = '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
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
    <div className='view-certificate-container'>
      <button onClick={exportPDF}>Export PDF</button>
      <div className={classes['certificate-container']}>
        <div className={classes['styled-div']}>
          <img src={logoURL} alt="Company logo" />
        </div>
        <div className={classes['main-content']}>
          <p className={classes['main-heading']}>
            <span>Certificate </span>
            of Achievement</p>
          <p className={classes['certificate-text']}>
            This certificate is presented to
            <span className='name'>{name}</span>
            For successfully completing&nbsp;
            <span>{achievement}</span> from&nbsp;
            <span>{moment(startDate).format('MMMM Do YYYY')}</span> to&nbsp;
            <span>{moment(endDate).format('MMMM Do YYYY')}</span>&nbsp;
            {difference ? `(${difference})` : ''}
          </p>
        </div>
        <div className={classes['certificate-footer']}>
          <div>
            <p className={classes['issuer']}>{user}</p>
            <p className={classes['issuer-designation']}>{designation} at {companyName}</p>
          </div>
          <p className={classes['issued-date']}>{moment(awardedAt).format('Do MMMM, YYYY.')}</p>
        </div>
        <p className={classes['certificate-uuid']}>{uuid}</p>
      </div >
    </div >
  )
}

export default ViewCertificate;