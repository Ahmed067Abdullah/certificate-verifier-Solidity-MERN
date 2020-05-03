import React, { useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
import web3 from '../../shared/web3';
import contract from '../../shared/contract';
import { registerCompanyFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './RegisterCompany.styles';
// import { SketchPicker } from 'react-color';

const RegisterCompany = () => {
  useEffect(() => {
    console.log('here', web3.eth.accounts.wallet[0])
    contract.methods.getCompany('0x6b19bD093F7D98505d4b31aF5F8DBF19d7f1c542')
      .call({ from: '0x6b19bD093F7D98505d4b31aF5F8DBF19d7f1c542' })
      .then(res => {
        console.log('here', res)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);
  
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // const handleChangeComplete = (color) => {
  //   console.log(color);
  // };

  const classes = stylesheet();

  return (
    <div>
      <Navbar />
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
