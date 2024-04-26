import React, { useState } from 'react';
import { Modal, Form, Radio } from 'antd';
import {QuestionState, updateQuestion, get_next_review_long} from '../../store/features/question/QuestionAPI';
import { useAppDispatch } from '../../app/store';
import { fetchQuestions} from '../../store/features/questionTable/questionTableSlice'
import { LeetCodeQuestionModel } from '../../data/LeetCodeQuestionModel';


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
        let review_in_days = form.getFieldValue('next_review')
        let modifiedQuestion = { ...question };
        if(review_in_days === "never") modifiedQuestion.review_date = null
        else{
          const reviewDate = new Date();
          reviewDate.setDate(reviewDate.getDate() + Number(review_in_days));
          modifiedQuestion.review_date = reviewDate
        }
        modifiedQuestion.last_completion = new Date()
        const result = await updateQuestion(modifiedQuestion);
        if (result !== 'Failure') {
            dispatch(fetchQuestions());
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