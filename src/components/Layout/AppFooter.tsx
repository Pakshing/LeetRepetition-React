import React from 'react'
import { Layout } from 'antd';

const { Footer } = Layout;
function AppFooter() {
  return (
    <Footer style={{ textAlign: 'center' }}>
          Leetcode Scheduler ©{new Date().getFullYear()} Created by Pak Shing Kan
    </Footer>
   
  )
}

export default AppFooter
