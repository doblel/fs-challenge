import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AccountModal = ({ item, loading, onCancel, onSave }) => {
  const [email, setEmail] = useState(item.email)
  const modalTitle = !!email ? 'Update account' : 'Create account'

  const buttonProps = { 
    form: 'accountModalForm',
    htmlType: 'submit',
    disabled: !email || loading || email === item.email,
    loading: loading,
    type: 'primary',
  }

  const submitForm = e => {
    e.preventDefault();
    onSave({ ...item, email })
  }

  return (
    <Modal
      title={modalTitle}
      visible={true}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" {...buttonProps}>
          Save
        </Button>,
      ]}
    >
      <Form id="accountModalForm" onSubmit={submitForm}>
        <Input placeholder="john@example.com"
          value={email}
          autoFocus={true}
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
      </Form>
    </Modal>
  );
}

export default React.memo(AccountModal);