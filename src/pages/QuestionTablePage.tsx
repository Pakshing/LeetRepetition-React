import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {tagColors,difficultyColors} from '../utils/TableItemColors'
import { useAppDispatch, useAppSelector } from '../app/store';
import { findQuestionByUserId } from '../store/features/questionTable/questionTableSlice';
import { LeetCodeQuestionModel } from '../data/LeetCodeQuestionModel';
import AddQuestionModal from '../components/Modal/AddQuestionModal';

const columns: TableProps<LeetCodeQuestionModel>['columns'] = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (title,record) => <a href={record.url} target="_blank" rel="noopener noreferrer">{title}</a>,
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
    render: (isoString) => <text>{new Date(isoString).toDateString()}</text>,
  },
  {
    title: 'Next Review',
    dataIndex: 'next_review',
    key: 'next_review',
    render: (isoString:string) => <text>{ get_next_review_string(isoString) }</text>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (tag) => 
    <Tag color={tagColors(tag)} key={tag}>
    {tag.replace(/_/g, ' ').toUpperCase()}
  </Tag>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite</a>
        <a>Delete</a>
      </Space>
    ),
  },
];



const get_next_review_string = (isoString: string | null) => {
  if (isoString === null) {
    return "Never";
  }

  const date = new Date(isoString);
  const today = new Date();

  // Remove time parts of today's date
  today.setHours(0, 0, 0, 0);

  if (date < today) {
    return "Over due";
  }

  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return "Today";
  }

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  ) {
    return "Tomorrow";
  }

  // Calculate the difference in days
  const diffInTime = date.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

  return `In ${diffInDays} days`;
};

const QuestionTablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questionTableStore.questions);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("user_id") !== null && localStorage.getItem("user_id") !== undefined){
      dispatch(findQuestionByUserId(parseInt(localStorage.getItem("user_id") as string)))
    }
  }, [dispatch]);

  const filteredQuestions = filterActive
    ? questions.filter((question) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextReviewDate = new Date(question.next_review);
        nextReviewDate.setHours(0, 0, 0, 0);
        return nextReviewDate.getTime() === today.getTime();
      })
    : questions;

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
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
        <AddQuestionModal/>
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