import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import stylesheet from './RegisterCompany.styles';
import { SketchPicker } from 'react-color';

const requiredRule = {
  required: true,
  message: 'This field is required!',
};

const urlRule = {
  pattern: new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm),
  message: 'Invalid URL',
}

const RegisterCompany = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const formFields = [
    {
      label: 'Company Name',
      name: 'company',
      rules: [requiredRule]
    },
    {
      label: 'Website',
      name: 'website',
      rules: [requiredRule, urlRule]
    },
    {
      label: 'Company Logo URL',
      name: 'logo',
      rules: [requiredRule, urlRule]
    }
  ];

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 24 },
  };

  const tailLayout = {
    wrapperCol: { offset: 6, span: 24 },
  };

  const handleChangeComplete = (color) => {
    console.log(color);
  };

  const classes = stylesheet();

  return (
    <div>
      <Card
        className={classes['register-company-card']}
        title="Register Company">
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
            <Input />
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

export default RegisterCompany;
