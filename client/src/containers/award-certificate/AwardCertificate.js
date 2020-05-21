import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Card, DatePicker } from 'antd';
import { Link } from "react-router-dom";
import Navbar from '../../components/nav-bar/NavBar';
import Footer from '../../components/footer/Footer';
import { awardCertificateFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './AwardCertificate.styles';
import { awardCertificate, checkCompany } from './AwardCertificate.service';
import showNotification from '../../shared/showNotification';

const AwardCertificate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comapny, setCompany] = useState('');
  const [comapnyLoading, setCompanyLoading] = useState(true);
  const [comapnyNotRegistered, setComapnyNotRegistered] = useState(true);
  const formEl = useRef(null);

  useEffect(() => {
    checkCompany(setCompanyLoading, setComapnyNotRegistered, setCompany);

    window.ethereum.on('accountsChanged', () => {
      setCompanyLoading(true);
      checkCompany(setCompanyLoading, setComapnyNotRegistered, setCompany);
    });

    return () => {
      window.ethereum.removeAllListeners();
    }
  }, []);

  const onFinish = values => {
    if (!comapnyNotRegistered) {
      setIsSubmitting(true);
      awardCertificate(values)
        .then(res => {
          showNotification('Success', 'Certificate created successfully');
          if (formEl.current) {
            formEl.current.resetFields();
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  const classes = stylesheet();

  return (
    <div className="main-container">
      <Navbar />
      <div className="navbar-placeholder" />
      <Card
        className={classes['register-company-card']}
        title="Award Certificate"
        loading={comapnyLoading}>
        {comapnyNotRegistered
          ? <p className={classes['cmp-unregistered']}>
            Sorry, the selected Ethereum address is not associated with any company.
          <span>Click <Link to="/register-company">here</Link> to register your comapny</span>
          </p>
          : null}
        <Form
          {...layout}
          name="register-comapny"
          onFinish={onFinish}
          ref={formEl}
        >
          {formFields.map(field => <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
          >
            {field.type === 'date'
              ? <DatePicker.RangePicker style={{ width: '100%' }} disabled={isSubmitting || comapnyNotRegistered} />
              : <Input disabled={isSubmitting || comapnyNotRegistered} />}
          </Form.Item>)}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={comapnyNotRegistered}>
              Submit
            </Button>
            {comapny['0'] ? <p className={classes['company-name']}>from <span>{comapny['0']}</span></p> : ''}
          </Form.Item>
        </Form>
      </Card>
      <Footer />
    </div>
  )
}

export default AwardCertificate;
