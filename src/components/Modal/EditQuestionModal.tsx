import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Space, Radio, Tag, Checkbox } from 'antd';
import { addNewQuestion, get_next_review_long, updateQuestion, daysFromTodayStr, editQuestion } from '../../store/features/question/QuestionAPI';
import { useAppDispatch } from '../../app/store';
import { findQuestionByUserId} from '../../store/features/questionTable/questionTableSlice'
import { LeetCodeQuestionModel } from '../../data/LeetCodeQuestionModel';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

type EditQuestionModalProps = {
    question: LeetCodeQuestionModel;
  };
  const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ question }) => {
    const dispatch = useAppDispatch();
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();

  const showModal = () => {
    form.setFieldsValue({
      url: question.url,
      difficulty: question.difficulty,
      tags: question.tags,
      review_in_days_str: daysFromTodayStr(question.next_review),
    });
    setVisible(true);
    console.log(question)
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        let modifiedQuestion = { ...question };
        modifiedQuestion.url = values.url;
        modifiedQuestion.difficulty = values.difficulty;
        modifiedQuestion.tags = values.tags;
        modifiedQuestion.next_review_long = values.review_in_days_str === "never" ? null : get_next_review_long(values.review_in_days_str);
        const result = await editQuestion(modifiedQuestion);
        if (result !== 'Failure') {
            dispatch(findQuestionByUserId(parseInt(localStorage.getItem("user_id") as string)));
            form.resetFields();
            setVisible(false);
          }
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
        Edit
      </Button>
      <Modal
        title="Edit Question"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"

        >
            <Form.Item
                name="url"
                label="URL"
                rules={[
                    { required: true },
                    { type: 'url', warningOnly: true },
                    { type: 'string', min: 6 },
                    {
                        validator: (_, value) => {
                            const regex = /^https:\/\/leetcode\.com\/problems\//;
                            return regex.test(value) ? Promise.resolve() : Promise.reject(new Error('URL must match "https://leetcode.com/problems/"'));
                        },
                    }
                ]}
            >
                <Input placeholder="https://leetcode.com/problems/two-sum/description/" />
            </Form.Item>

          <Form.Item label="Difficulty" name="difficulty" rules={[{ required: true, message: 'Please select a difficulty level!' }]}>
            <Radio.Group>
            <Radio.Button value="EASY">EASY</Radio.Button>
            <Radio.Button value="MEDIUM">MEDIUM</Radio.Button>
            <Radio.Button value="HARD">HARD</Radio.Button>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
        label="Tags" 
        name="tags" 
        rules={[{ required: false, message: 'Please select at least one category!' }]}
        >
        <Checkbox.Group>
        <Checkbox value="Array">Array</Checkbox>
        <Checkbox value="String">String</Checkbox>
        <Checkbox value="Linked List">Linked List</Checkbox>
        <Checkbox value="Recursion">Recursion</Checkbox>
        <Checkbox value="Map/Set">Map/Set</Checkbox>
        <Checkbox value="Binary Search">Binary Search</Checkbox>
        <Checkbox value="Heap/Priority Queue">Heap/Priority Queue</Checkbox>
        <Checkbox value="Sliding Window">Sliding Window</Checkbox>
        <Checkbox value="Stack/Queue">Stack/Queue</Checkbox>
        <Checkbox value="Tree">Tree</Checkbox>
        <Checkbox value="Graph">Graph</Checkbox>
        <Checkbox value="Dynamic Programming">Dynamic Programming</Checkbox>
        <Checkbox value="Greedy">Greedy</Checkbox>
        <Checkbox value="Sorting">Sorting</Checkbox>
        <Checkbox value="Backtracking">Backtracking</Checkbox>
        <Checkbox value="Intervals">Intervals</Checkbox>
        <Checkbox value="MATH&Math & Geometry">Math & Geometry</Checkbox>
        <Checkbox value="Bit Manipulation">Bit Manipulation</Checkbox>
        </Checkbox.Group>
      </Form.Item>
        <Form.Item label="Next Review Date" name="review_in_days_str" rules={[{ required: true, message: 'Please select an option!' }]}>
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

export default EditQuestionModal;