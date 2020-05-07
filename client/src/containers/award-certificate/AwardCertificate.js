import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, DatePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import contract from '../../shared/contract';
import Navbar from '../../components/nav-bar/NavBar';
import { awardCertificateFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './AwardCertificate.styles';
import moment from 'moment';

const AwardCertificate = () => {
  const [isMetaMaskEnabled, setIsMetaMaskEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install metamask');
    }
    ethereum.enable()
      .then(() => {
        setIsMetaMaskEnabled(true);
      });

    contract.methods.getCertificate('0x4Af3462EdE5F27469cF2Ef9F590947f0648dDecf')
      .call({ from: ethereum.selectedAddress })
      .then(res => {
        console.log('Certificate:', res)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  const onFinish = values => {
    console.log('Success:', values);
    const { ethereum } = window;
    const { candidateName, duration, position, presenter, presenterDesignation } = values;
    const uuid = uuidv4();
    console.log(ethereum.selectedAddress, uuid);
    const startDate = moment(duration[0]).unix().toString();
    const endDate = moment(duration[1]).unix().toString();
    setIsSubmitting(true);
    contract.methods.awardCertificate(uuid, candidateName, position, startDate, endDate, presenter, presenterDesignation)
      .send({ from: ethereum.selectedAddress }, (err, address) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Tx Address:', address);
      })
      .then(res => {

      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const classes = stylesheet();

  return (
    <div>
      <Navbar />
      <Card
        className={classes['register-company-card']}
        title="Award Certificate">
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
              ? <DatePicker.RangePicker style={{ width: '100%' }} />
              : <Input />}
          </Form.Item>)}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default AwardCertificate;
