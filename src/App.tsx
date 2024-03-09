import React, { useState,useEffect } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  ClockCircleOutlined
 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css';
import QuestionTable from './pages/QuestionTablePage';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/Layout/AppHeader';
import AppFooter from './components/Layout/AppFooter';
import { createUser,getUser } from './store/features/user/userAPI';
import { useAppSelector, useAppDispatch } from './store/store'
import { UserState,setUser } from './store/features/user/UserSlice';



const { Content, Footer, Sider } = Layout;



function App() {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  if(localStorage.getItem("user_email") === null && localStorage.getItem("user_id") === null){
    createUser();
  }else{
    getUser(String(localStorage.getItem("user_email")));
  
  }
  useEffect(() => {
    

  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader/>
        <Router>
          <Content style={{ margin: '16px 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: "90vh",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/table" element={<QuestionTable />} />
                </Routes>
            </div>
          </Content>
        </Router>
      <AppFooter/>
    </Layout>
  );
}

export default App;
