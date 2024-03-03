import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import {tagColors,difficultyColors} from '../../utils/TableItemColors'

interface DataType {
    key: string;
    title: string;
    difficulty: string;
    lastCompleted: string;
    category: string;
    tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
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
    title: 'Last Completed',
    dataIndex: 'lastCompleted',
    key: 'lastCompleted',
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
        {tags.map((tag) => {
          let color = tagColors(tag);
          
          return (
            <Tag color={color} key={tag}>
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

const data: DataType[] = [
    {
        key: '1',
        title: 'Two Sum',
        difficulty: 'Easy',
        lastCompleted: '2021-10-01',
        category:"array",
        tags: ['array', 'hash table']
    }
];

const QuestionTable: React.FC = () => {
    

    return (
        <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
        >
        <Table
        columns={columns}
        dataSource={data}
        />
      </div>
    )
}




export default QuestionTable;