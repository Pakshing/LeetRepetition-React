import React, { useState,useCallback } from 'react';
import { Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import  { useAppDispatch } from '../../app/store';
import {User} from '../../pages/User'
import { createUser, getUser } from '../../store/features/user/UserSlice';
import { getGithubUserEmail,fetchGoogleUserEmailByAccessToken } from '../../store/features/user/OauthUserApi';
import {
  LoginSocialGoogle,
  LoginSocialGithub,
  IResolveParams
} from 'reactjs-social-login'

import {
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons'

const LoginModal: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const REDIRECT_URI = process.env.REACT_APP_GITHUB_REDIRECT_URI || 'http://localhost:3000';


  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onLocalGenerateUser = () => {
    const userConfirmed = window.confirm("This is a one time only local account, no data will be reserved after logout. Are you sure you want to proceed?");
    if(userConfirmed) dispatch(createUser({email:"",loginMethod:"Local"}));
    
  }

  const onTestingUserAccount = () => {
    dispatch(getUser(process.env.REACT_APP_TEST_USER_EMAIL||"testuser@local.com"))
    .then(()=>{
      navigate('/question');
    })

  }

  return (
    <>
      <Button onClick={showModal}>
        <b>Log In</b>
      </Button>
      <Modal
        open={open}
        title="Login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button danger key="back" onClick={handleCancel}>
            <b>Cancel</b>
          </Button>,
        ]}
      >
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center", gap:"1rem"}}>
        <LoginSocialGoogle
              isOnlyGetToken = {true}
              client_id={process.env.REACT_APP_GG_APP_ID || ''}
              onResolve={async ({ provider, data }: IResolveParams) => {
                if(data){
                  const email = await fetchGoogleUserEmailByAccessToken(data.access_token);
                  if(email !== "Failure"){
                    dispatch(createUser({email:email,loginMethod:"Google"}))
                    .then(()=>{
                      navigate('/question');
                    })
                  }
                }
              }}
              onReject={(err) => {
                console.log(err)
              }}
            >
             <GoogleLoginButton/>
          </LoginSocialGoogle>
                <GithubLoginButton onClick={() => {
                const clientId = process.env.REACT_APP_GITHUB_APP_ID || '';
                const redirectUri = encodeURIComponent(REDIRECT_URI);
                const scope = encodeURIComponent('user:email');
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
            }}/>
              {/* <Button  size="large" onClick={onLocalGenerateUser}>
                <b>Generate Local Only User</b>
              </Button> */}

              <Button  size="large" onClick={onTestingUserAccount}>
                <b>Log in as Testing User Account</b>
              </Button>

        </div>
       
      </Modal>
    </>
  );
};

export default LoginModal;