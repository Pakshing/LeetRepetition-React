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
import QuestionTable from './features/QuestionTable/QuestionTable';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/Layout/AppHeader';
import AppFooter from './components/Layout/AppFooter';
import { generate as randomStringGenerate} from 'randomstring'


const { Content, Footer, Sider } = Layout;
function App() {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    console.log("App mounted")
    if(localStorage.getItem("user_email") === null){
        const user_email = randomStringGenerate(100)+"@localstorage.com";
        localStorage.setItem("user_email",user_email)
        
        console.log("User email created" + localStorage.getItem("user_email"))
    }else{
      console.log("User email already exists" + localStorage.getItem("user_email"))
    }

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
