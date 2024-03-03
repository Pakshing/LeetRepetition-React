import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const LoginModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        open={open}
        title="Login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type='primary' danger key="back" onClick={handleCancel}>
            <b>Cancel</b>
          </Button>,
        ]}
      >
        <div style={{display:"flex",justifyContent:"center",gap:"5rem"}}>
            <Button>Google</Button>
            <Button>Github</Button>
        </div>
       
      </Modal>
    </>
  );
};

export default LoginModal;