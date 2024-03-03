import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import LoginButton from '../Button/LoginButton'
import LoginModal from '../Modal/LoginModal';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function AppHeader() {
  return (
    <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
          <b style={{ color: "white", fontSize: "1.5rem" }}>
            <ClockCircleOutlined style={{marginRight:"1rem"}}/> Leetcode Spaced Repetition Tool
          </b>
          <LoginModal/>
    </Header>
  )
}

export default AppHeader
