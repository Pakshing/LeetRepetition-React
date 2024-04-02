import React,{useEffect} from 'react'
import { useAppDispatch } from '../../app/store';
import { getGithubUserEmailAndUser } from '../../store/features/user/UserSlice';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../Button/LoginButton'
import LoginModal from '../Modal/LoginModal';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');
    if(code){
      console.log("code",code)
      dispatch(getGithubUserEmailAndUser(code))
      .then(()=>{
        navigate('/question');
      }
      )
    }
  }, [])


  const items = [
    {
      key: 1,
      label: <Link to="/question"> <b> Question</b></Link>,
  }];
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  

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
      navigate('/');
      // Remove all URL parameters
      const urlWithoutParameters = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({}, document.title, urlWithoutParameters);
      window.location.reload();
    

    }
  }

  return (
    <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
      <a href="/" style={{ color: "white" }}>

          <b style={{ color: "white", fontSize: "1.5rem" }}>
            <ClockCircleOutlined style={{marginRight:"1rem"}}/> Leetcode Scheduler
          </b>
      </a>
          {localStorage.getItem("user_email") && localStorage.getItem("user_id") ? 
          <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0, marginLeft:"1rem" }}
        /> : null}
          
          {localStorage.getItem("user_email") && localStorage.getItem("user_id") ?  <Button onClick={logoutOnClick}>
        <b>Log Out</b>
      </Button>: <LoginModal /> }
          
    </Header>
  )
}

export default AppHeader
