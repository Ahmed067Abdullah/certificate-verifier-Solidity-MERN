import React from 'react';
import { Form, Input, Button, Card, DatePicker } from 'antd';
import stylesheet from './AwardCertificate.styles';

const requiredRule = {
  required: true,
  message: 'This field is required!',
};

const AwardCertificate = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const formFields = [
    {
      label: 'Candidate Name',
      name: 'candidateName',
      rules: [requiredRule]
    },
    {
      label: 'Position',
      name: 'position',
      rules: [requiredRule],
    },
    {
      label: 'Duration',
      name: 'duration',
      rules: [requiredRule],
      type: 'date'
    }
  ];

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 6, span: 24 },
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
          {/* <SketchPicker
          onChange={e => console.log(e)}
          onChangeComplete={handleChangeComplete}
        /> */}
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
