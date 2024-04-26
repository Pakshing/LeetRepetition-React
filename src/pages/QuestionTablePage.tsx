import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Input } from 'antd';
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
  const [searchText, setSearchText] = useState('');

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
      sorter: {
        compare: (a, b) => a.title.localeCompare(b.title),
        multiple: 1,
      },
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficult) => 
      <Tag color={difficultyColors(difficult)} key={difficult}>
      {difficult.toUpperCase()}
    </Tag>,
          sorter: {
            compare: (a, b) => a.difficulty.localeCompare(b.difficulty),
            multiple: 2,
          },
    },
    {
      title: 'Last Completion',
      dataIndex: 'last_completion',
      key: 'last_completion',
      render: (isoString) => <span>{new Date(isoString).toDateString()}</span>,
      sorter: {
        compare: (a, b) => new Date(a.last_completion).getTime() - new Date(b.last_completion).getTime(),
        multiple: 3,
      },
    },
    {
      title: 'Next Review',
      dataIndex: 'review_date',
      key: 'review_date',
      render: (isoString:string) => <span>{ isoString? get_next_review_string(isoString):"Never" }</span>,
      sorter: {
      compare: (a, b) => {
        if (a.review_date === null) return 1; 
        if (b.review_date === null) return -1; 
        return new Date(a.review_date).getTime() - new Date(b.review_date).getTime(); 
      },
      multiple: 4,
},
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags) => (
            <>
                {tags && tags.map((tag:string) => (
                    <Tag color={tagColors(tag)} key={tag}>
                        {tag.replace(/_/g, ' ').toUpperCase()}
                    </Tag>
                ))}
            </>
        ),
        sorter: {
            compare: (a, b) => a.tags.join('').localeCompare(b.tags.join('')),
            multiple: 5,
        },
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

  const handleSearch = (value: string) => {
    setSearchText(value);
  };


  const filteredQuestions = filterActive
    ? questions.filter((question) => {
        if (question.review_date === null) return false; 
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const nextReviewDate = new Date(question.review_date);
        nextReviewDate.setHours(0, 0, 0, 0);
        return nextReviewDate.getTime() <= today.getTime();
      })
    : questions;

  const searchedQuestions = filteredQuestions.filter((question) =>
    question.title.toLowerCase().includes(searchText.toLowerCase())
  );


  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        minWidth: '50%',
        width:'80%',
      }}
    >
      
    <div style={{display:"flex", justifyContent: "space-between", gap:"1rem", marginBottom:"1rem"}}>
        <div style={{display: "flex", gap: "1rem"}}>
            <Button 
                type="default" 
                onClick={() => setFilterActive(!filterActive)}
                style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'white' }}
            >
                {filterActive ? 'All Questions' : 'Show Due'}
            </Button>
            {Cookies.get("token") !== null && <AddQuestionModal/>}
            <Input.Search
              placeholder="Search by title"
              onSearch={handleSearch}
              onChange={e => setSearchText(e.target.value)}
              style={{ width: 200 }}
              value = {searchText}
            /> 
             <Button 
            type="default" 
            onClick={() => {
                setSearchText('');
            }}
           
        >
            Clear
        </Button> 
        </div>
        <b style={{marginTop:'1rem', marginRight:'1rem'}}>Total: {questions.length}</b>
    </div>
      
      <Table
        columns={columns}
        dataSource={searchedQuestions}
        rowKey={(record) => record.id.toString()}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </div>
  )
}

export default QuestionTablePage;