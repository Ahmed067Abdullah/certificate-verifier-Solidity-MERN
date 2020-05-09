import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, DatePicker } from 'antd';
import { Link } from "react-router-dom";
import Navbar from '../../components/nav-bar/NavBar';
import { awardCertificateFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './AwardCertificate.styles';
import { awardCertificate, checkCompany } from './AwardCertificate.service';

const AwardCertificate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comapny, setCompany] = useState('');
  const [comapnyLoading, setCompanyLoading] = useState(true);
  const [comapnyNotRegistered, setComapnyNotRegistered] = useState(true);

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
    setIsSubmitting(true);
    if (!comapnyNotRegistered) {
      awardCertificate(values)
        .then(res => {

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
    <div>
      <Navbar />
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
            {comapny ? <p className={classes['company-name']}>from <span>{comapny}</span></p> : ''}
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default AwardCertificate;
