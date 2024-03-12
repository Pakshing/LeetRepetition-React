import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Space, Radio, Tag } from 'antd';
import { addNewQuestion } from '../../store/features/question/QuestionAPI';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

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
        //form.resetFields();
        console.log(values); // Here you can handle the form values, e.g., send them to the server
        const response = addNewQuestion(values);
        console.log("addNewQuestion",response)
        //setVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
    
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add question
      </Button>
      <Modal
        title="Add Question"
        open={visible}
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
            name="url"
            label="URL"
            rules={[{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }]}
            >
            <Input placeholder="https://leetcode.com/problems/two-sum/description/" />
            </Form.Item>

            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the question!' }]}
            >
            <Input placeholder="Two Sum" />
          </Form.Item>

          <Form.Item label="Difficulty" name="difficulty" rules={[{ required: true, message: 'Please select a difficulty level!' }]}>
            <Radio.Group>
            <Radio.Button value="EASY">EASY</Radio.Button>
            <Radio.Button value="MEDIUM">MEDIUM</Radio.Button>
            <Radio.Button value="HARD">HARD</Radio.Button>
            </Radio.Group>
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
            <Radio.Group>
            <Radio.Button value="ARRAY">Array</Radio.Button>
            <Radio.Button value="STRING">String</Radio.Button>
            <Radio.Button value="LINKED_LIST">Linked List</Radio.Button>
            <Radio.Button value="HASHING">Map/Set</Radio.Button>
            <Radio.Button value="BINARY_SEARCH">Binary Search</Radio.Button>
            <Radio.Button value="HEAP">Heap/Priority Queue</Radio.Button>
            <Radio.Button value="STACK">Stack</Radio.Button>
            <Radio.Button value="QUEUE">Queue</Radio.Button>
            <Radio.Button value="TREE">Tree</Radio.Button>
            <Radio.Button value="GRAPH">Graph</Radio.Button>
            <Radio.Button value="DP">Dynamic Programming</Radio.Button>
            <Radio.Button value="GREEDY">Greedy</Radio.Button>
            <Radio.Button value="MATH">Math</Radio.Button>
            <Radio.Button value="SORTING">Sorting</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Next Review Date" name="next_review" rules={[{ required: true, message: 'Please select an option!' }]}>
            <Radio.Group>
            <Radio.Button value="1">Tomorrow</Radio.Button>
            <Radio.Button value="2">2 Days</Radio.Button>
            <Radio.Button value="3">3 Days</Radio.Button>
            <Radio.Button value="7">7 Days</Radio.Button>
            <Radio.Button value="14">14 Days</Radio.Button>
            <Radio.Button value="21">21 Days</Radio.Button>
            <Radio.Button value="30">30 Days</Radio.Button>
            <Radio.Button value="never">Never</Radio.Button>
            </Radio.Group>
        </Form.Item>
          {/* Add more Form.Item components for more fields if needed */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddQuestionModal;