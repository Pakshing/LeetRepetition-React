import React, { useEffect } from 'react';
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
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
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
  },
  {
    title: 'Catergory',
    dataIndex: 'category',
    key: 'category',
    render: (tag) => 
    <Tag color={tagColors(tag)} key={tag}>
    {tag.toUpperCase()}
  </Tag>,
  },
  {
    title: 'tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag,index) => {
          let color = tagColors(tag);
          
          return (
            <Tag color={color} key={tag + index}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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



const QuestionTablePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questionTableStore.questions);

  useEffect(() => {
    if(localStorage.getItem("user_id") !== null && localStorage.getItem("user_id") !== undefined){
      dispatch(findQuestionByUserId(parseInt(localStorage.getItem("user_id") as string)))
      
    }
    
  }
  , [dispatch]);

    

    return (
       
        <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
        >
        <div style={{display:"flex",gap:"1rem"}}>
        <Button type="primary">Create Deck</Button>
        <AddQuestionModal/>
        </div>
        
        <Table
        columns={columns}
        dataSource={questions}
        rowKey={(record) => record.id.toString()}
        />
      </div>
    )
}




export default QuestionTablePage;