import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import { registerCompanyFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './RegisterCompany.styles';
import { registerCompany } from './RegisterCompany.service';
import { checkCompany } from '../award-certificate/AwardCertificate.service';
import showNotification from '../../shared/showNotification';

const RegisterCompany = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comapnyLoading, setCompanyLoading] = useState(true);
  const [comapnyNotRegistered, setComapnyNotRegistered] = useState(true);
  const formEl = useRef(null);

  useEffect(() => {
    checkCompany(setCompanyLoading, setComapnyNotRegistered);

    window.ethereum.on('accountsChanged', () => {
      setCompanyLoading(true);
      checkCompany(setCompanyLoading, setComapnyNotRegistered);
    });

    return () => {
      window.ethereum.removeAllListeners();
    }
  }, []);

  const onFinish = values => {
    setIsSubmitting(true);
    registerCompany(values)
      .then(res => {
        showNotification('Success', 'Company registered successfully');
        setComapnyNotRegistered(false);
        if (formEl.current) {
          formEl.current.resetFields();
        }
      })
      .catch(err => {
        console.log(err);
        showNotification('Error', 'Error occurred while registering company');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const classes = stylesheet();

  const companyAlreadyRegistered = !comapnyNotRegistered;

  return (
    <div style={{ 'pointerEvents': isSubmitting ? 'none' : 'all' }}>
      <Navbar />
      <Card
        className={classes['register-company-card']}
        title="Register Company"
        loading={comapnyLoading}>
        {companyAlreadyRegistered
          ? <p className={classes['cmp-unregistered']}>
            Sorry, the selected Ethereum address is already associated with a company.
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
            <Input disabled={isSubmitting || companyAlreadyRegistered} />
          </Form.Item>)}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={companyAlreadyRegistered}>
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default RegisterCompany;
