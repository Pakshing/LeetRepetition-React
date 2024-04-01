import React from 'react'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import LoginButton from '../Button/LoginButton'
import LoginModal from '../Modal/LoginModal';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function AppHeader() {
  const logoutOnClick = () => {
    let userConfirmed = false;
    if(localStorage.getItem("login_method") === "Local"){
      userConfirmed = window.confirm("Once you logout from local only user account, you will lose all your data. Are you sure you want to logout?");
    }else{
      userConfirmed = window.confirm("Are you sure you want to logout?");
    }
    if (userConfirmed) {
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_id");
      localStorage.removeItem("login_method");
      window.location.reload();
    }
  }

  return (
    <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
          <b style={{ color: "white", fontSize: "1.5rem" }}>
            <ClockCircleOutlined style={{marginRight:"1rem"}}/> Leetcode Spaced Repetition Tool
          </b>
          {localStorage.getItem("user_email") && localStorage.getItem("user_id") ?  <Button type="primary" onClick={logoutOnClick}>
        Logout
      </Button>: <LoginModal /> }
          
    </Header>
  )
}

export default AppHeader
