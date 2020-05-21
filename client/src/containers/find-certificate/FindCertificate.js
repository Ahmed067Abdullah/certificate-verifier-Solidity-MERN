import React, { useRef, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import Footer from '../../components/footer/Footer';
import { findCertificateFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './FindCertificate.styles';
import { getCertificate } from '../view-certificate/ViewCertificate.service';
import showNotification from '../../shared/showNotification';
// import { SketchPicker } from 'react-color';

const QueryCertificate = ({ history }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formEl = useRef(null);

  const onFinish = values => {
    setIsSubmitting(true);
    getCertificate(values.uuid)
      .then(res => {
        if (res['0'] === '') {
          formEl.current.setFields([
            {
              name: 'uuid',
              errors: ['Certificate not found!'],
            },
          ]);
        } else {
          history.push(`/view-certificate/${values.uuid}`);
          // window.open(`${window.location.origin}/view-certificate/${values.uuid}`)
        }
        console.log(res);
      })
      .catch(err => {
        showNotification('Error', 'Error occurred while checking address');
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      })
  };

  const classes = stylesheet();
  return (
    <div className="main-container">
      <Navbar />
      <div className="navbar-placeholder" />
      <Card
        className={classes['card']}
        title="Find Certificate">
        <Form
          {...layout}
          name="find-certificate"
          onFinish={onFinish}
          ref={formEl}
        >
          {formFields.map(field => <Form.Item
            key={field.name}
            label={field.label}
            name={field.name}
            rules={field.rules}
          >
            <Input disabled={isSubmitting} />
          </Form.Item>)}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Footer />
    </div>
  )
}

export default QueryCertificate;
