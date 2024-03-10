import React, { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const AddQuestionModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        console.log(values); // Here you can handle the form values, e.g., send them to the server
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add question
      </Button>
      <Modal
        title="Add question"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please input the question!' }]}
          >
            <Input />
          </Form.Item>
          {/* Add more Form.Item components for more fields if needed */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddQuestionModal;