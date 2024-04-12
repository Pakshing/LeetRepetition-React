import React,{useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getGithubUserEmailAndUser } from '../../store/features/user/UserSlice';
import { githubLogin } from '../../store/features/token/tokenSlice';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from '../Button/LoginButton'
import LoginModal from '../Modal/LoginModal';
import { ClockCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { Header, Content, Footer, Sider } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.tokenStore.token);

  useEffect(() => {
    console.log("token",token)
    const fetchGithubUser = async () => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');
        if(code){
          dispatch(githubLogin(code)).then((action) => {
            if (githubLogin.fulfilled.match(action)) {
                navigate('/question');
            }
        });
            
        }
    }

    fetchGithubUser();
}, []);


  const items = [
    {
      key: 1,
      label: <Link to="/question"> <b style={{color:'white'}}> Question</b></Link>,
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
    <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", backgroundColor:'#1A1F2B' }}>
      <a href="/" style={{ color: "white" }}>

          <b style={{ color: "white", fontSize: "1.5rem" }}>
            <ClockCircleOutlined style={{marginRight:"1rem"}}/> Leetcode Scheduler

          </b>
          
          
      </a>
          
          {localStorage.getItem("user_email") && localStorage.getItem("user_id") ? 
          <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0, marginLeft:"1rem", backgroundColor:'#1A1F2B'}}
        /> : null}
          <span style={{marginRight:'1rem', color:'white'}}>Beta</span>
          {localStorage.getItem("user_email") && localStorage.getItem("user_id") ?  <Button onClick={logoutOnClick}>
        <b>Log Out</b>
      </Button>: <LoginModal /> }
          
    </Header>
  )
}

export default AppHeader
