import React, { useState,useEffect } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import './App.css';
import QuestionTable from './pages/QuestionTablePage';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from './components/Layout/AppHeader';
import AppFooter from './components/Layout/AppFooter';


const { Content } = Layout;



function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {

    
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <AppHeader/>
        
          <Content style={{ margin: '16px 16px' }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                backgroundColor: "#ebebeb",
               
              }}
            >
              
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/question" element={<QuestionTable />} />
                </Routes>
            </div>
          </Content>
        </Router>
      <AppFooter/>
    </Layout>
  );
}

export default App;
