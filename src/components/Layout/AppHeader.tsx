import React,{useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getGithubUserEmailAndUser } from '../../store/features/user/UserSlice';
import { githubLogin,googleLogin } from '../../store/features/token/tokenSlice';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginButton from '../Button/LoginButton'
import LoginModal from '../Modal/LoginModal';
import { ClockCircleOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const { Header, Content, Footer, Sider } = Layout;

function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation()
  const token = useAppSelector((state) => state.tokenStore.token);

useEffect(() => {
    const fetchUser = async () => {
        const query = new URLSearchParams(window.location.search);
        const code = query.get('code');
        const state = query.get('state');
  
        if (state === 'google' && code) {
            dispatch(googleLogin(code)).then((action) => {
                if (googleLogin.fulfilled.match(action)) {
                    navigate('/question');
                }
            });
        } else if (state === 'github' && code) {
            dispatch(githubLogin(code)).then((action) => {
                if (githubLogin.fulfilled.match(action)) {
                    navigate('/question');
                }
            });
        }
        
    }

    fetchUser();
}, [location]);


  const items = [
    {
      key: 1,
      label: <Link to="/question"> <b style={{color:'white'}}> Question</b></Link>,
  }];
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  

  const logoutOnClick = () => {  
      Cookies.remove('token');
      Cookies.set('loggedIn', 'false');
      navigate('/');
      // Remove all URL parameters
      const urlWithoutParameters = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.pushState({}, document.title, urlWithoutParameters);
      window.location.reload();
  }

  return (
    <Header style={{ display: "flex", justifyContent: 'space-between', alignItems: "center", backgroundColor:'#1A1F2B' }}>
      <a href="/" style={{ color: "white" }}>

          <b style={{ color: "white", fontSize: "1.5rem" }}>
            <ClockCircleOutlined style={{marginRight:"1rem"}}/> Leetcode Scheduler

          </b>
          
          
      </a>
          
          {Cookies.get('loggedIn') === "true" ? 
          <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0, marginLeft:"1rem", backgroundColor:'#1A1F2B'}}
        /> : null}
          <span style={{marginRight:'1rem', color:'white'}}>Beta</span>
          {Cookies.get("loggedIn") === "true"?  <Button onClick={logoutOnClick}>
        <b>Log Out</b>
      </Button>: <LoginModal /> }
          
    </Header>
  )
}

export default AppHeader
