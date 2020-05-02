import React from 'react';
import { Form, Input, Button, Card, DatePicker } from 'antd';
import stylesheet from './AwardCertificate.styles';
import { awardCertificateFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout} from '../../shared/formLayout';

const AwardCertificate = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const classes = stylesheet();

  return (
    <div>
      <Card
        className={classes['register-company-card']}
        title="Award Certificate">
        <Form
          {...layout}
          name="register-comapny"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
