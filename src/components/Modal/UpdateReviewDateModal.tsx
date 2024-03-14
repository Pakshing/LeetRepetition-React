import React, { useState } from 'react';
import { Modal, Form, Radio } from 'antd';
import { LeetCodeQuestionModel } from '../../data/LeetCodeQuestionModel';
import {QuestionState, updateQuestion} from '../../store/features/question/QuestionAPI';
import { useAppDispatch } from '../../app/store';
import { findQuestionByUserId} from '../../store/features/questionTable/questionTableSlice'


type UpdateReviewDateModalProps = {
    question: LeetCodeQuestionModel;
  };

  const UpdateReviewDateModal: React.FC<UpdateReviewDateModalProps> = ({ question }) => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async() => {
        form.submit();
        const result = await updateQuestion(question, form.getFieldValue('next_review'));
        if (result !== 'Failure') {
            dispatch(findQuestionByUserId(parseInt(localStorage.getItem("user_id") as string)));
          }
        form.resetFields()
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
    };


    return (
        <div>
          <a href={question.url} onClick={showModal} target="_blank" rel="noopener noreferrer">{question.title}</a>
          <Modal title="Next Review Date" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} >
              <Form.Item  name="next_review" rules={[{ required: true, message:"Please select an option or click cancel to exit" }]}>
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
            </Form>
          </Modal>
        </div>
      );
};

export default UpdateReviewDateModal;