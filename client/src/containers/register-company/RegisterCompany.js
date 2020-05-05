import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Navbar from '../../components/nav-bar/NavBar';
// import web3 from '../../shared/web3';
import contract from '../../shared/contract';
import { registerCompanyFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './RegisterCompany.styles';
// import { SketchPicker } from 'react-color';

const RegisterCompany = () => {
  const [isMetaMaskEnabled, setIsMetaMaskEnabled] = useState(false);
  useEffect(() => {
    const { ethereum } = window;
    if (!ethereum) {
      alert('Please install metamask');
    }
    ethereum.enable()
      .then(() => {
        setIsMetaMaskEnabled(true);
      });

    contract.methods.getCompany('0x4Af3462EdE5F27469cF2Ef9F590947f0648dDecf')
      .call({ from: ethereum.selectedAddress })
      .then(res => {
        console.log('Comapny:', res)
      })
      .catch(err => {
        console.log(err)
      });
  }, []);

  const onFinish = values => {
    const { company, website, logo } = values;
    const { ethereum } = window;
    console.log(ethereum.selectedAddress)
    contract.methods.registerCompany(company, logo, website)
      .call({
        from: ethereum.selectedAddress,
        gas: 1000000,
        gasPrice: '30000000000000',
      }, (a, b, c) => {
        console.log(a, b, c);
      })
      .then(res => {
        console.log('reg cmp: ', res)
      })
      .catch(err => {
        console.log(err)
      });
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
            <Button type="primary" htmlType="submit" disabled={!isMetaMaskEnabled}>
              Submit
        </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default RegisterCompany;
