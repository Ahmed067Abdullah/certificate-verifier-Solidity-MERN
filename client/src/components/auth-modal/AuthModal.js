import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { userAuthFormFields as formFields } from '../../shared/formFields';
import { layout, tailLayout } from '../../shared/formLayout';
import stylesheet from './AuthModal.styles';
import { register, login } from './AuthModal.service';
import showNotification from '../../shared/showNotification';

const AuthModal = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [onLogin, setOnLogin] = useState(true);
  const [visible, setVisible] = useState(true);
  const formEl = useRef(null);
  const classes = stylesheet();

  const toggleForm = () => {
    if (!isSubmitting) {
      formEl.current.resetFields();
      setOnLogin(!onLogin);
    }
  }

  const onFinish = values => {
    setIsSubmitting(true);
    const promise = onLogin ? login : register;
    promise(values)
      .then(res => {
        localStorage.setItem("certificate-verifier-token", res.data.token);
        handleClose(true);
      })
      .catch(err => {
        showNotification('Error', err, true);
      })
      .finally(() => {
        setIsSubmitting(false);
      })
  };

  const handleClose = flag => {
    if (!isSubmitting) {
      setVisible(false);
      onClose(flag);
    }
  }

  let title = 'Register';
  let nameField = <Form.Item
    label="Name"
    name="name"
    rules={[{
      required: true,
      message: 'This field is required!',
    }]}
  >
    <Input disabled={isSubmitting} />
  </Form.Item>;
  let toggleText = <p className={classes['toggle-text']}>
    Already have an account? <span onClick={toggleForm}>Login</span>
  </p>;
  if (onLogin) {
    title = 'Login';
    nameField = null;
    toggleText = <p className={classes['toggle-text']}>
      Don't have an account? <span onClick={toggleForm}>Register</span>
    </p>;
  }

  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      onCancel={() => handleClose(false)}
    >
      <Form
        {...layout}
        name="auth"
        onFinish={onFinish}
        ref={formEl}
      >
        {nameField}

        {formFields.map(field => <Form.Item
          key={field.name}
          label={field.label}
          name={field.name}
          rules={field.rules}
        >
          <Input disabled={isSubmitting} type={field.type} />
        </Form.Item>)}

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
        </Button>
        </Form.Item>
        <Form.Item {...tailLayout} style={{ 'marginBottom': '-10px' }}>
          {toggleText}
        </Form.Item>
      </Form>
    </Modal >
  )
}

export default AuthModal;
