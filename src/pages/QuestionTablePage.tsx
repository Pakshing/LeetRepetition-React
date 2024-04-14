import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {tagColors,difficultyColors} from '../utils/TableItemColors'
import { useAppDispatch, useAppSelector } from '../app/store';
import { fetchQuestions } from '../store/features/questionTable/questionTableSlice';
import { LeetCodeQuestionModel } from '../data/LeetCodeQuestionModel';
import AddQuestionModal from '../components/Modal/AddQuestionModal';
import { get_next_review_string, deleteQuestion } from '../store/features/question/QuestionAPI'; 
import UpdateReviewDateModal from '../components/Modal/UpdateReviewDateModal';
import EditQuestionModal from '../components/Modal/EditQuestionModal';
import Cookies from 'js-cookie';








const QuestionTablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questionTableStore.questions);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    if(Cookies.get("loggedIn") === "true"){
      dispatch(fetchQuestions())
    }
  }, [dispatch,Cookies.get('loggedIn')]);

  const columns: TableProps<LeetCodeQuestionModel>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => <UpdateReviewDateModal question={record} />,
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficult) => 
      <Tag color={difficultyColors(difficult)} key={difficult}>
      {difficult.toUpperCase()}
    </Tag>,
    },
    {
      title: 'Last Completion',
      dataIndex: 'last_completion',
      key: 'last_completion',
      render: (isoString) => <span>{new Date(isoString).toDateString()}</span>,
    },
    {
      title: 'Next Review',
      dataIndex: 'next_review',
      key: 'next_review',
      render: (isoString:string) => <span>{ get_next_review_string(isoString) }</span>,
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags) => (
            <>
                {tags.map((tag:string) => (
                    <Tag color={tagColors(tag)} key={tag}>
                        {tag.replace(/_/g, ' ').toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
        <EditQuestionModal  question={record}/>   
        <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>     
        </Space>
      ),
    },
  ];


  const handleDelete = async(id: number) => {
    const userResponse = window.confirm("Are you sure you want to delete this question?");
    if (userResponse) {
      try {
        const result = await deleteQuestion(id);
        if (result !== 'Failure') {
          dispatch(fetchQuestions());
        } else {
          alert('Question deletion failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }

  const filteredQuestions = filterActive
    ? questions.filter((question) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextReviewDate = new Date(question.next_review);
        nextReviewDate.setHours(0, 0, 0, 0);
        return nextReviewDate.getTime() <= today.getTime() && question.next_review !== null;
      })
    : questions;

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        minWidth: '50%',
        width:'80%',
        
        
      }}
    >
      <div style={{display:"flex",gap:"1rem", marginBottom:"1rem"}}>
        <Button 
          type="default" 
          onClick={() => setFilterActive(!filterActive)}
          style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}
        >
          {filterActive ? 'All Questions' : 'Show Due'}
        </Button>
        {Cookies.get("token") !== null && <AddQuestionModal/>}
       
      </div>
      
      <Table
        columns={columns}
        dataSource={filteredQuestions}
        rowKey={(record) => record.id.toString()}
      />
    </div>
  )
}

export default QuestionTablePage;